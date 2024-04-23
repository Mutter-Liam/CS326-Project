// code for the rightHandDisplayBox of wireframe 3.
import { wrappedDB } from "../dataWrap.js";
import { renderBoardGrid, renderFeedGrid } from "./gridRenderer.js";


export function renderBoardCreate(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    // init the form into the element.
    initForm(element);
}

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
        </div>
        
    </form>
    `;
    

    // formally recognize our input boxes and the publish button
    const publishButton = document.getElementById("boardPublishButton");
    const nameInput = document.getElementById("boardCreateNameInput");
    const typeInput = document.getElementById("boardCreateTypeInput");
    const descriptionInput = document.getElementById("boardCreateDescriptionInput");

    // Add event listener for the publish button
    publishButton.addEventListener("click", function () {
        // if one of the input boxes are blank abort publish and alert user
        if (!nameInput.value || !typeInput.value || !descriptionInput.value) {
            alert("One of the boxes are empty!");
        }
        else{
            // else create a new board and inform user 
            wrappedDB.createNewBoard(nameInput.value, typeInput.value, descriptionInput.value);
            alert("Board created successfully!");
            // rerender our boards now that we have a new board we can show. 
            let middleDisplayBoxElement = document.getElementById("middleDisplayBox");
            middleDisplayBoxElement.innerHTML = "";
            renderBoardGrid(middleDisplayBoxElement);
        }
    });
}