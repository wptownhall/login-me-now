<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\GoogleLogin;

use LoginMeNow\Abstracts\ModuleBase;
use LoginMeNow\GoogleLogin\Authenticate;
use LoginMeNow\GoogleLogin\Enqueuer;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class GoogleLogin extends ModuleBase {

	public function setup(): void {
		Enqueuer::init();
		Authenticate::init();
		LoginButton::init();
		OneTap::init();
		Profile::init();
	}
}