// code for the rightHand side of wireframe 3.
import { wrappedDB } from "../dataWrap.js";


export function renderBoardCreate(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    initForm(element);
}

function initForm(element) {
    // Locate the #boardCreate div
    const boardCreateDiv = element

    // Create a form element
    const form = document.createElement("form");

    // Create form elements
    // create Name input box
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "nameInput";

    // create type input box
    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Type:";
    const typeInput = document.createElement("input");
    typeInput.type = "text";
    typeInput.id = "typeInput";

    // create description input box
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.id = "descriptionInput";

    const publishButton = document.createElement("button");
    publishButton.textContent = "Publish";
    publishButton.type = "button";

    // Append all elements to the form
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(typeLabel);
    form.appendChild(typeInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(publishButton);

    // Append the form to the element
    boardCreateDiv.appendChild(form);

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