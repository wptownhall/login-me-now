<?php
/**
 * Login Me Now Admin Ajax Base.
 *
 * @package Login Me Now
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\AdvanceSharing;

use LoginMeNow\Traits\AjaxCheck;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Ajax {
	use Singleton;
	use Hookable;
	use AjaxCheck;

	public function __construct() {
		$this->action( 'wp_ajax_login_me_now_advanced_sharing', 'login_me_now_advanced_sharing' );
	}

	public function login_me_now_advanced_sharing() {
		$error = $this->check_permissions( 'login_me_now_generate_token_nonce', 'manage_options' );
		if ( $error ) {
			wp_send_json_error( $error );
		}

		User::init()->create( $_POST );

		$message      = 'Success: Lorem imsisdf jkdhfjgasd ka jkadghkajsd klhdfgjklasdhf';
		$errorMessage = 'Failed: There was an error! sdlfkghsd;jfgh;sdfkjghlsdfjkghlsdfjkghsldfjghlsjdfghlsdfj';

		// wp_send_json_success( $message );
		wp_send_json_error( $errorMessage );
		wp_die();
	}
}