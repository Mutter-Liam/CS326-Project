import PouchDB from "pouchdb";

// Pouch DB docs here: https://pouchdb.com/

// define some classes so that our operations are a bit less confusing
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

/**
 * Initializes a PouchDB database with specified collections if they do not
 * exist.
 *
 * This function creates a new PouchDB instance with the given database name. It
 * attempts to retrieve collections for 'events', 'boards', and 'users'. If these
 * collections do not exist, it creates them with initial empty arrays.
 *
 * @param {string} dbname - The name of the database to initialize.
 */
const initdb = async (dbname) => {
  // Initialize the database if it doesn't exist
  const db = new PouchDB(dbname);


  // TODO: MAKE ALL OF THESE COLLECTIONS, YOU FUCKING IDIOT
  // Get the events collection If it doesn't exist, create it.
  try {
    const events = await db.get("events");
  } catch (e) {
    await db.put({ _id: "events", events: [] });
  }

  // Get the events collection If it doesn't exist, create it.
  try {
    const boards = await db.get("boards");
  } catch (e) {
    await db.put({ _id: "boards", boards: [] });
  }

  // Get the events collection If it doesn't exist, create it.
  try {
    const users = await db.get("users");
  } catch (e) {
    await db.put({ _id: "users", users: [] });
  }
  
  // Close the database connection
  await db.close();
};

/**
 * Factory function to create a database instance using PouchDB for managing
 * our actual database.
 *
 * This function initializes a database with the given name if it does not
 * already exist. It provides methods to CRUD.
 * The database is re-instantiated with each method call to
 * ensure that the most recent data is used.
 *
 * @param {string} dbname - The name of the database to initialize and use.
 * @returns {object} An object containing methods to interact with the database
 */
const Database = async (dbname) => {
  // Initialize the database
  await initdb(dbname);

  /**
   * Helper function to create a new PouchDB instance.
   * @returns {PouchDB} A new PouchDB instance connected to the specified
   * database.
   */
  const getDB = () => new PouchDB(dbname);

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


    /**
     * getBoardByID
     * 
     * Returns an board given its ID number.
     *
     * @author: Benjamin Wong
     * @param { Integer } ID, the ID number of the requested board.
     * @return { Promise } That resolves to the board and its data if it is found, or an error informing otherwise.
     */


    /**
     * getUserByID
     * 
     * Returns a user given their ID number.
     *
     * @author: Benjamin Wong
     * @param { Integer } ID, the ID number of the requested board.
     * @return { Promise } That resolves to the user and its data if it is found, or an error informing otherwise.
     */
    
    /**
     * getAllEvents
     * 
     * Returns all events upon request.
     *
     * @author: Benjamin Wong
     * @return { Promise } That resolves to a list of all events, or an error informing otherwise.
     */
    getAllEvents: async () => {W
      try {
        const db = getDB();

        // grab events from our database
        const data = await db.get("events");

        // close the database
        await db.close();

        // return retrieved info
        return { status: "success", data: data };
      } catch (e) {
        // error handling (return message and inform we couldnt)
        return {
          status: "error",
          message: "Failed to retrieve events.",
          error: e.message,
        };
      }
    },


    /**
     * getAllBoards
     * 
     * Returns all boards upon request.
     *
     * @author: Benjamin Wong
     * @return { Promise } That resolves to a list of all boards, or an error informing otherwise.
     */


    /**
     * getAllEvents
     * 
     * Returns all users upon request.
     *
     * @author: Benjamin Wong
     * @return { Promise } That resolves to a list of all users, or an error informing otherwise.
     */

    /**
     * createEvent
     * 
     * Given the requisite info, creates a new event and adds it to the database
     *
     * @author: Benjamin Wong
     * @param { Event } event, an event class with correct details.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */

    /**
     * createBoard
     * 
     * Given the requisite info, creates a new board and adds it to the database
     *
     * @author: Benjamin Wong
     * @param { Board } board, an event class with correct details.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */

    /**
     * deleteEvent
     * 
     * Given the requisite info, deletes an event with the specified ID from the database.
     *
     * @author: Benjamin Wong
     * @param { Integer } eventID, the ID of the event to be deleted.
     * @return { Promise } That resolves an indication of success or error otherwise.
     */

    /**
     * attendEvent
     * 
     * Given the requisite info, adds an event to a user's list of events to attend.
     *
     * @author: Benjamin Wong
     * @param { Integer } eventID, the ID of the event to attend
     * @param { User } userID, the user to attend this event
     * @return { Promise } That resolves an indication of success or error otherwise.
     */


    /**
     * addBoard
     * 
     * Given the requisite info, adds an board to a user's list of followed boards.
     *
     * @author: Benjamin Wong
     * @param { Integer } boardID , the ID of the event to follow
     * @param { User } userID, the user to follow this board
     * @return { Promise } That resolves an indication of success or error otherwise.
     */

    /**
     * unattendEvent
     * 
     * Given the requisite info, removes an event to a user's list of events to attend.
     *
     * @author: Benjamin Wong
     * @param { Integer } eventID, the ID of the event to stop attending
     * @param { User } userID, the user to unattend this event
     * @return { Promise } That resolves an indication of success or error otherwise.
     */


    /**
     * unfollowBoard
     * 
     * Given the requisite info, removes a board to a user's list of followed boards.
     *
     * @author: Benjamin Wong
     * @param { Integer } boardID , the ID of the event to unfollow
     * @param { User } userID, the user to unfollow this board
     * @return { Promise } That resolves an indication of success or error otherwise.
     */

    /**
     * deleteBoard
     * 
     * Given a board's ID, deletes it from the DB if there is noone in attendance.
     *
     * @author: Benjamin Wong
     * @param { Integer } eventID, the ID of the event to delete
     * @return { Promise } That resolves an indication of success or error otherwise.
     */



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
