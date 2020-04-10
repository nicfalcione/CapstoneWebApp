<?php

$major = $_GET['major'];
$year  = intval($_GET['year']);

if ($major == "Computer Science") {
    $major = "CS";
}

$con= new mysqli("","","", "");
// Check connection
if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$db_query = "SELECT * FROM capstone_database.Course WHERE Course_major = '" . $major . "' AND Course_year = '" . $year . "'";
$result = mysqli_query($con, $db_query);

$json_array = array();
while ($row  = mysqli_fetch_assoc($result)) {
    $json_array[] = $row;
}

echo json_encode($json_array);

?>
