import React, { useContext } from "react";
import Provider from "./provider";
import { v4 as uuidv4 } from "uuid";
import { LocationContext } from "../../../contexts/LocationContext";
import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";

const Providers = () => {
  // dummy data
  const services = [
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
    "Provider",
  ];
  const { location } = useContext(LocationContext);

  return location && location.district && location.area ? (
    <div className="row mt-5">
      {services.map((name) => (
        <Provider ServiceName={name} key={uuidv4()} />
      ))}
    </div>
  ) : (
    <Infobar text="text-dark">
      Select a location to see the service providers {emoji("😀")}
    </Infobar>
  );
};

export default Providers;
