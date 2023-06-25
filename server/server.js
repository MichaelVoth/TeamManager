const express = require('express');
const app = express();
const cors = require('cors'); // cors allows us to connect to our react app
const port = 8000;

app.use(cors()); // allows us to connect to our react app
app.use(express.json()); // allows us to use json
app.use(express.urlencoded({ extended: true })); // allows us to use urlencoded

require('./config/mongoose.config');  // connect to mongoose
require('./routes/player.routes')(app); // connect to routes

app.listen(port, () => console.log(`Listening on port: ${port}`) ); // listen to port 8000
