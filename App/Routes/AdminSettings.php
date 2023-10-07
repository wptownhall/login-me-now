<?php
/**
 * @author 	WPtownhall
 * @since	1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Routes;

use LoginMeNow\Abstracts\RouteBase;
use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;
use WP_REST_Server;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class AdminSettings extends RouteBase {
	use Singleton;
	use Hookable;

	public function register_routes(): void{
		register_rest_route(
			$this->namespace,
			'/admin/settings/',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [Settings::init(), 'get_all'],
					'permission_callback' => [$this, 'get_permissions_check'],
					'args'                => [],
				],
				'schema' => [$this, 'get_public_item_schema'],
			]
		);
	}
}