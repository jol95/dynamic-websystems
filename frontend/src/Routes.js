import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import Households from "./containers/households/Households";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import UserProfile from "./containers/userprofile/UserProfile";
import ProfileImg from "./containers/profileimg/ProfileImg";
import UpdateDb from "./containers/updatedb/UpdateDb";
import Dashboard from "./containers/dashboard/Dashboard";
import PrivateRoute from "./containers/private-route/PrivateRoute";
import NotFound from "./containers/default/NotFound";

class Routes extends React.Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/households" component={Households}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/userprofile" component={UserProfile}></Route>
        <Route path="/profileimg" component={ProfileImg}></Route>
        <Route path="/updatedb" component={UpdateDb}></Route>
        <Switch>
        <PrivateRoute path="/dashboard" comp={Dashboard}></PrivateRoute>
        </Switch>
        <Route component={NotFound}/>      
      </Switch>
    );
  }
}

export default Routes;

