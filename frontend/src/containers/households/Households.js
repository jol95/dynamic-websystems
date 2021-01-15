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

            var kind = "households";
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

            {items.map(item =>
                <h4 key={item.id}>{item.id}</h4>)}
            
            <h1>Your Household</h1>
            <h2>Show household info</h2>
            {/* Fetch data from API */}
            <br />
            {/* Display data from API */}   
            <div className="profiles"> 
                <div className="profile">
                    {/* <h2>ID: {id} </h2> */}
                    <div className="details">
                {/* <img
                    src={"data:image/png;base64," + display}
                    alt='Look here'/> */}
                <br/>

                </div>
                </div>
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