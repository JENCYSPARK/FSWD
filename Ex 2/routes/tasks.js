const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.post('/', authenticateJWT, async (req, res) => {
    const task = new Task({ userId: req.user.id, text: req.body.text });
    await task.save();
    res.status(201).json(task);
});

router.get('/', authenticateJWT, async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;
