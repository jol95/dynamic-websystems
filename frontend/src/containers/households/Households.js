import React, { useState } from "react";
import axios from 'axios';
import "./Households.css";

function Households(props){
    const [userData, setUserData] = useState(null);
  
    const fetchData = async () => {
      const response = await axios.get("/api/simulator");
      setUserData(response.data);
    }
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Household overviews</h1>
          <h2>Show household info</h2>
        </header>
        {/* Fetch data from API */}
        <div className="user-container">   
          <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
        </div>
        {/* Display data from API */}   
        <div className="usernames">
  
        {userData && userData.map((houses, index) => {
            return (
                <div className="houses" key={index}>
                    <h3>House {index + 1}</h3>
                    <div className="details">
                        <p>{houses.address}</p>
                        <p>{houses.wind}</p>
                        <p>{houses.production}</p>
                    </div>
                 </div>
            );
        })}    
        </div>
        </div>
    );
}

export default Households;