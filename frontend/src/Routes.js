import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import Households from "./containers/households/Households";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import UserProfile from "./containers/userprofile/UserProfile";
import Dashboard from "./containers/dashboard/Dashboard";
import PrivateRoute from "./containers/private-route/PrivateRoute";
import NotFound from "./containers/default/NotFound";

class Routes extends React.Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home}>
          <Home />
        </Route>
        <Route exact path="/households" component={Households}>
          <Households/>
        </Route>
        <Route exact path="/register" component={Register}>
          <Register />
        </Route>
        <Route exact path="/login" component={Login}>
          <Login/>
        </Route>
        <Route exact path="/userprofile" component={UserProfile}>
          <UserProfile/>
        </Route>
        <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard}>
          <Dashboard/>
        </PrivateRoute>
        </Switch>
        <Route>
          <NotFound/>
        </Route>
        
      </Switch>
    );
  }
}

export default Routes;

