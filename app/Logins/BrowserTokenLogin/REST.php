<?php
/**
 * @author  WPtownhall
 * @since   1.2.0
 * @version 1.2.0
 */

namespace LoginMeNow\Logins\BrowserTokenLogin;

defined( 'ABSPATH' ) || exit;

use LoginMeNow\Common\RouteBase;
use LoginMeNow\Logins\BrowserTokenLogin\JWTAuth;
use LoginMeNow\Logins\BrowserTokenLogin\OnetimeNumber;
use WP_REST_Request;

class REST extends RouteBase {

	/**
	 * Registers the route to generate the token.
	 */
	public function register_routes(): void {
		register_rest_route(
			$this->namespace,
			'/generate',
			[
				[
					'methods'             => 'POST',
					'callback'            => [JWTAuth::init(), 'generate_token'],
					'permission_callback' => '__return_true',
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/validate',
			[
				[
					'methods'             => 'POST',
					'callback'            => [JWTAuth::init(), 'validate_token'],
					'permission_callback' => '__return_true',
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/generate-onetime-number',
			[
				[
					'methods'             => 'POST',
					'callback'            => [$this, 'generate_onetime_number'],
					'permission_callback' => '__return_true',
				],
			]
		);
	}

	/**
	 * Generate the onetime number
	 */
	public function generate_onetime_number( WP_REST_Request $request ) {
		$result = JWTAuth::init()->validate_token( $request, 'user_id' );

		if ( is_numeric( $result ) ) {
			$link = OnetimeNumber::init()->get_shareable_link( $result );
			wp_send_json_success( $link );
		}

		wp_send_json_error( ['status' => $result] );
	}
}