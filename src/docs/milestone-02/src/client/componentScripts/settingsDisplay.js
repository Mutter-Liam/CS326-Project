// code for settings window / wireframe 04.
import { wrappedDB } from "../dataWrap.js";


export function renderSettings(element) {
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

    <div>
        <label class="switch" if="karmaSwitchToggle">
        Karma:
        <input type="checkbox">
        <span class="slider round"></span>
        </label>
    </div>
    
    <div>
        <label class="switch", id="autolocationToggle">
        Autolocation:
        <input type="checkbox">
        <span class="slider round"></span>
        </label>
    </div>

    <div>
        <label class="switch id="notificationToggle">
        Notifications:
        <input type="checkbox">
        <span class="slider round"></span>
        </label>
    </div>
    `;
    

    // populate the above html with user information. 
    const userInfo = wrappedDB.getCurrentUser();

    // grab da boxes
    const emailDisplay = document.getElementById("emailDisplay");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const karmaDisplay = document.getElementById("karmaDisplay");


    // put user's info in our boxes
    emailDisplay.innerHTML += userInfo.email;
    usernameDisplay.innerHTML += userInfo.username;
    karmaDisplay.innerHTML += userInfo.karma;

    // toggle options
    const karmaToggle = document.getElementById("karmaToggle");
    const autolocationToggle = document.getElementById("autolocationToggle");
    const notificationToggle = document.getElementById("notificationToggle");
}