import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/styles.scss";

import Home from "./pages/home";
import ServiceProviders from "./pages/serviceProviders";
import ShoppingCart from "./pages/shoppingCart";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UserRegistration from "./pages/userRegistration";
import UserLogin from "./pages/userLogin";
import NotFound from "./components/generic/notFound";
import Inventory from "./pages/inventory";

library.add(far, fas);

const App = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path="/service-provider/:id"
                    component={ServiceProviders}
                />
                <Route exact path="/cart" component={ShoppingCart} />
                <Route
                    exact
                    path="/registration"
                    component={UserRegistration}
                />
                <Route exact path="/inventory" component={Inventory} />
                <Route exact path="/login" component={UserLogin} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
