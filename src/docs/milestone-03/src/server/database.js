import PouchDB from "pouchdb";

// Pouch DB docs here: https://pouchdb.com/

const EVENTS = "events"
const USERS = "users"
const BOARDS = "boards"

const OK = "ok"
const ERROR = "error"

/**
 * Initializes a PouchDB database with specified collections if they do not
 * exist.
 *
 * This function creates a new PouchDB instance with the given database name. It
 * attempts to retrieve collections for 'events', 'boards', and 'users'. If these
 * collections do not exist, it creates them with initial empty arrays.
 *
 */
const initDB = async () => {
  // Initialize the database if it doesn't exist
  const events = new PouchDB(EVENTS);
  await events.close();
  const users = new PouchDB(USERS);
  await users.close();
  const boards = new PouchDB(BOARDS);
  await boards.close();
};

const tryOp = (f) => {
  try {
    const result = f();
    return {status: OK, data: result};
  } catch (e) {
    return {status: ERROR, error:e};
  }
}

let nextIDs = {
  [EVENTS]: 0,
  [USERS]: 0,
  [BOARDS]: 0
}

const nextId = (collection) => {
  const newID = nextIDs[collection];
  nextIDs[collection] += 1;
  return newID;
}

/**
 * Factory function to create a database instance using PouchDB for managing
 * our actual database.
 *
 * This function initializes a database with the given name if it does not
 * already exist. It provides methods to CRUD.
 * The database is re-instantiated with each method call to
 * ensure that the most recent data is used.
 *
 * @returns {object} An object containing methods to interact with the database
 */
