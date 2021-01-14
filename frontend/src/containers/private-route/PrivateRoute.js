import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  comp: Component, // use comp prop
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      console.log("privateroute works");
      console.log("privateroute props", props);
      console.log("auth.user.nått2", props.auth.user.id);
      //auth=FALSE and LOADING=FALSE  or ROLE = TRUE
      if (props.auth.user.id==="manager"){
        return <Redirect to ="/login" />
      }
      if (!isAuthenticated && !loading) {
        return <Redirect to ="/login" />
      } 
      return <Component {...props} />
    }
  }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);