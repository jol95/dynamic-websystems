/*------------INIT------------*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
 });

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
app.get('/', (req, res) => res.send('Welcome to the api'));

const user = require("./api/user/user.js");
app.use('/api/user', user);

const simulator = require("./api/simulator/simulator.js");
app.use('/api/simulator', simulator);

// Launch app, always last!!!
app.listen(port, function() {
     console.log("Running FirstRest on Port "+ port)
})

