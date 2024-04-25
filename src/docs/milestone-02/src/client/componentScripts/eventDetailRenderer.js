import { wrappedDB } from "../dataWrap.js";
import { renderEventCreate } from "./eventCreate.js";

export function renderEventDetails(currEvent){

    
    const rightDisplayBox = document.getElementById("rightDisplayBox");
    rightDisplayBox.style = 'background-color: rgba(127, 255, 212, 0.49)';

    // Apply HTML.
    rightDisplayBox.innerHTML = `
    <button id="closeButton">X</button>

    <br>

    <h2>
        Event Details:
    </h2>

    <h4>Basic details</h4>
    <div id="title"></div>
    <div id="thisEventeoard">Board/Topic: </div>
    <div id="author">Host: </div>

    </br>
    <h4>Where and when?</h4>
    <div id="location">Location: </div><br>
    <div id="startTime">Start Time: </div><br>
    <div id="endTime">End Time: </div>
    
    </br>
    
    <h4>Description</h4>
    <div id="thisEventdescription"></div>
    `;

    // style on the button to make it always on the right
    const closeButton = document.getElementById('closeButton');
    closeButton.style.float = 'right'; 

    // close out the box by rerendering 
    closeButton.addEventListener("click", function() {
        rightDisplayBox.style = 'background-color: white'
        renderEventCreate(rightDisplayBox)});

    // grab the boxes
    const titleElement = document.getElementById("title");
    const authorElement = document.getElementById("author");
    const startTimeElement = document.getElementById("startTime");
    const endTimeElement = document.getElementById("endTime");
    const locationElement = document.getElementById("location");
    const eventBoardElement = document.getElementById("thisEventeoard");
    const descriptionElement = document.getElementById("thisEventdescription");

    // shove details in 
    titleElement.innerHTML = currEvent.title;
    authorElement.innerHTML += wrappedDB.getUser(currEvent.author).username;
    startTimeElement.innerHTML += currEvent.startTime;
    endTimeElement.innerHTML += currEvent.endTime;
    locationElement.innerHTML += currEvent.location;
    eventBoardElement.innerHTML += wrappedDB.getBoard(currEvent.board).name;
    descriptionElement.innerHTML = currEvent.description;
}