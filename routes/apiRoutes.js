const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/api/notes', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Parse the JSON data
        const notes = JSON.parse(data);

        // Return all saved notes as JSON
        res.json(notes);
    });
});

router.post('/api/notes', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Parse the JSON data
        const notes = JSON.parse(data);

        // Generate a new note ID
        const newNoteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;

        // Create a new note object
        const newNote = {
            id: newNoteId,
            title: req.body.title,
            text: req.body.text
        };

        // Add the new note to the notes array
        notes.push(newNote);

        // Write the updated notes array to the db.json file
        fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify(notes), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Return the new note to the client
            res.json(newNote);
        });
    });
});

router.delete('/api/notes/:id', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(__dirname,'../db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Parse the JSON data
        const notes = JSON.parse(data);

        // Find the note with the specified ID
        const noteIndex = notes.findIndex(note => note.id === parseInt(req.params.id));

        // If the note is not found, return a 404 status code
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Remove the note from the notes array
        notes.splice(noteIndex, 1);

        // Write the updated notes array to the db.json file
        fs.writeFile(path.join(__dirname,'..db/db.json'), JSON.stringify(notes), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Return a 204 status code
            res.status(204).end();
        });
    });
});

module.exports = router;