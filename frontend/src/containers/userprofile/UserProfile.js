import React, { useState } from "react";
import axios from 'axios';
import "./UserProfile.css";

function UserProfile(props){
    const [userData, setUserData] = useState(null);
  
    const fetchData = async () => {
      const response = await axios.get("/api/household");
      setUserData(response.data);
    }
  
    return (
    fetchData();
      <div className="Apphouse">
          <h1>Your Household</h1>
          <h2>Show household info</h2>
        {/* Fetch data from API */}
        <div>   
          <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
        </div>
        <br />
        {/* Display data from API */}   
        <div className="profiles"> 
            {userData && userData.map((data, index) => {
                return (
                    <div className="profile" key={index}>
                        <h2>ID: {data.houseid}</h2>
                        <div className="details">
                            <p>Production:{data.production}</p>
                            <p>Consumption:{data.consumption}</p>
                            <p>Netto production:{data.netproduction}</p>
                            <p>Buffer:{data.buffer}</p>
                            <p>Blackout:{data.price}</p>
                            <p>Netto:{data.blackout}</p>
                        </div>
                    </div>
                );
            })}    
        </div>
        </div>
    );
}
export default UserProfile;
