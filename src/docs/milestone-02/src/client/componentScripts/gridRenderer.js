import { wrappedDB } from "../dataWrap.js";
import { renderBoardList } from "./boardList.js";
import { renderEventDetails } from "./eventDetailRenderer.js";

let feedColumnsCreated = false;
let boardColumnsCreated = false;
let feedColumns = [];
let boardColumns = [];

export function renderFeedGrid(element, filterFunc=()=>true) {
    element.innerHTML = ""
    element.style = "\
        display: grid;\
        grid-template-columns: 33.33% 33.33% 33.33%;\
        overflow-y: scroll;";
    createFeedGridColumns(element);
    const subscribedBoards = wrappedDB.getCurrentUser().subscribedBoards.filter(filterFunc)
    const subscribedEvents = subscribedBoards.map(boardID=>wrappedDB.getBoardEvents(boardID)).flat();
    if (subscribedEvents.length === 0){
        const noEventDiv = document.createElement("div")
        element.style = `
            text-align:center;
        `
        noEventDiv.innerHTML = "<h1>There are currently no events to show</h1>"
        element.appendChild(noEventDiv)
        return
    }
    for (let event in subscribedEvents) {
        // addendum: add on click eventDetailRenderer for every printed event
        const minHeightDiv = feedColumns.reduce((acc, e)=>e.height < acc.height ? e : acc, feedColumns[0]);
        const newPost = createPostDiv(subscribedEvents[event]);
        minHeightDiv.element.appendChild(newPost.div);
        minHeightDiv.height += newPost.height;
        
    }
}
export function renderBoardGrid(element) {
    element.style = "\
        display: grid;\
        grid-template-columns: 33.33% 33.33% 33.33%;\
        ";
    createBoardGridColumns(element);
    const boards = wrappedDB.boards.boards;
    for (let board in boards) {
        const minHeightDiv = boardColumns.reduce((acc, e)=>e.height < acc.height ? e : acc, boardColumns[0]);
        const newPost = createBoardDiv(boards[board]);
        minHeightDiv.element.appendChild(newPost.div);
        minHeightDiv.height += newPost.height;
    }
}

function createPostDiv(event) {
    const newPost = document.createElement("div");
    // ADDENDUM: every newPost can be clicked on to invokke eventDetailRenderer, showing all of the event's details in rightDisplaybox.
    newPost.addEventListener("click", () => renderEventDetails(event));
    newPost.classList.add("feedPost");
    newPost.innerHTML = `<h3>${event.title}</h3><p>${event.description}</p>`;
    return {
        div: newPost,
        height: event.title.length + event.description.length + 50
    }
}

function createBoardDiv(board) {
    const newBoard = document.createElement("div");
    const newButton = document.createElement("button")
    newButton.type = "button"
    newButton.innerText = "+"
    newBoard.classList.add("boardPost");
    newBoard.innerHTML = `<h3>${board.name}</h3><p>${board.description}</p>`;
    newBoard.appendChild(newButton)
    newButton.addEventListener("click", (e) => {
        const user = wrappedDB.getCurrentUser()
        wrappedDB.subscribeUserToBoard(user._id, board._id)
        renderBoardList(document.getElementById("leftDisplayBox"), true)
    })
    return {
        div: newBoard,
        height: board.name.length + board.description.length + 50
    }
}

function createFeedGridColumns(element) {
    feedColumns = [];
    for (let x = 0; x < 3; x++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("feedGridColumn");
        newDiv.style.flex = true;
        newDiv.style.flexDirection = "column";
        element.appendChild(newDiv);
        feedColumns.push({
            element: newDiv,
            height: 0
        });
    }
    feedColumnsCreated = true;
}

function createBoardGridColumns(element) {
    boardColumns = [];
    for (let x = 0; x < 3; x++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("boardGridColumn");
        newDiv.style.flex = true;
        newDiv.style.flexDirection = "column";
        element.appendChild(newDiv);
        boardColumns.push({
            element: newDiv,
            height: 0
        });
    }
    boardColumnsCreated = true;
}