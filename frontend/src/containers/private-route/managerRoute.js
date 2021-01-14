import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ManagerRoute = ({
  comp: Component, // use comp prop
  man: { isManager, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isManager && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
PrivateRoute.propTypes = {
  man: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  man: state.man
});
export default connect(mapStateToProps)(ManagerRoute);