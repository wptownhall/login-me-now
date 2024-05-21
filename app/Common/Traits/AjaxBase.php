<?php
/**
 * @author  wpWax
 * @since   1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Abstracts;

use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

abstract class AjaxBase {
	use Hookable;
	use Singleton;
}