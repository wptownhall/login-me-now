<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Abstracts;

use LoginMeNow\Traits\Singleton;

abstract class ModelBase {
	use Singleton;

	abstract public function setup(): void;
}
