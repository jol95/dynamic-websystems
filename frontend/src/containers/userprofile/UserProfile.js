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
            id: "",
            display: "",
            production: "",
            errors: {}
        };
    }


    fetchData = async () => {
        //const base64Flag = 'data:image/jpeg;base64,';
        const { user } = this.props.auth;
        const data = user.houseid.split(" ")[0]
        console.log("user: xxx", data);
        const response = await axios.get("/api/household/" + data);
        this.setState({
            display:  response.data.img,
            production:  response.data.production,
            id: data
        })
        console.log("userdata: xxx", response.data);
    }


    componentDidMount() {
        //console.log("Userprofile mounted")
        //const { user } = this.props.auth;
        //const data = user.houseid.split(" ")[0]
        //this.props.displayDatabase(data)
        //console.log("user: xxx", data);
    }


    render() {
        const { display } = this.state
        const { production } = this.state
        this.fetchData()
        return(
        <div className="Apphouse">
            <h1>Your Household</h1>
            <h2>Show household info</h2>
            {/* Fetch data from API */}
            <br />
            {/* Display data from API */}   
            <div className="profiles"> 
                <p>production: {production} </p>
                 <img
                    src={"data:image/png;base64," + display}
                    alt='Image goes here'/>
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
