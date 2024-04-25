import { wrappedDB } from "../dataWrap.js";
import { renderEventCreate } from "./eventCreate.js";

export async function renderEventDetails(currEvent){

    
    const rightDisplayBox = document.getElementById("rightDisplayBox");

    // Apply HTML.
    rightDisplayBox.innerHTML = `
    <button id="closeButton">X</button>

    <br>

    <h2>
        Event Details:
    </h2>

    <h4>Basic details</h4>
    <div id="title"></div>
    <div id="thisEventboard">Board/Topic: </div>
    <div id="author">Host: </div>
    <div id="karma">Karma: </div>

    </br>
    <h4>Where and when?</h4>
    <div id="location">Location: </div><br>
    <div id="startTime">Start Time: </div><br>
    <div id="endTime">End Time: </div>
    
    </br>
    
    <h4>Description</h4>
    <div id="thisEventdescription"></div><br>

    <button id="attendButton"></button>
    `;

    // style on the button to make it always on the right
    const closeButton = document.getElementById('closeButton');
    closeButton.style.float = 'right'; 

    // close out the box by rerendering event creation
    closeButton.addEventListener("click", () => renderEventCreate(rightDisplayBox));

    // grab the boxes
    const titleElement = document.getElementById("title");
    const authorElement = document.getElementById("author");
    const karmaElement = document.getElementById("karma");
    const startTimeElement = document.getElementById("startTime");
    const endTimeElement = document.getElementById("endTime");
    const locationElement = document.getElementById("location");
    const eventBoardElement = document.getElementById("thisEventboard");
    const descriptionElement = document.getElementById("thisEventdescription");
    const attendButtonElement = document.getElementById("attendButton");

    // shove details in 
    titleElement.innerHTML = currEvent.title;
    authorElement.innerHTML += wrappedDB.getUser(currEvent.author).username;
    karmaElement.innerHTML += wrappedDB.getUser(currEvent.author).karma;
    startTimeElement.innerHTML += currEvent.startTime;
    endTimeElement.innerHTML += currEvent.endTime;
    locationElement.innerHTML += currEvent.location;
    eventBoardElement.innerHTML += wrappedDB.getBoard(currEvent.board).name;
    descriptionElement.innerHTML = currEvent.description;

    // make a variable for the current User's ID for manipulation.
    const currentUserID = await wrappedDB.getCurrentUser();

    // make the attend button dependent on whether the user is already planning to attend
    if (currentUserID.eventsAttending.includes(currEvent)){
        attendButtonElement.innerHTML = "Unattend?";
    }
    else{
        attendButtonElement.innerHTML = "I'll attend!";
    }

    // attend Button logic
    attendButtonElement.addEventListener("click", () =>{
        // clicking to attend logic
        if (attendButtonElement.innerHTML == "I'll attend!"){
            // push event and rerenderEventDetails to show that you can now
            currentUserID.eventsAttending.push(currEvent);
            renderEventDetails(currEvent);
        }
        // clicking to unattend logic
        else{
            attendButtonElement.innerHTML == "I'll attend!";
            let newEventsAttending = [];

            // linear filter out the name of the current event in eventsAttending.
            for (let index in currentUserID.eventsAttending){
                // add whatever doesn't share the name
                if (currEvent.title != currentUserID.eventsAttending[index].title){
                    newEventsAttending.push(currentUserID.eventsAttending[index]);
                }
            }

            // replace eventsAttending sans the unattended event
            currentUserID.eventsAttending = newEventsAttending;
            renderEventDetails(currEvent);
        }
    });
}