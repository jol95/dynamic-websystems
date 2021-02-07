import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { displayDatabase } from "../../actions/authActions";
import { setUserTimeout } from "../../actions/authActions";
import classnames from "classnames";
import axios from 'axios';
import "./Households.css";

class HouseholdUsers extends Component {
    constructor() {
        super();
        this.state = {
            pollingCount: 0,
            items: [],
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

    onEditClick = (e, id) => { 
        e.preventDefault();
        const path = `/profile/${id}`;
        this.props.history.push(path);
      }
    onEditClick2 = (e, id) => { 
        e.preventDefault();
        this.props.setUserTimeout(id);
    }

    tick = async () => {    

            var kind = "user";
            const response = await axios.get("/api/" + kind);
            this.setState({
                pollingCount: this.state.pollingCount + 1,
                items: response.data
            })
    }

    render() {
         let items = this.state.items
        return(
        <div className="Apphouse">
            <Link to="/managerdashboard" className="btn-flat waves-effect">
            <i className="material-icons left"></i> Back to managerdashboard
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                <b>Users</b>
                </h4>
                <p className="grey-text text-darken-1">
                Want to go to the households? <Link to="/households">Users</Link>
                </p>
            </div>
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
                        <p><b>email: </b>{item.email} </p>
                        <p><b>firstname: </b>{item.firstname} </p>
                        <p><b>lastname: </b>{item.lastname} </p>
                        <p><b>address: </b>{item.address} </p>
                        <p><b>logged in: </b>{item.status} </p>

                        {/*BLOCK SALES OF USER */}
                        
                        <button
                        style={{
                            backgroundColor: "lightblue",
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={(e) => this.onEditClick2(e, item.id)}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Sell timeout
                        </button>

                        {/*EDIT PROFILE BUTTON*/}

                        <button
                        style={{
                            backgroundColor: "lightblue",
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={(e) => this.onEditClick(e, item.id)}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Edit profile
                        </button>
                    </div>
                </div>
            )}
            
            </div>
        </div>   
        );
    }
}

HouseholdUsers.propTypes = {
    displayDatabase: PropTypes.func.isRequired,
    setUserTimeout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { displayDatabase, setUserTimeout }
  )( HouseholdUsers );