// code list for the central part of wireframe 3.

// render the board list
export function renderBoardGrid(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    // first put in our searchbars
    searchBars(element);

    // invoke some boards without any specification

}


function searchBars(element) {


    element.innerHTML = `
    <form>
        <label for="nameInput">Name:</label>
        <input type="text" id="boardSearchNameInput">

        <label for="typeInput">Type:</label>
        <input type="text" id="boardSearchTypeInput">

        <button type="button" id="boardSearchButton">Search!</button>
    </form>
    `;

    let searchButton = document.getElementById("boardSearchButton");

    searchButton.addEventListener("click", function () {
        alert('Whiskey Tango Foxtrot');
    });
}