const Database = async () => {
  // Initialize the database
  await initDB();

  /**
   * Helper function to create a new PouchDB instance.
   * @returns {PouchDB} A new PouchDB instance connected to the specified
   * collection.
   */
  const getCollection = (collection) => new PouchDB(collection);

  const obj = {

    /**
     * getEventByID
     * 
     * Returns an event given its ID number
     *
     * @author: Benjamin Wong
     * @param { Integer } ID, the ID number of the requested board.
     * @return { Promise } That resolves to the event and its data if it is found, or an error informing otherwise.
     */
    getEventByID: (ID) => {
      const eventsCollection = getCollection(EVENTS);
      const result = tryOp(()=>eventsCollection.get(ID));
      eventsCollection.close();
      return result;
    },


    /**
     * getBoardByID
     * 
     * Returns an board given its ID number.
     *
     * @author: Benjamin Wong
     * @param { Integer } ID, the ID number of the requested board.
     * @return { Promise } That resolves to the board and its data if it is found, or an error informing otherwise.
     */
    getBoardByID: (ID) => {
      const boardsCollection = getCollection(BOARDS);
      const result = tryOp(()=>boardsCollection.get(ID));
      boardsCollection.close();
      return result;
    },


    /**
     * getUserByID
     * 
     * Returns a user given their ID number.
     *
     * @author: Benjamin Wong
     * @param { Integer } ID, the ID number of the requested board.
     * @return { Promise } That resolves to the user and its data if it is found, or an error informing otherwise.
     */
    getUserByID: (ID) => {
      const usersCollection = getCollection(USERS);
      const result = tryOp(()=>usersCollection.get(ID));
      usersCollection.close();
      return result;
    },
    
    /**
     * getAllEvents
     * 
     * Returns all events upon request.
     *
     * @author: Benjamin Wong
     * @return { Promise } That resolves to a list of all events, or an error informing otherwise.
     */
    getAllEvents: (options) => {
      const eventsCollection = getCollection(EVENTS);
      const result = tryOp(()=>eventsCollection.allDocs(options));
      eventsCollection.close();
      return result;
    },


    /**
     * getAllBoards
     * 
     * Returns all boards upon request.
     *
     * @author: Benjamin Wong
     * @return { Promise } That resolves to a list of all boards, or an error informing otherwise.
     */
    getAllBoards: (options) => {
      const boardsCollection = getCollection(BOARDS);
      const result = tryOp(()=>boardsCollection.allDocs(options));
      boardsCollection.close();
      return result;
    },


    /**
     * getAllUsers
     * 
     * Returns all users upon request.
     *
     * @author: Benjamin Wong
     * @return { Promise } That resolves to a list of all users, or an error informing otherwise.
     */
    getAllUsers: (options) => {
      const usersCollection = getCollection(USERS);
      const result = tryOp(()=>usersCollection.allDocs(options));
      usersCollection.close();
      return result;
    },

    /**
     * createEvent
     * 
     * Given the requisite info, creates a new event and adds it to the database
     *
     * @author: Benjamin Wong
     * @param { Event } event, an event class with correct details.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    createEvent: (event) => {
      const eventsCollection = getCollection(EVENTS);
      const result = tryOp(()=>{
        const newID = nextId(EVENTS);
        const doc = {
          _id: newID,
          author: event.author,
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          board: event.board,
          attendees: []
        }
        eventsCollection.put(doc);
        return newID;
      });
      eventsCollection.close();
      return result;
    },

    /**
     * createBoard
     * 
     * Given the requisite info, creates a new board and adds it to the database
     *
     * @author: Benjamin Wong
     * @param { Board } board, an event class with correct details.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    createBoard: (board) => {
      const boardsCollection = getCollection(BOARDS);
      const result = tryOp(()=>{
        const newID = nextId(BOARDS);
        const doc = {
          _id: newID,
          name: board.name,
          type: board.type,
          description: board.description,
          subscribedUsers: [],
          events: []
        }
        boardsCollection.put(doc);
        return newID;
      });
      boardsCollection.close();
      return result;
    },

    /**
     * createUser
     * 
     * Given the requisite info, creates a new board and adds it to the database
     *
     * @author: Benjamin Wong
     * @param { User } user, an event class with correct details.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    createUser: (user) => {
      const usersCollection = getCollection(USERS);
      const result = tryOp(()=>{
        const newID = nextId(USERS);
        const doc = {
          _id: newID,
          username: user.name,
          email: user.email,
          karma: 0,
          subscribedBoards : [],
          eventsCreated: [],
          eventsAttending: []
        }
        usersCollection.put(doc);
        return newID;
      });
      usersCollection.close();
      return result;
    },

    /**
     * deleteEvent
     * 
     * Given the requisite info, deletes an event with the specified ID from the database.
     *
     * @author: Benjamin Wong
     * @param { Integer } ID, the ID of the event to be deleted.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    deleteEvent: async (ID) => {
      const eventsCollection = getCollection(EVENTS);
      const result = tryOp(async ()=>{
        doc = await eventsCollection.get(ID);
        eventsCollection.remove(doc);
      });
      eventsCollection.close();
      return result;
    },
    

    /**
     * attendEvent
     * 
     * Given the requisite info, adds an event to a user's list of events to attend.
     *
     * @author: Benjamin Wong
     * @param { Integer } eventID, the ID of the event to attend
     * @param { Integer } userID, the user to attend this event
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    attendEvent: async (eventID, userID) => {
      const eventsCollection = getCollection(EVENTS);
      const usersCollection = getCollection(USERS);
      const result = tryOp(async ()=>{
        const event = await eventsCollection.get(eventID);
        const user = await usersCollection.get(userID);
        event.attendees.push(userID);
        user.eventsAttending.push(eventID);
        return 'Success';
      });
      eventsCollection.close();
      usersCollection.close();
      return result;
    },


    /**
     * addBoard
     * 
     * Given the requisite info, adds an board to a user's list of followed boards.
     *
     * @author: Benjamin Wong
     * @param { Integer } boardID , the ID of the event to follow
     * @param { Integer } userID, the user to follow this board
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    addBoard: async (boardID, userID) => {
      const boardsCollection = getCollection(BOARDS);
      const usersCollection = getCollection(USERS);
      const result = tryOp(async ()=>{
        const board = await boardsCollection.get(boardID);
        const user = await usersCollection.get(userID);
        board.subscribedUsers.push(userID);
        user.subscribedBoards.push(boardID);
        return 'Success';
      });
      boardsCollection.close();
      usersCollection.close();
      return result;
    },

    /**
     * unattendEvent
     * 
     * Given the requisite info, removes an event to a user's list of events to attend.
     *
     * @author: Benjamin Wong
     * @param { Integer } eventID, the ID of the event to stop attending
     * @param { Integer } userID, the user to unattend this event
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    unattendEvent: async (eventID, userID) => {
      const eventsCollection = getCollection(EVENTS);
      const usersCollection = getCollection(USERS);
      const result = tryOp(async ()=>{
        const event = await eventsCollection.get(eventID);
        const user = await usersCollection.get(userID);
        event.attendees.remove(userID);
        user.eventsAttending.remove(eventID);
        return 'Success';
      });
      eventsCollection.close();
      usersCollection.close();
      return result;
    },


    /**
     * unfollowBoard
     * 
     * Given the requisite info, removes a board to a user's list of followed boards.
     *
     * @author: Benjamin Wong
     * @param { Integer } boardID , the ID of the event to unfollow
     * @param { Integer } userID, the user to unfollow this board
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    unfollowBoard: async (boardID, userID) => {
      const boardsCollection = getCollection(BOARDS);
      const usersCollection = getCollection(USERS);
      const result = tryOp(async ()=>{
        const board = await boardsCollection.get(boardID);
        const user = await usersCollection.get(userID);
        board.subscribedUsers.remove(userID);
        user.subscribedBoards.remove(boardID);
        return 'Success';
      });
      boardsCollection.close();
      usersCollection.close();
      return result;
    },

    /**
     * deleteBoard
     * 
     * Given a board's ID, deletes it from the DB if there is noone in attendance.
     *
     * @author: Benjamin Wong
     * @param { Integer } eventID, the ID of the event to delete
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    deleteBoard: async (ID) => {
      const boardsCollection = getCollection(BOARDS);
      const result = tryOp(async ()=>{
        doc = await boardsCollection.get(ID);
        boardsCollection.remove(doc);
      });
      boardsCollection.close();
      return result;
    },



  };

  return obj;
};

/**
 * Exports the Database factory function which sets up and manages a database
 * tailored for event/board/user manipulation by index.js.
 *
 * The exported Database function ensures each call initializes or connects to a
 * specific database instance identified by the given database name.
 *
 * @module Database
 * @function
 * @param {string} dbname - The name of the database for which the instance is
 * created and managed.
 * @returns {Object} An object containing methods for database operations.
 */
export default Database;
