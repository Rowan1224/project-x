import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

const RegistrationForm = () => {
  // Themes
  const { isLightTheme, theme } = useContext(ThemeContext);
  const ui = isLightTheme ? theme.light.ui : theme.dark.ui;
  const link = isLightTheme ? theme.light.link : theme.dark.link;
  const type = isLightTheme ? theme.light.type : theme.dark.type;
  const syntax = isLightTheme ? theme.light.syntax : theme.dark.syntax;
  const border = isLightTheme ? theme.light.border : theme.dark.border;

  return (
    <div className={"card py-4 shadow" + ui + syntax + border}>
      <article className="card-body mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="card-title mt-3 text-center">Create an Account</h4>
        <p className="text-center">Get started with your free account</p>

        <div className="text-center">
          <Button variant="twitter" className="mb-2 w-100">
            <FontAwesomeIcon className="mr-2" icon={faTwitter} />
            Login via Twitter
          </Button>

          <Button variant="facebook" className="w-100">
            <FontAwesomeIcon className="mr-2" icon={faFacebook} />
            Login via facebook
          </Button>
        </div>

        <div className="my-3 text-center divider-text">
          <span className={"px-4" + ui}>OR</span>
        </div>

        <form>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon className="fa-icon" icon={["fas", "user"]} />
              </span>
            </div>
            <input
              name=""
              className="form-control"
              placeholder="Full name"
              type="text"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon
                  className="fa-icon"
                  icon={["fas", "envelope"]}
                />
              </span>
            </div>
            <input
              name=""
              className="form-control"
              placeholder="Email address"
              type="email"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon className="fa-icon" icon={["fas", "phone"]} />
              </span>
            </div>
            <select className="custom-select" style={{ maxWidth: "85px" }}>
              <option defaultValue="">+880</option>
              <option value="1">+972</option>
              <option value="2">+198</option>
              <option value="3">+701</option>
            </select>
            <input
              name=""
              className="form-control"
              placeholder="Phone number"
              type="text"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon
                  className="fa-icon"
                  icon={["fas", "building"]}
                />
              </span>
            </div>
            <select className="form-control">
              <option defaultValue=""> Select job type</option>
              <option>Designer</option>
              <option>Manager</option>
              <option>Accaunting</option>
            </select>
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon className="fa-icon" icon={["fas", "home"]} />
              </span>
            </div>
            <input
              name=""
              className="form-control"
              placeholder="House"
              type="text"
            />
            <input
              name=""
              className="form-control"
              placeholder="Road"
              type="text"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon
                  className="fa-icon"
                  icon={["fas", "location-arrow"]}
                />
              </span>
            </div>
            <input
              name=""
              className="form-control"
              placeholder="Location Description"
              type="text"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon className="fa-icon" icon={["fas", "lock"]} />
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Create password"
              type="password"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon className="fa-icon" icon={["fas", "lock"]} />
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Repeat password"
              type="password"
            />
          </div>
          <div className="form-group">
            <Button variant={type} type="submit" className="w-100">
              Create Account
            </Button>
          </div>
          <div className={"text-center" + link}>
            Have an account? <Link to="#">Log In</Link>
          </div>
        </form>
      </article>
    </div>
  );
};

export default RegistrationForm;
