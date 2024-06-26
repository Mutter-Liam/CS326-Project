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

window.changeView = (view, logging=true) => {
    [leftDisplayBoxElement, middleDisplayBoxElement, rightDisplayBoxElement].forEach(x=>x.innerHTML="");
    switch (view) {
        case 1: // FEED VIEW
            if (logging) console.log("Rendering Feed View.");
            renderEventCreate(rightDisplayBoxElement)
            renderFeedGrid(middleDisplayBoxElement, "").then(e =>{
                renderBoardList(leftDisplayBoxElement, false);
            });
            
            break;
        case 2: // MAP VIEW
            if (logging) console.log("Rendering Map View.");
            renderEventCreate(rightDisplayBoxElement);
            renderBoardList(leftDisplayBoxElement);
            renderMap(middleDisplayBoxElement);
            break;
        case 3: //BOARD VIEW
            if (logging) console.log("Rendering Board View.");
            renderBoardGrid(middleDisplayBoxElement);
        console.log("Rendering Board View.");
            renderBoardGrid(middleDisplayBoxElement, "");
            renderBoardCreate(rightDisplayBoxElement);
            renderBoardList(leftDisplayBoxElement, true);
            break;
        case 4: //SETTINGS VIEW
            if (logging) console.log("Rendering Settings View.");
            //REPLACE WITH RENDER CALLS
            renderSettings(middleDisplayBoxElement);
            break;
    }
    return true;
}

document.getElementById("feedBtn").onclick = () => {
    changeView(1, false);
}
document.getElementById("mapBtn").onclick = () => {
    changeView(2, false);
}
document.getElementById("boardsBtn").onclick = () => {
    changeView(3, false);
}
document.getElementById("settingsBtn").onclick = () => {
    changeView(4, false);
}

changeView(2,false);
