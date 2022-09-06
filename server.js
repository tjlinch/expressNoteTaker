const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db.json');

const app = express();

//Heroku PORT
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Get Route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Get Route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//Get Route for db.json
app.get('/api/notes', (req, res) => res.json(notes));

//Post Route for new notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    
    //sets random ids for new notes
    let newId = Math.floor(Math.random() * 9999);
    newNote.id = newId;
    notes.push(newNote);

    //rewrite db.json with the new note
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), function (err) {
        if (err) {
            return console.info(err);
        }
        console.info('New note saved');
    });

    res.json(newNote);
});

app.listen(PORT, () => {
    console.info(`App listening on port ${PORT}`);
});