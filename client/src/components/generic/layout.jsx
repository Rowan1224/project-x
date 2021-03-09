import React from "react";
import MainNav from "./navbar";
import ThemeContextProvider from "../../contexts/ThemeContext";
import Main from "./main";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <ThemeContextProvider>
            <MainNav />
            <Main>{props.children}</Main>
            <Footer />
        </ThemeContextProvider>
    );
};

export default Layout;
