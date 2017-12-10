<?php

include 'PHPExcel/Classes/PHPExcel.php';

$uploadDir = '/tmp/';
function init()
{
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);
}

function getStock()
{
    $serverName = 'localhost';
    $username = 'root';
    $password = 'liupeng123';
    $dbName = 'material';

    // create connection.
    $conn = new mysqli($serverName, $username, $password, $dbName);
    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }
    $conn->set_charset('utf8mb4');

    $sql = "SELECT * FROM test";
    $result = $conn->query($sql);
    $rows = array();
    if ($result->num_rows > 0) {
        // output data of each row.
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    }
//    echo "Hello, world!";
    print json_encode($rows);
    $conn->close();
}

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

