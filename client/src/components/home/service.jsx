import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Service = (props) => {
    return (
        <Card className="col-md-3 col-sm-4 ml-4 mb-3 px-2 py-2 text-center">
            {/* <Card.Img variant="top" src="holder.js/100px180/" alt="Card image cap"/> */}
            <Card.Body>
                <Card.Title>{ props.ServiceName }</Card.Title>
                <Card.Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab enim dolores et error accusamus tenetur nemo totam provident. Provident sit asperiores veritatis dolor iure, enim alias? Ea id praesentium reiciendis?
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}
 
export default Service;