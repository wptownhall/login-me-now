<?php
/**
 * @author 	Pluginly
 * @since	1.7.0
 * @version 1.7.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Repositories\SettingsRepository;

class Route extends \LoginMeNow\Common\RouteBase {
	private $endpoint = 'admin';

	public function register_routes(): void {
		$this->get( $this->endpoint . '/settings', [SettingsRepository::class, 'all'] );
	}
}