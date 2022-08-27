const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

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
      text,
      note_id: uuid()
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

notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  readFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.note_id !== noteId);

    writeToFile('./db/db.json', result);

    res.json(`Note ${noteId} has been deleted`)
  })
});

module.exports = notes;