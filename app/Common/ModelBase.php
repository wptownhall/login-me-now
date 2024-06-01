<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Common;

use LoginMeNow\Common\Singleton;

abstract class ModelBase {
	use Singleton;

	abstract public function setup(): void;
}
