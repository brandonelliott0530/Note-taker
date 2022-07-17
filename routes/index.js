// This is the index file. It basically has all the paths in it for the router. This project only uses one other path. That is to the notes.js file. 
const express = require('express');
const path = require('path');

const router = express.Router();
const notes = require("./api")






router.use("/notes", notes)


module.exports = router