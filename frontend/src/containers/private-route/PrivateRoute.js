import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  comp: Component, // use comp prop
  auth: { isAuthenticated, loading  },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      console.log("FUCKOFF");
      console.log(props);
      console.log("auth.user.nått", auth.user.role);
      console.log("auth.user.nått2", this.props.auth.user.id);
      //auth=FALSE and LOADING=FALSE  or ROLE = TRUE
      if (this.props.auth.user.id==="manager"){
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