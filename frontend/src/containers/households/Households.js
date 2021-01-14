import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayDatabase } from "../../actions/authActions";
import axios from 'axios';
import "./UserProfile.css";

class HouseHolds extends Component {
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
            var kind = "household/"

            }
            const response = await axios.get("/api/" + kind + data);
            this.setState({
                pollingCount: this.state.pollingCount + 1,
                id: response.data.id,
                display:  response.data.img,
                wind:  response.data.wind,
                production:  response.data.production,
                consumption:  response.data.consumption,
                netproduction:  response.data.netproduction,
                buffer:  response.data.buffer,
                blackout:  response.data.blackout,
                ratio:  response.data.ratio,
            })
    }



    render() {
        const { id, display, wind, production, consumption,
        netproduction, buffer, blackout, ratio } = this.state
        return(
        <div className="Apphouse">
            <h1>Your Household</h1>
            <h2>Show household info</h2>
            {/* Fetch data from API */}
            <br />
            {/* Display data from API */}   
                <div className="houses"> 
                {this.state && this.state.map((houses, index) => {
                return (
                    <div className="house" key={index}>
                        <h3>House {index + 1}</h3>
                        <h2>ID: {houses.id}</h2>
                        <div className="details">
                            <img
                            src={"data:image/png;base64," + houses.img}
                            alt='Look here'/>
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
