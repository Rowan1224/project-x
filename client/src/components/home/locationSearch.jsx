import React, { useState } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { useGeolocation } from "beautiful-react-hooks";

const LocationSearch = (props) => {
  const [searchString, setSearchString] = useState("");
  const [geolocation, setGeolocation] = useState();

  const [geoState] = useGeolocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchString);
  };

  const getGeolocation = (e) => {
    if (geoState.isSupported && !geoState.isRetrieving) {
      const { latitude, longitude } = geoState.position.coords;
      setGeolocation({ latitude, longitude });
      console.log(geolocation);
      // console.log(geoState);
    } else {
      console.log("Not supported!");
      console.log(geoState);
    }
  };

  return (
    <Container>
      <div className="tagline text-center mt-5">
        <h2>
          Why fear, when{" "}
          <span style={{ fontFamily: "MuseoModerno" }}>ProjectX</span> is here!
        </h2>
      </div>

      <Form className="searchbox d-flex flex-column flex-md-row my-3 m-md-5">
        <InputGroup size="lg">
          <FormControl
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Enter your address"
            style={{ borderRight: "none" }}
          />
          <InputGroup.Append
            style={{ cursor: "pointer" }}
            onClick={getGeolocation}
          >
            <InputGroup.Text
              className={
                geoState.isSupported && !geoState.isRetrieving
                  ? "text-default"
                  : "text-danger"
              }
              style={{ backgroundColor: "white", borderLeft: "none" }}
            >
              <MyLocationIcon />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <Button
          size="lg"
          className="ml-md-2 mt-2 mt-md-0"
          variant="success"
          onClick={handleSubmit}
          type="submit"
        >
          Search
        </Button>
      </Form>
    </Container>
  );
};

export default LocationSearch;
