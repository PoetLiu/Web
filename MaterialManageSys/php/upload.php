<?php
/**
 * Created by PhpStorm.
 * User: liupeng
 * Date: 2017/12/12
 * Time: 21:38
 */

function upload()
{
    $file = $GLOBALS['uploadDir'] . $_FILES['uploadFile']['name'];
    $res = new stdClass();

    if (move_uploaded_file($_FILES['uploadFile']['tmp_name'], $file)) {
        $res->errCode = 0;
        $res->msg = "File is valid, and was successfully uploaded.";
    } else {
        $res->errCode = 1;
        $res->msg = 'Possible file upload attack!';
    }
    print_r($_FILES);
    print json_encode($res);
}