<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow;

use LoginMeNow\Admin\Admin;
use LoginMeNow\BrowserToken\BrowserToken;
use LoginMeNow\GoogleLogin\GoogleLogin;
use LoginMeNow\LoginLink\LoginLink;
use LoginMeNow\OnetimeNumber\AutoLogin;
use LoginMeNow\Routes\AdminSettings;
use LoginMeNow\Routes\Ajax;
use LoginMeNow\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class App {
	use Singleton;

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
		GoogleLogin::init();
		LoginLink::init();
		BrowserToken::init();

		/**
		 *  Third-party Modules
		 */
		include_once LOGIN_ME_NOW_MODULES . '/UserSwitching/UserSwitching.php';
	}
}