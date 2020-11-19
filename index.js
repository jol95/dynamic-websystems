var port = process.env.PORT || 8081;

const express = require('express');
var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	 //  we're connected!
});

// Welcome message
app.get('/', (req, res) => res.send('Welcome to out server'));

/* routes.js */

var apiRoutes = require("./routes");
app.use('/api', apiRoutes);

// Launch app to the specified port
app.listen(port, function() {
     console.log("Running FirstRest on Port "+ port)
})

