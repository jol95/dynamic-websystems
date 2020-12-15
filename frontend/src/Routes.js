import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import Households from "./containers/households/Households";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import NotFound from "./containers/default/NotFound";

class Routes extends React.Component{

  render(){
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/households">
          <Households/>
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
        
      </Switch>
    );
  }
}

export default Routes;

