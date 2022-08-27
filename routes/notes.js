const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json')
  .then((data) => {
    if (data) {
      res.json(JSON.parse(data));
    } else {
      res.json('Error in retrieving notes');
    }
  })
});

notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'Note saved successfully',
      body: newNote
    };

    res.json(response);
  } else {
    res.json('Error during note submission');
  }
})

// notes.delete('/', (req, res) => {

// });

module.exports = notes;