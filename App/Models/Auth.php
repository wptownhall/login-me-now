<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Model;

class Auth {

	public static function login( int $user_id, string $redirect_uri = '' ): void {
		include ABSPATH . "wp-includes/pluggable.php";
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

		if ( wp_safe_redirect( $redirect_uri ) ) {
			exit;
		}
	}
}