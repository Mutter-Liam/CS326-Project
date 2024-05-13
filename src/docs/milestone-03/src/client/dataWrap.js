// Class for interfacing with the backend

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function putData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


class UserCollection {
    static nextId = 0;
    users = {}
    async addUser(name, email) {
        let newUser = new User(name, email);
        newUser._id = UserCollection.nextId;
        UserCollection.nextId += 1;
        this.users[newUser._id] = newUser;
        return newUser._id;
    }
    async getUser(id) {return this.users[id];}
}
class User {
    constructor(name, email) {
        this.username = name;
        this.email = email;
        this.karma = 0;
        this.subscribedBoards = [];
        this.eventsCreated = [];
        this.eventsAttending = [];
    }
}

class BoardCollection {
    static nextId = 0;
    boards = {}
    async addBoard(name, type, description) {
        let newBoard = new Board(name, type, description);
        newBoard._id = BoardCollection.nextId;
        BoardCollection.nextId += 1;
        this.boards[newBoard._id] = newBoard;
        return newBoard._id;
    }
    async getBoard(id) {return this.boards[id];}
}
class Board {
    constructor(name, type, description) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.subscribedUsers = [];
        this.events = [];
    }
}

class EventCollection {
    static nextId = 0;
    events = {}
    async addEvent(author, title, description, startTime, endTime, location, board) {
        let newEvent = new Event(author, title, description, startTime, endTime, location, board);
        newEvent._id = EventCollection.nextId;
        EventCollection.nextId += 1;
        this.events[newEvent._id] = newEvent;
        return newEvent._id;
    }
    async getEvent(id) {return this.events[id];}
}
class Event {
    constructor(author, title, description, startTime, endTime, location, board) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.board = board;
    }
}

export class DataWrap {static #instance = null;
    static dataWrap() {
      if (DataWrap.#instance === null) DataWrap.#instance = new DataWrap();
      return DataWrap.#instance;
    }
    constructor() {
        this.users = new UserCollection();
        this.boards = new BoardCollection();
        this.events = new EventCollection();
    }

    // ---- Current User functions ----
    async getCurrentUser() {
        return await this.users.getUser(0);
    }

    // ---- Creating and Manipulating ----

    async subscribeUserToBoard(userID, boardID) {
        await putData('/subscribe-to-board', {"user": userID, "board": boardID})
    }

    async unsubscribeUserFromBoard(userID, boardID){
        await putData('/unsubscribe-to-board', {"user": userID, "board": boardID})
    }

    async createNewEvent(userID, title, description, startTime, endTime, location, boardID) {
        const data = {"user": userID, "title": title, "description":description, "startTime":startTime, "endTime":endTime, "location":location, "board": boardID}
        await postData('/create-new-event', data)
    }
    
    async createNewBoard(name, type, description){
        await postData('/create-new-board', {"name":name, "type":type, "description":description})
    }

    // ---- User based functions ----
    async getUser(id) {
        return await this.users.getUser(id);
    }
    async getUserBoards(id) {
        return await postData('/get-user-boards',{"user": id})
    }
    async getUserEvents(id) {
        return await postData('/get-user-events',{"user": id})
    }

    // ---- Board based functions ----
    async getBoard(id) {
        return await postData('/get-board',{"board": id})
    }
    async getBoardUsers(id) {
        return await postData('/get-board-users',{"board": id})
    }
    async getBoardEvents(id) {
        return await postData('/get-board-events',{"board": id})
    }
    async getAllBoards (){
        return await fetch('/get-all-boards').then(r =>{
            if (r.ok){
                return r.json()
            }
            return Promise.reject(new Error("Could not fetch all boards"))
        })
    }

    // ---- Event based functions ----
    async getEvent(id) {
        return await postData('/get-event',{"event": id})
    }
    async getEventAttendees(id) {
        return await postData('/get-event-attendees',{"event": id})
    }
    async getEventBoard(id) {
        return await postData('/get-event-board',{"event": id})
    }
}

export const wrappedDB = DataWrap.dataWrap();

wrappedDB.users.addUser("Keith", "keith@voltron.org");
wrappedDB.users.addUser("Pidge", "pidge@voltron.org");

wrappedDB.boards.addBoard("Universal Threats 1", "Physical Activity","Robeasts that need fighting 2");
wrappedDB.boards.addBoard("Universal Threats 2", "Physical Activity","Robeasts that need fighting 2");
wrappedDB.boards.addBoard("CS326", "Schoolwork","Web programming with Tim Richards");
wrappedDB.boards.addBoard("CS311", "Schoolwork", "Introduction to algorithms");

wrappedDB.subscribeUserToBoard(0,0);
wrappedDB.subscribeUserToBoard(0,1);
wrappedDB.subscribeUserToBoard(1,0);
wrappedDB.subscribeUserToBoard(0,2);

wrappedDB.createNewEvent(0,"Goose Monster on the Loose","Dangerous activity near campus pond.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Ducks","J'accuse!",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster2 on the Loose","Dangerous activity near campus pond.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster3 on the Loose","Do not approach.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster3 on the Loose","Do not approach.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Moose","Dangerous activity near campus pond. Beware of antlers, and stay far away even if there is a tornado.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster5 on the Loose","Sticks very effective at close range.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster6 on the Loose","Dangerous activity near campus pond.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster8 on the Loose","Dangerous activity near campus pond.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(1,"326 Crunch Time!", "Join team Voltron for a last minute crunch session for the project's second milestone", new Date("04-24-2025"),new Date("04-24-2025"),"Amherst, Massachusetts", 1);
wrappedDB.createNewEvent(1,"Cry about exam grades", "Hosting a communal waiting session as we wait in fear of exam grade releases", new Date("04-25-2025"),new Date("04-25-2025"),"Amherst, Massachusetts", 3);