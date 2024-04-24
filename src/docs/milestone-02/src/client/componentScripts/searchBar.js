import { renderBoardGrid } from "./gridRenderer.js";

// chose which searchbar to render.
export function renderSearchBar(element, inBoardView) {
    if (inBoardView){
        renderBoardSearchBar(element);
    }
    else{
        renderEventSearchBar(element);
    }
}

function renderBoardSearchBar(element){
    // inject all of our boxes into the specified element
    element.innerHTML = `
        <label for="boardSearchNameInput">Name of Board:</label>
        <input type="text" id="boardSearchNameInput">
        <button id="boardSearchButton">Search!</button>
        <button id="boardSearchClearButton">Clear</button>
    `;

    // formally recognize our buttons
    const searchButtonElement = document.getElementById("boardSearchButton");
    const clearButtonElement = document.getElementById("boardSearchClearButton");
    const middleDisplayBoxElement = document.getElementById("middleDisplayBox");
    
    // do light styling on the element.
    element.style.textAlign = "center";
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";

    
    // add event listeners to rerender the BoardList with our defined input word.
    searchButtonElement.addEventListener("click", function () {
        const input = document.getElementById("boardSearchNameInput");

        renderBoardGrid(middleDisplayBoxElement, input.value);
    });
    // clear the search bar and print every board/
    clearButtonElement.addEventListener("click", function () {
        renderBoardGrid(middleDisplayBoxElement, "");
    });

    
}

// could not program a rubust event searchbar. a title will have to do.
function renderEventSearchBar(element){
    element.innerHTML = `
    <h1>Events View</h1>
    `;
    element.style.textAlign = "center";
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
}