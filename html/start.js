/** -------------------------------------------------------------- //
 * JavaScript program to run main survey for user's preferences    //
 * Gets the information required to run algorithm effectively.     //
 * --------------------------------------------------------------- //
 * Author:  Nic Falcione                                           //
 * Version: 3/2/2020                                               //
 * --------------------------------------------------------------- //
 */

// --------------------------------------------------------------- //
//                         Variables                               //
// --------------------------------------------------------------- //
var standing = "";
var major = "";
var semester = "";
var firstYearWritingSeminar = false;
var secondYearWritingSeminar = false;
var secondLanguage = false;
var mathLiteracyOne = false;
var mathLiteracyTwo = false;
var logicalReasoning = false;
var economicModeling = false;
var civicEngagement = false;
var creativeExpressions = false;
var globalPerspectives = false;
var naturalWorldOne = false;
var naturalWorldTwo = false;
var naturalWorldLab = false;
var westernTraditions = false; 
var maxCredits = 15;
var genEdArray = [];
var majorClassesArray;
var yearStarted = 0;
var frontloadGenEd = false;
var frontloadMajor = false;

// --------------------------------------------------------------- //
//                         Functions                               //
// --------------------------------------------------------------- //

// Helper function to receive selected picklist option
function receivePickList(ID) {
    let pickList = document.getElementById(ID);
    return pickList.options[pickList.selectedIndex].text;
}

// Function to verify form has required elements
function checkForm() {
    toastr.options = {
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "fadeIn": 300,
        "fadeOut": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000
    }

    // Store Major
    major = receivePickList("Major");
    if (major === "Choose...") {
        return "Please choose your major.";
    }

    // Store class Standing
    standing = receivePickList("Standings");
    if (standing === "Choose...") {
        return "Please choose your class standing.";
    }

    // Store desired amount of credits
    maxCredits = parseInt(document.getElementById("maxCredits").value);

    // Fast way to check if maxCredits is a number
    if (maxCredits !== maxCredits) {
        return "Please input a number in Max Credits."
    }
    else if (maxCredits > 19) {
        return "Please don't take this many credits... 19 or less."
    }
    else if (maxCredits < 12) {
        return "Please put a number that is at least 12."
    }

    yearStarted = receivePickList("yearStarted");
    semester = receivePickList("Semester");
    
    updateDetails();
    return "Success";
}

// Populates major classes from the database
function populateMajorClasses() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("MajorCourses").innerHTML = this.responseText;
        }
    }

    // Get request to php using major and year started to query from database
    xmlhttp.open("Get", "getcourses.php?major=" + receivePickList("Major") + "&year=" + receivePickList("yearStarted"), false);
    xmlhttp.send();
}

// Populate Major Classes array from User Input
function populateMajorClassesArray() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            majorClassesArray = null;
            majorClassesArray = JSON.parse(this.responseText);
        }
    }

    // Get request to php using major and year started to query from input
    xmlhttp.open("Get", "populateMajorCourse.php?major=" + receivePickList("Major") + "&year=" + receivePickList("yearStarted"), false);
    xmlhttp.send();
}

//Simple helper function to convert a 2d array to an HTML Table
function makeTableHTML(myArray, difficulty) {
    var creditsScheduled = 0;
    var result = "<table border=1>";
    result += "<tr style='padding-right:10px'><td style='color:white'>Credits</td><td style='color:white'>Course</td></tr>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr style='padding-right:10px'>";
        for(var j=0; j<myArray[i].length; j++){
            // Convert Number to string for credits
            if (typeof myArray[i][j] == "number") {
                creditsScheduled += myArray[i][j];
                result += "<td style='color:white'>" + myArray[i][j].toString() + "</td>";
            }
            else {
                result += "<td style='color:white'>" + myArray[i][j] + "</td>";
            }
        }
        result += "</tr>";
    }
    result += "</table>";
    document.getElementById("creditCountMessage").innerHTML = `Total credit hours: ${creditsScheduled.toString()}.`;
    document.getElementById("difficultyMessage").innerHTML = `Difficulty rating: ${difficulty.toString()} out of ${(creditsScheduled * 10).toString()}`;

    return result;
}

// Function to show picklist for frontload option
function showElement() {
    var visibility = "none";
    if (document.getElementById("frontload").checked) {
        visibility = "block";
    }
    document.getElementById("frontloadPicklist").style.display = visibility;
}

