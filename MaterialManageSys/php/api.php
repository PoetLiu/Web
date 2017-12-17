<?php

include 'PHPExcel/Classes/PHPExcel.php';
include 'upload.php';
include 'getBomData.php';
include 'getStock.php';
include 'uploadCheck.php';

$uploadDir = '/tmp/';
function init()
{
    ini_set('display_errors', 'On');
    error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
}

init();
$param = explode('/', $_SERVER['PHP_SELF']);
$api = $param[5];
if ($api == 'getStock') {
    getStock();
} else if ($api == 'upload') {
    upload();
} else if ($api == 'uploadCheck') {
    uploadCheck();
} else if ($api == 'getBomData') {
    getBomData();
}

?>

