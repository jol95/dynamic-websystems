import React, { Component ,useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Database, displayDatabase } from "../../actions/authActions";
import axios from 'axios';
import "./UserProfile.css";

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            houseid: "",
            errors: {}
        };
    }
    componentDidMount() {
        console.log("Userprofile mounted")
    }

    render() {
        return(
        displayDatabase(dbData, data),
        <div className="Apphouse">
            <h1>Your Household</h1>
            <h2>Show household info</h2>
            {/* Fetch data from API */}
            <br />
            {/* Display data from API */}   
            <div className="profiles"> 
                {userData && userData.map((data, index) => {
                    return (
                        <div className="profile" key={index}>
                            <h2>ID: {data.houseid}</h2>
                            <div className="details">
                            <img
                                src={"data:image/png;base64," + data.img}
                                alt='Image goes here'/>
                                <p>Wind:{data.wind} m/s</p>
                                <p>Production:{data.production} kW/h</p>
                                <p>Consumption:{data.consumption} kW/h</p>
                                <p>Netto production:{data.netproduction} kW/h</p>
                                <p>Buffer:{data.buffer} kW</p>
                                <p>Blackout:{data.blackout}</p>
                                <p>Ratio:{data.ratio}</p>
                            </div>
                            </div>
                    );
                })} 
                </div>
            </div>   
        );
}
}

UserProfile.propTypes = {
    displayDatabase: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { displayDatabase }
  )( UserProfile );
