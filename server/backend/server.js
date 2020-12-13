/*------------INIT------------*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

/* ----------MongoDB------------*/
let dbPath = 'mongodb://localhost/mydb';
let options = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}

const db = mongoose.connect(dbPath, options);

db.then(() => {
     console.log('MongoDB connected');
 }, error => {
     console.log(error, 'error');
})

/*-----------Routing----------- */
app.get('/', (req, res) => res.send('Welcome to our server'));

const user = require("./api/user/user.js");
app.use('/user', user);

const simulator = require("./api/simulator/simulator.js");
app.use('/api', simulator);

// Launch app, always last!!!
app.listen(port, function() {
     console.log("Running FirstRest on Port "+ port)
})

