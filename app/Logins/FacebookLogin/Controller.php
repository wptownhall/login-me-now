<?php
/**
 * @author  WPtownhall
 * @since  	1.4.0
 * @version 1.6.0
 */

namespace LoginMeNow\Logins\FacebookLogin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Controller {
	public function facebook_login() {
		$access_token = (string) isset( $_POST['accessToken'] ) ? sanitize_text_field( $_POST['accessToken'] ) : null;
		if ( ! $access_token ) {
			wp_send_json_error( __( "Not authenticated", 'login-me-now' ) );
		}

		$user_data = $this->getRemoteUserGraph( $access_token );
		if ( ! $user_data ) {
			wp_send_json_error( __( "Something went wrong", 'login-me-now' ) );
		}

		if ( ! isset( $user_data['email'] ) ) {
			wp_send_json_error( __( "Please give the email permission", 'login-me-now' ) );
		}

		$user_data['picture'] = $user_data['picture']['data']['url'] ?? '';
		$auth                 = new Authenticate( $user_data );
		$response             = $auth->authenticate();

		wp_send_json_success( $response );

		wp_die();
	}

	private function getRemoteUserGraph( string $access_token ): array {
		$fbApiUrl = 'https://graph.facebook.com/v14.0/me?fields=id,name,email,picture.type(large)&access_token=' . $access_token;

		$response            = file_get_contents( $fbApiUrl );
		$data                = json_decode( $response, true );
		$data['accessToken'] = $access_token;

		if ( ! isset( $data['id'] ) ) {
			$data['message'] = 'Something went wrong';
		}

		return $data;
	}
}