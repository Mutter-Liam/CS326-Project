import PouchDB from "pouchdb";

// Pouch DB docs here: https://pouchdb.com/

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
     * Example(?) function?
     * Grabs all events upon request. no input requred.
     */
    getAllEvents: async () => {
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
