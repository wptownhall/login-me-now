<?php

use LoginMeNow\Utils\Translator;

$token = 'MSAxMzgyMzMwMzA2MDQ5ODM5IDE2OTI5MjE2MDAg';

$user_id    = 1;
$number     = 1382330306049839;
$expire     = 1692921600;
$translator = new Translator;

$encode = $translator::encode( $user_id, $number, $expire );
$decode = $translator::decode( $token );

if ( $token === $encode ) {
	echo '<pre>';
	print_r( 'WoW, it matched' );
	echo '</pre>';
} else {
	echo '<pre>';
	print_r( 'Ah, it not same' );
	echo '</pre>';
}

echo '<pre>';
print_r( $encode );
echo '</pre>';

echo '<pre>';
print_r( $decode );
echo '</pre>';

exit();
