<?php
/**
 * @author  HalalBrains
 * @since  	1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\GoogleLogin;

use Google_Client;
use LoginMeNow\Model\Auth;
use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\User;
use WP_Error;

class Authenticate {
	use Hookable;
	use Singleton;

	public function __construct() {
		$this->action( 'init', 'listen' );
	}

	public function listen(): void {
		if ( array_key_exists( 'lmn-google', $_GET ) ) {

			$nonce = ! empty( $_POST['wpnonce'] )
				? sanitize_text_field( wp_unslash( $_POST['wpnonce'] ) )
				: '';

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
			$payload   = $client->verifyIdToken( $id_token );

			if ( $payload ) {
				$wp_user      = get_user_by( 'email', sanitize_email( $payload['email'] ) );
				$redirect_uri = ! empty( $_POST['redirect_uri'] ) ? esc_url_raw( wp_unslash( $_POST['redirect_uri'] ) ) : '';
				$redirect_uri = apply_filters( 'login_me_now_google_login_redirect_url', $redirect_uri );

				if ( $wp_user ) {
					$action = $this->login( $wp_user->ID, $payload, $redirect_uri );
				} else {
					$action = $this->register( $payload, $redirect_uri );
				}

				if ( is_wp_error( $action ) ) {
					error_log( 'Login Me Now - ' . print_r( $action ) );

					return;
				}

			} else {
				error_log( 'Login Me Now - invalid id' );

				return;
			}

		}
	}

	private function unique_username( array $payload ): string {
		$username_parts = [];
		if ( isset( $payload['given_name'] ) ) {
			$username_parts[] = sanitize_user( $payload['given_name'], true );
		}

		if ( isset( $payload['family_name'] ) ) {
			$username_parts[] = sanitize_user( $payload['family_name'], true );
		}

		if ( empty( $username_parts ) ) {
			$email_parts      = explode( '@', $payload['email'] );
			$email_username   = $email_parts[0];
			$username_parts[] = sanitize_user( $email_username, true );
		}

		$username = strtolower( implode( '.', $username_parts ) );

		$default_user_name = $username;
		$suffix            = 1;
		while ( username_exists( $username ) ) {
			$username = $default_user_name . $suffix;
			$suffix++;
		}

		return $username;
	}

	public function register( array $payload, string $redirect_uri ) {
		$errors = new WP_Error();

		$username = $this->unique_username( $payload );
		$user_id  = register_new_user( sanitize_user( $username ), sanitize_email( $payload['email'] ) );

		if ( is_wp_error( $user_id ) ) {
			$errors->add( 'registration_failed', __( '<strong>Error</strong>: Registration Failed', 'login-me-now' ) );
		}

		do_action( 'login_me_now_google_login_after_registration', $user_id, $payload );

		User::set_role( $user_id );
		User::update_profile( $user_id, $payload );

		if ( $errors->has_errors() ) {
			return $errors;
		}

		Auth::login( $user_id, $redirect_uri );
	}

	public function login( int $user_id, array $payload, string $redirect_uri ): void {

		do_action( 'login_me_now_google_login_before_login', $user_id, $payload );

		$update_existing_data = Settings::init()->get( 'google_update_existing_user_data', false );
		if ( $update_existing_data ) {
			User::update_profile( $user_id, $payload );
		}

		Auth::login( $user_id, $redirect_uri );
	}
}