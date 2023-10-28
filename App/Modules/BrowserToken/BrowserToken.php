<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\BrowserToken;

use LoginMeNow\Traits\Singleton;

/**
 * The Login Link Handling Class
 */
class BrowserToken {
	use Singleton;

	public function __construct() {
		Ajax::init();
	}
}