import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  comp: Component, // use comp prop
  auth: { isAuthenticated, 
          loading,
          user,
  },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      console.log("privateroute works");
      console.log("privateroute props", user);
      console.log("auth.user.nått2");
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