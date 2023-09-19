<?php
/**
 * @author  HalalBrains
 * @since   1.0.0
 * @version 1.0.0
 */

namespace LoginMeNow\AdvanceSharing;

use LoginMeNow\Abstracts\ModuleBase;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AdvanceSharing extends ModuleBase {
	public function setup(): void{
		Ajax::init();
		Email::init();
	}
}