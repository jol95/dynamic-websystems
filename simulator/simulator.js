const axios = require("axios");
const { cons } = require("./assets/distribute.js");
const distribute = require("./assets/distribute.js");
const { prod } = require("./assets/production.js");
const production = require("./assets/production.js");

const backend = "http://localhost:5000/api"

let init = false;

let batterylimit_h = 100;
let batterylimit_t = 2000;

let totalproduction = 0;
let totalconsumption = 0;
let totalnetproduction = 0;
let totalbuffer = 0;

const initTotal = async () => { 
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

const update = async () => { 
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

// tick = 10000 //for error checking.
tick = 6000;
setInterval(() => {
  initTotal().then(data => {
      totalproduction = data.totalproduction;
      totalconsumption = data.totalconsumption;
      totalnetproduction = data.totalnetproduction;
      totalbuffer = data.totalbuffer;

      distribute.distributeInit();
  });

  update().then(data => {
    var objCount = data.length;
    for ( var x = 0; x < objCount ; x++ ) {
      var curitem = data[x];
      console.log("Households: " + curitem);
      distribute.distributeAvg();

      if(curitem.isproducing){
        production.calcProd(distribute.wind);
      }else if(!curitem.isproducing){
        production.calcProd(0);
      }

      production.calcNetProd(distribute.cons);
      production.calcBuffer(production.netprod, curitem.ratio, curitem.buffer, batterylimit_h);
      production.checkBlackout(totalbuffer, totalnetproduction);
    
      console.log("Wind : " + distribute.wind);
      console.log("Consumption : " + distribute.cons);
      console.log("Production : " + production.prod);
      console.log("Nettoproduction : " + production.netprod);

      const res = axios.put(backend + "/household/" + curitem.id, {
        wind: distribute.wind,
        production: production.prod,
        consumption: distribute.cons,
        netproduction: production.netprod,
        buffer: production.buffer,
        blackout: production.blackout
      });

      console.log("Households: " + curitem);

      if(init){
        totalconsumption = totalconsumption + distribute.cons;
        totalproduction = totalproduction + production.prod;
        totalnetproduction = totalnetproduction + (production.netprod * 1 - curitem.ratio);
        init = false;
      }else{
        totalconsumption = totalconsumption + (distribute.cons - curitem.consumption);
        totalproduction = totalproduction + (production.prod - curitem.production);
        totalnetproduction = totalnetproduction + ((production.netprod * 1 - curitem.ratio) - (curitem.netproduction * curitem.ratio));
      }

      /* if((totalbuffer + (production.netprod * (1 - curitem.ratio))) > batterylimit_t) {  
        totalbuffer = batterylimit_t
      }else{
        totalbuffer = totalbuffer + (production.netprod * (1 - curitem.ratio));
      }  */
    }

    const res = axios.put(backend + "/grid", {
      totalproduction: totalproduction,
      totalconsumption: totalconsumption,
      totalnetproduction: totalnetproduction,
    })
  });
}, tick);