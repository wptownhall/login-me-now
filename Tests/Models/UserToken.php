<?php

use LoginMeNow\Model\UserToken;
use LoginMeNow\Utils\Random;
use LoginMeNow\Utils\Time;

$user_id = 1;
$random  = new Random();
$now     = Time::now();

$meta_data = [
	'number'     => $random->number(),
	'expire'     => $now + 3600,
	'created_at' => $now,
	'created_by' => $user_id,
];

$userToken = new UserToken();

if ( ! function_exists( 'get_userdata' ) ) {
	require_once ABSPATH . WPINC . '/pluggable.php';
}

/**
 * Insert a token
 */
// $loginUrl = $userToken->insert( $user_id, $meta_data );
// echo $loginUrl;

/**
 * Check whether token number is valid or not
 */
// $number   = 4419568198507796;
// $is_valid = $userToken->is_valid( $user_id, $number );
// echo $is_valid ? 'Valid Token ' : 'Token is not valid ';
// echo '<br>';
// var_dump( $is_valid );

/**
 * Check whether token verified or not
 */
// $is_verified = $userToken->verify( 'MSA0NDE5NTY4MTk4NTA3Nzk2IDE2OTEwMjA4MDAg' );
// echo $is_verified ? 'Verified Token ' : 'Token not verified';
// echo '<br>';
// var_dump( $is_verified );
// exit();

/**
 * Get all tokens
 */
// $all_tokens = $userToken->get_all( 10, 50 );
// echo '<pre>';
// print_r( $all_tokens );
// echo '</pre>';

/**
 * Get a single meta
 */
// $single_meta = $userToken->get( 695 );
// echo '<pre>';
// print_r( $single_meta );
// echo '</pre>';

/**
 * Update status
 */
// $status = $userToken->update_status( 686, 'active' );
// echo '<pre>';
// print_r( $status );
// echo '</pre>';

/**
 * Delete token
 */
// $deleted = $userToken->drop( 688 );
// echo $deleted ? 'Deleted!' : 'Not Deleted';

// exit();