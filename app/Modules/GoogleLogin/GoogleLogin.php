<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.5.0
 */

namespace LoginMeNow\GoogleLogin;

use LoginMeNow\Abstracts\ModuleBase;
use LoginMeNow\GoogleLogin\Authenticate;
use LoginMeNow\GoogleLogin\Enqueuer;
use LoginMeNow\Model\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GoogleLogin extends ModuleBase {

	public function setup(): void {
		if ( ! self::show() ) {
			return;
		}

		Enqueuer::init();
		Authenticate::init();
		Button::init();
		Profile::init();

		if ( ! defined( 'LOGIN_ME_NOW_PRO_VERSION' ) ) {
			OneTap::init();
		}
	}

	public static function show(): bool {
		$enable        = Settings::init()->get( 'google_login', false );
		$client_id     = Settings::init()->get( 'google_client_id', '' );
		$client_secret = Settings::init()->get( 'google_client_secret', '' );

		if ( $enable && $client_id && $client_secret ) {
			return true;
		}

		return false;
	}

	public static function create_auth_url() {
		$client_id    = Settings::init()->get( 'google_client_id' );
		$redirect_uri = home_url( 'wp-login.php?lmn-google' );
		$auth         = 'https://accounts.google.com/o/oauth2/v2/auth';
		$scopes       = [
			'email',
			'profile',
		];

		$args = [
			'response_type' => 'code',
			'client_id'     => urlencode( $client_id ),
			'redirect_uri'  => urlencode( $redirect_uri ),
			'wpnonce'       => wp_create_nonce( 'lmn-google-nonce' ),
		];

		if ( count( $scopes ) ) {
			$args['scope'] = urlencode( implode( ' ', array_unique( $scopes ) ) );
		}

		return add_query_arg( $args, $auth );
	}
}