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
        </div>
    </form>
    `;

    // formally recognize our input boxes and the broadcast button
    const broadCastButton = document.getElementById("eventBroadcastButton");
    const eventBoardInput = document.getElementById("eventBoardInput");
    const titleInput = document.getElementById("eventCreateTitleInput");
    const locationInput = document.getElementById("eventCreateLocationInput");
    const startInput = new Date(document.getElementById("eventCreateStartInput"));
    const endInput = new Date(document.getElementById("eventCreateEndInput"));
    const descriptionInput = document.getElementById("eventCreateDescriptionInput");

    // Add event listener for the broadcast button
    broadCastButton.addEventListener("click", function () {
        // if one of the input boxes are blank abort publish and alert user
        if (!titleInput.value || !locationInput.value || !startInput || !endInput || !descriptionInput.value || !eventBoardInput.value) {
            alert("one of the boxes are empty lol");
            console.log(!titleInput, !locationInput.value, !startInput, !endInput, !descriptionInput.value, !eventBoardInput.value);
        }
        else{
            // else create a new board and inform user 
            //wrappedDB.createNewEvent();
            const userID = wrappedDB.getCurrentUser()._id;
            //console.log(userID);
            wrappedDB.createNewEvent(userID, titleInput.value, descriptionInput.value, startInput, endInput, locationInput.value, eventBoardInput);
            alert("Event broadcasted successfully!");
        }
    });
}


/*
class Event {
    constructor(author, title, description, startTime, endTime, location, board) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.board = board;
    }
}

*/