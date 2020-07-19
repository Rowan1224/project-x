import React from 'react';
import { Container, Image } from 'react-bootstrap';
import Service from './service';
import { v4 as uuidv4 } from 'uuid';

const Services = () => {
  const services = [
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
    'Delivery',
  ];
  return (
    <Container>
      <div className='mt-5 pt-1 text-center'>
        <Image className='w-100' src='/img/profile_pic.jpg' />
        <h2 className='mt-5'>
          Best dry cleaning service you can get so use our service already -_-
        </h2>
      </div>
      <div className='row mt-5'>
        {services.map((name) => (
          <Service ServiceName={name} key={uuidv4()} />
        ))}
      </div>
    </Container>
  );
};

export default Services;
