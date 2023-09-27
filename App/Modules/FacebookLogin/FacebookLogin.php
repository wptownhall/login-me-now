<?php
/**
 * @author  HalalBrains
 * @since   1.1.0
 * @version 1.1.0
 */

namespace LoginMeNow\FacebookLogin;

use LoginMeNow\Abstracts\ModuleBase;
use LoginMeNow\Traits\Singleton;

class FacebookLogin extends ModuleBase {
	use Singleton;

	public function setup(): void {
		Enqueuer::init();
		Authenticate::init();
		Shortcodes::init();
	}
}