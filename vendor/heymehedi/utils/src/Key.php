<?php
/**
 * @author  HeyMehedi
 * @since   1.0.0
 * @version 1.0.0
 */

namespace HeyMehedi\Utils;

class Key {
	public static function get( string $key ): string {
		return sprintf( '%s%s', self::prefix(), trim( $key ) );
	}

	public static function prefix(): string {
		return sprintf( '%s%s%s', Config::get( 'key_prefix' ), Config::get( 'project_key', 'hm_utils' ), Config::get( 'key_suffix' ) );
	}
}