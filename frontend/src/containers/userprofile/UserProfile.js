import React, { useState } from "react";
import axios from 'axios';
import "./UserProfile.css"

function UserProfile(props){
    const [userData, setUserData] = useState(null);
  
    const fetchData = async () => {
      const response = await axios.get("/api/user");
      setUserData(response.data);
    }

    return (
        <div className="Apphouse">
          <h1>Users overviews</h1>
          <h2>Show user info</h2>
        {/* Fetch data from API */}
        <div>   
          <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
        </div>
        <br />
        {/* Display data from API */}   
        <div className="profiles"> 
            {userData && userData.map((profiles, index) => {
                return (
                    <div className="profile" key={index}>
                        <h3>User {index + 1}</h3>
                        <h2>ID: {profiles.houseid}</h2>
                        <div className="details">
                            <p>First Name:{profiles.firstname}</p>
                            <p>Last Name:{profiles.lastname}</p>
                        </div>
                    </div>
                );
            })}    
        </div>
        </div>
    );
}

export default UserProfile;
