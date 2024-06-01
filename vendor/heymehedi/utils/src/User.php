<?php
/**
 * @author  HeyMehedi
 * @since   1.0.0
 * @version 1.0.0
 */

namespace HeyMehedi\Utils;

class User {
	private static function includes() {
		if ( ! function_exists( 'get_userdata' ) ) {
			require_once ABSPATH . WPINC . '/pluggable.php';
		}
	}

	public static function data( int $user_id ) {
		self::includes();

		return get_userdata( $user_id );
	}

	public static function display_name( int $user_id ): string {
		$user_data = self::data( $user_id );

		if ( $user_data ) {
			if ( ! empty( $user_data->display_name ) ) {
				return $user_data->display_name;
			} elseif ( ! empty( $user_data->first_name ) ) {
				return $user_data->first_name;
			} else {
				return $user_data->user_login;
			}
		}

		return '';
	}
}