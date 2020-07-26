import React, { useState, useContext } from 'react';
import { Container, Button, Form } from "react-bootstrap";
import DropDown from './dropDown';
import { LocationContext } from '../../../contexts/LocationContext';


const LocationDropDown = () => {
    const [district, setDistrict] = useState("");
    const [area, setArea] = useState("");

    const { districts, areas, location, changeLocation } = useContext(LocationContext);

    const handleDistrictSelect = e => {
        setDistrict(e);
    }

    const handleAreaSelect = e => {
        setArea(e);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(district && area)
            changeLocation(district, area);
        
        // console.log(location);
    };

    return (
        <Container>
            <div className="tagline text-center mt-5 pb-5">
                <h2>
                    Why fear, when{" "}
                    <span style={{ fontFamily: "MuseoModerno" }}>ProjectX</span> is here!
                </h2>
            </div>
            <Form
                onSubmit={ handleSubmit }
                className="row"
            >
                <DropDown
                    title={ "District" }
                    values={ districts }
                    handleSelect={ handleDistrictSelect }
                />
                <DropDown
                    title={ "Area" }
                    values={ areas }
                    handleSelect={ handleAreaSelect }
                />
                <Button
                    size="lg"
                    variant="success"
                    type="submit"
                    className="col-sm mb-2 mx-3"
                >
                    Search
                </Button>
            </Form>
        </Container>
    );
}
 
export default LocationDropDown;