import React, { useState, useContext } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import DropDown from './dropDown';
import { LocationContext } from '../../../contexts/LocationContext';

const LocationDropDown = () => {
  const dummyLocation = {
    Dhaka: ['Gulshan', 'Banani', 'Dhanmondi', 'Mirpur'],
    Sylhet: ['Amberkhana', 'Madina Market', 'SUST', 'Bagbari'],
    Chittagong: ['College Road', 'Potenga', 'Coxs Bazar'],
    Rajshahi: ['Rajshahi University', 'RUET', 'Noyabajar'],
  };

  const districts = Object.keys(dummyLocation);

  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [areas, setAreas] = useState([]);

  const { districts_old, areas_old, location_old, changeLocation } = useContext(
    LocationContext
  );

  const handleDistrictSelect = (e) => {
    setArea('');
    setDistrict(e);
    setAreas(dummyLocation[e]);
  };

  const handleAreaSelect = (e) => {
    setArea(e);
    changeLocation(district, e);
  };

  return (
    <Container>
      <div className='tagline text-center mt-5 pb-5'>
        <h2>
          Why fear, when{' '}
          <span style={{ fontFamily: 'MuseoModerno' }}>ProjectX</span> is here!
        </h2>
      </div>
      <Form className='row'>
        <DropDown
          title='District'
          values={districts}
          handleSelect={handleDistrictSelect}
        />
        {district && (
          <DropDown
            title={'Area'}
            values={areas}
            handleSelect={handleAreaSelect}
          />
        )}
      </Form>
      <h2>
        Location Check: {district} {area}
      </h2>
    </Container>
  );
};

export default LocationDropDown;
