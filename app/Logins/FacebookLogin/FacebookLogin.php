<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.6.0
 */

namespace LoginMeNow\Logins\FacebookLogin;

use LoginMeNow\Common\ModuleBase;
use LoginMeNow\Repositories\SettingsRepository;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class FacebookLogin extends ModuleBase {
	const DEFAULT_GRAPH_VERSION = 'v20.0';

	public function setup(): void {
		if ( ! self::show() ) {
			return;
		}

		( new Route() );
		( new Ajax() );
		( new Button() );
	}

	public static function show(): bool {
		$enable = SettingsRepository::get( 'facebook_login', false );
		$app_id = SettingsRepository::get( 'facebook_app_id', '' );

		if ( $enable && $app_id ) {
			return true;
		}

		return false;
	}

	public static function create_auth_url() {
		$client_id    = SettingsRepository::get( 'facebook_app_id' );
		$redirect_uri = home_url( 'wp-login.php?lmn-facebook' );

		$args = [
			'client_id'     => urlencode( $client_id ),
			'response_type' => 'code',
			'redirect_uri'  => urlencode( $redirect_uri ),
			'scope'         => 'public_profile,email',
		];

		return add_query_arg( $args, self::endpoint() );
	}

	public static function endpoint() {
		$endpointAuthorization = 'https://www.facebook.com/';

		if ( ! empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
			if ( preg_match( '/Android|iPhone|iP[ao]d|Mobile/', $_SERVER['HTTP_USER_AGENT'] ) ) {
				$endpointAuthorization = 'https://m.facebook.com/';
			}
		}

		$endpointAuthorization .= self::DEFAULT_GRAPH_VERSION . '/dialog/oauth';

		return $endpointAuthorization;
	}
}