<?php

$major = $_GET['major'];
$year  = intval($_GET['year']);

if ($major == "Computer Science") {
    $major = "CS";
}

$con= new mysqli("","","","");
// Check connection
if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$db_query = "SELECT * FROM capstone_database.Course WHERE Course_major = '" . $major . "' AND Course_year = '" . $year . "'";
$result = mysqli_query($con, $db_query);

$count = -1;

echo "<table>";
while($row = mysqli_fetch_array($result)) {
    $count = $count + 1;

    if ($count % 4 == 0) {
        if ($count != 0) {
            echo "</tr><tr>";
        }
        else {
            echo "<tr>";
        }
    }
    echo "<td><input id='" . $row['Course_shortName'] . "' type='checkbox'>" . $row['Course_shortName'] . "</td>";
}
echo "</tr></table>";

mysqli_close($con);

?>
