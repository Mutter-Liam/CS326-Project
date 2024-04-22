import { renderHeaderBar } from "./componentScripts/headerBar.js";
import { renderFeedGrid, renderBoardGrid } from "./componentScripts/gridRenderer.js";
import { renderBoardList } from "./componentScripts/boardList.js";
import { renderEventCreate } from "./componentScripts/eventCreate.js";
import { renderMap } from "./componentScripts/map.js";

const headerBarElement = document.getElementById("headerBar");
const boardListElement = document.getElementById("boardList");
const feedGridElement = document.getElementById("feedGrid");
const boardGridElement = document.getElementById("boardGrid");
const createEventElement = document.getElementById("eventCreate");
const map = document.getElementById("map");

let view = 'map';

renderHeaderBar(headerBarElement);
renderBoardList(boardListElement);
if (view === 'map') renderMap(map);
if (view === 'feed') renderFeedGrid(feedGridElement);
if (view === 'boards') renderBoardGrid(boardGridElement);
renderEventCreate(createEventElement);