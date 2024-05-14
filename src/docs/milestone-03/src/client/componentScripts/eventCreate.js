// code for the rightHandDisplayBox of wireframe 3.
import { wrappedDB } from "../dataWrap.js";

/**
 * Clears anything from the current element to make way for event creation.
 *
 * @author: Benjamin Wong
 * @param { HTMLElement } element, the HTML element to render the event creation tab. (usually right hand side.);
 */
export function renderEventCreate(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    // init the form into the element.
    initForm(element);
}

/**
 * Displays the event creation tab, ideally on the right hand side display.
 *
 * @author: Benjamin Wong
 * @param { HTMLElement } element html to render the event creation tab.
 */
async function initForm(element) {

    // inject all of our search bars and buttons to the element
    element.innerHTML = `
    <h2> Create an Event!</h2>
    <div>Title:</div>
    <div><input type="text" id="eventCreateTitleInput"></div><br>

    <div>Course/Board:</div>
    <div><select id="eventBoardInput"><select>
    <br>

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


    // add Dropdown list for board property of the event to be created
    // derirved by the baords the current user is subscribed to. 
    const userBoards = await wrappedDB.getUserBoards();

    // add every board the user is subscribed to as the options to put under
    // key is its name, value is its id for the eventual fetch request.
    for (const currIndex in userBoards){
        eventBoardInput.options[eventBoardInput.options.length] = new Option(userBoards[currIndex].name, userBoards[currIndex]._id);
    }

    // Add event listener for the broadcast button
    broadCastButton.addEventListener("click", async function () {
        // if one of the input boxes are blank abort publish and alert user
        if (!titleInput.value || !locationInput.value || !startInput || !endInput || !descriptionInput.value || !eventBoardInput.value) {
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

            console.log(eventBoardInput.value);

            console.log(titleInput.value, descriptionInput.value, new Date(startInput.value), new Date(endInput.value), locationInput.value, eventBoardInput.value);

            // send the request to wrapped.DB
            await wrappedDB.createNewEvent(titleInput.value, descriptionInput.value, new Date(startInput.value), new Date(endInput.value), locationInput.value, eventBoardInput.value);
            // becuase of its nature, the middle board refresh is handled by boardList.js.

            // now that everything is done we can reset the boxes to blank.
            titleInput.innerHTML, locationInput.innerHTML, startInput.innerHTML, endInput.innerHTML, descriptionInput.innerHTML;

            // inform the user the event was successfully created
            messageBoxElement.innerHTML = "Event successfully created!";

            // hide the message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 4000);
        }
    });
}

/**
 * Helper function for proper input on dates.
 *
 * @author: Benjamin Wong
 * @param { String } dateString, a string element put in by user to be tested.
 * @return { Boolean } Boolean based on whether or not it follows correct format.
 */
function isValidDateFormat(dateString) {
    // regular expression for mm-dd-yyyy format
    var regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
  
    // test the string against the regular expression
    return regex.test(dateString);
}