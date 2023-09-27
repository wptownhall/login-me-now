<?php
/**
 * @author  HalalBrains
 * @since   1.1.0
 * @version 1.1.0
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
		$this->action( 'wp_enqueue_scripts', 'enqueue_scripts', 50 );
		$this->action( 'login_enqueue_scripts', 'enqueue_scripts', 1 );
	}

	public function enqueue_scripts() {
		wp_register_script(
			'login-me-now-facebook-button-sdk',
			'https://connect.facebook.net/en_US/sdk.js',
			['jquery']
		);
		wp_register_script(
			'login-me-now-facebook-button-config',
			LOGIN_ME_NOW_APP_URL . '/Modules/FacebookLogin/js/button.js',
			['login-me-now-facebook-button-sdk']
		);
	}
}