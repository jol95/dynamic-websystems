import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home/Home";
import NotFound from "./containers/default/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route>
        <NotFound/>
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}