<?php
/**
 * @author  Pluginly
 * @since   1.8
 * @version 1.8
 */

namespace LoginMeNow\Logins\MagicLinkLogin;

use LoginMeNow\Common\ModuleBase;
use LoginMeNow\Models\UserToken;
use LoginMeNow\Repositories\SettingsRepository;
use LoginMeNow\Utils\Random;
use LoginMeNow\Utils\Time;
use LoginMeNow\Utils\Translator;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class MagicLinkLogin extends ModuleBase {

	public function setup(): void {
		( new Settings() );

		if ( ! self::show() ) {
			return;
		}

		( new Route() );
		( new Button() );
		( new Route() );
	}

	public static function show(): bool {
		$enable = SettingsRepository::get( 'email_magic_link_login', true );

		if ( $enable ) {
			return true;
		}

		return false;
	}

	public static function show_on_native_login() {
		return self::show() && SettingsRepository::get( 'email_magic_link_native_login', true );
	}

	public function create( int $user_id ) {
		if ( ! function_exists( 'get_userdata' ) ) {
			require_once ABSPATH . WPINC . '/pluggable.php';
		}

		$user = get_userdata( $user_id );
		if ( ! $user ) {
			return false;
		}

		$expiration = apply_filters( 'login_me_now_email_magic_link_expire', 300, $user );
		$token      = $this->generate_token( $user, $expiration );
		if ( ! $token ) {
			return false;
		}

		$link = sprintf( '%s%s', admin_url( '/?lmn-magic-link=' ), $token );

		return [
			'link'    => $link,
			'message' => __( 'Login link generated successfully!', 'login-me-now' ),
		];
	}

	protected function generate_token( \WP_User $user, int $secs ): string {
		$issued_at = Time::now();
		$expire    = apply_filters( 'login_me_now_email_magic_link_expire', $secs, $issued_at );

		$number = Random::number();
		$token  = Translator::encode( $user->data->ID, $number, $expire, '==' );

		UserToken::init()->insert(
			$user->data->ID,
			[
				'number'     => $number,
				'created_at' => $issued_at,
				'created_by' => get_current_user_id(),
				'expire'     => $expire,
			]
		);

		\LoginMeNow\Integrations\SimpleHistory\Logs::add( $user->data->ID, "generated an email magic link" );

		return $token;
	}
}