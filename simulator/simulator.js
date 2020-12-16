const distribute = require("./old/distribute");
const axios = require("axios");

const backend = "http://localhost:5000/api"

tick = 5000;
setInterval(() => {
    axios.get(backend + '/simulator')
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

