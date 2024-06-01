<?php
/**
 * @author  WPtownhall
 * @since   1.5.0
 * @version 1.5.0
 */

namespace LoginMeNow\Common;

use LoginMeNow\Common\Singleton;

abstract class ProviderBase {
	use Singleton;
	abstract function boot();
}