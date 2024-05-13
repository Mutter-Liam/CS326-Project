// import our database.
import Database from "./database.js";

// express.js docs here: https://expressjs.com/
// Hopefully baseline code to use express.js for our server.
const express = require('express');
const app = express();
const PORT = 3260;

// TODO Well, all of the funcionality.

// TODO GET Route => returns something
// retrieve event information, possibly specifying some or just all of them depending on how our frontend works.
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// TODO POST Route => creates something
// post an event, given all correct information (front end should ensure this, theoretically.)
app.post('/', (req, res) => {
    res.send('Got a POST request!');
});

// TODO PUT Route => updates... something
// Could do event detail updating, though this wasn't originally planned in scope and would require more front 
// end tweaking.
// Could keep it simple with just username changing?
app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user');
});

// TODO DELETE Route  => deletes... something
// In original theoretical planning, we had the server automatically delete expired posts, but that *could* be difficult.
// Account settings could be updated to delete posts you've made?
// Delete account? 
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user');
});

// Start the server!
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
