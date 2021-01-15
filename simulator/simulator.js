const axios = require("axios");
const { cons } = require("./assets/distribute.js");
const distribute = require("./assets/distribute.js");
const { prod, netprodmarket, ratio } = require("./assets/production.js");
const production = require("./assets/production.js");

const backend = "http://localhost:5000/api";

let init = false;

let batterylimit_h = 100;
let batterylimit_t = 2000;

let totalproduction = 0;
let totalconsumption = 0;
let totalnetproduction = 0;
let totalbuffer = 0;

let managerpower = 0;

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

const updateUser = async () => { 
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

const updateManager = async () => { 
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

// tick = 10000 //for error checking.
tick = 5000;
setInterval(() => {
  if(!init){
    initTotal().then(tot => {
      totalproduction = tot.totalproduction;
      totalconsumption = tot.totalconsumption;
      totalnetproduction = tot.totalnetproduction;
      totalbuffer = tot.buffer;
   });
   }

   /*
      CHARGE BUFFER WITH RATIO * PRODUCTION OF MANAGER
      REST IS SENT TO MARKET
   */

   updateManager().then(manager => {
      var objCount = manager.length;
      for ( var x = 0; x < objCount ; x++ ) {
         var curitem = manager[x];

         if(curitem.status === "running"){
            if(totalbuffer + (curitem.production * curitem.ratio) >= batterylimit_t){
               totalbuffer = batterylimit_t;
               managerpower = managerpower + ((totalbuffer + (curitem.production * curitem.ratio)) - batterylimit_t);
            }else if(totalbuffer + (curitem.production * ratio) < 0){
               totalbuffer = 0;
               managerpower = managerpower + (curitem.production * (1 - curitem.ratio));
            }else{
               managerpower = managerpower + (curitem.production * (1 - curitem.ratio));
               totalbuffer = totalbuffer + (curitem.production * curitem.ratio);
            }
         }
      }
   })

   distribute.distributeInit();

   /*
      CHARGE HOUSE BUFFER (NETPRODUCTION * RATIO)
      REST IS SENT TO MARKET (NETPRODUCTION * (1 - RATIO))

      TOTALPRODUCTION - TOTALCONSUMPTION != TOTALNETPRODUCTION.
      WITH 
   */

   updateUser().then(data => {
      var objCount = data.length;
      for ( var x = 0; x < objCount ; x++ ) {
         var curitem = data[x];

         console.log("")
         console.log("###### HOUSE " + curitem.id + " ########")
         console.log("")

         distribute.distributeAvg();

         if(curitem.isproducing){
            production.calcProd(distribute.wind);
         }else if(!curitem.isproducing){
            production.calcProd(0);
         }

         production.setRatio(curitem.ratio);
         production.calcNetProd(distribute.cons);
         production.calcBuffer(curitem.buffer, batterylimit_h);
         production.checkBlackout(totalbuffer, totalnetproduction + managerpower);
      
         console.log("Wind : " + distribute.wind);
         console.log("Consumption : " + distribute.cons);
         console.log("Production : " + production.prod);
         console.log("Nettoproduction : " + production.netprodmarket);

         const res = axios.put(backend + "/household/" + curitem.id, {
            wind: ""+ distribute.wind,
            production: "" + production.prod,
            consumption: "" + distribute.cons,
            netproduction: "" + production.netprodmarket,
            buffer: "" + production.buffer,
            blackout: "" + production.blackout
         });

         console.log("")
         console.log("Previous consumption : " + curitem.consumption);
         console.log("Previous production : " + curitem.production);
         console.log("Previous netproduction : " + curitem.netproduction);

         if(!init){ // Init the total sum or add the difference depending on first iteration or not. 
            totalconsumption = (totalconsumption + distribute.cons);
            totalproduction = (totalproduction + production.prod);
            totalnetproduction = (totalnetproduction + production.netprodmarket);
         }else{
            totalconsumption = (totalconsumption + (distribute.cons - curitem.consumption));
            totalproduction = (totalproduction + (production.prod - curitem.production));
            totalnetproduction = (totalnetproduction + (production.netprodmarket - curitem.netproduction));
         }

         if((totalbuffer + (production.netprod * (1 - curitem.ratio))) > batterylimit_t) {  
            totalbuffer = batterylimit_t
         }else{
            totalbuffer = totalbuffer + (production.netprod * (1 - curitem.ratio));
         } 
      }
      console.log("");
      console.log("########################");
      console.log("######## TOTAL ##########");
      console.log("########################");
      console.log("TOTAL PRODUCTION : " + totalproduction);
      console.log("TOTAL CONSUMPTION : " + totalconsumption);
      console.log("TOTAL NETPRODUCTION : " + totalnetproduction);
      console.log("");
   });

   if(totalnetproduction < 0){
      totalbuffer = totalbuffer + totalnetproduction;
      if (totalbuffer < 0){
         totalbuffer = 0;
      }
   } 

   const res = axios.put(backend + "/grid/", {
      totalproduction: "" + (totalproduction + managerpower),
      totalconsumption: "" + (totalconsumption),
      totalnetproduction: "" + (totalnetproduction + managerpower),
      buffer: "" + totalbuffer
   })

   managerpower = 0;
   init = true;

   console.log("#######################")
}, tick);