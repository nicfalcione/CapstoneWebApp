/**
 * JavaScript program to run main survey for user's preferences
 * Gets the information required to run algorithm effectively.
 * 
 * Author: Nic Falcione
 * Version 3/2/2020
 */

 let standing = "";

function receivePickList(ID) {
    let pickList = document.getElementById(ID);
    return pickList.options[pickList.selectedIndex].text;
}

function updateDetails() {
    
}