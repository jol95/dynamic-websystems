/*------------INIT------------*/
require('dotenv').config();

const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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
app.get('/api', (req, res) => res.send('Welcome to the api'));

const user = require("./api/user/user.js");
app.use('/api/user', user);

const household = require("./api/household/household.js");
app.use('/api/household', household);

/*Authenication stuff */
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./api/user/config/passport")(passport);

// Launch app, always last!!!
app.listen(port, function() {
     console.log("Running FirstRest on Port "+ port)
})

