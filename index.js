//index.js
let port = process.env.PORT || 8081;

let express = require('express');
var app = express();

/* Bodyparser */
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
     extended: true
 }));
 app.use(bodyParser.json());

/* MongoDB */
let mongoose = require('mongoose');
const dbPath = 'mongodb://localhost/mydb';
const options = {useNewUrlParser: true, useUnifiedTopology: true}

const db = mongoose.connect(dbPath, options);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
     console.log('MongoDB connected!');
});

// Welcome message
app.get('/', (req, res) => res.send('Welcome to our server'));

let apiRoutes = require("./routes");
app.use('/api', apiRoutes);

// Launch app to the specified port
app.listen(port, function() {
     console.log("Running FirstRest on Port "+ port)
})

