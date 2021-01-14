import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDatabase } from "../../actions/authActions";
import classnames from "classnames";

class ManagerUpdateDb extends Component {
    constructor() {
      super();
      this.state = {
        ratio: 0,
        errors: {}
      };
    }

    render() {
    return (
        <div className="container">
          </div>
    );
    }
}

ManagerUpdateDb.propTypes = {
  updateDatabase: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateDatabase }
)( ManagerUpdateDb );