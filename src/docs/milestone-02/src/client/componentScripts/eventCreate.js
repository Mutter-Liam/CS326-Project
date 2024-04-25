// code for the rightHandDisplayBox of wireframe 3.
import { wrappedDB } from "../dataWrap.js";

export function renderEventCreate(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    // init the form into the element.
    initForm(element);
}

function initForm(element) {

    // inject all of our search bars and buttons to the element
    // replicated and ugly code up the ass, but this is the best we can do if we don't want to fiddle with styles.css.
    element.innerHTML = `
    <h2> Create an Event!</h2>
    <div>Title:</div>
    <div><input type="text" id="eventCreateTitleInput"></div><br>

    <div>Course/Board:</div>
    <div><input type="text" id="eventBoardInput"></div><br>

    <div>Location:</div>
    <div><input type="text" id="eventCreateLocationInput"></div><br>

    <div>Start time:</div>
    <div><input type="text" id="eventCreateStartInput"></div><br>
            
    <div>End Time: </div>
    <div><input type="text" id="eventCreateEndInput"></div><br>

    <div>Description:</div>
    <div><textarea id="eventCreateDescriptionInput" name="descriptionInput" rows="4" cols="20"></textarea></div><br><br>
        
    <div><button type="button" id="eventBroadcastButton">Broadcast!</button></div><br>

    <div id = "messageBox"></div>
    `;

    // formally recognize our input boxes and the broadcast button
    const broadCastButton = document.getElementById("eventBroadcastButton");
    const eventBoardInput = document.getElementById("eventBoardInput");
    const titleInput = document.getElementById("eventCreateTitleInput");
    const locationInput = document.getElementById("eventCreateLocationInput");
    const startInput = document.getElementById("eventCreateStartInput");
    const endInput = document.getElementById("eventCreateEndInput");
    const descriptionInput = document.getElementById("eventCreateDescriptionInput");
    const messageBoxElement = document.getElementById("messageBox");

    // Add event listener for the broadcast button
    broadCastButton.addEventListener("click", function () {
        // little variables for board checking
        let boardDoesNotExist = true;
        let boardID = null;

        // check to see if the board exsits
        for (const board in wrappedDB.getAllBoards()){
            // if the name matches up steal the boardID and set our earlier boolean to true
            //console.log(wrappedDB.getAllBoards()[board].name);
            if (eventBoardInput.value == wrappedDB.getAllBoards()[board].name){
                boardDoesNotExist = false;
                boardID = board;
                console.log("found the board!");
            }
        }

        // did the boardInput actually correlate to a real board?
        if (boardDoesNotExist){
            // inform the user to create input correctly.
            messageBoxElement.innerHTML = "It looks like the board/topic doesn't exist. Try making it yourself!";

            // hide the message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 4000);
        }
        // if one of the input boxes are blank abort publish and alert user
        else if (!titleInput.value || !locationInput.value || !startInput || !endInput || !descriptionInput.value || !eventBoardInput.value) {
            // inform the user to create input correctly.
            messageBoxElement.innerHTML = "One of the boxes are empty!";

            // hide the message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 4000);
        }
        // if user puts in invalid date format
        else if(!isValidDateFormat(startInput.value) || !isValidDateFormat(endInput.value)){
            // inform the user to put in the correct date format.
            messageBoxElement.innerHTML = "Invalid date format (mm-dd-yyyy)";

            // hide the message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 4000);
        } 
        // else this is a valid input, go and create
        else{
            // else create a new board and inform user 
            const userID = wrappedDB.getCurrentUser()._id;

            // wrappedDB.createNewEvent(userID, titleInput.value, descriptionInput.value, startInput, endInput, locationInput.value, eventBoardInput);
            wrappedDB.createNewEvent(userID, titleInput.value, descriptionInput.value, new Date(startInput.value), new Date(endInput.value), locationInput.value, boardID);
            // becuase of its nature, the middle board refresh is handled by boardList.js.
            
            // now that everything is done we can reset the boxes to blank.
            titleInput.innerHTML, locationInput.innerHTML, startInput.innerHTML, endInput.innerHTML, descriptionInput.innerHTML, eventBoardInput.innerHTML = "";

            // inform the user the board was successfully created
            messageBoxElement.innerHTML = "Board successfully created!";

            // hide the message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 4000);
        }
    });
}

function isValidDateFormat(dateString) {
    // regular expression for mm-dd-yyyy format
    var regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
  
    // test the string against the regular expression
    return regex.test(dateString);
}

