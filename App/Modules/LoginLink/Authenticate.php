<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\LoginLink;

use LoginMeNow\Helper;
use LoginMeNow\Model\Auth;
use LoginMeNow\Utils\Logs;
use LoginMeNow\Model\UserToken;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Authenticate {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'init', 'listen' );
	}

	public function listen(): void {
		if ( ! isset( $_GET['lmn-token'] ) ) {
			return;
		}

		if ( empty( $_GET['lmn-token'] ) ) {
			$title   = __( 'No Login Link Found', 'login-me-now' );
			$message = __( 'Request a new access link in order to obtain dashboard access', 'login-me-now' );
			Helper::get_template_part( 'messages/error', ['title' => $title, 'message' => $message] );
			exit();
		}

		$token   = sanitize_text_field( $_GET['lmn-token'] );
		$user_id = UserToken::init()->verify( $token );

		if ( ! $user_id ) {
			$title   = __( 'Invalid Login Link', 'login-me-now' );
			$message = __( 'Request a new access link in order to obtain dashboard access', 'login-me-now' );
			Helper::get_template_part( '/App/Admin/Views/messages/error', ['title' => $title, 'message' => $message] );
			exit();
		}

		$message = __( "Logged in using Login Link", 'login-me-now' );
		Logs::add( $user_id, $message );
		Auth::login( $user_id );
	}
}