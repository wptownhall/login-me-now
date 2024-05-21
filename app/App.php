<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.6.0
 */

namespace LoginMeNow;

use LoginMeNow\Admin\Admin;
use LoginMeNow\Providers\IntegrationsServiceProvider;
use LoginMeNow\Providers\LoginsServiceProvider;
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
		Enqueuer::init();

		LoginsServiceProvider::init()->boot();
		IntegrationsServiceProvider::init()->boot();
	}
}