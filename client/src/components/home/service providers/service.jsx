import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Service = (props) => {
  return (
    <div className='col-xl-4 col-md-6 col-sm-12 mb-3 text-center'>
      <Card>
        {/* <Card.Img variant="top" src="holder.js/100px180/" alt="Card image cap"/> */}
        <Card.Body>
          <Card.Title>{props.ServiceName}</Card.Title>
          <Card.Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim
            dolores et error accusamus tenetur nemo totam provident. Provident
            sit asperiores veritatis dolor iure, enim alias? Ea id praesentium
            reiciendis?
          </Card.Text>
          <Button variant='primary'>Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Service;