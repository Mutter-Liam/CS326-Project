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

async function requestCheck(f, params, res, reqMethod, suggestedStructure=null) {
    try {await f()}
    catch (e) {
        console.log(`Client requested \`${reqMethod}\` with: ${JSON.stringify(params)} and recieved error:${e}`);
        let errorMessage = `Bad \`${reqMethod}\` request: ${JSON.stringify(params)}`;
        res.json({
            status: ERROR,
            error: errorMessage,
            suggestedStructure: suggestedStructure ? `/${reqMethod}/${suggestedStructure}` : null
        });
    }
}

app.get('/get-user', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.getUserByID({key:req.query.id.toString()});
        if (result.data.length === 0) {
            res.json({status:ERROR, error:`No user with id: ${req.query.id}`});
        } else {
            result.data = result.data[0];
            res.json(result);
        }
    }, req.query, res, "get-user", "?id=<userID>");
});
app.get('/get-user-boards', async (req, res) => {
    await requestCheck(async ()=> {
        let user = await db.getUserByID({key:req.query.id.toString()});
        if (user.data.length === 0) {
            res.json({status:ERROR, error:`No user with id: ${req.query.id}`});
            return;
        }
        else user.data = user.data[0];
        if (user.status !== "ok") res.json(user);
        else {
            const boardList = user.data.subscribedBoards;
            const result = await db.getBoardByID({keys:boardList});
            res.json(result);
        }
    }, req.query, res, "get-user-boards");
});
app.get('/get-user-events', async (req, res) => {
    await requestCheck(async ()=> {
        let user = await db.getUserByID({key:req.query.id.toString()});
        if (user.data.length === 0) {
            res.json({status:ERROR, error:`No user with id: ${req.query.id}`});
            return;
        }
        else user.data = user.data[0];
        if (user.status !== "ok") res.json(user);
        else {
            const eventList = user.data.eventsAttending;
            const result = await db.getEventByID({keys:eventList});
            res.json(result);
        }
    }, req.query, res, "get-user-events");
});

app.get('/get-board', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.getBoardByID({key:req.query.id.toString()});
        if (result.data.length === 0) {
            res.json({status:ERROR, error:`No board with id: ${req.query.id}`});
        } else {
            result.data = result.data[0];
            res.json(result);
        }
    }, req.query, res, "get-board");
});
app.get('/get-board-users', async (req, res) => {
    await requestCheck(async ()=> {
        let board = await db.getBoardByID({key:req.query.id.toString()});
        if (board.data.length === 0) {
            res.json({status:ERROR, error:`No board with id: ${req.query.id}`});
            return;
        }
        else user.data = user.data[0];
        if (board.status !== "ok") res.json(board);
        else {
            const userList = board.data.subscribedUsers;
            const result = await db.getUserByID({keys:userList});
            res.json(result);
        }
    }, req.query, res, "get-board-users");
});
app.get('/get-board-events', async (req, res) => {
    await requestCheck(async ()=> {
        let board = await db.getBoardByID({key:req.query.id.toString()});
        if (board.data.length === 0) {
            res.json({status:ERROR, error:`No board with id: ${req.query.id}`});
            return;
        }
        else user.data = user.data[0];
        if (board.status !== "ok") res.json(board);
        else {
            const eventList = board.data.events;
            const result = await db.getEventByID({keys:eventList});
            res.json(result);
        }
    }, req.query, res, "get-board-events");
});
app.get('/get-board-list', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.getBoardByID(JSON.parse(req.query.options));
        res.json(result);
    }, req.query, res, "get-board-list");
});

app.get('/get-event', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.getEventByID({key:req.query.id.toString()});
        if (result.data.length === 0) {
            res.json({status:ERROR, error:`No event with id: ${req.query.id}`});
        } else {
            result.data = result.data[0];
            res.json(result);
        }
    }, req.query, res, "get-event");
});
app.get('/get-event-attendees', async (req, res) => {
    await requestCheck(async ()=> {
        let event = await db.getEventByID({key:req.query.id.toString()});
        if (event.data.length === 0) {
            res.json({status:ERROR, error:`No event with id: ${req.query.id}`});
            return;
        }
        else event.data = event.data[0];
        if (event.status !== "ok") res.json(event);
        else {
            const userList = event.data.attendees;
            const result = await db.getUserByID({keys:userList});
            res.json(result);
        }
    }, req.query, res, "get-event-attendees");
});
app.get('/get-event-board', async (req, res) => {
    await requestCheck(async ()=> {
        let event = await db.getEventByID({key:req.query.id.toString()});
        if (event.data.length === 0) {
            res.json({status:ERROR, error:`No event with id: ${req.query.id}`});
            return;
        }
        else event.data = event.data[0];
        if (event.status !== "ok") res.json(event);
        else {
            const result = await getBoardByID({key:event.data.board});
            res.json(result);
        }
    }, req.query, res, "get-event-board");
});

app.post('/create-new-event', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.createEvent(req.body);
        res.json(result);
    }, req.body, res, "create-new-event");
});
app.post('/create-new-user', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.createUser(req.body);
        res.json(result);
    }, req.body, res, "create-new-user");
});
app.post('/create-new-board', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.createBoard(req.body);
        res.json(result);
    }, req.body, res, "create-new-board");
});

app.put('/subscribe-to-board', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.followBoard(req.body.board.toString(), req.body.user.toString());
        res.json(result);
    }, req.body, res, "subscribe-to-board");
});
app.put('/unsubscribe-to-board', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.unfollowBoard(req.body.board.toString(), req.body.user.toString());
        res.json(result);
    }, req.body, res, "unsubscribe-to-board");
});

app.put('/attend-event', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.followBoard(req.body.event.toString(), req.body.user.toString());
        res.json(result);
    }, req.body, res, "attend-event");
});
app.put('/unattend-event', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.unfollowBoard(req.body.event.toString(), req.body.user.toString());
        res.json(result);
    }, req.body, res, "unattend-event");
});

app.delete('/delete-event', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.deleteEvent(req.body.id.toString());
        res.json(result);
    }, req.body, res, "delete-event");
});
app.delete('/delete-board', async (req, res) => {
    await requestCheck(async ()=> {
        const result = await db.deleteBoard(req.body.id.toString());
        res.json(result);
    }, req.body, res, "delete-board");
});

// Start the server!
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
