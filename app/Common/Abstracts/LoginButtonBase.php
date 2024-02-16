<?php
/**
 * @author  WPtownhall
 * @since   1.4.0
 * @version 1.4.0
 */

namespace LoginMeNow\Abstracts;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

abstract class LoginButtonBase {
	use Singleton;
	use Hookable;

	abstract public function button(): string;
	abstract public function html( int $width = 300 ): string;
	abstract public function shortcodes(): void;
	abstract public function native_login(): bool;

	public function __construct() {
		$this->action( 'init', 'shortcodes' );
	}
}
