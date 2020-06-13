import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const APITest = (props) => {
  const [image, setImage] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => fetchImageSrc(), []);

  const fetchImageSrc = () => {
    setLoaded(false);
    axios.get("https://dog.ceo/api/breeds/image/random").then((data) => {
      setImage(data.data.message);
      setLoaded(true);
    });
  };

  return (
    <div>
      <h2>API Fetch Test</h2>
      {loaded ? (
        <img src={image} alt="DOG" height={300} />
      ) : (
        <h3>Loading...</h3>
      )}
      <br />
      <Button onClick={fetchImageSrc}>Fetch another!</Button>
    </div>
  );
};

export default APITest;
