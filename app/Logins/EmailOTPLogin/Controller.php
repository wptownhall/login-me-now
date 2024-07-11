<?php
/**
 * @author  Pluginly
 * @since  	1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Logins\EmailOTPLogin;

use LoginMeNow\Utils\Response;
use WP_REST_Request;

class Controller {

	public function send( WP_REST_Request $request ) {
		// $nonce = $request->get_param( 'send_otp_nonce' );
		// if ( ! wp_verify_nonce( $nonce, 'send_otp_nonce' ) ) {
		// 	return Response::error(
		// 		'login_me_now_invalid_nonce',
		// 		__( 'Invalid nonce', 'login-me-now' ),
		// 		'send_otp_nonce',
		// 		403
		// 	);
		// }

		$email = $request->get_param( 'email' );
		if ( empty( $email ) ) {
			return Response::error(
				'login_errors_before_email_otp_create',
				'email_required',
				'send_otp_nonce',
				422
			);
		}

		$wp_user = get_user_by( 'email', sanitize_email( $email ) );
		$length  = 6;

		try {
			return Response::success(
				( new Repository() )->send_otp( $wp_user->ID, $length )
			);

		} catch ( \Throwable $th ) {
			Response::error( 'login_me_now_generate_otp_error', $th->getMessage() );
		}
	}
}