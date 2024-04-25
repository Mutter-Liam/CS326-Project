import { wrappedDB } from "../dataWrap.js";
import { renderFeedGrid } from "./gridRenderer.js";

export async function renderBoardList(boardListElement, inBoardView) {
    boardListElement.innerHTML = "";
    const userId = (await wrappedDB.getCurrentUser())._id;
    const boards = (await  wrappedDB.getUserBoards(userId));
    const boardList = document.getElementById("leftDisplayBox");
    const middleDisplayBoxElement = document.getElementById("middleDisplayBox");
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
    buttonList.forEach(b => b.addEventListener("change",() => renderFeedGrid(middleDisplayBoxElement, "", renderingList)))

    // small addedum to refresh the events feed if a new event if published.
    if (!inBoardView){
        const eventBroadcastButtonElement = document.getElementById("eventBroadcastButton");
        eventBroadcastButtonElement.addEventListener("click", () => renderFeedGrid(middleDisplayBoxElement, "", renderingList));
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
    newButton.addEventListener("click", (e) =>{
        wrappedDB.unsubscribeUserFromBoard(wrappedDB.getCurrentUser()._id, board._id)
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