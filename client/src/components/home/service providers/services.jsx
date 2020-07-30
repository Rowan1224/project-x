import React from 'react';
import { Image } from 'react-bootstrap';
import Service from './service';
import { v4 as uuidv4 } from 'uuid';
import emoji from 'react-easy-emoji'
import Infobar from '../../generic/infobar';

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
    <div>
      <div className='mt-5 pt-1 text-center'>
        <div className="inner">
          <Image
            className='w-100 custom-border rounded profile-pic'
            alt="profile picture"
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 1000
            )}/800`}
          />
        </div>
        
        <Infobar>
          Best dry cleaning service for the money { emoji("🤪") }
        </Infobar>
        <h3 className='pt-5'>Our Services</h3>
      </div>
      <div className='row mt-5'>
        {services.map((name) => (
          <Service ServiceName={name} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export default Services;
