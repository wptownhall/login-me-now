<?php
/**
 * @author  WPtownhall
 * @since  	1.0.0
 * @version 1.5.0
 */

namespace LoginMeNow\GoogleLogin;

use Google_Client;
use LoginMeNow\Abstracts\AuthenticateBase;
use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Authenticate extends AuthenticateBase {
	use Hookable;
	use Singleton;

	public string $channel       = 'google';
	public bool $redirect_return = true;

	public function __construct() {
		$this->action( 'init', 'listen' );
	}

	public function listen(): void {
		if ( array_key_exists( 'lmn-google', $_GET ) ) {

			$client_id     = Settings::init()->get( 'google_client_id' );
			$client_secret = Settings::init()->get( 'google_client_secret' );
			$redirect_uri  = home_url( 'wp-login.php?lmn-google' );

			$client = new Google_Client(
				[
					'client_id'     => $client_id,
					'client_secret' => $client_secret,
					'redirect_uri'  => $redirect_uri,
				]
			);

			$tokens = $client->fetchAccessTokenWithAuthCode( $_GET['code'] );

			error_log( '$tokens: ' . print_r( $tokens, true ) );

			$id_token = $tokens['id_token'] ?? '';

			if ( ! $id_token || is_wp_error( $id_token ) ) {
				error_log( 'Login Me Now - ' . print_r( $id_token ) );

				return;
			}

			$data = $client->verifyIdToken( $id_token );

			if ( ! $data || is_wp_error( $data ) ) {
				error_log( 'Login Me Now - ' . print_r( $data ) );

				return;
			}

			$this->user_data['ID']           = '';
			$this->user_data['email']        = $data['email'] ?? '';
			$this->user_data['first_name']   = $data['given_name'] ?? '';
			$this->user_data['last_name']    = $data['family_name'] ?? '';
			$this->user_data['display_name'] = $data['name'] ?? '';
			$this->user_data['name']         = $data['name'] ?? '';
			$this->user_data['picture']      = $data['picture'] ?? '';

			$this->authenticate();
		}
	}
}