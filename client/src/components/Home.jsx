import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ThemeContext } from "../contexts/ThemeContext";

import Providers from "./providers/providers";
import LocationContextProvider from "../contexts/LocationContext";
import SelectLocation from "./location/SelectLocation";

const Home = () => {
    const history = useHistory();

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;

    return (
        <>
            <div className={"text-center mt-2 mb-5" + syntax}>
                <h2>
                    Why bother, when <span className="logo-text">ProjectX</span>{" "}
                    is here!
                </h2>
            </div>

            <LocationContextProvider>
                <SelectLocation />
                <Providers />
            </LocationContextProvider>

            {localStorage.getItem("isServiceProvider") === "true" &&
                history.push("/orders")}
        </>
    );
};

export default Home;
