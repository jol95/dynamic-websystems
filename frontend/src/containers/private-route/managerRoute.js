import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ManagerRoute = ({
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
      console.log("managerrouter props:", user);

      //auth=FALSE and LOADING=FALSE  or ROLE = TRUE
      if (user.role==="user"){
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
ManagerRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ManagerRoute);