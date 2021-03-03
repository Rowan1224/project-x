import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { ThemeContext } from "../../contexts/ThemeContext";
import CustomModalAlert from "./CustomModalAlert";
import Infobar from "./infobar";

const CustomCard = (props) => {
    const { cardBodyData, values, noValueInfo, status, setStatus } = props;

    const [statusVariant] = useState("danger");

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
    const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    return (
        <>
            {values && values.length > 0 ? (
                <div className="row">
                    {status && (
                        <CustomModalAlert
                            status={status}
                            setStatus={setStatus}
                            variant={statusVariant}
                        />
                    )}

                    {values.map((value) => (
                        <div
                            key={uuidv4()}
                            className="col-lg-3 col-md-4 col-sm-6 mb-4 text-center"
                        >
                            <Card className={"shadow" + ui + border}>
                                <Card.Body className={syntax}>
                                    {cardBodyData(value)}
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <Infobar>{noValueInfo}</Infobar>
            )}
        </>
    );
};

export default CustomCard;
