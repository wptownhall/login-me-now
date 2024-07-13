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

	public string $redirect_uri;
	public function __construct() {
		$this->redirect_uri = admin_url();
	}

	public function send_otp( WP_REST_Request $request ) {
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
		if ( ! isset( $wp_user->ID ) ) {
			return Response::error(
				'errors_before_email_otp_create',
				'user_not_found',
				'email_otp_send',
				422
			);
		}

		try {
			return Response::success(
				( new Repository( $wp_user->ID ) )->send_otp()
			);

		} catch ( \Throwable $th ) {
			return Response::error(
				'errors_before_email_otp_send',
				$th->getMessage(),
				__FUNCTION__,
				$th->getCode()
			);
		}
	}

	public function verify_otp( WP_REST_Request $request ) {
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
		if ( ! isset( $wp_user->ID ) ) {
			return Response::error(
				'errors_before_email_otp_verify',
				'user_not_found',
				'email_otp_verify',
				422
			);
		}

		try {
			return Response::success(
				( new Repository( $wp_user->ID ) )->verify_otp( sanitize_text_field( $code ) )
			);

		} catch ( \Throwable $th ) {
			return Response::error(
				'errors_before_email_otp_verify',
				$th->getMessage(),
				__FUNCTION__,
				$th->getCode()
			);
		}
	}

	public function listen(): void {
		if ( ! array_key_exists( 'lmn-email-otp-popup', $_GET ) ) {
			return;
		}

		if ( is_user_logged_in() ) {
			do_action( 'login_me_now_popup_authenticate_redirection', $this->redirect_uri );
		}

		include_once 'Views/PopupForm.php';
		exit();
	}
}