const axios = require("axios");
const {cons} = require("./assets/distribute.js");
const distribute = require("./assets/distribute.js");
const { prod } = require("./assets/production.js");
const production = require("./assets/production.js");

const backend = "https://localhost:5000/api"

let house_o;
let manager_o;

let batterylimit_h = 100;  // Battery limit house in kW
let batterylimit_t = 2000; // Battery limit power plant (manager) in kW

let manager_production = 100; // 100 kw/h for coal power plant.

let totalproduction = 0; 
let totalconsumption = 0;
let totalnetproduction = 0;

let totalbuffer = 0;

const update = async () => { 
  try {
  const response = await axios.get(backend + '/household/');
  if (response.status === 200) { 
    //console.log('Request on api/household worked!');
   return response.data;
  }
  } catch (err) {
   console.error(err)
  }
}

const initTotal = async () => { 
  try {
    const response = await axios.get(backend + '/grid/');
  if (response.status === 200) { 
    //console.log('Request on api/grid worked!');
    return response.data;
  }
  } catch (err) {
   console.error(err)
  }
}

// tick = 10000 //for error checking.
tick = 5000;    // 1 second each loop. 
setInterval(() => {   // Init 
  console.log("tick");

  initTotal().then(data => {
    totalproduction = data.totalproduction;
    totalconsumption = data.totalconsumption;
    totalnetproduction = data.totalnetproduction;
    totalbuffer = data.totalbuffer;

    distribute.distributeInit();
});

  update().then(data => {
      var objCount = data.length;
      for ( var x = 0; x < objCount ; x++ ) { // Loop through all households
        let curitem = data[x];

        distribute.distributeAvg();

        if(curitem.isproducing){    // If household is producing
          production.calcProd(distribute.wind); 
        }else if(!curitem.isproducing){  // Not producing
          production.calcProd(0);
        }

        production.calcNetProd(production.prod, distribute.cons);
        production.calcBuffer(production.netprod, curitem.buffer, curitem.ratio, batterylimit_h);
        production.ifBlackout(production.netprod, production.buffer, totalbuffer, totalnetproduction);

        console.log(distribute.wind);
        console.log(distribute.cons);
        console.log(production.prod);
        console.log(production.netprod);
        console.log(production.buffer);
        console.log(production.blackout);

        totalproduction = totalproduction + (production.prod - curitem.production);
        totalconsumption = totalconsumption + (production.cons - curitem.cons);
        totalnetproduction = totalnetproduction + (production.netprod - curitem.cons);

        const res = axios.put(backend + "/household/" + curitem.id, {
          wind: distribute.wind,
          production: production.prod,
          consumption: distribute.cons,
          netproduction: production.netprod,
          buffer: production.buffer,
          blackout: production.blackout
        });

        //production.calcPrice(distribute.wind, distribute.cons);
        //production.checkBlackout(totaltotalbuffer)
      }

      return data;
  });
  
  const res = axios.put(backend + "/grid", {
    totalproduction: totalproduction,
    totalconsumption: totalconsumption,
    totalnetproduction: totalnetproduction,
    totalbuffer: totalbuffer
  })

  console.log("tock")
}, tick);



/* const initAll = () => {
  console.log("init");
  getHouses().then(data => { // Reset values, not buffer and ratio. 
    var objCount = data.length;
    for ( var x = 0; x < objCount ; x++ ) { // Loop through all households
      var curitem = data[x];
      const res = axios.put(backend + "/household/" + curitem.id, {
        wind: 0,
        production: 0,
        consumption: 0,
        netproduction: 0,
        blackout: false
      });
    }
  });

  getManagers().then(data => {
    var objCount = data.length;
    for ( var x = 0; x < objCount ; x++ ) { // Loop through all households
      var curitem = data[x];
      const res = axios.put(backend + "/manager/" + curitem.email, {
        production: 0,
        status: "stopped"
      });
    }
  })

  getGrid().then(data => {
    totalbuffer = data.buffer;
    const res = axios.put(backend + "/grid/", {
      totalproduction: 0,
      totalconsumption: 0,
      totalnetproduction: 0
    });
  });

  house_o = getHouses().then(data => { // Get newely reseted 
    return data;
  });

  manager_o = getManagers().then(data => {
    return data;
  });
}

initAll(); */