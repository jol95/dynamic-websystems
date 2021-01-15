import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUser } from "../../actions/authActions";

class EditUser extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

componentDidMount() {
    fetchData();
}

render() {
  const { user } = this.props.auth;
  const data = user.id;
return (
      
    );
  }
}
Dashboard.propTypes = {
  editUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { editUser }
)(Dashboard);