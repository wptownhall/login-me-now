<?php
/**
 * @author  WPtownhall
 * @since   1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Abstracts;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

abstract class LoginBase {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->setup();
	}

	abstract public function setup(): void;
	abstract public static function show(): bool;
}
