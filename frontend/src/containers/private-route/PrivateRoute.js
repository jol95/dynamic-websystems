import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  comp: Component, // use comp prop
  auth: { isAuthenticated, loading, role },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      //auth=FALSE and LOADING=FALSE  or ROLE = TRUE
      !isAuthenticated && !loading && role ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
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