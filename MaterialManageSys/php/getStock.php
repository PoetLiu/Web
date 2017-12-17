<?php
/**
 * Created by PhpStorm.
 * User: liupeng
 * Date: 2017/12/12
 * Time: 21:44
 */

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
