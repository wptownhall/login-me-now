<?php
/**
 * @author 	WPtownhall
 * @since	1.6.0
 * @version 1.6.0
 */

namespace LoginMeNow\Routes;

use LoginMeNow\Common\Hookable;
use LoginMeNow\Common\RouteBase;
use LoginMeNow\Common\Singleton;
use LoginMeNow\Repositories\SettingsRepository;
use WP_REST_Server;

class AdminSettings extends RouteBase {
	use Singleton;
	use Hookable;

	public function register_routes(): void {
		register_rest_route(
			$this->namespace,
			'/admin/settings/',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [SettingsRepository::class, 'get_all'],
					'permission_callback' => [$this, 'get_permissions_check'],
					'args'                => [],
				],
				'schema' => [$this, 'get_public_item_schema'],
			]
		);
	}
}