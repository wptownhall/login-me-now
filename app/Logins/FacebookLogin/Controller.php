<?php
/**
 * @author  WPtownhall
 * @since  	1.4.0
 * @version 1.6.0
 */

namespace LoginMeNow\Logins\FacebookLogin;

class Controller {

	public string $client_id     = '1066164867842887';
	public string $client_secret = '2ae0c11478a6f7b7d7c89242198d6e06';

	public function listen() {
		if ( ! array_key_exists( 'lmn-facebook', $_GET ) ) {
			return;
		}

		$token = $_GET['code'];

		if ( ! $token ) {
			wp_send_json_error( __( "Not authenticated", 'login-me-now' ) );
		}

		$this->facebook_login( $token );
	}

	public function facebook_login( $code ) {
		$http_args = [
			'timeout'    => 15,
			'user-agent' => 'WordPress',
			'body'       => [
				'client_id'     => $this->client_id,
				'client_secret' => $this->client_secret,
				'redirect_uri'  => home_url( 'wp-login.php?lmn-facebook' ),
				'code'          => $code,
			],
		];

		$request = wp_remote_get( 'https://graph.facebook.com/v20.0/oauth/access_token', $http_args );

		if ( wp_remote_retrieve_response_code( $request ) !== 200 ) {
			wp_send_json_error( __( "Something went wrong", 'login-me-now' ) );
		} else {
			$res = json_decode( wp_remote_retrieve_body( $request ), true );
		}

		$access_token = $res['access_token'] ?? '';
		if ( ! $access_token ) {
			wp_send_json_error( __( "Something went wrong", 'login-me-now' ) );
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
		$fbApiUrl = 'https://graph.facebook.com/v20.0/me?fields=id,name,email,picture.type(large)&access_token=' . $access_token;

		$response            = file_get_contents( $fbApiUrl );
		$data                = json_decode( $response, true );
		$data['accessToken'] = $access_token;

		if ( ! isset( $data['id'] ) ) {
			$data['message'] = 'Something went wrong';
		}

		return $data;
	}
}