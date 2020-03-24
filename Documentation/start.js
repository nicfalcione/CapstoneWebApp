/**
 * JavaScript program to run main survey for user's preferences
 * Gets the information required to run algorithm effectively.
 * 
 * Author: Nic Falcione
 * Version 3/2/2020
 */

let standing = "";
let major = "";
let firstYearWritingSeminar = false;
let secondYearWritingSeminar = false;
let secondLanguage = false;
let mathLiteracyOne = false;
let mathLiteracyTwo = false;
let logicalReasoning = false;
let economicModeling = false;
let civicEngagement = false;
let creativeExpressions = false;
let globalPerspectives = false;
let naturalWorldOne = false;
let naturalWorldTwo = false;
let westernTraditions = false; 

function receivePickList(ID) {
    let pickList = document.getElementById(ID);
    console.log(pickList);
    return pickList.options[pickList.selectedIndex].text;
}

function checkForm() {
    major = receivePickList("Major");
    if (major === "Choose...") {
        return "Please choose your major.";
    }

    standing = receivePickList("Standings");
    if (standing === "Choose...") {
        return "Please choose your class standing."
    }
    
    return "Success";
}

function makeTableHTML(myArray) {
    var result = "<table border=1>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<td>"+myArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

function updateDetails() {
    
}