<?php
/**
 * @author  WPtownhall
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\Model;

use LoginMeNow\Helper;
use LoginMeNow\Traits\Singleton;

class Logs {
	use Singleton;

	private $wpdb;
	private $table;

	public function __construct() {
		global $wpdb;
		$this->wpdb  = $wpdb;
		$this->table = $wpdb->prefix . 'login_me_now_logs';
	}

	public function create_table(): void{
		$collate = '';

		if ( $this->wpdb->has_cap( 'collation' ) ) {
			if ( ! empty( $this->wpdb->charset ) ) {
				$collate .= "DEFAULT CHARACTER SET {$this->wpdb->charset}";
			}

			if ( ! empty( $this->wpdb->collate ) ) {
				$collate .= " COLLATE {$this->wpdb->collate}";
			}
		}

		$table_schema = "CREATE TABLE IF NOT EXISTS {$this->table} (
            `id` bigint(20) NOT NULL AUTO_INCREMENT,
            `user_id` bigint(20) NOT NULL,
            `ip` varchar(260) DEFAULT NULL,
            `message` varchar(260) DEFAULT NULL,
            `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`),
            KEY `user_id` (`user_id`)
        ) ENGINE=InnoDB {$collate};";

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		dbDelta( $table_schema );
	}

	public function insert( int $user_id, string $message ): void{
		$ip 					= (string) Helper::get_ip_address();
		$context 				= [];
		$context['_initiator'] 	= 'Log In Me Now';
		
		if ( function_exists("SimpleLogger") ) {
		    SimpleLogger()->log( 'info', 'User With IP ' . $ip . ' ' .$message, $context );
		}
	}

	public function purge( int $days_old ): void{
		$seven_days_ago = date( 'Y-m-d H:i:s', strtotime( "-$days_old days" ) );

		$this->wpdb->query(
			$this->wpdb->prepare(
				"DELETE FROM {$this->table} WHERE created_at < %s",
				$seven_days_ago
			)
		);
	}

	public function get_all( int $offset = 0, int $limit = 10 ): array{
		global $wpdb;
		$table = $wpdb->prefix . $this->table;

		$sql = $wpdb->prepare(
			"SELECT * FROM {$table}
			ORDER BY id DESC
			LIMIT %d OFFSET %d",
			$limit,
			$offset
		);

		$result = $wpdb->get_results( $sql );

		return $result;
	}
}