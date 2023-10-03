<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Model;

use LoginMeNow\Helper;
use LoginMeNow\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Settings {
	use Singleton;

	private static string $option_name = 'login_me_now_admin_settings';
	private static array $settings;

	public function __construct() {
		self::$settings = get_option( self::$option_name, [] );
	}

	public function get_all(): array {
		$db_option = get_option( self::$option_name, [] );

		$defaults = apply_filters(
			'login_me_now_dashboard_rest_options',
			[
				'logs'                             => true,
				'logs_expiration'                  => 7,

				'user_switching'                   => true,

				'google_login'                     => false,
				'google_client_id'                 => '',
				'google_native_login'              => true,
				'google_update_existing_user_data' => false,
				'google_pro_user_avatar'           => false,
				'google_cancel_on_tap_outside'     => false,
				'google_onetap_display_location'   => 'siteWide',

				'get_user_roles'                   => Helper::get_user_roles(),
				'get_pages'                        => Helper::get_pages(), // #Improvement Needed
			]
		);

		$updated_option = wp_parse_args( $db_option, $defaults );

		return $updated_option;
	}

	public function get( string $key, $default = null ) {
		self::$settings = get_option( self::$option_name, [] );

		return self::$settings[$key] ?? $default;
	}

	public function update( string $key, $value ): void {
		self::$settings       = get_option( self::$option_name, [] );
		self::$settings[$key] = $value;
		update_option( self::$option_name, self::$settings );
	}
}