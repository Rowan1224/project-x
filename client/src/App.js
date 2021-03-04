import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/styles.scss";

import SettingsContextProvider from "./contexts/SettingsContext";
import AuthenticationContextProvider from "./contexts/AuthenticationContext";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import TestPage from "./test/TestPage";
import UserLogin from "./pages/UserLogin";
import OrderPage from "./pages/OrderPage";
import AreasPage from "./pages/AreasPage";
import HistoryPage from "./pages/HistoryPage";
import ShoppingCart from "./pages/ShoppingCart";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import StatisticsPage from "./pages/StatisticsPage";
import ServiceProviders from "./pages/ServiceProviders";
import UserRegistration from "./pages/UserRegistration";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import EmployeeListPage from "./pages/EmployeeListPage";
import AvailableProductPage from "./pages/AvailableProductPage";

library.add(far, fas, fab);

const App = () => {
    return (
        <Router>
            <SettingsContextProvider>
                <AuthenticationContextProvider>
                    <Switch>
                        <Route
                            path="/service/provider/:id"
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
                            component={AvailableProductPage}
                        />
                        <Route exact path="/areas" component={AreasPage} />
                        <Route
                            exact
                            path="/employee"
                            component={EmployeeListPage}
                        />
                        <Route
                            exact
                            path="/statistics"
                            component={StatisticsPage}
                        />
                        <Route
                            exact
                            path="/checkout"
                            component={CheckoutPage}
                        />
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
            </SettingsContextProvider>
        </Router>
    );
};

export default App;
