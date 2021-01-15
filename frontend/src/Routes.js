import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import Households from "./containers/households/Households";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import EditProfile from "./containers/userprofile/EditProfile";
import Dashboard from "./containers/dashboard/Dashboard";
import ManagerDashboard from "./containers/dashboard/ManagerDashboard";
import PrivateRoute from "./containers/private-route/PrivateRoute";
import ManagerRoute from "./containers/private-route/managerRoute";
import NotFound from "./containers/default/NotFound";

class Routes extends React.Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path={"/profile/:id"} component={EditProfile}></Route>
        <Switch>
        <ManagerRoute path="/households" component={Households}></ManagerRoute>
        <ManagerRoute path="/managerdashboard" comp={ManagerDashboard}></ManagerRoute>
        <PrivateRoute path="/dashboard" comp={Dashboard}></PrivateRoute>
        </Switch>
        <Route component={NotFound}/>      
      </Switch>
    );
  }
}

export default Routes;

