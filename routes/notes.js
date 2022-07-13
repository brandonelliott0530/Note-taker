const express = require('express');
const router = express.Router();
// brings in the file system module. This is for writing and appending to files. 
const fs = require('fs');
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
router.post("/", (req, res) => {
    const { title, text } = req.body
    fs.readFile(db, "utf8", (err, response) => {
        // logs an error if there is an error
        if(err) {
            console.log(err);
            res.status(400).send("There was an error while processing your request. Please try again")
        } else {
            const oldNotes = JSON.parse(response)
            
            // pushes the old notes with the keys of each note. uuidv gives the note a unique id. 
            oldNotes.push({ title, text, id: uuidv4() })
            // fs method for writing a file
            fs.writeFile(
                // destination of the file
                // stringifies the old notes 
            db, JSON.stringify(oldNotes),
            "utf8",
            (error) => {
                if(error) {
                    console.log(error)
                }
            })

        }
    })

})


module.exports = router