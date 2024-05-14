// Class for interfacing with the backend

async function sendRequest(url = "", method="GET", data = {}) {
    // Default options are marked with *
    if (method === "GET") {
        url += "?"
        Object.entries(data).forEach(x=>{
            url+=`${x[0]}=${JSON.stringify(x[1])}`;
        });
    }
    let request = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: method==="GET" ? null : JSON.stringify(data), // body data type must match "Content-Type" header
    };
    const response = await fetch(url, request);
    return response.json(); // parses JSON response into native JavaScript objects
}

export class DataWrap {static #instance = null;
    static dataWrap() {
      if (DataWrap.#instance === null) DataWrap.#instance = new DataWrap();
      return DataWrap.#instance;
    }

    // ---- Current User functions ----
    async getCurrentUser() {
        return await this.getUser(this.getCurrentUserID());
    }

    getCurrentUserID() {
        return 0;
    }

    // ---- Creating and Manipulating ----

    async subscribeUserToBoard(boardID) {
        await sendRequest('/subscribe-to-board', "PUT", {"user": this.getCurrentUserID(), "board": boardID});
    }

    async unsubscribeUserFromBoard(boardID){
        await sendRequest('/unsubscribe-to-board', "PUT", {"user": this.getCurrentUserID(), "board": boardID});
    }

    async attendUserToEvent(eventID) {
        await sendRequest('/attend-event', "PUT", {"user": this.getCurrentUserID(), "event": eventID});
    }

    async unattendUserFromEvent(eventID){
        await sendRequest('/unattend-event', "PUT", {"user": this.getCurrentUserID(), "event": eventID});
    }

    async createNewEvent(title, description, startTime, endTime, location, boardID) {
        const data = {"user": this.getCurrentUserID(), "title": title, "description":description, "startTime":startTime, "endTime":endTime, "location":location, "board": boardID};
        const response = await sendRequest('/create-new-event', "POST", data);
        return response.data;
    }
    
    async createNewUser(name, email){
        const response = await sendRequest('/create-new-user', "POST", {"name":name, "email": email});
        return response.data;
    }
    
    async createNewBoard(name, type, description){
        const response = await sendRequest('/create-new-board', "POST", {"name":name, "type":type, "description":description, "author": this.getCurrentUserID()});
        return response.data;
    }

    // ---- User based functions ----
    async getUser(id) {
        const response = await sendRequest('/get-user', "GET", {"id": id});
        return response.data;
    }
    async getUserBoards() {
        const response = await sendRequest('/get-user-boards', "GET", {"id": this.getCurrentUserID()});
        return response.data;
    }
    async getUserEvents() {
        const response = await sendRequest('/get-user-events', "GET", {"id": this.getCurrentUserID()});
        return response.data;
    }

    // ---- Board based functions ----
    async getBoard(id) {
        const response = await sendRequest('/get-board', "GET", {"id": id});
        return response.data;
    }
    async getBoardUsers(id) {
        const response = await sendRequest('/get-board-users', "GET", {"id": id});
        return response.data;
    }
    async getBoardEvents(id) {
        const response = await sendRequest('/get-board-events', "GET", {"id": id});
        return response.data;
    }
    async getAllBoards (){
        const response = await sendRequest('/get-board-list', "GET", {"options": {}});
        return response.data;
    }

    // ---- Event based functions ----
    async getEvent(id) {
        const response = await sendRequest('/get-event', "GET", {"id": id});
        return response.data;
    }
    async getEventAttendees(id) {
        const response = await sendRequest('/get-event-attendees', "GET", {"id": id});
        return response.data;
    }
    async getEventBoard(id) {
        const response = await sendRequest('/get-event-board', "GET", {"id": id});
        return response.data;
    }
}

export const wrappedDB = DataWrap.dataWrap();