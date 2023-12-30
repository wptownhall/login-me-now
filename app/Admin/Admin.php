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

class Admin {
	use Singleton;
	use Hookable;

	public function __construct() {
		AdminMenu::init();
		Enqueuer::init();
		AfterActivation::init();

		$this->filter( 'simple_history/row_sender_image_output', 'add_simple_history_image', 10, 2 );
	}

	public function add_simple_history_image( $sender_image_html, $row ) {
		if ( 'Login Me Now' === $row->initiator ) {
			return "<img height='32px' width = '32px' alt='LoginMeNow' src='" . LOGIN_ME_NOW_ADMIN_URL . "/Assets/images/icon.svg' >";
		}

		return $sender_image_html;
	}
}