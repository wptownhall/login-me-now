<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.6.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Admin\AdminMenu;
use LoginMeNow\Common\Singleton;

class Admin {
	use Singleton;

	public function __construct() {
		AdminMenu::init();
		Enqueuer::init();
	}
}