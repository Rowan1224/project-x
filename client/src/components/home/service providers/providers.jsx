import React from 'react';
import { Container } from 'react-bootstrap';
import Provider from './provider';
import { v4 as uuidv4 } from 'uuid';

const Providers = () => {
  const services = [
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
    'Provider',
  ];
  return (
    <Container>
      <div className='row mt-5'>
        {services.map((name) => (
          <Provider ServiceName={name} key={uuidv4()} />
        ))}
      </div>
    </Container>
  );
};

export default Providers;
