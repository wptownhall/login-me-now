<?php
/**
 * @author  HalalBrains
 * @since   1.1.0
 * @version 1.1.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Shortcodes {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'init', 'shortcodes' );
	}

	public function shortcodes(): void {
		add_shortcode( 'login_me_now_facebook_button', [$this, 'login_button'] );
	}

	public function login_button() {
		return ( new Button )->html();
	}
}