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
		$email = $request->get_param( 'email' );
		if ( empty( $email ) ) {
			return Response::error(
				'errors_before_email_otp_create',
				'email_required',
				'email_otp_send',
				422
			);
		}

		$wp_user = get_user_by( 'email', sanitize_email( $email ) );

		try {
			return Response::success(
				( new Repository() )->send_otp( $wp_user->ID )
			);

		} catch ( \Throwable $th ) {
			Response::error( 'login_me_now_generate_otp_error', $th->getMessage() );
		}
	}

	public function verify( WP_REST_Request $request ) {
		$email = $request->get_param( 'email' );
		if ( empty( $email ) ) {
			return Response::error(
				'errors_before_email_otp_verify',
				'email_required',
				'email_otp_verify',
				422
			);
		}

		$code = $request->get_param( 'code' );
		if ( empty( $code ) ) {
			return Response::error(
				'errors_before_code_otp_verify',
				'code_required',
				'email_otp_verify',
				422
			);
		}

		$wp_user = get_user_by( 'email', sanitize_email( $email ) );

		try {
			return Response::success(
				( new Repository() )->verify_otp( $wp_user->ID, $code )
			);

		} catch ( \Throwable $th ) {
			Response::error( 'login_me_now_generate_otp_error', $th->getMessage() );
		}
	}
}