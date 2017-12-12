<?php

include 'PHPExcel/Classes/PHPExcel.php';
include 'upload.php';
include 'getBomData.php';
include 'getStock.php';

$uploadDir = '/tmp/';
function init()
{
    ini_set('display_errors', 'On');
    error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
}

function upload_check()
{
    $file = $GLOBALS['uploadDir'] . $_POST['name'];
    $res = new stdClass();
    if (file_exists($file)) {
        $res->errCode = 0;
        $res->msg = "File is valid, and was successfully uploaded.";
    } else {
        $res->errCode = 1;
        $res->msg = "File upload failed!.";
    }
//    print_r($_POST);
    print json_encode($res);
}

init();
$param = explode('/', $_SERVER['PHP_SELF']);
$api = $param[5];
if ($api == 'getStock') {
    getStock();
} else if ($api == 'upload') {
    upload();
} else if ($api == 'upload_check') {
    upload_check();
} else if ($api == 'getBomData') {
    getBomData();
}

?>

