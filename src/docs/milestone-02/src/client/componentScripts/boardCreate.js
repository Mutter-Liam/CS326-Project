// code for the rightHandDisplayBox of wireframe 3.
import { wrappedDB } from "../dataWrap.js";
import { renderBoardGrid } from "./gridRenderer.js";

/**
 * Clears anything from the current element to make way for board creation.
 *
 * @author: Benjamin Wong
 * @param { HTMLElement } element, the HTML element to render the board creation tab. (usually right hand side.);
 */
export function renderBoardCreate(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    // init the form into the element.
    initForm(element);
}


/**
 * Display the board creation tab, ideally in the right hand side.
 *
 * @author: Benjamin Wong
 * @param { HTMLElement } element, the HTML element to render the board creation tab. (usually right hand side.);
 */
function initForm(element) {

    // inject all of our search bars and buttons to the element
    element.innerHTML = `
    <h2>
            Create a Board!
        </h2>
    <form>
        <div>
            <label for="boardCreateNameInput">Name:</label>
        </div>
        <div>
            <input type="text" id="boardCreateNameInput">
        </div><br>
        
        <div>
            <label for="boardCreateTypeInput">Type:</label>
        </div>
        <div>
            <input type="text" id="boardCreateTypeInput">
        </div><br>

        <div>
            <label for="boardCreateDescriptionInput">Description:</label>
        </div>
        <div>
            <textarea id="boardCreateDescriptionInput" type = text name="dboardCreateDescriptionInput" rows="4" cols="20"></textarea>
        </div><br>
        
        <div>
            <button type="button" id="boardPublishButton">Publish!</button>
        </div><br>

        <div id = "messageBox"></div>
    </form>
    `;
    

    // formally recognize our input boxes and the publish button
    const publishButton = document.getElementById("boardPublishButton");
    const nameInput = document.getElementById("boardCreateNameInput");
    const typeInput = document.getElementById("boardCreateTypeInput");
    const descriptionInput = document.getElementById("boardCreateDescriptionInput");
    const messageBoxElement = document.getElementById("messageBox");

    // Add event listener for the publish button
    publishButton.addEventListener("click", function () {
        // if one of the input boxes are blank abort publish and alert user
        if (!nameInput.value || !typeInput.value || !descriptionInput.value) {
            messageBoxElement.innerHTML = "One of the boxes are empty!";

            // autoclear said message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 5000);
        }
        else{
            // create the new board
            wrappedDB.createNewBoard(nameInput.value, typeInput.value, descriptionInput.value);
            

            // rerender our boards now that we have a new board we can show. 
            let middleDisplayBoxElement = document.getElementById("middleDisplayBox");
            middleDisplayBoxElement.innerHTML = "";
            renderBoardGrid(middleDisplayBoxElement, "");

            // inform our user that the board has successfully been created
            messageBoxElement.innerHTML = "Board successfully created!";

            // autoclear said message after 5 seconds
            setTimeout(function() {
                messageBoxElement.innerHTML = "";
            }, 5000);
        }
    });
}