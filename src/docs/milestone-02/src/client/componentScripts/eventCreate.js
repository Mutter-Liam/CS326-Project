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
    element.innerHTML = `
    <form>
        <label for="courseNameInput">Course:</label>
        <input type="text" id="eventCreateNameInput">

        <label for="locationInput">Location:</label>
        <input type="text" id="eventCreateLocationInput">

        <label for="startInput">Start Time:</label>
        <input type="text" id="eventCreateStartInput">

        <label for="endInput">End time:</label>
        <input type="text" id="eventCreateEndInput">

        <label for="descriptionInput">Description:</label>
        <input type="text" id="eventCreateDescriptionInput">

        <button type="button" id="eventBroadcastButton">Broadcast</button>
    </form>
    `;

    // formally recognize our input boxes and the broadcast button
    const broadCastButton = document.getElementById("eventBroadCastButton");
    const locationInput = document.getElementById("eventCreateLocationInput");
    const startInput = document.getElementById("eventCreateStartInput");
    const endInput = document.getElementById("eventCreateEndInput");
    const descriptionInput = document.getElementById("eventCreateDescriptionInput");

    // Add event listener for the publish button
    broadCastButton.addEventListener("click", function () {
        // if one of the input boxes are blank abort publish and alert user
        if (!locationInput.value || !startInput.value || !endInput.value || !descriptionInput.value) {
            alert("one of the boxes are empty lol");
        }
        else{
            // else create a new board and inform user 
            //wrappedDB.createNewEvent();
            alert("Board created successfully!");
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