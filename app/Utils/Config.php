<?php
/**
 * @author  Pluginly
 * @since   1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Utils;

class Config {

	private static array $file_data = [];

	public static function get( string $key ): string {
		if ( ! self::$file_data ) {
			self::file();
		}

		return self::$file_data[$key] ?? '';
	}

	private static function file(): void {
		$path = __DIR__ . '/../../';
		$prod = $path . '/dynamic-utils.config.php';
		$dev  = $path . "/dynamic-utils.config.dev.php";

		if ( ! \file_exists( $prod ) ) {
			return;
		}

		self::$file_data = ( require_once $prod );
		if ( \file_exists( $dev ) ) {
			self::$file_data = ( require_once $dev );
		}
	}
}