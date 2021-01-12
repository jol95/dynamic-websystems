const axios = require("axios");
const distribute = require("./assets/distribute.js");
const { prod } = require("./assets/production.js");
const production = require("./assets/production.js");

const backend = "http://localhost:5000/api"

let totalproduction = 0;
let totalconsumption = 0;
let totalnetproduction = 0;
let totalbuffer = 0;

const updateUsers = async () => { 
  try {
  const response = await axios.get(backend + '/household');
  if (response.status === 200) { 
    console.log('Request on api/household worked!');
   return response.data;
  }
  } catch (err) {
   console.error(err)
  }
}

const updateTotal = async () => { 
  try {
    const response = await axios.get(backend + '/grid');
  if (response.status === 200) { 
    console.log('Request on api/grid worked!');
    return response.data;
  }
  } catch (err) {
   console.error(err)
  }
}

// tick = 10000 //for error checking.
tick = 5000;
setInterval(() => {

  updateTotal().then(data => {
      totalproduction = 0;
      totalconsumption = 0;
      totalnetproduction = 0;
      totalbuffer = data.totalbuffer;
  })

  updateUsers().then(data => {
    console.log("####################")
    console.log(data);
    console.log("####################")

    distribute.distributeInit();

    var objCount = data.length;
    for ( var x = 0; x < objCount ; x++ ) {
      var curitem = data[x];
      distribute.distributeAvg();

      production.calcProd(distribute.wind);
      production.calcNetProd(distribute.cons);
      production.calcPrice(distribute.wind, distribute.cons);
      production.calcBuffer(curitem.buffer, curitem.ratio, production.netprod);
    
      const res = axios.put(backend + "/household/" + curitem.houseid, {
        wind: distribute.wind,
        consumption: distribute.cons,
        price: production.price,
        production: production.prod,
        netproduction: production.netprod,
        buffer: production.buffer});

      console.log(res)

      console.log("####################")
      console.log("####################")

      totalproduction = totalproduction + production.prod;
      totalnetproduction = totalnetproduction + production.netprod * (1 - ratio)
      totalconsumption = totalconsumption + production.cons;
    }

    totalbuffer = totalbuffer + totalnetproduction;

    const res = axios.put(backend + "/grid", {
      totalproduction: totalproduction,
      totalconsumption: totalconsumption,
      totalnetproduction: totalnetproduction,
      totalbuffer: totalbuffer
    });

    console.log(res)


  })

   
}, tick);

