import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayDatabase } from "../../actions/authActions";
import axios from 'axios';
import "./Households.css";

class Households extends Component {
    constructor() {
        super();
        this.state = {
            pollingCount: 0,
            items: [],
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

            var kind = "household";
            const response = await axios.get("/api/" + kind);
            this.setState({
                pollingCount: this.state.pollingCount + 1,
                items: response.data
            })
    }



    render() {
         let items = this.state.items
         console.log("RENDER(): items:", items);
         console.log("RENDER(): response.data", this.state.items)
        return(
        <div className="Apphouse">
            <h1>Households</h1>
            <h2>Refreshes: {this.state.pollingCount}</h2>
            {/* Fetch data from API */}
            <br />
            {/* Display data from API */}
            <div className="houses">   
            {items.map(item =>
                <div className="house" key={item.id}>
                    <h2>ID: {item.id}</h2>
                    <div className="details">
                        <img
                        src={"data:image/png;base64," + item.img}
                        alt='Look here'/>
                        <br/>
                        <p>Wind:{item.wind} m/s</p>
                        <p>Production:{item.production} kW/h</p>
                        <p>Consumption:{item.consumption} kW/h</p>
                        <p>Netto production:{item.netproduction} kW/h</p>
                        <p>Buffer:{item.buffer} kW</p>
                        <p>Price:{item.price} sek/kW </p>
                        <p>Blackout:{String(item.blackout)}</p>
                        <p>Ratio:{item.ratio}</p>
                    </div>
                </div>
            )}
            
            </div>
        </div>   
        );
    }
}

Households.propTypes = {
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
  )( Households );