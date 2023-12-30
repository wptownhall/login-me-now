<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.2.0
 */

namespace LoginMeNow\BrowserToken;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\Module;

/**
 * The Login Link Handling Class
 */
class BrowserToken {
	use Singleton;
	use Hookable;

	public function __construct() {
		if ( ! Module::is_active( 'browser_extension', true ) ) {
			return;
		}

		$this->action( 'admin_footer', 'lmn_save_popup' );

		REST::init();
		Ajax::init();
	}

	public function lmn_save_popup(): void {
		include_once LOGIN_ME_NOW_MODULES . '/BrowserToken/Views/extension-popup.php';
	}
}