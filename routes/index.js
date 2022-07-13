// This is the index file. It basically has all the paths in it for the router. This project only uses one other path. That is to the notes.js file. 
const express = require('express');
const router = express.Router();
const notes = require("./notes")



router.use('./notes', notes)
console.log(router)

module.exports = router