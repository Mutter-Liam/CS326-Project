import { renderHeaderBar } from "./componentScripts/headerBar.js";
import { renderFeedGrid, renderBoardGrid } from "./componentScripts/gridRenderer.js";
import { renderBoardList } from "./componentScripts/boardList.js";
import { renderEventCreate } from "./componentScripts/eventCreate.js";

const headerBarElement = document.getElementById("headerBar");
const boardListElement = document.getElementById("boardList");
const feedGridElement = document.getElementById("feedGrid");
const boardGridElement = document.getElementById("boardGrid");
const createEventElement = document.getElementById("eventCreate");

let feedView = false; //Toggles board grid and feed grid

renderHeaderBar(headerBarElement);
renderBoardList(boardListElement);
if (feedView) renderFeedGrid(feedGridElement);
else renderBoardGrid(boardGridElement)
renderEventCreate(createEventElement);