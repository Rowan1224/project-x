import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/styles.scss";

import Home from "./pages/home";
import ServiceProviders from "./pages/serviceProviders";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/service-provider">
            <ServiceProviders />
          </Route>
          <Route path="/about">
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;