import { wrappedDB } from "../dataWrap.js";
import { renderEventDetails } from "./eventDetailRenderer.js";
import { matchStrings, renderSearchBar } from "./searchBar.js";

let columns = [];

// Function to render the feed grid
export async function renderFeedGrid(element, filterName, boardFilterFunc=()=>true) {
    element.innerHTML = ""
    let subscribedBoards = (await wrappedDB.getUserBoards()).filter(boardFilterFunc);
    let subscribedEvents = (await Promise.all(subscribedBoards.map(async b => await wrappedDB.getBoardEvents(b)))).flat();
    const gridDiv = createSearchBar(element, false);
    const middleDisplayBoxElement = document.getElementById("middleDisplayBox")
    const searchInput = document.getElementById("eventSearchNameInput")
    searchInput.addEventListener("input", async (e) => {
        const input = document.getElementById("eventSearchNameInput").value
        await renderFeedGrid(middleDisplayBoxElement, input, boardFilterFunc)
        document.getElementById("eventSearchNameInput").value = input
        document.getElementById("eventSearchNameInput").focus()
    });

    subscribedEvents = subscribedEvents.filter((event) => {
        return (matchStrings(filterName.toLowerCase(), event.title.toLowerCase()) || matchStrings(filterName.toLowerCase(), event.description.toLowerCase())) 
    })
    createGrid(gridDiv, subscribedEvents, "event");
}

let boardListUpdater;

// Function to render the board grid
export async function renderBoardGrid(element, filterName, rerenderBoardList) {
    boardListUpdater = rerenderBoardList;
    element.innerHTML = "";
    let boards;
    try{
        boards = await wrappedDB.getAllBoards();
    }
    catch (e) {
        console.log("Something went wrong in renderBoardGrid:", e)
        createMissing(document.getElementById("leftDisplayBox"), [], "events")
        return
    }

    let filteredBoards = {}
    // filter out Boards based on filter Name
    Object.keys(boards).forEach(board => {
        if (matchStrings(filterName.toLowerCase(), boards[board].name.toLowerCase())){
            filteredBoards[board] = boards[board];
        }
    });

    const gridDiv = createSearchBar(element, true);
    createGrid(gridDiv, filteredBoards, "board");
}

// Function to create the search bar
function createSearchBar(element, inBoardView) {
    element.classList.add("gridAndSearchContainer");
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("panel","searchbar");
    element.appendChild(searchDiv);
    if (inBoardView){
        renderSearchBar(searchDiv, true);
    }
    else{
        renderSearchBar(searchDiv, false);
    }
    const gridDiv = document.createElement("div");
    element.appendChild(gridDiv);
    return gridDiv;
}

// Function to create the grid
function createGrid(element, blocks, type) {
    if (createMissing(element, blocks, type)) return;
    createColumns(element);
    addBlocksToGrid(blocks, type);
}

// Function to create missing message if no blocks are present
function createMissing(element, blocks, type) {
    if (blocks.length !== 0) return false;
    const noEventDiv = document.createElement("div");
    element.style = `text-align:center;`;
    noEventDiv.innerHTML = `<h1>There are currently no ${type}s to show</h1>`;
    element.appendChild(noEventDiv);
    return true;
}

// Function to create columns for the grid
function createColumns(element) {
    element.classList.add("columnsContainer");
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

// Function to add blocks to the grid
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
    // addendum -- render Event details when event is clicked
    newPost.addEventListener("click", () => renderEventDetails(event));
    return {
        div: newPost,
        height: event.title.length + event.description.length + 50
    }
}

// Function to create a post div for an event
function createBoardDiv(board) {
    const newBoard = document.createElement("div");
    const newButton = document.createElement("button")
    newButton.type = "button"
    newButton.innerText = "+"
    newBoard.classList.add("boardPost");
    newBoard.innerHTML = `<h3>${board.name}</h3><p>${board.description}</p>`;
    newBoard.appendChild(newButton)
    newButton.addEventListener("click", async (e) => {
        try{
            await wrappedDB.subscribeUserToBoard(board._id);
            await boardListUpdater();
        }
        catch(e){
            alert("Failed to Subscribe!")
            console.log(e);
        }
    })
    return {
        div: newBoard,
        height: board.name.length + board.description.length + 50
    }
}