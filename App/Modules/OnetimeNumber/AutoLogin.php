<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\OnetimeNumber;

use LoginMeNow\Helper;
use LoginMeNow\Model\Auth;
use LoginMeNow\Utils\Logs;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class AutoLogin {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'init', 'listen' );
	}

	public function listen(): void {
		if ( ! isset( $_GET['lmn'] ) ) {
			return;
		}

		if ( empty( $_GET['lmn'] ) ) {
			$title   = __( 'Number Not Provided', 'login-me-now' );
			$message = __( 'Request a new access link in order to obtain dashboard access', 'login-me-now' );
			Helper::get_template_part( 'messages/error', ['title' => $title, 'message' => $message] );
			exit();
		}

		/** First thing, check the secret number if not exist return an error*/
		$number  = sanitize_text_field( $_GET['lmn'] );
		$t_value = get_transient( $number );
		if ( ! $t_value ) {
			$title   = __( 'Invalid number', 'login-me-now' );
			$message = __( 'Request a new access link in order to obtain dashboard access', 'login-me-now' );
			Helper::get_template_part( '/App/Admin/Views/messages/error', ['title' => $title, 'message' => $message] );
			exit();
		}

		$user_id = ! empty( $t_value ) ? $t_value : false;
		if ( ! $user_id ) {
			$title   = __( 'User not found', 'login-me-now' );
			$message = __( 'Request a new access link in order to obtain dashboard access', 'login-me-now' );
			Helper::get_template_part( '/App/Admin/Views/messages/error', ['title' => $title, 'message' => $message] );
			exit();
		}

		delete_transient( $number );

		$message = __( "Logged in using Browser Extension", 'login-me-now' );

		Logs::add( $user_id, $message );

		Auth::login( $user_id );
	}
}