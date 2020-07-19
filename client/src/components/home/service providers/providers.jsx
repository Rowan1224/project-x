import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Provider from './provider';
import { v4 as uuidv4 } from 'uuid';
import { LocationContext } from '../../../contexts/LocationContext';
import emoji from 'react-easy-emoji'

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
  const { location } = useContext(LocationContext);

  return location['district'] && location['area'] ? (
    <Container>
      <div className='row mt-5'>
        {services.map((name) => (
          <Provider ServiceName={name} key={uuidv4()} />
        ))}
      </div>
    </Container>
  ) : (
    <Container>
      <div className='text-center mt-5 pt-5'>
        <h2 className='bg-light border p-3 my-5'>
          Select a location to see the service providers { emoji("😀") }
        </h2>
      </div>
    </Container>
  );
};

export default Providers;
