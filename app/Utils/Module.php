<?php
/**
 * @author  WPtownhall
 * @since   1.2.0
 * @version 1.2.0
 */

namespace LoginMeNow\Utils;

use LoginMeNow\Model\Settings;

class Module {
	public static function is_active( string $key, bool $default = false ): bool {
		return Settings::init()->get( $key, $default );
	}
}