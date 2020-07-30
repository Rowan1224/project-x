import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [isLightTheme, setIsLightTheme] = useState(false);
    
    const theme = {
        light: { syntax: "#555", ui: "#ddd", bg: "#eee" },
        dark: { syntax: "#ddd", ui: "#333", bg: "#555" }
    }

    const toggleTheme = () => {
        setIsLightTheme(!isLightTheme);
        console.log(isLightTheme);
    }

    return (
        <ThemeContext.Provider value={{ isLightTheme, theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
 
export default ThemeContextProvider;