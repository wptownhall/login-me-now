<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.4.0
 */

namespace LoginMeNow;

use LoginMeNow\Admin\Admin;
use LoginMeNow\BrowserToken\BrowserToken;
use LoginMeNow\FacebookLogin\FacebookLogin;
use LoginMeNow\GoogleLogin\GoogleLogin;
use LoginMeNow\LoginForm\LoginForm;
use LoginMeNow\LoginLink\LoginLink;
use LoginMeNow\OnetimeNumber\AutoLogin;
use LoginMeNow\Routes\AdminSettings;
use LoginMeNow\Routes\Ajax;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class App {

	public function __construct() {
		$this->setup();
	}

	public function setup(): void {
		Admin::init();

		/**
		 *  Routes Initialize
		 */
		AdminSettings::init();
		Ajax::init();
		AutoLogin::init();

		/**
		 *  Modules Initialize
		 */
		AutoLogin::init();
		// GoogleLogin::init();
		LoginLink::init();
		BrowserToken::init();
		FacebookLogin::init();
		LoginForm::init();

		/**
		 *  Third-party Modules
		 */
		include_once LOGIN_ME_NOW_MODULES . '/UserSwitching/UserSwitching.php';
	}
}