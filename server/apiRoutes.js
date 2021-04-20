const { v4: uniqueId } = require('uuid');
const fs = require('fs');

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {

    fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  });



  app.post('/api/notes', (req, res) => {

    const note = req.body;
    note.id = uniqueId();

    fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {
      if (err) throw err;
     
      const notes = JSON.parse(data);
      notes.push(note);

      fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(notes), err => {
        if (err) throw err;
        res.json(true);
      });
    });




  });

  app.delete('/api/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    
    fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      const keptNotes = notes.filter(note => note.id !== noteId);

      fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(keptNotes), err => {
        if (err) throw err;
        res.json(true);
      });
    });


  });
};