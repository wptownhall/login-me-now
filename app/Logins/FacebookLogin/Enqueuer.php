<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.6.0
 */

namespace LoginMeNow\Logins\FacebookLogin;

use LoginMeNow\Abstracts\EnqueuerBase;

class Enqueuer extends EnqueuerBase {

	public function __construct() {
		$this->action( 'wp_enqueue_scripts', [$this, 'load_sdk'], 50 );
		$this->action( 'login_enqueue_scripts', [$this, 'load_sdk'], 1 );
	}

	public function load_sdk() {
		wp_enqueue_script( 'login-me-now-facebook-sdk-js', '//connect.facebook.net/en_US/sdk.js' );
	}
}