<?php
/**
 * @author  WPtownhall
 * @since  	1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Logins\GoogleLogin;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Route {
	use Hookable;
	use Singleton;

	public function __construct() {
		$this->action( 'init', [Controller::class, 'listen'] );
	}
}