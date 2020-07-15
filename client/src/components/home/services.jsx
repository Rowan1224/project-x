import React from 'react';
import { Container } from 'react-bootstrap';
import Service from './service';
import { v4 as uuidv4 } from 'uuid';

const Services = () => {
    const services = ["Delivery", "Delivery", "Delivery", "Delivery", "Delivery", "Delivery", "Delivery", "Delivery", "Delivery", "Delivery", 
                    "Delivery", "Delivery", "Delivery", "Delivery", "Delivery"];
    return (
        <Container fluid>
            <div className="row mt-5">
                { services.map(name => (
                    <Service ServiceName={ name } key={ uuidv4() } />
                )) }
            </div>
        </Container>
    );
}
 
export default Services;