<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.5.0
 */

namespace LoginMeNow\Abstracts;

use LoginMeNow\Model\Auth;
use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\Logs;
use LoginMeNow\Utils\User;
use WP_Error;

abstract class AuthenticateBase {
	use Singleton;
	use Hookable;

	public string $channel;
	public array $user_data;
	public bool $redirect_return = false;

	public function __construct( array $user_data ) {
		$this->user_data = wp_parse_args( $user_data, [
			'email' => '',
			'name'  => '',
		] );
	}

	public function authenticate() {
		$wp_user      = get_user_by( 'email', sanitize_email( $this->user_data['email'] ) );
		$redirect_uri = ! empty( $_POST['redirect_uri'] ) ? esc_url_raw( wp_unslash( $_POST['redirect_uri'] ) ) : admin_url();
		$redirect_uri = apply_filters( "login_me_now_{$this->channel}_login_redirect_url", $redirect_uri );

		if ( $wp_user ) {
			$action = $this->login( $wp_user->ID, $redirect_uri );
		} else {
			$action = $this->register( $redirect_uri );
		}

		if ( is_wp_error( $action ) ) {
			error_log( 'Login Me Now - ' . print_r( $action ) );

			return ['error message goes here'];
		}

		return $redirect_uri;
	}

	private function unique_username(): string {
		$username_parts = [];

		if ( isset( $this->user_data['name'] ) ) {
			$name             = str_replace( ' ', '.', $this->user_data['name'] );
			$username_parts[] = sanitize_user( $name, true );
		}

		if ( empty( $username_parts ) ) {
			$email_parts      = explode( '@', $this->user_data['email'] );
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

	public function register( string $redirect_uri ) {
		$errors = new WP_Error();

		$username = $this->unique_username();
		$user_id  = register_new_user(
			sanitize_user( $username ),
			sanitize_email( $this->user_data['email'] )
		);

		if ( is_wp_error( $user_id ) ) {
			$errors->add( 'registration_failed', __( '<strong>Error</strong>: Registration Failed', 'login-me-now' ), $user_id );
		}

		if ( $errors->has_errors() ) {
			return $errors;
		}

		do_action( "login_me_now_{$this->channel}_login_after_registration", $user_id, $this->user_data );

		User::set_role( $user_id, $this->channel );
		User::update_profile( $user_id, $this->user_data, $this->channel );

		Auth::login( $user_id, $redirect_uri );
	}

	public function login( int $user_id, string $redirect_uri ) {

		do_action( "login_me_now_{$this->channel}_login_before_login", $user_id, $this->user_data );

		$update_existing_data = Settings::init()->get( "{$this->channel}_update_existing_user_data", false );
		if ( $update_existing_data ) {
			User::update_profile( $user_id, $this->user_data, $this->channel );
		}

		$message = __( "logged in using {$this->channel} login", 'login-me-now' );
		Logs::add( $user_id, $message );

		Auth::login( $user_id, $redirect_uri, $this->redirect_return );
	}
}