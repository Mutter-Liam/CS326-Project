import { wrappedDB } from "../dataWrap.js";
import { renderBoardList } from "./boardList.js";

let columns = [];

export function renderFeedGrid(element, boardFilterFunc=()=>true) {
    element.innerHTML = ""
    const subscribedBoards = wrappedDB.getCurrentUser().subscribedBoards.filter(boardFilterFunc)
    const subscribedEvents = subscribedBoards.map(boardID=>wrappedDB.getBoardEvents(boardID)).flat();
    const gridDiv = createSearchBar(element);
    createGrid(gridDiv, subscribedEvents, "event");
}
export function renderBoardGrid(element) {
    element.innerHTML = ""
    const boards = wrappedDB.boards.boards;
    const gridDiv = createSearchBar(element);
    createGrid(gridDiv, boards, "board");
}

function createSearchBar(element) {
    element.style = "\
        display: flex;\
        flex-direction: column;\
        max-height: 100%;\
    "
    const searchDiv = document.createElement("div");
    searchDiv.style = "\
    ";
    searchDiv.classList.add("panel");
    searchDiv.innerText = "beep boop\nbop\nberp";
    element.appendChild(searchDiv);
    const gridDiv = document.createElement("div");
    element.appendChild(gridDiv);
    return gridDiv;
}

function createGrid(element, blocks, type) {
    if (createMissing(element, blocks, type)) return;
    createColumns(element);
    addBlocksToGrid(blocks, type);
}

function createMissing(element, blocks, type) {
    if (blocks.length !== 0) return false;
    const noEventDiv = document.createElement("div");
    element.style = `text-align:center;`;
    noEventDiv.innerHTML = `<h1>There are currently no ${type}s to show</h1>`;
    element.appendChild(noEventDiv);
    return true;
}

function createColumns(element) {
    element.style = "\
        display: grid;\
        grid-template-columns: 33.33% 33.33% 33.33%;\
        overflow-y: scroll;\
        margin: 5px;\
        border: solid;\
        flex-grow: 1;\
    ";
    columns = [];
    for (let x = 0; x < 3; x++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("gridColumn");
        newDiv.style.flex = true;
        newDiv.style.flexDirection = "column";
        element.appendChild(newDiv);
        columns.push({
            element: newDiv,
            height: 0
        });
    }
}

function addBlocksToGrid(blocks, type) {
    for (let block in blocks) {
        const minHeightDiv = columns.reduce((acc, e)=>e.height < acc.height ? e : acc, columns[0]);
        let newPost;
        if (type==="board") newPost = createBoardDiv(blocks[block]);
        if (type==="event") newPost = createPostDiv(blocks[block]);
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