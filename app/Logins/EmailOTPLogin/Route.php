<?php
/**
 * @author  Pluginly
 * @since   1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Logins\EmailOTPLogin;

use LoginMeNow\Common\RouteBase;
use LoginMeNow\Logins\EmailOTPLogin\Controller;

class Route extends RouteBase {
	private $endpoint = 'email-otp';

	public function register_routes(): void {
		$this->post( $this->endpoint . '/send', [Controller::class, 'send'] );
	}

	public function permission_check( \WP_REST_Request $request ) {
		return true;
	}
}