/**
 * JavaScript program to run main survey for user's preferences
 * Gets the information required to run algorithm effectively.
 * 
 * Author: Nic Falcione
 * Version 3/2/2020
 */

var standing = "";
var major = "";
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

    major = receivePickList("Major");
    if (major === "Choose...") {
        return "Please choose your major.";
    }

    standing = receivePickList("Standings");
    if (standing === "Choose...") {
        return "Please choose your class standing.";
    }

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

    xmlhttp.open("Get", "getcourses.php?major=" + receivePickList("Major") + "&year=" + receivePickList("yearStarted"), true);
    xmlhttp.send();
}

function populateMajorClassesArray() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            majorClassesArray = JSON.parse(this.responseText);
        }
    }

    // Current synchronous, need to fix
    xmlhttp.open("Get", "populateMajorCourse.php?major=" + receivePickList("Major") + "&year=" + receivePickList("yearStarted"), false);
    xmlhttp.send();
}

//Simple helper function to convert a 2d array to an HTML Table
function makeTableHTML(myArray) {
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

    firstYearWritingSeminar  = document.getElementById("FYWS").checked
    genEdArray.push([3, "FYWS", firstYearWritingSeminar]);

    secondYearWritingSeminar = document.getElementById("SYWS").checked
    genEdArray.push([3, "SYWS", secondYearWritingSeminar]);

    secondLanguage           = document.getElementById("SLL").checked
    genEdArray.push([3, "SLL", secondLanguage]);

    mathLiteracyOne          = document.getElementById("MLI").checked
    genEdArray.push([3, "MLI", mathLiteracyOne]);

    mathLiteracyTwo          = document.getElementById("MLII").checked
    genEdArray.push([3, "MLII", mathLiteracyTwo]);

    logicalReasoning         = document.getElementById("LOGR").checked
    genEdArray.push([3, "LOGR", logicalReasoning]);

    economicModeling         = document.getElementById("ECON").checked
    genEdArray.push([3, "ECON", economicModeling]);

    civicEngagement          = document.getElementById("CDE").checked
    genEdArray.push([3, "CDE", civicEngagement]);

    creativeExpressions      = document.getElementById("CREA").checked
    genEdArray.push([3, "CREA", creativeExpressions]);

    globalPerspectives       = document.getElementById("GLOB").checked
    genEdArray.push([3, "GLOB", globalPerspectives]);

    naturalWorldOne          = document.getElementById("INWI").checked
    genEdArray.push([3, "INWI", naturalWorldOne]);

    naturalWorldTwo          = document.getElementById("INWT").checked
    genEdArray.push([3, "INWT", naturalWorldTwo]);

    naturalWorldLab          = document.getElementById("INWL").checked
    genEdArray.push([1, "INWL", naturalWorldLab]);

    westernTraditions        = document.getElementById("WEST").checked
    genEdArray.push([3, "WEST", westernTraditions]);

    let frontload = document.getElementById("frontload").checked;
    if (frontload && document.getElementById("frontloadPicklist").value == "AOI") {
        frontloadMajor = false;
        frontloadGenEd = true;
    }
    else if (frontload && document.getElementById("frontloadPicklist").value == "Major") {
        frontloadGenEd = false;
        frontloadMajor = true;
    }
}

// Function to generate recommendation
function generateRecommendationCS() {
    // Double check form in case they try to generate recommendation before updating
    checkForm();
    var recommendationTable = [];
    var iterations = 0;
    var difficuty = 0;
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
    
    for (let [key, value] of Object.entries(majorClassesArray)) {
        console.log(key + " -> " + JSON.stringify(majorClassesArray[key]));
    }

    while(maxCredits > 0) {
        // If the algorithm can't fill in the last credits, it won't
        if (iterations > 100 && maxCredits > 1) {
            break;
        }

        // Fill Gen Ed classes first
        if (genEds > 0) {
            let classChosen = false;
            var randomIndex;
            var hasTaken;

            while (!classChosen) {
                randomIndex = Math.floor((Math.random() * genEdArray.length) + 0);
                hasTaken = genEdArray[randomIndex][2];

                if (!hasTaken && !recommendationTable.includes(genEdArray[randomIndex][1])) {
                    //Send recommendation
                    recommendationTable.push([genEdArray[randomIndex][0], genEdArray[randomIndex][1]]);
                    genEdArray[randomIndex][2] = true;
                    classChosen = true;
                    genEds--;
                    maxCredits -= genEdArray[randomIndex][0];
                }
            }
        }
        // Fill Major Classes
        else {

        }
        iterations++;
    }

    // Convert array to html table and output it
    document.getElementById("output").innerHTML = makeTableHTML(recommendationTable);
}