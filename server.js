// server.js
const express = require("express");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const app = express();
app.use(express.json());

let users = [];

// GET all users
app.get("/api/users", (req, res) => {
    res.json(users);
});

// GET user by ID
app.get("/api/users/:userId", (req, res) => {
    console.log("req===========>", req.params);
    const { userId } = req.params;
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

// POST new user
app.post("/api/users", (req, res) => {
    console.log("req===========>", req.params);
    const { username, age, hobbies } = req.body;
    if (!username || !age) {
        return res.status(400).json({ error: "Username and age are required" });
    }
    const newUser = { id: uuidv4(), username, age, hobbies: hobbies || [] };
    console.log("newUser===>", newUser);
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update user by ID
app.put("/api/users/:userId", (req, res) => {
    console.log("req===========>", req.params);
    const { userId } = req.params;
    const { username, age, hobbies } = req.body;
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    if (!username || !age) {
        return res.status(400).json({ error: "Username and age are required" });
    }
    users[userIndex] = {
        ...users[userIndex],
        username,
        age,
        hobbies: hobbies || [],
    };
    res.json(users[userIndex]);
});

// DELETE user by ID
app.delete('/api/users/:userId', (req, res) => {
    console.log("req===========>", req.params);
    const { userId } = req.params;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).end();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
