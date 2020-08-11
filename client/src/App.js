import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/styles.scss";

import Home from "./pages/home";
import ServiceProviders from "./pages/serviceProviders";
import ShoppingCart from "./pages/shoppingCart";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import User from "./pages/user";

library.add(far, fas);

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        path="/service-provider/:id"
                        component={ServiceProviders}
                    />
                    <Route path="/cart" component={ShoppingCart} />
                    <Route path="/registration" component={User} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
