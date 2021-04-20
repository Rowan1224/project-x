import { Card } from "react-bootstrap";
import React, { useContext } from "react";
// import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";

// const useStyles = makeStyles((theme) => ({
//     fab: {
//         zIndex: 1,
//         position: "fixed",
//         // display: "flex",
//         // justifyContent: "center",
//         // bottom: theme.spacing(2),
//         right: theme.spacing(),
//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 200,
//         maxWidth: 300,
//     },
// }));

const FloatingCart = () => {
    // const classes = useStyles();
    const history = useHistory();
    const { items, totalPrice } = useContext(CartContext);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const border = isLightTheme ? theme.light.border : theme.dark.border;
    const custom_text = isLightTheme
        ? theme.light.custom_text
        : theme.dark.custom_text;
    // const custom_syntax = isLightTheme ? "#f7f7f7" : "#292b2c";

    const handleClick = () => history.push("/cart");

    return (
        // <>
        //     <Fab
        //         variant="extended"
        //         onClick={handleClick}
        //         className={classes.fab}
        //         style={{
        //             backgroundColor: mainColor,
        //             color: custom_syntax,
        //         }}
        //     >
        //         <FontAwesomeIcon
        //             className="fa-icon mr-1"
        //             icon={["fas", "cart-arrow-down"]}
        //         />
        //         {items.length}
        //     </Fab>
        // </>
        <Card
            onClick={handleClick}
            className={"mr-1" + ui + custom_text + border}
            style={{ position: "fixed", zIndex: "1", right: "0" }}
        >
            <Card.Body>
                <FontAwesomeIcon
                    className="fa-icon mr-1"
                    icon={["fas", "cart-arrow-down"]}
                />
                {items.length}
                <br />
                <span className="font-weight-bold mr-2">৳</span>
                {totalPrice}
            </Card.Body>
        </Card>
    );
};

export default FloatingCart;
