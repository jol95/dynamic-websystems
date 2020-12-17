const production = require("./old/production");
const distribute = require("./old/distribute");
const axios = require("axios");
const { distributeAvg } = require("./old/distribute");

const backend = "http://localhost:5000/api"

const update = async () => { 
  try {
  const response = await axios.get(backend + '/simulator');
  if (response.status === 200) { 
    console.log('success stuff');
   return response.data;
  }
 } catch (err) {
   console.error(err)
 }
}

tick = 5000;
setInterval(() => {
  update().then(data => {
    console.log(data);
    
    distribute.distributeAvg();

    console.log(distribute.wDay);
    console.log("^^Wind^^")
    console.log(distribute.cons);
    console.log("^^Consumption^^")

    // var objCount = data.length;
    // for ( var x = 0; x < objCount ; x++ ) {
    //   var curitem = data[x];
    //   distribute.distributeAvg();

    //   production.prodAvg(distribute.wDay);
    //   production.calcPrice(distribute.wDay, distribute.cons);


      
    //   // const res = axios.put(backend + "simulator/" + curitem.houseid, {
    //   //   wind: distribute.wDay,
    //   //   consumption: distribute.cons,
    //   //   production: production.production,
    //   //   price: production.price,

    //   // });

      
    // }
  })
}, tick);

