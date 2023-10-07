<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Admin\AdminMenu;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

class Admin {
	use Singleton;
	use Hookable;

	public function __construct() {
		AdminMenu::init();
		Enqueuer::init();
		AfterActivation::init();

		$this->action( 'admin_footer', 'lmn_save_popup' );
	}

	public function lmn_save_popup(): void {
		include_once LOGIN_ME_NOW_ADMIN_PATH . '/Views/extension-popup.php';
	}
}