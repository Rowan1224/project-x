import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

const LocationContextProvider = (props) => {
  // Dummy datas
  const dummyLocation = {
    Dhaka: ['Gulshan', 'Banani', 'Dhanmondi', 'Mirpur'],
    Sylhet: ['Amberkhana', 'Madina Market', 'Shahjalal University of Science and Technology', 'Bagbari'],
    Chittagong: ['College Road', 'Potenga', 'Coxs Bazar'],
    Rajshahi: ['Rajshahi University', 'RUET', 'Noyabajar'],
  };

  const [location, setLocation] = useState({ district: '', area: '' });

  // componentDidMount
  useEffect(() => {
      const json = sessionStorage.getItem("location");
      const localLocation = JSON.parse(json);

      if(localLocation)
          setLocation(localLocation);

  }, [])

  // componentDidUpdate
  useEffect(() => {
      const json = sessionStorage.getItem("location");
      const localLocation = JSON.parse(json);

      if(localLocation !== location)
          sessionStorage.setItem("location", JSON.stringify(location));

  }, [location])

  const changeLocation = (district, area) => {
    setLocation({ ...location, district, area });
  };

  return (
    <LocationContext.Provider
      value={{ dummyLocation, location, changeLocation }}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
