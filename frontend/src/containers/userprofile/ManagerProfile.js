import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayDatabase } from "../../actions/authActions";
import axios from 'axios';
import "./UserProfile.css";

class ManagerProfile extends Component {
    constructor() {
        super();
        this.state = {
          pollingCount: 0,
          delay: 1000,
          errors: {}
        };
    }
    //Sets an interval and tickrate when component and for as long as it's mounted
    componentDidMount() {
      this.interval = setInterval(this.tick, this.state.delay);
   }

    componentDidUpdate(prevProps, prevState){
        if (prevState.delay !== this.state.delay) {
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, this.state.delay);
        }
    }
    //Stops ticking when the component is unmounted
    componentWillUnmount() {
        clearInterval(this.interval);
    }

        tick = async () => { 
            const { user } = this.props.auth;
            const data = user.id
            var kind = "";

            if (user.role==="manager"){
                kind = "manager/";
            }else if (user.role==="user"){
                kind = "household/";
            }

            const response = await axios.get("/api/" + kind + data);
            const response2 = await axios.get("/api/grid/");
            this.setState({
                pollingCount: this.state.pollingCount + 1,
                price: response2.data.price,
                totalproduction: response2.data.totalproduction,
                totalconsumption: response2.data.totalconsumption,
                totalnetproduction: response2.data.totalnetproduction,
                buffer: response2.data.buffer,
                modelprice: response2.data.modelprice,
                production: response.data.production,
                id: response.data.id,
                status: response.data.status,
                ratio: response.data.ratio,
                display: response.data.img,
            })
    }

    render() {
        const { id, status, ratio, production, display, price, totalproduction, totalconsumption,
        totalnetproduction, buffer, modelprice } = this.state
        return(
        <div className="Apphouse">
            <h1>Manager Dashboard</h1>

            {/*HOUSEHOLD BUTTON*/}

            <button
            style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
            }}
            onClick={event =>  window.location.href='/households'}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
            Your households
            </button>

            {/*USER BUTTON*/}

            <button
            style={{
                color: "blue",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
            }}
            onClick={event =>  window.location.href='/householdusers'}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
            Your users
            </button>
            <h2>Your Profile</h2>
            <br />
            {/* Display data from API */}   
            <div className="profiles"> 
                <div className="profile">
                    <h2>ID: {id} </h2>
                    <div className="details">
                <img
                    src={"data:image/png;base64," + display}
                    alt='Look here'/>
                <br/><br/>
                <p><b>status of coal powerplant: </b> {status} </p>
                <p><b>ratio: </b> {ratio} </p>
                <p><b>current market price: </b> {price} sek/kW</p>
                <p><b>manager production output: </b>{production} kW/h</p>
                <p><b>totalproduction: </b>{totalproduction} kW/h</p>
                <p><b>totalconsumption: </b>{totalconsumption} kW/h</p>
                <p><b>market: </b>{totalnetproduction} kW/h </p>
                <p><b>buffer: </b> {buffer} kW</p>
                <p><b>modelprice: </b>{modelprice} sek/kW</p>
                </div>
                </div>
                </div>
            </div>   
        );
}
}

ManagerProfile.propTypes = {
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
  )( ManagerProfile );
