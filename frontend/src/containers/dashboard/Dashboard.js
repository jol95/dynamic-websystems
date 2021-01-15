import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import UpdateDb from "../updatedb/UpdateDb";
import UserProfile from "../userprofile/UserProfile";
import ProfileImg from "../profileimg/ProfileImg";

class Dashboard extends Component {
  const { user } = this.props.auth;
  const data = user.id;
  onLogoutClick = e => {
    e.preventDefault();
    const dbData = {
      status: false,
    }
    this.props.logoutUser(dbData, data);
  };


render() {

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
            <UserProfile/>
            <ProfileImg/>
            <UpdateDb/>
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