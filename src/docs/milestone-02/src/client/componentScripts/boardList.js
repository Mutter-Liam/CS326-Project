import { wrappedDB } from "../dataWrap.js";

export function renderBoardList(boardListElement, inBoardView) {
    const userId = wrappedDB.getCurrentUser()._id
    console.log(userId)
    const boards = wrappedDB.getUserBoards(userId)
    console.log(boards)
    const boardList = document.getElementById("leftDisplayBox");
    boards.forEach(board => {
        const listDiv = createListDiv(board);
        const button = inBoardView ? createRemoveBox() : createCheckBox();
        listDiv.appendChild(button)
        boardList.appendChild(listDiv)
    });
}

function createListDiv(board){
    const newDiv = document.createElement("div")
    newDiv.classList.add("board-list-item")
    newDiv.innerHTML = board.name
    return newDiv
}

function createRemoveBox(){
    const newButton = document.createElement("button")
    newButton.type = "button"
    newButton.classList.add("remove-button")
    newButton.innerText = "Remove"
    return newButton
}

function createCheckBox(){
    const newCheckBox = document.createElement("input")
    newCheckBox.type = "checkbox"
    newCheckBox.classList.add("board-view-checkbox")
    return newCheckBox
}