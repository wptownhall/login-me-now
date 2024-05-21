<?php
/**
 * @author  WPtownhall
 * @since   1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Logins\BrowserTokenLogin;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\Module;

/**
 * The Login Link Handling Class
 */
class BrowserTokenLogin {
	use Singleton;
	use Hookable;

	public function __construct() {
		if ( ! Module::is_active( 'browser_extension', true ) ) {
			return;
		}

		$this->action( 'admin_footer', [$this, 'lmn_save_popup'] );

		REST::init();
		Ajax::init();
		AutoLogin::init();
	}

	public function lmn_save_popup(): void {
		include_once __DIR__ . '/Views/extension-popup.php';
	}
}