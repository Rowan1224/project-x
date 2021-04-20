import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  // componentDidMount
  useEffect(() => {
    const json = sessionStorage.getItem("theme");
    const localTheme = JSON.parse(json);

    if (localTheme != null) setIsLightTheme(localTheme);
  }, []);

  // componentDidUpdate
  useEffect(() => {
    const json = sessionStorage.getItem("theme");
    const localTheme = JSON.parse(json);

    if (localTheme !== isLightTheme)
      sessionStorage.setItem("theme", JSON.stringify(isLightTheme));
  }, [isLightTheme]);

  const theme = {
    light: {
      syntax:         "",
      bg:             "#ffffff",
      link:           " link",
      ui:             " bg-light",
      border:         " custom-border",
      custom_text:    " text-main",
      type:           "main",
      dropdown_text:  " dropdown-text",
      borderLeft:     " #eee",
      currency_text:  " text-success-light",
      success:        "success-light",
      secondary:      "secondary",
      // mainColor:      "#2980b9",
      mainColor:      "#5e60ce",
      mainBG:         " bg-main-bg",
      dangerTextColor:" text-danger",
      btnTypeClass:   " btn-main",
      lineChartbg:    "rgba(41, 127, 185, 0.15)",
    },
    dark: {
      syntax:         " text-white",
      bg:             "#20222b",
      link:           " link-dark",
      ui:             " bg-dark",
      border:         " custom-border-dark",
      custom_text:    " text-main-dark",
      type:           "main-dark",
      dropdown_text:  " dropdown-text-dark",
      borderLeft:     " #cecece1f",
      currency_text:  " text-success-dark",
      success:        "success-dark",
      secondary:      "secondary-dark",
      mainColor:      "#feca57",
      mainBG:         " bg-main-bg-dark",
      dangerTextColor:" text-remove",
      btnTypeClass:   " btn-main-dark",
      // lineChartbg:    "rgba(254, 201, 87, 0.2)",
      lineChartbg:    "rgba(239, 108, 0, 0.15)",
    },
  };

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <ThemeContext.Provider value={{ isLightTheme, theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
