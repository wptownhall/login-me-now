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
	}

	public function insert( int $user_id, string $message ): void{
		$ip = (string) Helper::get_ip_address();
		if ( function_exists("SimpleLogger") ) {
		    SimpleLogger()->info( $user_id . ' With IP ' . $ip . ' ' .$message );
		}
	}
}