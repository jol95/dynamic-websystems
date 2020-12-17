const distribute = require("./old/distribute");
const axios = require("axios");

const backend = "http://localhost:5000/api"

const makeRequest = async () => { 
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
  
  console.log(makeRequest.response)

  distribute.distributeAvg();
  console.log(distribute.wDay);
  console.log("^^ WIND ^^");
  console.log(distribute.cons);
  console.log("^^ CONS^^");
}, tick);

