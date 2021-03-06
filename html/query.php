<!DOCTYPE html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<html>
    <head>
        <div class='logo'>
            <a href = '#'>
                <img src="VirtualAdvisor.png">
            </a>
        </div>

        <nav>
            <ul>
                <li><a href="index.html"><b>Home</b></a></li>
                <li><a href="about.html"><b>About</b></a></li>
            </ul>
        </nav>

        <title>VirtualAdvisor</title>

        <link rel="stylesheet" href="style.css">

        <script language="javascript" type="text/javascript" src="start.js"></script>
    </head>
    
    <body>
        <div class="Split">
            <ol class="menuForm">
                <li style="clear:both;">What is your major?
                    <select id="Major">
                        <option selected>Choose...</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Information Science">Information Science</option>
                        <option value="Information Systems">Information Systems</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Physics">Physics</option>
                    </select>
                </li>

                <li style="clear: both;">What Liberal Learning Requirements have you completed?
                    <ol style="list-style-type: none;">
                        <li style="clear:both"><input type="checkbox">First-Year Writing Seminar</li>
                        <li style="clear:both"><input type="checkbox">Second-Year Writing Seminar</li>
                        <li style="clear:both"><input type="checkbox">Second Language Literacy</li>
                        <li style="clear:both"><input type="checkbox">Mathematical Literacy I</li>
                        <li style="clear:both"><input type="checkbox">Mathematical Literacy II</li>
                        <li style="clear:both"><input type="checkbox">Logical Reasoning</li>
                        <li style="clear:both"><input type="checkbox">Economic Modeling</li>
                        <li style="clear:both"><input type="checkbox">Civic & Democratic Engagement</li>
                        <li style="clear:both"><input type="checkbox">Creative Expressions</li>
                        <li style="clear:both"><input type="checkbox">Global & Multiultural Perspectives</li>
                        <li style="clear:both"><input type="checkbox">Investigating the Natural World I</li>
                        <li style="clear:both"><input type="checkbox">Investigating the Natural World II</li>
                        <li style="clear:both"><input type="checkbox">Investigating the Natural World Lab</li>
                        <li style="clear:both"><input type="checkbox">Western Traditions</li>
                    </ol>
                </li>

                <li style="clear:both">What is your class standing?
                    <select id="Standings">
                        <option selected>Choose...</option>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                    </select>
                    <button id="updateDetails">Update</button>
                </li>

                <li style="clear: both;"><input type="checkbox">
                    Frontload major classes if possible?
                </li>

                <li style="clear:both; list-style-type: none;">
                    <button id="generate">Generate Recommendation</button>
                </li>
            </ol>

            <div class="Recommendation">
                <h1 style="align:center; color:white">
                    Schedule Recommendation
                </h1>
                <?php
                    ini_set('display_errors', 1);
                    ini_set('display_startup_errors', 1);
                    error_reporting(E_ALL);
                    $con= new mysqli("","","", "");
                    // Check connection
                    if (mysqli_connect_errno())
                    {
                        echo "Failed to connect to MySQL: " . mysqli_connect_error();
                    }

                    $result = mysqli_query($con,"SELECT * FROM capstone_database.Course");

                    echo "<table style='text-align:center'>";
                    echo "<tr style='padding-right:10px'><td style='color:white'>";
                    echo "Course Name</td><td style='color:white'>";
                    echo "Credits</td></tr>";
                    while($row = mysqli_fetch_array($result))
                    {
                        echo "<tr style='padding-right:10px'><td style='color:white'>";
                        echo $row['Course_shortName'];
                        echo "</td><td style='color:white'>";
                        echo $row['Course_credits'];
                        echo "</td></tr>";
                    }
                    echo "</table>";

                    mysqli_close($con);
                ?>      
                </div>
        </div>

        <a href="query.php"><button>Query</button></a>

        <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

        
       <!--<button onSelectStanding="receivePickList()"></button>-->

        <script>
            document.getElementById('updateDetails')
            .addEventListener('click', function() {
                let formResultCheck = checkForm();
                if (formResultCheck === "Success") {
                    toastr.success("Your details have been updated");
                }
                else {
                    toastr.error(formResultCheck);
                }
            })

            document.getElementById("generate")
            .addEventListener('click', function() {
                toastr.success("Your recommendation has been generated")
            })
        </script>

    </body>
</html>