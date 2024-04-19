// code for the rightHand side of wireframe 3.
import { wrappedDB } from "../dataWrap.js";


export function renderBoardCreate(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    initForm(element);
}

function initForm(element) {

    // inject all of our search bars and buttons to the element
    element.innerHTML = `
    <form>
        <label for="nameInput">Name:</label>
        <input type="text" id="boardCreateNameInput">

        <label for="typeInput">Type:</label>
        <input type="text" id="boardCreateTypeInput">

        <label for="descriptionInput">Description:</label>
        <input type="text" id="boardCreateDescriptionInput">

        <button type="button" id="boardPublishButton">Publish</button>
    </form>
    `;

    const publishButton = document.getElementById("boardPublishButton");
    const nameInput = document.getElementById("boardCreateNameInput");
    const typeInput = document.getElementById("boardCreateTypeInput");
    const descriptionInput = document.getElementById("boardCreateDescriptionInput");

    // Add event listener for the publish button
    publishButton.addEventListener("click", function () {
        // if one of the input boxes are blank abort publish and alert user
        if (!nameInput.value || !typeInput.value || !descriptionInput.value) {
            alert("one of the boxes are empty lol");
        }
        else{
            wrappedDB.createNewBoard(nameInput.value, typeInput.value, descriptionInput.value);
            alert("Board created successfully!");
        }
    });
}