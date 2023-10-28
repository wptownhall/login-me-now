<?php
/**
 * @author  WPtownhall
 * @since   1.2.0
 * @version 1.2.0
 */

namespace LoginMeNow\Utils;

use LoginMeNow\Helper;
use LoginMeNow\Model\Settings;

class Logs {
	public static function add( int $user_id, string $message ): void {
		if ( ! function_exists( "SimpleLogger" ) ) {
			return;
		}

		if ( ! self::enabled() ) {
			return;
		}

		$ip                    = (string) Helper::get_ip_address();
		$user_info             = get_userdata( $user_id );
		$username              = $user_info->user_login;
		$context               = [];
		$context['_initiator'] = 'Login Me Now';

		SimpleLogger()->info( $username . ' ' . $message, $context );
	}

	private static function enabled(): bool {
		return Settings::init()->get( 'activity_logs', false );
	}
}