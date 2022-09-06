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



app.listen(PORT, () => {
    console.info(`App listening on port ${PORT}`);
});