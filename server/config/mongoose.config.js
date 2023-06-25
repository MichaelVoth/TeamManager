const mongoose = require('mongoose'); // import mongoose

mongoose.connect("mongodb://127.0.0.1:27017/teamManager", { // connect to the database
    useNewUrlParser: true, // these are options that need to be passed in to avoid errors
    useUnifiedTopology: true, // these are options that need to be passed in to avoid errors
})
    .then(() => console.log("Established a connection to the Team Manager database")) // if successful, print this message to the console
    .catch(err => console.log("Something went wrong when connecting to the Team Manager database", err)); // if there is an error, print this message to the console

