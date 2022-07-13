// "boilerplate" for using express
const express = require('express');

const api = require('./routes')

const app = express();

const PORT = process.env.PORT || 3001;

// tells the app which files to use
app.use(express.static("public"));
app.use(express.json());
app.use("/api", api);

// where the application runs when it is started. This one uses the heroku property, or port 3001
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})