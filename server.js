// "boilerplate" for using express
const express = require('express');
const fs = require('fs');

const notesAPI = require("./routes")



const app = express();

const PORT = process.env.PORT || 3001;

// Middleware that tells the app which files to use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", notesAPI);


// where the application runs when it is started. This one uses the heroku property, or port 3001
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})