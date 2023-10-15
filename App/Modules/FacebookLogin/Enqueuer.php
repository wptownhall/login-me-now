<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Abstracts\EnqueuerBase;
use LoginMeNow\Traits\Hookable;

/**
 * Assets Enqueuer
 */
class Enqueuer extends EnqueuerBase {
	use Hookable;

	public function __construct() {
		$this->action( 'wp_footer', 'load_sdk' );
	}

	public function load_sdk() {
		echo '<script defer src="https://connect.facebook.net/en_US/sdk.js"></script>';
	}
}