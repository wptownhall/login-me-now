<?php

use LoginMeNow\BrowserToken\JWTAuth;

$Auth     = new JWTAuth();
$request  = new WP_REST_Request( 'POST', '', ['token' => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiaWF0IjoxNjkxNjAwNTQ4LCJuYmYiOjE2OTE2MDA1NDgsImV4cCI6MTY5MjM5OTcyMCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9LCJ0aWQiOjgzNjE4MDQxNTc4MDcwNzN9fQ.oaP1fiT3SJRF13BPtmigsFkoNYZ1YoHefQIClF-ReYI'] );
$validate = $Auth->validate_token( $request, 'data' );

echo '<pre>';
print_r( $validate );
echo '</pre>';

exit();