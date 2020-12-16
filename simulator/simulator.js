const distribute = require("./old/distribute");
const axios = require("axios");
const mongoose = require('mongoose');

const backend = "http://localhost:5000"

tick = 5000;
setInterval(() => {
    axios.get(backend + '/api/user')
    .then(function (response) {
      console.log(response);
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });

        distribute.distributeAvg();
        console.log(distribute.wDay);
        console.log("^^ WIND ^^");
        console.log(distribute.cons);
        console.log("^^ CONS^^");
    }, tick);

