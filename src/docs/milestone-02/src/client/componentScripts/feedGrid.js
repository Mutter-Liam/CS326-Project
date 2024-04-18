import { wrappedDB } from "../dataWrap.js";

let columnsCreated = false;
let feedColumns = [];

export function renderFeed(element) {
    element.innerHTML = "";
    if (!columnsCreated) createFeedColumns(element);
    const subscribedEvents = wrappedDB.getCurrentUser().subscribedBoards.map(boardID=>wrappedDB.getBoardEvents(boardID))[0];
    for (let event in subscribedEvents) {
        const minHeightDiv = feedColumns.reduce((acc, e)=>e.height < acc.height ? e : acc, feedColumns[0]);
        const newPost = createPostDiv(subscribedEvents[event]);
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
        height: getHeight(event)
    }
}

function createFeedColumns(element) {
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
    columnsCreated = true;
}

function getHeight(event) {
    let height = event.title.length + event.description.length+50;
    return height;
}