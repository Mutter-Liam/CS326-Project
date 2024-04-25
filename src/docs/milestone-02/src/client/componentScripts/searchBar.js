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

//If str1 is contained somewhere in str2 return
export function matchStrings(str1, str2){
    str1 = str1.replace(/\s/g, '');
    str2 = str2.replace(/\s/g, '');
    console.log(str1, str2)
    if (str1.length === 0 || str2.length === 0) return true;
    for (let i = 0; i < str2.length - str1.length + 1; i++){
        let valid = true;
        for (let j = 0; j < str1.length; j++){
            if (str2[i + j] !== str1[j]){
                valid = false;
            }
        }
        if (valid) return true;
    }
    return false;
}

function renderBoardSearchBar(element){
    // inject all of our boxes into the specified element
    element.innerHTML = `
        <label for="boardSearchNameInput">Name of Board: </label>
        <input type="text" id="boardSearchNameInput">
    `;

    const middleDisplayBoxElement = document.getElementById("middleDisplayBox");
    
    // do light styling on the element.
    element.style.textAlign = "center";
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";

    /*
    // add event listeners to rerender the BoardList with our defined input word.
    searchButtonElement.addEventListener("click", function () {
        const input = document.getElementById("boardSearchNameInput");

        renderBoardGrid(middleDisplayBoxElement, input.value);
    });
    // clear the search bar and print every board/
    clearButtonElement.addEventListener("click", function () {
        renderBoardGrid(middleDisplayBoxElement, "");
        
    });*/
    document.getElementById("boardSearchNameInput").addEventListener("input", async (e) => {
        const input =  document.getElementById("boardSearchNameInput").value
        await renderBoardGrid(middleDisplayBoxElement, input)
        document.getElementById("boardSearchNameInput").value = input
        document.getElementById("boardSearchNameInput").focus()
    });
}
// could not program a rubust event searchbar. a title will have to do.
function renderEventSearchBar(element){

    element.style.textAlign = "center";
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    element.innerHTML = `
    <label for="eventSearchNameInput">Name of Event: </label>
    <input type="text" id="eventSearchNameInput">
`;

    const middleDisplayBoxElement = document.getElementById("middleDisplayBox");

    // do light styling on the element.
    element.style.textAlign = "center";
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    }

