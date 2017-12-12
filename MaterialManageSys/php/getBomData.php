<?php
/**
 * Created by PhpStorm.
 * User: liupeng
 * Date: 2017/12/12
 * Time: 21:42
 */

function getBomData()
{
    $file = $GLOBALS['uploadDir'] . $_POST['name'];
    $res = new stdClass();

    if (!file_exists($file)) {
        $res->errCode = 1;
        $res->msg = "File doesn't exist!.";
        goto ret;
    }

    try {
        $inputFileType = PHPExcel_IOFactory::identify($file);
        $objReader = PHPExcel_IOFactory::createReader($inputFileType);
        $objPHPExcel = $objReader->load($file);
        $sheetData = $objPHPExcel->getActiveSheet()->toArray(null,
            true, true, true);
    } catch (Exception $e) {
        die('Error loading file"' . pathinfo($file, PATHINFO_BASENAME) . '": ' . $e->getMessage());
    }

    $res->errCode   = 0;
    $res->msg       = json_encode($sheetData);
    ret:
    print json_encode($res);
}