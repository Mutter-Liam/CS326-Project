// code for the central box of wireframe 3.

// render the board list
export function renderBoardGrid(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    // first put in our searchbars
    searchBars(element);

    // display boards
    // Assuming this is going to you, Sandro

}


function searchBars(element) {

    // inject all of our boxes into the specified element
    element.innerHTML = `
    <form>
        <label for="nameInput">Name:</label>
        <input type="text" id="boardSearchNameInput">

        <label for="typeInput">Type:</label>
        <input type="text" id="boardSearchTypeInput">

        <button type="button" id="boardSearchButton">Search!</button>
    </form>
    `;

    // formally recognize our searchButton
    let searchButton = document.getElementById("boardSearchButton");

    // Add event listener to searchButton
    // TODO: make it search for real. 
    searchButton.addEventListener("click", function () {
        alert('Whiskey Tango Foxtrot');
    });
}