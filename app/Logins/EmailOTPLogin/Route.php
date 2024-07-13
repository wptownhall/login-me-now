<?php
/**
 * @author  Pluginly
 * @since   1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Logins\EmailOTPLogin;

use LoginMeNow\Common\Hookable;
use LoginMeNow\Common\RouteBase;
use LoginMeNow\Logins\EmailOTPLogin\Controller;

class Route extends RouteBase {
	use Hookable;
	private string $endpoint = 'email-otp';

	public function __construct() {
		$this->action( 'init', [Controller::class, 'listen'] );
		parent::__construct();
	}

	public function register_routes(): void {
		$this->post( $this->endpoint . '/send', [Controller::class, 'send_otp'] );
		$this->post( $this->endpoint . '/verify', [Controller::class, 'verify_otp'] );
	}

	public function permission_check( \WP_REST_Request $request ) {
		$this->request = $request;

		if ( 'development' === \LoginMeNow\Utils\Config::get( 'environment' ) ) {
			return true;
		}

		/**
		 * Nonce checkup
		 */
		$nonce = $request->get_param( 'email_otp_nonce' );
		if ( ! wp_verify_nonce( $nonce, 'email_otp_nonce' ) ) {
			return \LoginMeNow\Utils\Response::error(
				'login_me_now_invalid_nonce',
				__( 'Invalid nonce', 'login-me-now' ),
				'email_otp_nonce',
				403
			);
		}

		return true;
	}
}