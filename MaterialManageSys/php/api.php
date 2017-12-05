<?php

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
    $uploadDir = '/tmp/';
    $file   = $uploadDir . $_FILES['bom']['name'];
    echo "Upload!". $file;
    if (move_uploaded_file($_FILES['bom']['tmp_name'], $file)) {
        echo "File is valid, and was successfully uploaded.\n";
    } else {
        echo 'Possible file upload attack!\n';
    }
    print_r($_FILES);
}

init();
$param = explode('/', $_SERVER['PHP_SELF']);
$api = $param[5];
if ($api == 'getStock') {
    getStock();
} else if ($api == 'upload') {
    upload();
}

?>

