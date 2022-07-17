const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})

router.post('/', (req, res) => {
    const { title, text } = req.body;
    fs.readFile(path.join(__dirname, '../public/notes', "utf8"), (err, response) => {
        if (err) {
            console.log(err);
        } else {
            const note = JSON.parse(response);
            note.push({title, text, id: uuidv4()});
            fs.writeFile(
            '../public/notes.html', JSON.stringify(note), 'utf8', 
            (error) => {
              if(error) {
                console.log(error)
              }
            });
        
        }
    })   
})

module.exports = router;
