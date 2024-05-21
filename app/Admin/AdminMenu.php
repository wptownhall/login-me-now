<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.6.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Admin\LogsListTable;
use LoginMeNow\Admin\TokensListTable;
use LoginMeNow\Helper;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;

/**
 * Administration Menu Class
 */
class AdminMenu {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'admin_menu', [$this, 'admin_menu'] );
	}

	public function admin_menu(): void {
		$login_me_now_icon = apply_filters( 'menu_icon', 'dashicons-admin-generic' );

		if ( ! current_user_can( LOGIN_ME_NOW_MENU_CAPABILITY ) ) {
			return;
		}

		add_menu_page(
			__( 'Login Me Now', 'login-me-now' ),
			apply_filters( 'login_me_now_title', 'Login Me Now' ),
			LOGIN_ME_NOW_MENU_CAPABILITY,
			LOGIN_ME_NOW_MENU_SLUG,
			[$this, 'render_admin_dashboard'],
			$login_me_now_icon,
		);

		// add_submenu_page(
		// 	LOGIN_ME_NOW_MENU_SLUG,
		// 	__( 'Dashboard', 'login-me-now' ),
		// 	__( 'Dashboard', 'login-me-now' ),
		// 	LOGIN_ME_NOW_MENU_CAPABILITY,
		// 	LOGIN_ME_NOW_MENU_SLUG,
		// 	[$this, 'render_admin_dashboard'],
		// );

		// add_submenu_page(
		// 	LOGIN_ME_NOW_MENU_SLUG,
		// 	__( 'Advance Sharing', 'login-me-now' ),
		// 	__( 'Advance Sharing', 'login-me-now' ),
		// 	LOGIN_ME_NOW_MENU_CAPABILITY,
		// 	LOGIN_ME_NOW_MENU_SLUG . '-advance-sharing',
		// 	[$this, 'settings'],
		// );

		// add_submenu_page(
		// 	LOGIN_ME_NOW_MENU_SLUG,
		// 	__( 'Browsers', 'login-me-now' ),
		// 	__( 'Browsers', 'login-me-now' ),
		// 	LOGIN_ME_NOW_MENU_CAPABILITY,
		// 	LOGIN_ME_NOW_MENU_SLUG . '-browser-extensions',
		// 	[$this, 'render_admin_dashboard'],
		// );

		// add_submenu_page(
		// 	LOGIN_ME_NOW_MENU_SLUG,
		// 	__( 'Settings', 'login-me-now' ),
		// 	__( 'Settings', 'login-me-now' ),
		// 	LOGIN_ME_NOW_MENU_CAPABILITY,
		// 	LOGIN_ME_NOW_MENU_SLUG . '-settings',
		// 	[$this, 'settings'],
		// );

		// add_submenu_page(
		// 	LOGIN_ME_NOW_MENU_SLUG,
		// 	__( 'Logs', 'login-me-now' ),
		// 	__( 'Logs', 'login-me-now' ),
		// 	LOGIN_ME_NOW_MENU_CAPABILITY,
		// 	LOGIN_ME_NOW_MENU_SLUG . '-logs',
		// 	[$this, 'logs_callback']
		// );

		// Rewrite the menu item.
		// global $submenu;
		// $submenu[LOGIN_ME_NOW_MENU_SLUG][1][2] = 'admin.php?page=login-me-now&path=browser-extensions';
		// $submenu[LOGIN_ME_NOW_MENU_SLUG][2][2] = 'admin.php?page=login-me-now&path=settings';
	}

	/**
	 * Render Tokens
	 */
	public function tokens_callback(): void {
		Helper::get_template_part( '/app/Admin/Views/menu-page/token-status', new TokensListTable );
	}

	/**
	 * Render Logs
	 */
	public function logs_callback(): void {
		Helper::get_template_part( '/app/Admin/Views/menu-page/all-logs', new LogsListTable );
	}

	/**
	 * Renders the admin settings.
	 */
	public function render_admin_dashboard(): void {
		$page_action = '';

		if ( isset( $_GET['action'] ) ) { //phpcs:ignore
			/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$page_action = sanitize_text_field( wp_unslash( $_GET['action'] ) ); //phpcs:ignore
			/** @psalm-suppress PossiblyInvalidArgument */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$page_action = str_replace( '_', '-', $page_action );
		}

		/** @psalm-suppress MissingFile */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
		include_once LOGIN_ME_NOW_ADMIN_PATH . '/Views/base.php';
		/** @psalm-suppress MissingFile */// phpcs:ignore Generic.Commenting.DocComment.MissingShort
	}
}