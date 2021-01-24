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
// import test from "./test";

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
                    <Route exact path="/cart" component={ShoppingCart} />
                    <Route exact path="/registration" component={UserRegistration} />
                    <Route exact path="/login" component={UserLogin} />
                    {/* <Route exact path="/test" component={test} /> */}
                    <Route exact path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
