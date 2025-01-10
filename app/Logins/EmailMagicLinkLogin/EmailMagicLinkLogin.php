<?php
/**
 * @author  Pluginly
 * @since   1.8
 * @version 1.8
 */

namespace LoginMeNow\Logins\EmailMagicLinkLogin;

use LoginMeNow\Common\ModuleBase;
use LoginMeNow\Repositories\SettingsRepository;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class EmailMagicLinkLogin extends ModuleBase {

	public function setup(): void {
		( new Settings() );

		if ( ! self::show() ) {
			return;
		}

		( new Route() );
		( new Button() );
		( new Route() );
	}

	public static function show(): bool {
		$enable = SettingsRepository::get( 'email_magic_link_login', true );

		if ( $enable ) {
			return true;
		}

		return false;
	}

	public static function show_on_native_login() {
		return self::show() && SettingsRepository::get( 'email_magic_link_native_login', true );
	}
}