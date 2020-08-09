import React, { useContext, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import Service from "./service";
import { v4 as uuidv4 } from "uuid";
import emoji from "react-easy-emoji";
import Infobar from "../../generic/infobar";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { SPContext } from "../../../contexts/SPContext";

const Services = () => {
  const [services, setServices] = useState([]);
  const { serviceID } = useContext(SPContext);

  // componentDidMount
  useEffect(() => {
    const API_URL = "http://localhost:8080/ownProducts/";

    const loadData = async () => {
      const servideID = {
        "service_id": serviceID,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(servideID),
      });

      const data = await response.json();

      setServices(data.products);
    };
    loadData();
  }, [serviceID]);

  // console.log(services);

  // Themes
  const { isLightTheme, theme } = useContext(ThemeContext);
  const border = isLightTheme ? theme.light.border : theme.dark.border;

  return (
    <div>
      <div className="mt-5 pt-1 text-center">
        <div className="inner">
          <Image
            className={"w-100 rounded profile-pic" + border}
            alt="profile picture"
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 1000
            )}/800`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/img/profile_pic_default.png";
            }}
          />
        </div>

        <Infobar>Best dry cleaning service for the money {emoji("🤪")}</Infobar>
        <h3 className="pt-5">Our Services</h3>
      </div>
      <div className="row mt-5">
        {services.map((service) => (
          <Service serviceInfo={service} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export default Services;
