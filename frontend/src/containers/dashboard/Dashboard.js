import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import UpdateDb from "../updatedb/UpdateDb";
import UserProfile from "../userprofile/UserProfile";
import ProfileImg from "../profileimg/ProfileImg";

class Dashboard extends Component {
  onLogoutClick = e => {
    const { user } = this.props.auth;
    const data = user.id;
    e.preventDefault();
    // const dbData = {
    //   status: false,
    // }
    const dbData =  {
      status: false,
    }
    console.log("dashboard logout data", dbData)
    this.props.logoutUser(dbData, data);
  };

  onEditClick = e => {
  const { user } = this.props.auth;
  const data = user.id;
  e.preventDefault();
  const path = `/profile/${data}`;
  this.props.history.push(path);
  };

render() {
  const { user } = this.props.auth;
  const data = user.id;
  return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <UserProfile/>
            <ProfileImg/>
            <UpdateDb/>
            {/*EDIT PROFILE BUTTON*/}
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onEditClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Edit profile
            </button>
            {/*LOGOUT BUTTON */}
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
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);