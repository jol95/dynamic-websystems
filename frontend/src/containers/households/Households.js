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
      <div className="Apphouse">
          <h1>Household overviews</h1>
          <h2>Show household info</h2>
        {/* Fetch data from API */}
        <div>   
          <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
        </div>
        <br />
        {/* Display data from API */}   
        <div className="houses"> 
            {userData && userData.map((houses, index) => {
                return (
                    <div className="house" key={index}>
                        <h3>House {index + 1}</h3>
                        <h2>ID: {houses.houseid}</h2>
                        <div className="details">
                            <p>Address:{houses.address}</p>
                            <p>Wind:{houses.wind}</p>
                            <p>Consumption:{houses.consumption}</p>
                            <p>Production:{houses.production}</p>
                            <p>Price:{houses.price}</p>
                            <p>Netto:{houses.netproduction}</p>
                        </div>
                    </div>
                );
            })}    
        </div>
        </div>
    );
}

export default Households;