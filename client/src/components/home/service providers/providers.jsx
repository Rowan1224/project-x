import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Provider from './provider';
import { v4 as uuidv4 } from 'uuid';
import { LocationContext } from '../../../contexts/LocationContext';
import emoji from 'react-easy-emoji'
import Infobar from '../../generic/infobar';

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

  return location && location.district && location.area ? (
    <Container>
      <div className='row mt-5'>
        {services.map((name) => (
          <Provider ServiceName={name} key={uuidv4()} />
        ))}
      </div>
    </Container>
  ) : (
    <Container>
      <Infobar text="text-info">
        Select a location to see the service providers { emoji("😀") }
      </Infobar>
    </Container>
  );
};

export default Providers;
