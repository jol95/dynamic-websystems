import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import Login from "./containers/login/Login";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
}