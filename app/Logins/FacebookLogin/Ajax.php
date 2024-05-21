<?php
/**
 * @author  WPtownhall
 * @since  	1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Logins\FacebookLogin;

use LoginMeNow\Traits\Hookable;

class Ajax {
	use Hookable;

	public function __construct() {
		$this->action( 'wp_ajax_nopriv_login_me_now_facebook_login', [Controller::class, 'facebook_login'] );
	}
}