<?php
/**
 * @author  WPtownhall
 * @since  	1.0.0
 * @version 1.4.0
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

	public string $channel = 'google';

	public function __construct() {
		$this->action( 'init', 'listen' );
	}

	public function listen(): void {
		if ( array_key_exists( 'lmn-google', $_GET ) ) {

			$nonce = ! empty( $_POST['wpnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['wpnonce'] ) ) : '';

			if ( ! wp_verify_nonce( $nonce, 'lmn-google-nonce' ) ) {
				error_log( 'Login Me Now - WP Nonce Verify Failed' );

				return;
			}

			if ( ! isset( $_POST['g_csrf_token'] ) && ! empty( $_POST['g_csrf_token'] ) ) {
				error_log( 'Login Me Now - Post g_csrf_token not available' );

				return;
			}

			if ( ! isset( $_COOKIE['g_csrf_token'] ) && ! empty( $_COOKIE['g_csrf_token'] ) ) {
				error_log( 'Login Me Now - Cookie g_csrf_token not available' );

				return;
			}

			if ( $_POST['g_csrf_token'] !== $_COOKIE['g_csrf_token'] ) {
				error_log( 'Login Me Now - g_csrf_token is not same in post and cookie' );

				return;
			}

			if ( ! isset( $_POST['credential'] ) && ! empty( $_POST['credential'] ) ) {
				error_log( 'Login Me Now - Credential is not available' );

				return;
			}

			$id_token  = sanitize_text_field( wp_unslash( $_POST['credential'] ) );
			$client_id = Settings::init()->get( 'google_client_id' );
			$client    = new Google_Client( ['client_id' => esc_html( $client_id )] );
			$data      = $client->verifyIdToken( $id_token );

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