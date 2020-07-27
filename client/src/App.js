import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/styles.scss";

import Home from "./pages/home";
import ServiceProviders from "./pages/serviceProviders";
import ShoppingCart from "./pages/shoppingCart";
import RegistrationForm from "./pages/userRegistrationForm";

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/service-provider">
            <ServiceProviders />
          </Route>
          <Route path="/cart">
            <ShoppingCart />
          </Route>
          <Route path="/registration">
            <RegistrationForm />
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