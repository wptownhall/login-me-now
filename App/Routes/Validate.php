<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Routes;

defined( 'ABSPATH' ) || exit;

use LoginMeNow\Abstracts\RouteBase;
use LoginMeNow\BrowserToken\JWTAuth;

/**
 * Validate API class.
 */
class Validate extends RouteBase {
	public function register_routes(): void{
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
	}
}