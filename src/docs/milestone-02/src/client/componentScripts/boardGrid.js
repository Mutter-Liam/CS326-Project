// LEGACY CODE: THIS WAS ORIGINALLY INTENDED FOR THE ENTIRETY OF WIREFRAME 03'S MIDDLE CONTENT BUT THE WRITER (BEN) IS SILLY.
// CONTAINS OLD CODE FOR SEARCH SCAFFOLDING. 
// code for the central box of wireframe 3.

// render the board list
export function renderBoardGrid(element) {
    // clear the content of the element. 
    element.innerHTML = "";

    // first put in our searchbars
    searchBars(element);

}


function searchBars(element) {

    // inject all of our boxes into the specified element
    element.innerHTML = `
    <form>

        <div>
            <label for="boardSearchNameInput">Name:</label>
        </div>
        <div>
            <input type="text" id="boardSearchNameInput">
        </div><br>
        
        
        <div>
            <label for="boardSearchTypeInput">Type:</label>
        </div>
        <div>
            <input type="text" id="boardSearchTypeInput">
        </div> <br>

        <div>
            <button type="button" id="boardSearchButton">Search!</button>
        </div>
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