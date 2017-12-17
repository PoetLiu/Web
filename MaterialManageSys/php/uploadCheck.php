<?php
/**
 * Created by PhpStorm.
 * User: liupeng
 * Date: 2017/12/12
 * Time: 21:45
 */

function uploadCheck()
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