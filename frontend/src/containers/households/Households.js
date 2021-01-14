import React, { useState } from "react";
import axios from 'axios';
import "./Households.css";

function Households(props){
    const [userData, setUserData] = useState(null);
  
    const fetchData = async () => {
      const response = await axios.get("/api/household");
      setUserData(response.data);
    }
  
    return (
    fetchData(),
      <div className="Apphouse">
          <h1>Household overviews</h1>
          <h2>Show household info</h2>
        {/* Fetch data from API */}
        <br />
        {/* Display data from API */}   
        <div className="houses"> 
            {userData && userData.map((houses, index) => {
                return (
                    <div className="house" key={index}>
                        <h3>House {index + 1}</h3>
                        <h2>ID: {houses.id}</h2>
                        <div className="details">
                            <img
                            src={"data:image/png;base64," + houses.img}
                            alt='Image goes here'/>
                            <br/>
                            <p>Wind:{houses.wind} m/s</p>
                            <p>Production:{houses.production} kW/h</p>
                            <p>Consumption:{houses.consumption} kW/h</p>
                            <p>Netto production:{houses.netproduction} kW/h</p>
                            <p>Buffer:{houses.buffer} kW</p>
                            <p>Blackout:{houses.blackout}</p>
                            <p>Ratio:{houses.ratio}</p>
                        </div>
                    </div>
                );
            })}    
        </div>
        </div>
    );
}

export default Households;