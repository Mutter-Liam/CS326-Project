const ERROR = "error";
const OK = "ok";

// import our database.
import Database from "./database.js";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express.js docs here: https://expressjs.com/
// Hopefully baseline code to use express.js for our server.
import express from 'express';
const app = express();
app.use(express.json());
const PORT = 3260;
const db = await Database();

app.use(express.static(path.resolve(__dirname, '../client')))

app.get('/get-user', async (req, res) => {
    const result = await db.getUserByID({key:req.query.id.toString()});
    if (result.data.length === 0) {
        res.json({status:ERROR, error:`No user with id: ${req.query.id}`});
    } else {
        result.data = result.data[0];
        res.json(result);
    }
});
app.get('/get-user-boards', async (req, res) => {
    const user = await db.getUserByID({key:req.query.id.toString()});
    if (user.status !== "ok") res.json(user);
    else {
        const boardList = user.data.eventsAttending;
        const result = await db.getBoardByID({keys:boardList});
        res.json(result);
    }
});
app.get('/get-user-events', async (req, res) => {
    const user = await db.getUserByID({key:req.query.id.toString()});
    if (user.status !== "ok") res.json(user);
    else {
        const eventList = user.data.eventsAttending;
        const result = await db.getEventByID({keys:eventList});
        res.json(result);
    }
});

app.get('/get-board', async (req, res) => {
    const result = await db.getBoardByID({key:req.query.id.toString()});
    if (result.data.length === 0) {
        res.json({status:ERROR, error:`No board with id: ${req.query.id}`});
    } else {
        result.data = result.data[0];
        res.json(result);
    }
});
app.get('/get-board-users', async (req, res) => {
    const board = await db.getBoardByID({key:req.query.id.toString()});
    if (board.status !== "ok") res.json(board);
    else {
        const userList = board.data.subscribedUsers;
        const result = await db.getUserByID({keys:userList});
        res.json(result);
    }
});
app.get('/get-board-events', async (req, res) => {
    const board = await db.getBoardByID({key:req.query.id.toString()});
    if (board.status !== "ok") res.json(board);
    else {
        const eventList = board.data.events;
        const result = await db.getEventByID({keys:eventList});
        res.json(result);
    }
});
app.get('/get-board-list', async (req, res) => {
    const result = await db.getBoardByID(JSON.parse(req.query.options));
    res.json(result);
});

app.get('/get-event', async (req, res) => {
    const result = await db.getEventByID({key:req.query.id.toString()});
    if (result.data.length === 0) {
        res.json({status:ERROR, error:`No event with id: ${req.query.id}`});
    } else {
        result.data = result.data[0];
        res.json(result);
    }
});
app.get('/get-event-attendees', async (req, res) => {
    const event = await db.getEventByID({key:req.query.id.toString()});
    if (event.status !== "ok") res.json(event);
    else {
        const userList = event.data.attendees;
        const result = await db.getUserByID({keys:userList});
        res.json(result);
    }
});
app.get('/get-event-board', async (req, res) => {
    const event = await db.getEventByID(req.query.id.toString());
    if (event.status !== "ok") res.json(event);
    else {
        const result = await getBoardByID({key:event.data.board});
        res.json(result);
    }
});

app.post('/create-new-event', async (req, res) => {
    const result = await db.createEvent(req.body);
    res.json(result);
});
app.post('/create-new-user', async (req, res) => {
    const result = await db.createUser(req.body);
    res.json(result);
});
app.post('/create-new-board', async (req, res) => {
    const result = await db.createBoard(req.body);
    res.json(result);
});

app.put('/subscribe-to-board', async (req, res) => {
    const result = await db.followBoard(req.body.board.toString(), req.body.user.toString());
    res.json(result);
});
app.put('/unsubscribe-to-board', async (req, res) => {
    const result = await db.unfollowBoard(req.body.board.toString(), req.body.user.toString());
    res.json(result);
});

app.put('/attend-event', async (req, res) => {
    const result = await db.followBoard(req.body.event.toString(), req.body.user.toString());
    res.json(result);
});
app.put('/unattend-event', async (req, res) => {
    const result = await db.unfollowBoard(req.body.event.toString(), req.body.user.toString());
    res.json(result);
});

app.delete('/delete-event', async (req, res) => {
    const result = await db.deleteEvent(req.body.id.toString());
    res.json(result);
});
app.delete('/delete-board', async (req, res) => {
    const result = await db.deleteBoard(req.body.id.toString());
    res.json(result);
});

// Start the server!
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
