import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import Register from "./containers/register/Register";
import NotFound from "./containers/default/NotFound";

class Routes extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route>
          <NotFound/>
        </Route>
        
      </Switch>
    );
  }
}

export default Routes;

