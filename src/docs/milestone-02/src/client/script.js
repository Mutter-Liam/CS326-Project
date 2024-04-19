import { renderHeaderBar } from "./componentScripts/headerBar.js";
//import { renderFeed } from "./componentScripts/feedGrid.js";
import { renderBoardGrid } from "./componentScripts/boardGrid.js";
import { renderEventCreate } from "./componentScripts/eventCreate.js";
import { renderBoardCreate } from "./componentScripts/boardCreate.js";

const headerBarElement = document.getElementById("headerBar");
const boardGridElement = document.getElementById("boardGrid");
const feedGridElement = document.getElementById("feedGrid");
const createEventElement = document.getElementById("eventCreate");
const boardCreateElement = document.getElementById("boardCreate");

renderHeaderBar(headerBarElement);
renderBoardGrid(boardGridElement);
//renderFeed(feedGridElement);
renderEventCreate(createEventElement);
renderBoardCreate(boardCreateElement);