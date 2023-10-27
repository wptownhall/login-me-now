<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Admin\AdminMenu;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\Module;

class Admin {
	use Singleton;
	use Hookable;

	public function __construct() {
		AdminMenu::init();
		Enqueuer::init();
		AfterActivation::init();

		$this->filter( 'simple_history/row_sender_image_output', 'change_image', 10, 2 );
	}


	public function change_image( $html, $row ) {
		if ( 'Login Me Now' === $row->initiator ) {
			return '<img src ="' . LOGIN_ME_NOW_ADMIN_URL . '/Assets/images/sidebar.svg" height="32px" width="32px" />';
		}

		return $html;
	}
}