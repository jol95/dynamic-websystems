import React, { Component ,useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Database, displayDatabase } from "../../actions/authActions";
import axios from 'axios';
import "./UserProfile.css";

class ManagerProfile extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    render() {

        return(
        <div className="Apphouse">

        </div>   
        );
}
}

ManagerProfile.propTypes = {
    displayDatabase: PropTypes.func.isRequired,
    man: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    man: state.man,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { displayDatabase }
  )( ManagerProfile );
