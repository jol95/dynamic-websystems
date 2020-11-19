const express = require('express');
const mongoose = require('mongoose');

let app = express();

var port = process.env.PORT || 8081;

mongoose.connect('mongodb://localhost/mongodb', {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	 //  we're connected!
});

// Welcome message
app.get('/', (req, res) => res.send('Welcome to out server'));

let apiRoutes = require("./routes");

app.use('/api', apiRoutes);

// Launch app to the specified port
app.listen(port, function() {
     console.log("Running FirstRest on Port "+ port)
})

