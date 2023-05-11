import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home"
import Order from "./Pages/Order";
import "./App.css"
import Success from "./Pages/Success";

const App = () => {

  return (
    <div>
      <div className="header">
        <img src="../logo.svg" alt="Logo" />
      </div>
      <div className="main-container">
        <Switch>
          <Route path="/success"><Success />  </Route>
          <Route path="/order"><Order /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </div>
  );
};
export default App;