// update details from user input that don't require a check
function updateDetails() {
    //Clear array safely
    genEdArray.length = 0;

    //Check AOIs Input
    firstYearWritingSeminar  = document.getElementById("FYWS").checked
    genEdArray.push([3, "First-Year Writing Seminar", firstYearWritingSeminar]);

    secondYearWritingSeminar = document.getElementById("SYWS").checked
    genEdArray.push([3, "Second Year Writing Seminar", secondYearWritingSeminar]);

    secondLanguage           = document.getElementById("SLL").checked
    genEdArray.push([3, "Second Language Literacy", secondLanguage]);

    mathLiteracyOne          = document.getElementById("MLI").checked
    genEdArray.push([3, "Math Literacy I", mathLiteracyOne]);

    mathLiteracyTwo          = document.getElementById("MLII").checked
    genEdArray.push([3, "Math Literacy II", mathLiteracyTwo]);

    logicalReasoning         = document.getElementById("LOGR").checked
    genEdArray.push([3, "Logical Reasoning", logicalReasoning]);

    economicModeling         = document.getElementById("ECON").checked
    genEdArray.push([3, "Economic Modeling", economicModeling]);

    civicEngagement          = document.getElementById("CDE").checked
    genEdArray.push([3, "Civic & Democratic Engagement", civicEngagement]);

    creativeExpressions      = document.getElementById("CREA").checked
    genEdArray.push([3, "Creative Expressions", creativeExpressions]);

    globalPerspectives       = document.getElementById("GLOB").checked
    genEdArray.push([3, "Global & Multicultural Perspectives", globalPerspectives]);

    naturalWorldOne          = document.getElementById("INWI").checked
    genEdArray.push([3, "Investigating the Natural World I", naturalWorldOne]);

    naturalWorldTwo          = document.getElementById("INWT").checked
    genEdArray.push([3, "Investigating the Natural World II", naturalWorldTwo]);

    naturalWorldLab          = document.getElementById("INWL").checked
    genEdArray.push([1, "Investigating the Natural World Lab", naturalWorldLab]);

    westernTraditions        = document.getElementById("WEST").checked
    genEdArray.push([3, "Western Traditions", westernTraditions]);

    // Check Frontload input from user
    let frontload = document.getElementById("frontload").checked;
    if (frontload && document.getElementById("frontloadPicklist").value == "AOI") {
        frontloadMajor = false;
        frontloadGenEd = true;
    }
    else if (frontload && document.getElementById("frontloadPicklist").value == "Major") {
        frontloadGenEd = false;
        frontloadMajor = true;
    }
    else if (!frontload) {
        frontloadGenEd = false;
        frontloadMajor = false;
    }
}

