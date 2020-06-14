import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const APITest = (props) => {
  const [data, setData] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => fetchDB(), []);

  const fetchDB = () => {
    setLoaded(false);
    axios.get("/db_connection").then((res) => {
      
      setData(res.data.express);
      console.log(res);
      setLoaded(true);
    });
  };

  return (
    <div>
      <h2>API Fetch Test</h2>
      {loaded ? (
        <h3> {data} </h3>
      ) : (
        <h3>Loading...</h3>
      )}
      <br />
      <Button onClick={fetchDB}>Fetch another!</Button>
    </div>
  );
};

export default APITest;
