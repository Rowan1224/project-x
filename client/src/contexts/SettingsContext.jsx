import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
    const [universalFlag, setUniversalFlag] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

    const changeIsAnimated = () => setIsAnimated(!isAnimated);
    const updateUniversalFlag = () => setUniversalFlag(!universalFlag);

    return (
        <SettingsContext.Provider
            value={{
                isAnimated,
                changeIsAnimated,
                universalFlag,
                updateUniversalFlag,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