// Function to generate recommendation
function generateRecommendationCS() {
    // Double check form in case they try to generate recommendation before updating
    checkForm();
    var recommendationTable = [];
    var iterations = 0;
    var difficulty = 0;
    var genEds;

    if (frontloadGenEd) {
        genEds = 4;
    }
    else if (frontloadMajor) {
        genEds = 1;
    }
    else {
        genEds = 2;
    }

    //majorClassesArray.length = 0;
    populateMajorClassesArray();

    while(maxCredits > 0) {
        // If the algorithm can't fill in the last credits, it won't
        if (iterations > 200000 && maxCredits > 0) {
            break;
        }

        // Fill Gen Ed classes first
        if (genEds > 0 && iterations < 100000) {
            let classChosen = false;
            var randomIndex;
            var hasTaken;

            while (!classChosen) {
                if (iterations > 50) {
                    genEds = 0;
                    break;
                }
                randomIndex = Math.floor((Math.random() * genEdArray.length) + 0);

                // Ensure GenEds user forgot to input that are covered by major courses aren't recommended
                for (var c = 0; c < majorClassesArray.length; c++) {
                    if (document.getElementById(majorClassesArray[c].Course_shortName).checked 
                        && majorClassesArray[c].Course_shortName === "math140") {
                        if (genEdArray[randomIndex][1] === "Math Literacy I") {
                            genEdArray[randomIndex][2] = true;
                        }
                    }

                    if (document.getElementById(majorClassesArray[c].Course_shortName).checked 
                        && majorClassesArray[c].Course_shortName === "math240") {
                        if (genEdArray[randomIndex][1] === "Math Literacy II") {
                            genEdArray[randomIndex][2] = true;
                        }
                    }

                    if (document.getElementById(majorClassesArray[c].Course_shortName).checked 
                        && majorClassesArray[c].Course_shortName === "cpsc150") {
                        if (genEdArray[randomIndex][1] === "Logical Reasoning") {
                            genEdArray[randomIndex][2] = true;
                        }
                    }
                }

                // Checks GenEd Array to see if user has stated they have taken GenEd
                hasTaken = genEdArray[randomIndex][2];

                // Recommend class if not already recommended and hasn't been taken
                if (!hasTaken && !recommendationTable.includes(genEdArray[randomIndex][1])) {
                    //Send recommendation
                    recommendationTable.push([genEdArray[randomIndex][0], genEdArray[randomIndex][1]]);
                    genEdArray[randomIndex][2] = true;
                    classChosen = true;
                    genEds--;
                    difficulty += 4 * genEdArray[randomIndex][0];
                    maxCredits -= genEdArray[randomIndex][0];
                }
                iterations++;
            }
        }
        // Fill Major Classes
        else {
        
            // Run through major courses array and populate recommendation where possible
            for (var k = 0; k < majorClassesArray.length; k++) {
                // Check if User hasn't taken major class already and Recommendation Table doesn't include it
                if (!document.getElementById(majorClassesArray[k].Course_shortName).checked 
                    && !recommendationTable.some(row => row.includes(majorClassesArray[k].Course_shortName))) {
                    
                    // Check if class can be recommended
                    if (maxCredits >= majorClassesArray[k].Course_credits && semester === "Fall"
                        && majorClassesArray[k].Course_offeredFall == 1 && hasPrereqs(majorClassesArray[k].Course_shortName)) {
                        recommendationTable.push([parseInt(majorClassesArray[k].Course_credits), majorClassesArray[k].Course_shortName]);
                        difficulty += parseInt(majorClassesArray[k].Course_diff) * majorClassesArray[k].Course_credits;
                        maxCredits -= majorClassesArray[k].Course_credits;
                    }
                    else if (maxCredits >= majorClassesArray[k].Course_credits && semester === "Spring"
                        && majorClassesArray[k].Course_offeredSpring == 1 && hasPrereqs(majorClassesArray[k].Course_shortName)) {
                        recommendationTable.push([parseInt(majorClassesArray[k].Course_credits), majorClassesArray[k].Course_shortName]);
                        difficulty += parseInt(majorClassesArray[k].Course_diff) * majorClassesArray[k].Course_credits;
                        maxCredits -= majorClassesArray[k].Course_credits;
                    }
                    // Ensure classes stop getting recommended if no credits
                    else if (maxCredits <= 0) {
                        break;
                    }
                }
                iterations++;
            }
        }
        iterations++;
    }

    function isTaken(theCourse) {
        return document.getElementById(theCourse).checked;
    }

    function hasPrereqs(theCourse) {
        if (theCourse === "cpsc250" || theCourse === "cpsc250l"
            || theCourse === "cpsc255" || theCourse === "engr213") {
            return isTaken("cpsc150") && isTaken("cpsc150l")
        }
        
        if (theCourse === "cpsc270" || theCourse === "cpsc280"
            || theCourse === "cpsc360" || theCourse === "cpsc475") {
            if (yearStarted > 2017) {
                return isTaken("cpsc255")
            }
            return isTaken("cpsc250")
        }

        if (theCourse === "cpsc327" || theCourse === "cpsc427"
            || theCourse === "cpsc440") {
            return isTaken("cpsc250") && isTaken("cpsc250l")
        }

        if (theCourse === "cpsc330") {
            return isTaken("cpsc250") && isTaken("cpsc250l") && isTaken("cpen214")
        }

        if (theCourse === "cpsc410") {
            return isTaken("cpsc327") || isTaken("cpsc270") && isTaken("cpen214")
        }

        if (theCourse === "cpsc420") {
            return isTaken("cpsc270") && isTaken("math240")
        }

        if (theCourse === "cpsc425" || theCourse === "cpsc480") {
            return isTaken("cpsc280")
        }

        if (theCourse === "cpsc428") {
            return isTaken("cpsc250") && isTaken("math140")
        }

        if (theCourse === "cpsc450") {
            return isTaken("cpsc410")
        }

        if (theCourse === "cpsc460") {
            return isTaken("cpsc360")
        }

        if (theCourse === "cpsc471") {
            return isTaken("cpsc270")
        }

        if (theCourse === "cpsc485") {
            return isTaken("cpsc250")
        }

        if (theCourse === "cpsc498") {
            return isTaken("cpsc270") && standing === "Senior"
        }

        if (theCourse === "phys152" || theCourse === "phys152l") {
            return isTaken("phys151") && isTaken("phys151l")
        }

        if (theCourse === "math240") {
            return isTaken("math140")
        }

        if (theCourse === "cpen214") {
            return isTaken("phys152")
        }

        if (theCourse === "phys341") {
            return isTaken("phys151") && isTaken("phys152") && isTaken("math140")
        }

        if (theCourse === "cpen371w") {
            return standing === "Junior" || standing === "Senior"
        }
    }

    // Convert array to html table and output it
    document.getElementById("output").innerHTML = makeTableHTML(recommendationTable, difficulty);
}