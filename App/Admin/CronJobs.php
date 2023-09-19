<?php
/**
 * Login Me Now CRON Jobs Base.
 *
 * @package Login Me Now
 * @since 1.0.0
 */

namespace LoginMeNow\Admin;

use LoginMeNow\Model\Logs;
use LoginMeNow\Model\Settings;
use LoginMeNow\Traits\Hookable;
use LoginMeNow\Traits\Singleton;
use LoginMeNow\Utils\Time;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class CRONJobs {
	use Singleton;
	use Hookable;

	public function __construct() {
		$this->action( 'admin_init', 'create_purge_cron' );
		$this->action( 'login-me-now-purge-old-records', 'purge_old_records' );
	}

	public function create_purge_cron(): void {
		if ( ! wp_next_scheduled( 'login-me-now-purge-old-records' ) ) {
			wp_schedule_event( Time::now() + 60, 'hourly', 'login-me-now-purge-old-records' );
		}
	}

	public function purge_old_records( int $days_old ): void {
		if ( empty( $days_old ) ) {
			$days_old = Settings::init()->get( 'logs_expiration', 7 );
		}

		$days_old = absint( $days_old );
		if ( empty( $days_old ) ) {
			return;
		}

		Logs::init()->purge( $days_old );
	}
}