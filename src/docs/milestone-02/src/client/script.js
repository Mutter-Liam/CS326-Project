import { renderHeaderBar } from "./componentScripts/headerBar.js";
import { renderFeedGrid, renderBoardGrid } from "./componentScripts/gridRenderer.js";
import { renderEventCreate } from "./componentScripts/eventCreate.js";
import { renderBoardCreate } from "./componentScripts/boardCreate.js";
import { renderBoardList } from "./componentScripts/boardList.js";
import { renderMap } from "./componentScripts/map.js";
import { renderSettings } from "./componentScripts/settingsDisplay.js";


// use these elements that correspond with the 4 major boxes in our display panels
const headerBarElement = document.getElementById("headerBar");
const leftDisplayBoxElement = document.getElementById("leftDisplayBox");
const middleDisplayBoxElement = document.getElementById("middleDisplayBox");
const rightDisplayBoxElement = document.getElementById("rightDisplayBox");

// the one universal render call: the header
renderHeaderBar(headerBarElement);

// FOR DEBUGGING BEFORE ADDING TRANSITION BUTTONS:

window.changeView = (view) => {
    [leftDisplayBoxElement, middleDisplayBoxElement, rightDisplayBoxElement].forEach(x=>x.innerHTML="");
    switch (view) {
        case 1: // FEED VIEW
            console.log("Rendering Feed View.");
            renderEventCreate(rightDisplayBoxElement);
            renderBoardList(leftDisplayBoxElement, false);
            renderFeedGrid(middleDisplayBoxElement);
            
            break;
        case 2: // MAP VIEW
        console.log("Rendering Map View.");
            renderMap(middleDisplayBoxElement);
            renderEventCreate(rightDisplayBoxElement);
            renderBoardList(leftDisplayBoxElement);
            break;
        case 3: //BOARD VIEW
        console.log("Rendering Board View.");
            renderBoardList(leftDisplayBoxElement, true);
            renderBoardGrid(middleDisplayBoxElement);
            renderBoardCreate(rightDisplayBoxElement);
            break;
        case 4: //SETTINGS VIEW
            console.log("Rendering Settings View.");
            //REPLACE WITH RENDER CALLS
            renderSettings(middleDisplayBoxElement);
            break;
    }
    return true;
}

window.changeView(1);