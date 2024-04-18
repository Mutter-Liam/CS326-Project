import { renderHeaderBar } from "./componentScripts/headerBar.js";
import { renderFeed } from "./componentScripts/feedGrid.js";
import { renderBoardList } from "./componentScripts/boardList.js";
import { renderEventCreate } from "./componentScripts/eventCreate.js";

const headerBarElement = document.getElementById("headerBar");
const boardListElement = document.getElementById("boardList");
const feedGridElement = document.getElementById("feedGrid");
const createEventElement = document.getElementById("eventCreate");

renderHeaderBar(headerBarElement);
renderBoardList(boardListElement);
renderFeed(feedGridElement);
renderEventCreate(createEventElement);