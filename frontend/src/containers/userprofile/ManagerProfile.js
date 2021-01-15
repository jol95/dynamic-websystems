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

    componentDidMount() {
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
            //settimeout // polling
            //const base64Flag = 'data:image/jpeg;base64,';
            const { user } = this.props.auth;
            const data = user.id
            var kind = "";

            if (user.role==="manager"){
                kind = "manager/";
                console.log("you are indeed a manager");
            }else if (user.role==="user"){
                kind = "household/";
            }
            const response = await axios.get("/api/" + kind + data);
            const response2 = await axios.get("/api/grid/");
            this.setState({
                pollingCount: this.state.pollingCount + 1,
                price: response2.data.price,
                id: response.data.id,
                status: response.data.status,
                ratio: response.data.ratio,
                display: response.data.img,
            })
    }

    render() {
        const { id, status, ratio, display, price } = this.state
        return(
        <div className="Apphouse">
            <h1>Manager Dashboard</h1>
            <h2>Your Profile</h2>
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
                <p>status: {status} </p>
                <p>ratio: {ratio} </p>
                <p>price: {price} </p>
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
