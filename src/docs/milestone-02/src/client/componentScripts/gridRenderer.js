import { wrappedDB } from "../dataWrap.js";

let feedColumnsCreated = false;
let boardColumnsCreated = false;
let feedColumns = [];
let boardColumns = [];

export function renderFeedGrid(element, filterFunc=()=>true) {
    element.innerHTML = ""
    element.style = "\
        display: grid;\
        grid-template-columns: 33.33% 33.33% 33.33%;\
        overflow-y: scroll;\
        max-height:80%;";
    createFeedGridColumns(element);
    const subscribedBoards = wrappedDB.getCurrentUser().subscribedBoards.filter(filterFunc)
    const subscribedEvents = subscribedBoards.map(boardID=>wrappedDB.getBoardEvents(boardID)).flat();
    for (let event in subscribedEvents) {
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
    newPost.classList.add("feedPost");
    newPost.innerHTML = `<h3>${event.title}</h3><p>${event.description}</p>`;
    return {
        div: newPost,
        height: event.title.length + event.description.length + 50
    }
}

function createBoardDiv(board) {
    const newBoard = document.createElement("div");
    newBoard.classList.add("boardPost");
    newBoard.innerHTML = `<h3>${board.name}</h3><p>${board.description}</p>`;
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