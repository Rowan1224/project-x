import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Service = (props) => {
  return (
    <div className='col-xl-4 col-md-6 col-sm-12 mb-3 text-center'>
      <Card className="bg-light custom-border shadow">
        <div className="inner">
          <Card.Img
            variant="top"
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 1000
            )}/800`}
            alt="card image"
          />
        </div>
        <Card.Body>
          <Card.Title>{props.ServiceName}</Card.Title>
          <h5 className="text-success">Tk 790</h5>
          <Card.Text className="text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim
            dolores et error accusamus tenetur nemo totam provident. Provident
            sit asperiores veritatis dolor iure, enim alias? Ea id praesentium
            reiciendis?
          </Card.Text>
          <Button variant="main">Add to cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Service;
