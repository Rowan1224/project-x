import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Provider = (props) => {
  return (
    <div className="col-12 mb-3">
      <Card className="bg-light p-1 shadow">
        <div className="row">
          <Card.Img
            variant='top'
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 1000
            )}/800`}
            alt='card image'
            className="col-3 py-3 ml-3"
          />
          <Card.Body className="col-8 mx-auto d-flex flex-column">
            <Card.Title className='text-dark text-center'>{props.ServiceName}</Card.Title>
            <Card.Text className='text-secondary mt-auto'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim
              dolores et error accusamus tenetur nemo totam provident. Provident
              sit asperiores veritatis dolor iure, enim alias? Ea id praesentium
              reiciendis?
            </Card.Text>
            <Button
              variant='primary'
              href='/service-provider'
              className="mt-auto"
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
