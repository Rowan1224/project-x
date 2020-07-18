import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Provider = (props) => {
  return (
    <div className='col-md-12 mb-3'>
      <Card>
        {/* className="d-flex justify-content-center" */}
        <Card.Img
          variant="top"
          // src={require('../../../assets/img/services.png')}
          // src='./services.png'
          alt="card image"
        />
        <Card.Body>
          <Card.Title className="text-dark">{props.ServiceName}</Card.Title>
          <Card.Text className="text-secondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim
            dolores et error accusamus tenetur nemo totam provident. Provident
            sit asperiores veritatis dolor iure, enim alias? Ea id praesentium
            reiciendis?
          </Card.Text>
          <Button variant="primary" href="/service-provider">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Provider;
