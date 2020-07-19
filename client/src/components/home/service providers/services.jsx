import React from 'react';
import { Container, Image } from 'react-bootstrap';
import Service from './service';
import { v4 as uuidv4 } from 'uuid';
import emoji from 'react-easy-emoji'

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
        <Image className='w-100 border border-secondary' src='/img/profile_pic.jpg' />
        {/* <Image
          className='w-100'
          src={`https://picsum.photos/id/${Math.floor(
            Math.random() * 1000
          )}/800`}
        /> */}
        <h2 className='bg-light border p-3 my-5'>
          Best dry cleaning service for the money { emoji("🤪") }
        </h2>
        <h3 className='pt-3'>Our Services</h3>
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
