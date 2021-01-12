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
        <Route exact path="/" component={Home}/>
        <Route path="/households" component={Households}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/userprofile" component={UserProfile}/>
        <Switch>
        <PrivateRoute path="/dashboard" comp={Dashboard}/>
        </Switch>
        <Route component={NotFound}/>      
      </Switch>
    );
  }
}

export default Routes;

