import { renderHeaderBar } from "./componentScripts/headerBar.js";
import { renderBoardGrid } from "./componentScripts/boardGrid.js";
import { renderEventCreate } from "./componentScripts/eventCreate.js";
import { renderBoardCreate } from "./componentScripts/boardCreate.js";
import { renderMyBoardlist } from "./componentScripts/boardList.js";


// use these elements that correspond with the 4 major boxes in our display panels
const headerBarElement = document.getElementById("headerBar");
const leftDisplayBoxElement = document.getElementById("leftDisplayBox");
const middleDisplayBoxElement = document.getElementById("middleDisplayBox");
const rightDisplayBoxElement = document.getElementById("rightDisplayBox");

// the one universal render call: the header
renderHeaderBar(headerBarElement);

// FOR DEBUGGING BEFORE ADDING TRANSITION BUTTONS: 
// JUST UNCOMMENT THE ITEMS UNDER THE WIREFRAME YOU WANT TO LOOK AT. 

// Render calls for wireframe01
/*
    ADD FEED RENDERS HERE
    exampleRender(leftDisplayBoxElement);
    exampleRender(middleDisplayBoxElement);
    exampleRender(rightDisplayBoxElement);
*/


// Render calls for wireframe02
/*
    ADD MAP RENDERS HERE
    exampleRender(leftDisplayBoxElement);
    exampleRender(middleDisplayBoxElement);
    exampleRender(rightDisplayBoxElement);
*/

// Render calls for wireframe03
/*
    renderMyBoardlist(leftDisplayBoxElement);
    renderBoardGrid(middleDisplayBoxElement);
    renderBoardCreate(rightDisplayBoxElement);
*/


// Render calls for wireframe 04
/*
    ADD SETTINGS RENDERING HERE(?)
*/
