<?php

use LoginMeNow\Utils\Time;

$expired = Time::expired( 1693043855 - 1000 );
echo '<pre>';
var_dump( $expired );
print_r( 'Is expired: ' . ( $expired ? 'Yes' : 'No' ) );
echo '</pre>';

$now = Time::now();
echo '<pre>';
print_r( 'Now: ' . $now );
echo '</pre>';

$zone = Time::zone();
echo '<pre>';
print_r( 'Zone: ' . $zone );
echo '</pre>';

exit();
