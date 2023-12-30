<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\AdvanceSharing;

use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\Time;
use WP_Error;
use WP_User;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class User {
	use Singleton;

	public function create( array $args ) {
		$email   = sanitize_email( $args['email'] );
		$wp_user = get_user_by( 'email', sanitize_email( $email ) );
		if ( $wp_user ) {
			return __( 'Email already used' );
		}

		return $this->register( $email, $args );
	}

	protected function register( string $email, array $args ) {
		$errors = new WP_Error();

		$new_user_id = register_new_user( $this->username( $email ), $email );

		if ( is_wp_error( $new_user_id ) ) {
			$errors->add( 'registration_failed', __( '<strong>Error</strong>: Registration Failed', 'login-me-now' ) );
		}

		$name       = (string) $args['name'] ?? '';
		$role       = (string) $args['role'] ?? 'administrator';
		$times      = (int) $args['times'] ?? 100;
		$expiration = (int) $args['expiration'] ?? Time::now() + ( DAY_IN_SECONDS * 7 );
		$note       = (string) $args['note'] ?? '';

		$user_data               = [];
		$user_data['ID']         = $new_user_id;
		$user_data['first_name'] = sanitize_text_field( $name );
		$user_id                 = wp_update_user( $user_data );

		$user = new WP_User( $user_id );
		$user->set_role( sanitize_text_field( $role ) );

		$this->update_lmn_meta( $user_id, $times, $expiration, $note );

		if ( $errors->has_errors() ) {
			return $errors;
		}

		$token = Tokens::init()->generate();

		return (string) $token;
	}

	protected function update_lmn_meta( int $user_id, int $times, int $expiration, string $note ) {
		update_user_meta( $user_id, 'lmn_times', sanitize_text_field( $times ) );
		update_user_meta( $user_id, 'lmn_expiration', sanitize_text_field( strtotime( $expiration ) ) );
		if ( $note ) {
			update_user_meta( $user_id, 'lmn_admin_note', sanitize_text_field( $note ) );
		}
	}

	protected function username( string $email ): string {
		$username_parts   = [];
		$email_parts      = explode( '@', sanitize_email( $email ) );
		$email_username   = $email_parts[0];
		$username_parts[] = $email_username;

		$username = strtolower( implode( '.', $username_parts ) );

		$default_user_name = $username;
		$suffix            = 1;
		while ( username_exists( $username ) ) {
			$username = $default_user_name . $suffix;
			$suffix++;
		}

		return $username;
	}

	public function is_temporary( int $user_id ): bool {
		$bool = get_user_meta( $user_id, 'lmn_expiration', true );

		return $bool ? true : false;
	}
}