import React from "react";
import { Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Provider = (props) => {
  return (
    <div className="col-12 mb-3">
      <Card className="bg-light p-3 shadow">
        <div className="row">
          <div className="col-md-3 col-sm-12 my-auto">
            <Card.Img
              variant="top"
              src={`https://picsum.photos/id/${Math.floor(
                Math.random() * 1000
              )}/800`}
              alt="provider's image"
              className="custom-border rounded shadow"
            />
          </div>

          <Card.Body className="col-md-9 col-sm-12 d-flex flex-column">
            <Card.Title className="text-dark text-center">
              {props.ServiceName}
            </Card.Title>
            <Card.Text className="text-secondary mt-auto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim
              dolores et error accusamus tenetur nemo totam provident. Provident
              sit asperiores veritatis dolor iure, enim alias? Ea id praesentium
              reiciendis?Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Quia doloribus inventore harum. Voluptate dolor voluptatum,
              quae, inventore aspernatur quidem pariatur ad, eveniet ea labore
              quisquam accusantium temporibus? Magni, quas a?
            </Card.Text>
            <Button
              variant="main"
              className="shadow mt-auto"
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
