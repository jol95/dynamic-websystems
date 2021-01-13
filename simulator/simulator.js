const axios = require("axios");
const { cons } = require("./assets/distribute.js");
const distribute = require("./assets/distribute.js");
const { prod } = require("./assets/production.js");
const production = require("./assets/production.js");

const backend = "http://localhost:5000/api"

let init = false;
let house_o;
let manager_o;

let batterylimit_h = 100;  // Battery limit house in kW
let batterylimit_t = 2000; // Battery limit power plant (manager) in kW

let totalproduction = 0; 
let totalconsumption = 0;
let totalnetproduction = 0;
let totalbuffer = 0;

const getGrid = async () => {   // Function to get electric grid (total values).
  try {
    const response = await axios.get(backend + '/grid');
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
  const response = await axios.get(backend + '/household');
  if (response.status === 200) { 
    //console.log('Request on api/household worked!');
   return response.data;
  }
  } catch (err) {
   console.error(err)
  }
}

const getManagers = async () => {  // Function which recives all households and updates respectively. 
  try {
  const response = await axios.get(backend + '/manager');
  if (response.status === 200) { 
    //console.log('Request on api/household worked!');
   return response.data;
  }
  } catch (err) {
   console.error(err)
  }
}

// tick = 10000 //for error checking.
tick = 1000;    // 1 second each loop. 
setInterval(() => {   // Init 
  console.log("tick")

  if(!init){  // Get a batch of previously unchanged data. this is only used in first iteration!
    house_o = getHouses().then(data => {
      return data;
    });

    manager_o = getManagers().then(data => {
      return data;
    })

    getGrid().then(data => {
      totalproduction = data.totalproduction;
      totalconsumption = data.totalconsumption;
      totalnetproduction = data.totalnetproduction;
      totalbuffer = data.buffer;
    });

    distribute.distributeInit();

    init = true;
  }

  house_o = getHouses().then(data => {
      var objCount = data.length;
      for ( var x = 0; x < objCount ; x++ ) { // Loop through all households
        var curitem = data[x];
        var olditem = house_o[x];

        var wind = distribute.calcWind(); 
        var consumption = distribute.calcConsumption();

        if(curitem.isproducing){    // If household is producing
          var production = production.calcProd(wind); 
          var netproduction = production.calcNetProd(production, consumption);
          var buffer = production.calcBuffer(netproduction, curitem.ratio, curitem.buffer, batterylimit_h);
          var blackout = checkBlackout(netproduction, buffer, totalbuffer, totalnetproduction)

          const res = axios.put(backend + "/household/" + curitem.houseid, {
            wind: wind,
            production: production,
            consumption: consumption,
            netproduction: netproduction,
            totalbuffer: buffer,
            blackout: blackout
          });

        }else if(!curitem.isproducing){  // Not producing
          production.calcProd(0);
          production.calcNetProd(distribute.cons);
          production.calcBuffer(production.netprod, curitem.ratio, curitem.buffer);
          production.checkBlackout(totalbuffer, totalnetproduction)

          const res = axios.put(backend + "/household/" + curitem.houseid, {
            consumption: distribute.cons,
            netproduction: production.netprod,
            totalbuffer: production.totalbuffer,
            blackout: production.blackout
          });
        }
        
        //production.calcPrice(distribute.wind, distribute.cons);
        //production.checkBlackout(totaltotalbuffer)
      

        totalconsumption = totalconsumption + (olditem.consumption - distribute.cons);
        totalproduction = totalproduction + (olditem.production - production.prod);
        totalnetproduction = totalnetproduction + (olditem.netproduction - production.netprod);

        totalbuffer = 


      return data;
  });

  manager_o = getManagers().then(data => {
    /* CONTENT  */
  })

  console.log("tock")
}, tick);
