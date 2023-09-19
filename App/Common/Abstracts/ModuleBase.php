<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Abstracts;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

abstract class ModuleBase {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->setup();
	}

	abstract public function setup(): void;
}
