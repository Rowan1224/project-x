import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Palette } from "@material-ui/icons";

const ToggleTheme = () => {
  const { toggleTheme } = useContext(ThemeContext);
  
  return (
    <div
        onClick={toggleTheme}
        className="text-main"
    >
        <Palette />        
    </div>
  );
};

export default ToggleTheme;
