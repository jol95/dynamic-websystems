import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import UpdateDb from "../updatedb/UpdateDb";
import ManagerUpdateDb from "../updatedb/ManagerUpdateDb";
import ManagerProfile from "../userprofile/ManagerProfile";
import ProfileImg from "../profileimg/ProfileImg";

class ManagerDashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutManager();
  };

render() {
    const { user } = this.props.auth;
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.firstname}
              <p className="flow-text grey-text text-darken-1">
                You are logged in :){" "}
              </p>
            </h4>
            <ManagerProfile/>
            <ProfileImg/>
            <UpdateDb/>
            <ManagerUpdateDb/>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
ManagerDashboard.propTypes = {
  logoutManager: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutManager }
)(ManagerDashboard);