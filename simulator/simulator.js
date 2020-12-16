const distribute = require("./old/distribute");
const axios = require("axios");

const backend = "http://localhost:5000/api"

tick = 5000;
setInterval(() => {
    let houses
    axios.get(backend + '/simulator')
    .then(function (response) {
      let houses = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    houses.map( function(house) {
        console.log(house);
    });

    distribute.distributeAvg();
    console.log(distribute.wDay);
    console.log("^^ WIND ^^");
    console.log(distribute.cons);
    console.log("^^ CONS^^");
    }, tick);

