const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
//const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
