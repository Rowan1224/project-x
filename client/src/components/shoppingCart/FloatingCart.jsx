import React, { useContext } from "react";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const useStyles = makeStyles((theme) => ({
    fab: {
        zIndex: 1,
        position: "fixed",
        // display: "flex",
       //justifyContent: "center",
        // bottom: theme.spacing(2),
        right: theme.spacing(),
            
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        maxWidth: 300,
    },
}));

const FloatingCart = () => {
    const classes = useStyles();
    const history = useHistory();
    const { items } = useContext(CartContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const mainColor = isLightTheme
        ? theme.light.mainColor
        : theme.dark.mainColor;
    const custom_syntax = isLightTheme ? "#f7f7f7" : "#292b2c";

    const handleClick = () => history.push("/cart");

    return (
        <>
            <Fab
                variant="extended"
                onClick={handleClick}
                className={classes.fab}
                style={{
                    backgroundColor: mainColor,
                    color: custom_syntax,
                }}
            >
                <FontAwesomeIcon
                    className="fa-icon mr-1"
                    icon={["fas", "cart-arrow-down"]}
                />
                {items.length}
            </Fab>
        </>
    );
};

export default FloatingCart;
