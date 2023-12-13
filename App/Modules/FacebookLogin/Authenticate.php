<?php
/**
 * @author  WPtownhall
 * @since  	1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Abstracts\AuthenticateBase;

class Authenticate extends AuthenticateBase {
	public string $channel       = 'facebook';
	public bool $redirect_return = true;

	public function authenticate() {
		$wp_user      = get_user_by( 'email', sanitize_email( $this->user_data['email'] ) );
		$redirect_uri = ! empty( $_POST['redirect_uri'] ) ? esc_url_raw( wp_unslash( $_POST['redirect_uri'] ) ) : '';
		$redirect_uri = apply_filters( "login_me_now_{$this->channel}_login_redirect_url", $redirect_uri );

		if ( $wp_user ) {
			$action = $this->login( $wp_user->ID, $redirect_uri );
		} else {
			$action = $this->register( $redirect_uri );
		}

		if ( is_wp_error( $action ) ) {
			error_log( 'Login Me Now - ' . print_r( $action ) );

			return;
		}

		return [34334];

	}
}