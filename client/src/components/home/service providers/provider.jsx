import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Provider = (props) => {
  // Themes
  const { isLightTheme, theme } = useContext(ThemeContext);
  const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
  const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
  const border = isLightTheme ? theme.light.border : theme.dark.border;
  const type = isLightTheme ? theme.light.type : theme.dark.type;

  return (
    <div className="col-12 mb-3">
      <Card
        className={"p-3 shadow" + ui + border}
      >
        <div className="row">
          <div className="col-md-3 col-sm-12 my-auto">
            <Card.Img
              variant="top"
              src={`https://picsum.photos/id/${Math.floor(
                Math.random() * 1000
              )}/800`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/img/Default.png";
              }}
              alt="provider's image"
              className={"rounded shadow" + border}
            />
          </div>

          <Card.Body className={"col-md-9 col-sm-12 d-flex flex-column" + syntax}>
            <Card.Title className="text-center">{props.ServiceName}</Card.Title>
            <Card.Text className="text-center mt-auto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim
              dolores et error accusamus tenetur nemo totam provident. Provident
              sit asperiores veritatis dolor iure, enim alias? Ea id praesentium
              reiciendis?Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Quia doloribus inventore harum. Voluptate dolor voluptatum,
              quae, inventore aspernatur quidem pariatur ad, eveniet ea labore
              quisquam accusantium temporibus? Magni, quas a?
            </Card.Text>
            <Button
              variant={type}
              className="mt-auto"
              as={Link}
              to="/service-provider"
            >
              Show their services
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Provider;
