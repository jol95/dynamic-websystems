import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayDatabase } from "../../actions/authActions";
import axios from 'axios';
import "./Households.css";

class HouseHolds extends Component {
    constructor() {
        super();
        this.state = {
            pollingCount: 0,
            delay: 1000,
            incoming: {},
            errors: {}
        };
    }

    componentDidMount() {
        console.log("component did mount HOUSEHOLDS");
        this.interval = setInterval(this.tick, this.state.delay);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.delay !== this.state.delay) {
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, this.state.delay);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    tick = async () => {    
            const { user } = this.props.auth;
            const data = user.id
            var kind = "household/"

            const response = await axios.get("/api/" + kind);
            console.log("AXIOS GET");
            console.log("HOUSEHOLD: response data", response.data);
            console.log("HOUSEHOLD: response", response);
            this.setState({           
                pollingCount: this.state.pollingCount + 1,
                incoming: response.data,

                // id: response.data.id,
                // display:  response.data.img,
                // wind:  response.data.wind,
                // production:  response.data.production,
                // consumption:  response.data.consumption,
                // netproduction:  response.data.netproduction,
                // buffer:  response.data.buffer,
                // blackout:  response.data.blackout,
                // ratio:  response.data.ratio,

            })
    }



    render() {
        const { incoming } = this.state;
        console.log("incoming array", incoming);
        console.log("this state", this.state);
        // const { id, display, wind, production, consumption,
        // netproduction, buffer, blackout, ratio } = this.state
        return(
            <div className="Apphouse">
                <h1>Your Household</h1>
                <h2>Show household info</h2>
                {/* Fetch data from API */}
                <br />
                {/* Display data from API */}   
                <div className="profiles"> 
                    <div className="profile">
                        <h2>ID: {id} </h2>
                        <div className="details">
                    <img
                        src={"data:image/png;base64," + display}
                        alt='Look here'/>
                    <br/>
                    <p>wind: {wind} m/s </p>
                    <p>production: {production} kW/h </p>
                    <p>consumption: {consumption} kw/h </p>
                    <p>netproduction: {netproduction} kW/h </p>
                    <p>buffer: {buffer} kW </p>
                    <p>blackout: {blackout} </p>
                    <p>ratio: {ratio} </p>
                    </div>
                    </div>
                    </div>
                </div>   
            );
}
}

HouseHolds.propTypes = {
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
  )( HouseHolds );
