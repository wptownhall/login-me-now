<?php
/**
 * Plugin Name: Login Me Now
 * Author URI: https://wptownhall.com/login-me-now/
 * Description: 1 click passwordless login, social login & user switching
 * Author: WPtownhall
 * Author URI: https://profiles.wordpress.org/wptownhall/
 * Version: 1.6.0
 * Tested up to: 6.5
 * Requires PHP: 7.4
 * License: GPLv2 or later
 * Text Domain: login-me-now
 * Domain Path: /languages
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * **********************************************************************
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include __DIR__ . '/vendor/autoload.php';

final class LoginMeNow {
	private static LoginMeNow $instance;

	public static function instance(): LoginMeNow {
		if ( empty( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public function load(): void {
		register_activation_hook(
			__FILE__, function () {
				new LoginMeNow\Setup\Activate( __FILE__ );
			}
		);

		register_deactivation_hook(
			__FILE__, function () {
				new LoginMeNow\Setup\Deactivate();
			}
		);

		$application = \LoginMeNow\Boot\App::instance();
		$application->boot( __FILE__, __DIR__ );

		add_action(
			'plugins_loaded', function () use ( $application ): void {

				do_action( 'before_login_me_now_load' );

				$application->load();

				do_action( 'after_login_me_now_load' );
			}
		);
	}
}

LoginMeNow::instance()->load();