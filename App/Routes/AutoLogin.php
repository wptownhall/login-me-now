<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Routes;

defined( 'ABSPATH' ) || exit;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use LoginMeNow\Abstracts\RouteBase;
use LoginMeNow\BrowserToken\JWTAuth;
use LoginMeNow\OnetimeNumber\AutoLogin as OnetimeNumberAutoLogin;
use WP_REST_Request;

class AutoLogin extends RouteBase {

	public function register_routes(): void{
		register_rest_route(
			$this->namespace,
			'/autologin',
			[
				[
					'methods'             => 'GET',
					'callback'            => [$this, 'verify'],
					'permission_callback' => '__return_true',
				],
			]
		);
	}

	public function verify( WP_REST_Request $request ) {
		if ( empty( $request['token'] ) ) {
			return __( 'No Token Provided', 'login-me-now' );
		}

		/** First thing, check the secret key if not exist return an error*/
		$secret_key = JWTAuth::init()->get_secret_key();
		if ( ! $secret_key ) {
			return __( 'JWT is not configured properly, please contact the admin', 'login-me-now' );
		}

		try {
			$algorithm = JWTAuth::init()->get_algorithm();
			$payload   = JWT::decode( $request['token'], new Key( $secret_key, $algorithm ) );
		} catch ( \Throwable $th ) {
			return $th->getMessage();
		}

		$user_id = ! empty( $payload->data->user->id ) ? $payload->data->user->id : false;

		if ( ! $user_id ) {
			return __( 'User not found', 'login-me-now' );
		}

		OnetimeNumberAutoLogin::init()->now( $user_id );
	}
}