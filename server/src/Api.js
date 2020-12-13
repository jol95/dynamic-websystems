import React, { useState} from "react";
import axios from 'axios';

function Api() {
  const userURL = "http://130.240.200.62:8082/user"
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(userURL);
    setUserData(response.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>User profile</h1>
        <h2>Fetch/show info</h2>
      </header>
      {/* Fetch data from API */}
      <div className="user-container">   
        <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
      </div>
      {/* Display data from API */}   
      <div className="usernames">

      {userData && userData.map((person, index) => {
          return (
              <div className="person" key={index}>
                  <h3>person {index + 1}</h3>
                  <div className="details">
                      <p>{person.firstname}</p>
                      <p>{person.address}</p>
                      <p>{person.username}</p>
                  </div>
               </div>
          );
      })}    
      </div>
      </div>
  );
}

export default Api;

