<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\AdvanceSharing;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Email {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->filter( 'wp_new_user_notification_email', 'wp_new_user_notification_email', 10, 2 );
	}

	public function send( int $user_id ): void {
		if ( ! $user_id ) {
			return;
		}

		wp_new_user_notification( $user_id, null, 'user' );
	}

	public function wp_new_user_notification_email( $wp_new_user_notification_email, $user_id ) {

		error_log( print_r( $wp_new_user_notification_email, true ) );

		return $wp_new_user_notification_email;
	}
}