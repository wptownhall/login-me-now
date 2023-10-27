<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.2.0
 */

namespace LoginMeNow\BrowserToken;

use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\Module;

/**
 * The Login Link Handling Class
 */
class BrowserToken {
	use Singleton;

	public function __construct() {
		if ( ! Module::is_active( 'browser_extension', true ) ) {
			return;
		}

		REST::init();
		Ajax::init();
	}
}