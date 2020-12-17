const production = require("./old/production");
const axios = require("axios");

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
    var objCount = data.length;
    for ( var x = 0; x < objCount ; x++ ) {
      var curitem = data[x];
      production.distributeAvg();
      
      
    }
  })
}, tick);

