import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ManagerUpdateDb from "../updatedb/ManagerUpdateDb";
import ManagerProfile from "../userprofile/ManagerProfile";
import ProfileImg from "../profileimg/ProfileImg";

class ManagerDashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    const { user } = this.props.man;
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.firstname.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged in :){" "}
              </p>
            </h4>
            <ProfileImg/>
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
  logoutUser: PropTypes.func.isRequired,
  man: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  man: state.man
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(ManagerDashboard);