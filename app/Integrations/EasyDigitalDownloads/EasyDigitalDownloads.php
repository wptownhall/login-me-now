<?php
/**
 * @author 	Pluginly
 * @since	1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Integrations\EasyDigitalDownloads;

use LoginMeNow\Common\IntegrationBase;
use LoginMeNow\Providers\LoginFormsServiceProvider;

class EasyDigitalDownloads extends IntegrationBase {
	public function boot(): void {
		add_action( 'edd_login_fields_after', [$this, 'add_form'] );
	}

	public function add_form() {
		( new LoginFormsServiceProvider() )->login_buttons( false, true, false );
	}
}