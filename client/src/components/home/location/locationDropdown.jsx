import React, { useContext } from 'react';
import { Container, Button, Form } from "react-bootstrap";
import DropDown from './dropDown';
import { LocationContext } from '../../../contexts/LocationContext';


const LocationDropDown = () => {
    const { districts, areas, location } = useContext(LocationContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(location);
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
                <DropDown title="District" values={ districts } />
                <DropDown title="Area" values={ areas } />
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