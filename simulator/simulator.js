const axios = require("axios");
const { cons, calcConsumption } = require("./assets/distribute.js");
const distribute = require("./assets/distribute.js");
const { prod } = require("./assets/production.js");
const production = require("./assets/production.js");

const backend = "http://localhost:5000/api"

let house_o = axios.get(backend + "/household/").data;
let manager_o = axios.get(backend + "/manager/").data;

let batterylimit_h = 100;  // Battery limit house in kW
let batterylimit_t = 2000; // Battery limit power plant (manager) in kW

let manager_production = 100; // 100 kw/h for coal power plant.

let totalproduction = 0; 
let totalconsumption = 0;
let totalnetproduction = 0;

let totalbuffer = 0;

const getGrid = async () => {   // Function to get electric grid (total values).
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

const getHouses = async () => {  // Function which recives all households and updates respectively. 
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

const getManagers = async () => {  // Function which recives manager (coal production and price). 
  try {
  const response = await axios.get(backend + '/manager/');
  if (response.status === 200) { 
    //console.log('Request on api/household worked!');
   return response.data;
  }
  } catch (err) {
   console.error(err)
  }
}

const initAll = () => {
  console.log("init")
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

  house_o = getHouses().then( (data,res) => { // Get newely reseted 
    return data;
  });

  manager_o = getManagers().then(data => {
    return data;
  });
}

initAll();

// tick = 10000 //for error checking.
let tick = 5000;    // 1 second each loop. 
setInterval(() => {   // Init 
  console.log("tick");

  distribute.distributeInit();

  house_o = getHouses().then(data => {
      var objCount = data.length;
      for ( var x = 0; x < objCount ; x++ ) { // Loop through all households
        var curitem = data[x];
        var olditem = house_o[x];

        var wind = distribute.calcWind(); 
        var consumption = distribute.calcConsumption();

        var prod = 0;
        if(curitem.isproducing){    // If household is producing
          prod = production.calcProd(wind); 
        }else if(!curitem.isproducing){  // Not producing
          prod = production.calcProd(0);
        }

        var netproduction = production.calcNetProd(prod, consumption);
        var buffer = production.calcBuffer(netproduction, curitem.buffer, curitem.ratio, batterylimit_h);
        var blackout = production.ifBlackout(netproduction, buffer, totalbuffer, totalnetproduction)

        const res = axios.put(backend + "/household/" + curitem.id, {
          wind: wind,
          production: prod,
          consumption: consumption,
          netproduction: netproduction,
          buffer: buffer,
          blackout: blackout
        });
        
        totalproduction = totalproduction + (prod - olditem.production);
        totalconsumption = totalconsumption + (consumption - olditem.consumption);
        totalnetproduction = totalnetproduction + (netproduction - olditem.netproduction);

        //production.calcPrice(distribute.wind, distribute.cons);
        //production.checkBlackout(totaltotalbuffer)
      }

      return data;
  });


  //manager_o = getManagers().then(data => {
    
  //})
  
  getGrid().then(data => {
    totalbuffer = data.buffer;
    const res = axios.put(backend + "/grid", {
      totalproduction: totalproduction,
      totalconsumption: totalconsumption,
      totalnetproduction: totalnetproduction
    });
  });

  console.log("tock")
}, tick);
