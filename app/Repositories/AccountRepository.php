<?php
/**
 * @author  wpWax
 * @since   1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Repositories;

use LoginMeNow\DTO\LoginDTO;
use LoginMeNow\Utils\User;
use WP_Error;

class AccountRepository {

	public array $user_data;
	public string $channel;

	public function login( LoginDTO $dto ) {
		include ABSPATH . "wp-includes/pluggable.php";

		$user_id         = $dto->get_user_id();
		$redirect_uri    = $dto->get_redirect_uri();
		$redirect_return = $dto->is_redirect_return();

		if ( is_user_logged_in() ) {
			$current_user_id = get_current_user_id();
			if ( $user_id !== $current_user_id ) {
				wp_logout();
			}
		}

		$user = get_user_by( 'id', $user_id );

		wp_clear_auth_cookie();
		wp_set_current_user( $user_id, $user->user_login );
		wp_set_auth_cookie( $user_id, true );

		if ( ! $redirect_uri ) {
			$redirect_uri = admin_url();
		}

		if ( $redirect_return ) {
			return $redirect_uri;
		}

		if ( wp_safe_redirect( $redirect_uri ) ) {
			exit;
		}
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

		$dto = ( new LoginDTO )
			->set_user_id( $user_id )
			->set_redirect_uri( $redirect_uri )
			->set_redirect_return( false );

		( new AccountRepository )->login( $dto );
	}

	public function unique_username(): string {
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
}