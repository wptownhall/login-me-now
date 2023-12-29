<?php
/**
 * @author  HeyMehedi
 * @since   1.0.0
 * @version 1.0.0
 */

namespace HeyMehedi\Utils;

class Config {

	private static array $file_data = [];

	public static function get( string $key ): string {
		if ( ! self::$file_data ) {
			self::file();
		}

		return self::$file_data[$key] ?? self::default( $key );
	}

	private static function file(): void {
		$path = __DIR__ . '/../../../..';
		$file = $path . '/dynamic-utils.config.php';

		if ( ! file_exists( $file ) ) {
			return;
		}

		self::$file_data = require_once $file;
	}

	private static function default( string $key ): string {
		$arr = [
			'project_key' => 'dynamic_project',
			'key_prefix'  => '_',
			'key_suffix'  => '_',
		];

		return $arr[$key] ?? '';
	}
}