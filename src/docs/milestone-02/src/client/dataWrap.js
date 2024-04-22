// Class for interfacing with the backend

class UserCollection {
    static nextId = 0;
    users = {}
    addUser(name, email) {
        let newUser = new User(name, email);
        newUser._id = UserCollection.nextId;
        UserCollection.nextId += 1;
        this.users[newUser._id] = newUser;
        return newUser._id;
    }
    getUser(id) {return this.users[id];}
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
    addBoard(name, type, description) {
        let newBoard = new Board(name, type, description);
        newBoard._id = BoardCollection.nextId;
        BoardCollection.nextId += 1;
        this.boards[newBoard._id] = newBoard;
        return newBoard._id;
    }
    getBoard(id) {return this.boards[id];}
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
    addEvent(author, title, description, startTime, endTime, location, board) {
        let newEvent = new Event(author, title, description, startTime, endTime, location, board);
        newEvent._id = EventCollection.nextId;
        EventCollection.nextId += 1;
        this.events[newEvent._id] = newEvent;
        return newEvent._id;
    }
    getEvent(id) {return this.events[id];}
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
    getCurrentUser() {
        return this.users.getUser(0);
    }

    // ---- Creating and Manipulating ----

    subscribeUserToBoard(userID, boardID) {
        this.getUser(userID).subscribedBoards.push(boardID);
        this.getBoard(boardID).subscribedUsers.push(userID);
    }

    unsubscribeUserFromBoard(userID, boardID){
        const user = this.getUser(userID)
        const board = this.getBoard(boardID)
        user.subscribedBoards = user.subscribedBoards.filter(x => x !== boardID)
        board.subscribedUsers = board.subscribedUsers.filter(x => x !== userID)
    }

    createNewEvent(userID, title, description, startTime, endTime, location, boardID) {
        const newEventID = this.events.addEvent(userID, title, description, startTime, endTime, location, boardID);
        this.getUser(userID).eventsCreated.push(newEventID);
        this.getBoard(boardID).events.push(newEventID);
    }
    
    createNewBoard(name, type, description){
        const newEvent = this.boards.addBoard(name, type, description);
    }

    // ---- User based functions ----
    getUser(id) {
        return this.users.getUser(id);
    }
    getUserBoards(id) {
        return this.getUser(id).subscribedBoards.map((x)=>this.getBoard(x));
    }
    getUserEvents(id) {
        return this.getUser(id).eventsCreated.map((x)=>this.getEvent(x));
    }

    // ---- Board based functions ----
    getBoard(id) {
        return this.boards.getBoard(id);
    }
    getBoardUsers(id) {
        return this.getBoard(id).subscribedUsers.map((x)=>this.getUser(x));
    }
    getBoardEvents(id) {
        return this.getBoard(id).events.map((x)=>this.getEvent(x));
    }

    // ---- Event based functions ----
    getEvent(id) {
        return this.events.getEvent(id);
    }
    getEventAttendees(id) {
        return this.getEvent(id).attendees.map((x)=>this.getUser(x));
    }
    getEventBoard(id) {
        return getBoard(this.getEvent(id).board);
    }
}

export const wrappedDB = DataWrap.dataWrap();

wrappedDB.users.addUser("Keith", "keith@voltron.org");
wrappedDB.users.addUser("Pidge", "pidge@voltron.org");

wrappedDB.boards.addBoard("Universal Threats 1", "Physical Activity","Robeasts that need fighting 2");
wrappedDB.boards.addBoard("Universal Threats 2", "Physical Activity","Robeasts that need fighting 2");

wrappedDB.subscribeUserToBoard(0,0);
wrappedDB.subscribeUserToBoard(0,1);
wrappedDB.subscribeUserToBoard(1,0);

wrappedDB.createNewEvent(0,"Goose Monster on the Loose","Dangerous activity near campus pond.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Ducks","J'accuse!",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster2 on the Loose","Dangerous activity near campus pond.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster3 on the Loose","Do not approach.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster3 on the Loose","Do not approach.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Moose","Dangerous activity near campus pond. Beware of antlers, and stay far away even if there is a tornado.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster5 on the Loose","Sticks very effective at close range.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster6 on the Loose","Dangerous activity near campus pond.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",0);
wrappedDB.createNewEvent(0,"Goose Monster8 on the Loose","Dangerous activity near campus pond.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"News from Goodsprings","A package courier found shot in the head near Goodsprings has reportedly regained consciousness and made a full recovery.", new Date("10-19-2281"),new Date("10-19-2281"),"Goodsprings, Nevada",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);
wrappedDB.createNewEvent(0,"Overflow Test","Dangerous activity near campus pon.",new Date("04-04-2024"),new Date("04-04-2024"),"Campus Pond",1);