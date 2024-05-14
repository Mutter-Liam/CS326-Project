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
  events.close();
  const users = new PouchDB(USERS);
  users.close();
  const boards = new PouchDB(BOARDS);
  boards.close();
  const idMax = new PouchDB("ids");
  idMax.close();
};

const tryOp = async (f) => {
  try {
    const result = await f();
    return {status: OK, data: result};
  } catch (e) {
    console.log(`Error:${e}\n`);
    return {status: ERROR, error:e};
  }
};

const removeItemOnce = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
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

  const next = async (collection) => {
    const nextIDs = getCollection("ids");
    let newID = {_id:collection, next: 0};
    try {
      newID = await nextIDs.get(collection);
    } catch (e) {}
    const result = newID.next;
    newID.next += 1;
    await nextIDs.put(newID);
    nextIDs.close();
    return result.toString();
  }

  const obj = {

    /**
     * getEventByID
     * 
     * Returns an event given its ID number
     *
     * @author: Sandro Ansari
     * @param { Integer } ID, the ID number of the requested board.
     * @return { Promise } That resolves to the event and its data if it is found, or an error informing otherwise.
     */
    getEventByID: async (options={}) => {
      options.include_docs = true;
      const eventsCollection = getCollection(EVENTS);
      const result = await tryOp(async ()=> (await eventsCollection.allDocs(options)).rows.map(x=>x.doc));
      eventsCollection.close();
      return result;
    },


    /**
     * getBoardByID
     * 
     * Returns an board given its ID number.
     *
     * @author: Sandro Ansari
     * @param { Integer } ID, the ID number of the requested board.
     * @return { Promise } That resolves to the board and its data if it is found, or an error informing otherwise.
     */
    getBoardByID: async (options={}) => {
      options.include_docs = true;
      const boardsCollection = getCollection(BOARDS);
      const result = await tryOp(async ()=> (await boardsCollection.allDocs(options)).rows.map(x=>x.doc));
      boardsCollection.close();
      return result;
    },


    /**
     * getUserByID
     * 
     * Returns a user given their ID number.
     *
     * @author: Sandro Ansari
     * @param { Integer } ID, the ID number of the requested board.
     * @return { Promise } That resolves to the user and its data if it is found, or an error informing otherwise.
     */
    getUserByID: async (options={}) => {
      options.include_docs = true;
      const usersCollection = getCollection(USERS);
      const result = await tryOp(async ()=> (await usersCollection.allDocs(options)).rows.map(x=>x.doc));
      usersCollection.close();
      return result;
    },

    /**
     * createEvent
     * 
     * Given the requisite info, creates a new event and adds it to the database
     *
     * @author: Sandro Ansari
     * @param { Event } event, an event class with correct details.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    createEvent: async (event) => {
      const result = await tryOp(async ()=>{
        const eventsCollection = getCollection(EVENTS);
        const boardsCollection = getCollection(BOARDS);
        const newID = await next(EVENTS);
        const doc = {
          _id: newID,
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          board: event.board.toString(),
          attendees: []
        }
        await eventsCollection.put(doc);
        let board = await boardsCollection.get(doc.board);
        board.events.push(newID);
        await boardsCollection.put(board);
        await eventsCollection.close();
        await boardsCollection.close();
        await obj.attendEvent(newID, event.author.toString());
        return newID;
      });
      return result;
    },

    /**
     * createBoard
     * 
     * Given the requisite info, creates a new board and adds it to the database
     *
     * @author: Sandro Ansari
     * @param { Board } board, an event class with correct details.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    createBoard: async (board) => {
      const result = await tryOp(async ()=>{
        const boardsCollection = getCollection(BOARDS);
        const newID = await next(BOARDS);
        const doc = {
          _id: newID,
          name: board.name,
          type: board.type,
          description: board.description,
          subscribedUsers: [],
          events: []
        }
        await boardsCollection.put(doc);
        await boardsCollection.close();
        await obj.followBoard(newID, board.author.toString());
        return newID;
      });
      return result;
    },

    /**
     * createUser
     * 
     * Given the requisite info, creates a new board and adds it to the database
     *
     * @author: Sandro Ansari
     * @param { User } user, an event class with correct details.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    createUser: async (user) => {
      const usersCollection = getCollection(USERS);
      const result = await tryOp(async ()=>{
        const newID = await next(USERS);
        const doc = {
          _id: newID,
          username: user.name,
          email: user.email,
          karma: 0,
          subscribedBoards : [],
          eventsAttending: []
        }
        await usersCollection.put(doc);
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
     * @author: Sandro Ansari
     * @param { Integer } ID, the ID of the event to be deleted.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    deleteEvent: async (ID) => {
      const eventsCollection = getCollection(EVENTS);
      const result = await tryOp(async ()=>{
        doc = await eventsCollection.get(ID);
        await eventsCollection.remove(doc);
      });
      eventsCollection.close();
      return result;
    },
    

    /**
     * attendEvent
     * 
     * Given the requisite info, adds an event to a user's list of events to attend.
     *
     * @author: Sandro Ansari
     * @param { Integer } eventID, the ID of the event to attend
     * @param { Integer } userID, the user to attend this event
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    attendEvent: async (eventID, userID) => {
      const eventsCollection = getCollection(EVENTS);
      const usersCollection = getCollection(USERS);
      const result = await tryOp(async ()=>{
        let event = await eventsCollection.get(eventID);
        let user = await usersCollection.get(userID);
        event.attendees.push(userID);
        user.eventsAttending.push(eventID);
        await eventsCollection.put(event);
        await usersCollection.put(user);
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
     * @author: Sandro Ansari
     * @param { Integer } boardID , the ID of the event to follow
     * @param { Integer } userID, the user to follow this board
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    followBoard: async (boardID, userID) => {
      const boardsCollection = getCollection(BOARDS);
      const usersCollection = getCollection(USERS);
      const result = await tryOp(async ()=>{
        let board = await boardsCollection.get(boardID);
        let user = await usersCollection.get(userID);
        if (user.subscribedBoards.includes(boardID)) return 'Redundant';
        board.subscribedUsers.push(userID);
        user.subscribedBoards.push(boardID);
        await boardsCollection.put(board);
        await usersCollection.put(user);
        return 'Success';
      });
      await boardsCollection.close();
      await usersCollection.close();
      return result;
    },

    /**
     * unattendEvent
     * 
     * Given the requisite info, removes an event to a user's list of events to attend.
     *
     * @author: Sandro Ansari
     * @param { Integer } eventID, the ID of the event to stop attending
     * @param { Integer } userID, the user to unattend this event
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    unattendEvent: async (eventID, userID) => {
      const eventsCollection = getCollection(EVENTS);
      const usersCollection = getCollection(USERS);
      const result = await tryOp(async ()=>{
        const event = await eventsCollection.get(eventID);
        const user = await usersCollection.get(userID);
        removeItemOnce(event.attendees, userID);
        removeItemOnce(user.eventsAttending, boardID);
        await eventsCollection.put(event);
        await usersCollection.put(user);
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
     * @author: Sandro Ansari
     * @param { Integer } boardID , the ID of the event to unfollow
     * @param { Integer } userID, the user to unfollow this board
     * @return { Promise } That resolves an indication of success or error otherwise.
     */
    unfollowBoard: async (boardID, userID) => {
      const boardsCollection = getCollection(BOARDS);
      const usersCollection = getCollection(USERS);
      const result = await tryOp(async ()=>{
        const board = await boardsCollection.get(boardID);
        const user = await usersCollection.get(userID);
        removeItemOnce(board.subscribedUsers, userID);
        removeItemOnce(user.subscribedBoards, boardID);
        await boardsCollection.put(board);
        await usersCollection.put(user);
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
     * @author: Sandro Ansari
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
