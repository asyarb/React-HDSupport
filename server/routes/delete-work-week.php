<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function deleteWorkWeek($db, $timestamp)
{
    $stmt = $db->prepare("DELETE FROM wwexceptions WHERE date = ? LIMIT 1");
    $stmt->bind_param("i", $timestamp);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteWorkWeek($mysqli, $_POST['timestamp']);

?>