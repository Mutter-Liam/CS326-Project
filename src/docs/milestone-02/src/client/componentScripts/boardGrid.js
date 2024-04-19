// code list for the central part of wireframe 3.

// render the board list
export function renderBoardGrid(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    // first put in our searchbars
    searchBars(element);

    // invoke some boards without any specification

}


//TODO Incorporate searchbar(s).

function searchBars(element) {
    // Create a form element
    const form = document.createElement("form");

    // Create form elements
    // create search input box
    // will search for boards by name
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name: ";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "nameInput";

    // create search button
    const searchButton = document.createElement("button");
    searchButton.textContent = "Search!";
    searchButton.type = "button";

    // create type input box
    const typeLabel = document.createElement("label");
    typeLabel.textContent = "Type: ";
    const typeInput = document.createElement("input");
    typeInput.type = "text";
    typeInput.id = "typeInput";


    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(searchButton);
    form.appendChild(typeLabel);
    form.appendChild(typeInput);

    element.appendChild(form);

    searchButton.addEventListener("click", function () {
        alert('Whiskey Tango Foxtrot');
    });
}