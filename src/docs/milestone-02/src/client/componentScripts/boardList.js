import { wrappedDB } from "../dataWrap.js";
import { renderFeedGrid } from "./gridRenderer.js";

export async function renderBoardList(boardListElement, inBoardView) {
    boardListElement.innerHTML = "";
    let userID;
    let boards;
    let boardList;
    let middleDisplayBoxElement;
    try{
        userID = (await wrappedDB.getCurrentUser())._id;
        boards = await wrappedDB.getUserBoards(userID);
        boardList = document.getElementById("leftDisplayBox");
        middleDisplayBoxElement = document.getElementById("middleDisplayBox");
    }
    catch(e){
        console.log("Something went wrong in renderBoardList", e)
        const error = document.createElement("div")
        error.innerHTML = `<h2>No Boards To Show</h2>`
        document.getElementById("leftDisplayBox").appendChild(error)
        return
    }
    let buttonList = []
    boards.forEach(board => {
        const listDiv = createListDiv(board);
        const button = inBoardView ? createRemoveBox(board, boardListElement) : createCheckBox(board, boardListElement);
        if(!inBoardView) {buttonList.push(button)}
        listDiv.appendChild(button);
        boardList.appendChild(listDiv);
    });
    
    function renderingList(bID){
        const checked = []
        let i = 0
        buttonList.forEach(b =>{
            if (b.checked){
                checked.push(boards[i]._id)
            }
            i++
        })
        return checked.includes(bID)
    }
    buttonList.forEach(b => b.addEventListener("change",() => renderFeedGrid(middleDisplayBoxElement, renderingList)))

    // small addedum to refresh the events feed if a new event if published.
    if (!inBoardView){
        const eventBroadcastButtonElement = document.getElementById("eventBroadcastButton");
        eventBroadcastButtonElement.addEventListener("click", () => renderFeedGrid(middleDisplayBoxElement, renderingList));
    }
}

function createListDiv(board){
    const newDiv = document.createElement("div");
    newDiv.classList.add("board-list-item");
    newDiv.innerHTML = board.name;
    return newDiv;
}

function createRemoveBox(board, boardListElement){
    const newButton = document.createElement("button");
    newButton.type = "button";
    newButton.classList.add("remove-button");
    newButton.innerText = "Remove";
    newButton.addEventListener("click", async (e) =>{
        await wrappedDB.unsubscribeUserFromBoard((await wrappedDB.getCurrentUser())._id, board._id)
        renderBoardList(boardListElement, true)
    })  
    return newButton;
}

function createCheckBox(board, boardListElement){
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.classList.add("board-view-checkbox");
    newCheckBox.checked = true
    return newCheckBox;
}