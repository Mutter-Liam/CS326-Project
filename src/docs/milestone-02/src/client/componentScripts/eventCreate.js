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
    <h2>
        Create an Event!
    </h2>
    <form>
        <div>
            <label for="titleInput">Title:</label>
        </div>
        <div>
            <input type="text" id="eventCreateTitleInput">
        </div><br>

        <div>
            <label for="eventBoardInput">Course:</label>
        </div>
        <div>
            <input type="text" id="eventBoardInput">
        </div><br>

        <div>
            <label for="locationInput">Location:</label>
        </div>
        <div>
            <input type="text" id="eventCreateLocationInput">
        </div><br>

        <div>
            <label for="startInput">Start Time:</label>
        </div>
        <div>
            <input type="text" id="eventCreateStartInput">
        </div><br>
            
        <div>
            <label for="endInput">End time:</label>
        </div>
        <div>
            <input type="text" id="eventCreateEndInput">
        </div><br>

        <div>
            <label for="descriptionInput">Description:</label>
        </div>
        <div>
            <textarea id="eventCreateDescriptionInput" name="descriptionInput" rows="4" cols="20"></textarea>
        </div><br>
        
        <div>
            <br>
            <button type="button" id="eventBroadcastButton">Broadcast!</button>
        </div><br>

        <div id = "messageBox"></div>
    </form>
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
        // if one of the input boxes are blank abort publish and alert user
        if (!titleInput.value || !locationInput.value || !startInput || !endInput || !descriptionInput.value || !eventBoardInput.value) {
            // inform the user to create input correctly.
            messageBoxElement.innerHTML = "One of the boxes are empty!";

            // hide the message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 5000);
        }else if(!isValidDateFormat(startInput.value) || !isValidDateFormat(endInput.value)){
            // inform the user the board was successfully created
            messageBoxElement.innerHTML = "Invalid date input (mm-dd-yyyy)";

            // hide the message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 5000);
        }
        else{
            // else create a new board and inform user 
            const userID = wrappedDB.getCurrentUser()._id;

            // wrappedDB.createNewEvent(userID, titleInput.value, descriptionInput.value, startInput, endInput, locationInput.value, eventBoardInput);
            wrappedDB.createNewEvent(userID, titleInput.value, descriptionInput.value, startInput.value, endInput.value, locationInput.value, 0);
            // becuase of its nature, the middle board refresh is handled by boardList.js.
            
            // now that everything is done we can reset the boxes to blank.
            titleInput.innerHTML, locationInput.innerHTML, startInput.innerHTML, endInput.innerHTML, descriptionInput.innerHTML, eventBoardInput.innerHTML = "";

            // inform the user the board was successfully created
            messageBoxElement.innerHTML = "Board successfully created!";

            // hide the message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 5000);
        }
    });
}

function isValidDateFormat(dateString) {
    // Regular expression for mm-dd-yyyy format
    var regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
  
    // Test the string against the regular expression
    return regex.test(dateString);
  }
  
  // Example usage
  console.log(isValidDateFormat("12-31-2023")); // Output: true
  console.log(isValidDateFormat("31-12-2023")); // Output: false (wrong format)
  console.log(isValidDateFormat("12/31/2023")); // Output: false (wrong delimiter)
  