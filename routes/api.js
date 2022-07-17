const { response } = require('express');
const express = require('express');
const router = express.Router();
const path = require('path');
// brings in the file system module. This is for writing and appending to files. 
const fs = require('fs');
const { request } = require('http');
// uuid for giving each note a unique ID number
const { v4: uuidv4 } = require('uuid')

// setting the database as a constant for ease of reference
const db = "./db/db.json"



// Router for a GET request to the / destination
router.get('/', (req, res) => {
    fs.readFile(db, "utf8", (err, response) => {
        // Logs an error if the file doesn't exist
        if(err) {
            console.log(err);
            res.status(400).send("There was an error while processing your request. Please try again")
        // Will return the json response of the selected destination parsed out. 
        } else{
            console.log(JSON.parse(response));
            res.json(JSON.parse(response));
        }
    })
})

// Router for a POST request to the / destination
router.post('/', (req, res) => {
    const { title, text } = req.body;
    console.log(req.body);
    fs.readFile(db, "utf8", (err, data) => {
        if(err) {
            console.log(err)
        } else{
            const oldNote = JSON.parse(data)
            oldNote.push({ title, text, id: uuidv4() });
            fs.writeFile(db, JSON.stringify(oldNote), 'utf-8', (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("New note added successfully!")
                }
            })

        }
    })

    res.json(req.body);
})

// Delete request handler
router.delete("/:id", (req, res) => {
    let deletedNote = req.params.id;
    console.log("Deleted note: " + deletedNote)
    fs.readFile(db, "utf-8", (err, data) => {
        if(err) {
            console.log(err)
            res.send("There was an error processing your delete request. Please try again.")
        } else {
            let oldNotes = JSON.parse(data);
            let newNotes = oldNotes.filter((note) => note.id !== deletedNote);
            fs.writeFile(db, JSON.stringify(newNotes), "utf-8", (err) => {
                if(err) {
                    console.log(err)
                }else {
                    console.log("Note deleted successfully!")

                }
            })
            
            res.json
        }

    })
})



module.exports = router