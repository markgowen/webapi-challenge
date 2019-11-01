const express = require('express');

const actionDb = require('../helpers/actionModel')

const router = express.Router();



// Middleware
function validateProjectId (req, res, next) {
    if (req.params.id) {
        return;
    } else {
        res.status(404).json({ message: 'invalid project id' })
    }
    next();
}

module.exports = router;