import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/styles.scss";

import Home from "./pages/home";
import ServiceProviders from "./pages/serviceProviders";
import ShoppingCart from "./pages/shoppingCart";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UserRegistration from "./pages/userRegistration";
import UserLogin from "./pages/userLogin";
import AuthenticationContextProvider from "./contexts/AuthenticationContext";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import TestPage from "./test/TestPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import AddProductPage from "./pages/AddProductPage";
import StatisticsPage from "./pages/StatisticsPage";
import HistoryPage from "./pages/HistoryPage";

library.add(far, fas, fab);

function App() {
    return (
        <Router>
            <AuthenticationContextProvider>
                <Switch>
                    <Route
                        path="/service-provider/:id"
                        component={ServiceProviders}
                    />
                    <Route exact path="/orders" component={OrderPage} />
                    <Route
                        exact
                        path="/order/details/:order_id"
                        component={OrderDetailsPage}
                    />
                    <Route
                        exact
                        path="/add/product"
                        component={AddProductPage}
                    />
                    <Route
                        exact
                        path="/statistics"
                        component={StatisticsPage}
                    />
                    <Route exact path="/checkout" component={CheckoutPage} />
                    <Route exact path="/cart" component={ShoppingCart} />
                    <Route
                        exact
                        path="/registration"
                        component={UserRegistration}
                    />
                    <Route exact path="/login" component={UserLogin} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/history" component={HistoryPage} />
                    <Route exact path="/test" component={TestPage} />
                    <Route exact path="/" component={Home} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthenticationContextProvider>
        </Router>
    );
}

export default App;
