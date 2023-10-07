<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Abstracts\ModuleBase;
use LoginMeNow\FacebookLogin\Authenticate;
use LoginMeNow\FacebookLogin\Enqueuer;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class FacebookLogin extends ModuleBase {

	public function setup(): void{
		Enqueuer::init();
		// Authenticate::init();
		// Button::init();
		// OneTap::init();
	}
}