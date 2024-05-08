// code for settings window / wireframe 04.
import { wrappedDB } from "../dataWrap.js";

/**
 * Displays miscalleneous information about the current user (karma, events, email, etc.)
 *
 * @author: Benjamin Wong
 * @param { HTMLElement } element, the html element we intend to display these settings to (the middle.)
 */
export async function renderSettings(element) {
    // clear screen's contents, as well as the grid styling that could be there. 
    element.innerHTML = "";
    element.removeAttribute('style');
    document.getElementById("leftDisplayBox").innerHTML = "";
    document.getElementById("rightDisplayBox").innerHTML = "";

    // inject the display. 
    element.innerHTML = `
    <h2>Account Settings</h2>
    <div><label id="emailDisplay">Email: </label></div>
    <div><label id="usernameDisplay">Username: </label></div>
    <div><label id="karmaDisplay">Karma: </label></div><br>
    <h3>Events I'm planning to attend:</h3>
    <div id="attendingDisplay"><br /></div><br>
    `;
    

    // populate the above html with user information. 
    const userInfo = await wrappedDB.getCurrentUser();

    // grab da boxes
    const emailDisplay = document.getElementById("emailDisplay");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const karmaDisplay = document.getElementById("karmaDisplay");
    const attendingDisplayElement = document.getElementById("attendingDisplay");


    // put user's info in our boxes
    emailDisplay.innerHTML += userInfo.email;
    usernameDisplay.innerHTML += userInfo.username;
    karmaDisplay.innerHTML += userInfo.karma;

    // fill in the list of events to attend
    for (let index in userInfo.eventsAttending){
        let currEvent = userInfo.eventsAttending[index];
        attendingDisplayElement.innerHTML += (currEvent.title += " on ");
        attendingDisplayElement.innerHTML += (currEvent.startTime += "<br />");
    }

    // legacy toggle options
    /*
    const karmaToggle = document.getElementById("karmaToggle");
    const autolocationToggle = document.getElementById("autolocationToggle");
    const notificationToggle = document.getElementById("notificationToggle");
    */
}