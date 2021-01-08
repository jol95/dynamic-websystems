const axios = require("axios");
const distribute = require("./assets/distribute.js");
const { prod } = require("./assets/production.js");
const production = require("./assets/production.js");

const backend = "http://localhost:5000/api"

const update = async () => { 
  try {
  const response = await axios.get(backend + '/household');
  if (response.status === 200) { 
    console.log('success stuff');
   return response.data;
  }
  } catch (err) {
   console.error(err)
  }
}
// tick = 10000 //for error checking.
tick = 5000;
setInterval(() => {
  update().then(data => {

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
      production.calcBuffer(data.buffer, production.netprod)
      
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
    }
  })
}, tick);

