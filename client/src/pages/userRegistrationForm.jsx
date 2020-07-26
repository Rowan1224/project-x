import React from "react";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
// import { faTwitter } from '@fortawesome/free-solid-svg-icons'

const RegistrationForm = () => {
  return (
    <div className="container">
      <div className="card bg-light">
        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
          <h4 className="card-title mt-3 text-center">Create Account</h4>
          <p className="text-center">Get started with your free account</p>
          <p className="text-center">
            {/* <div className="">
                <button className="btn btn-block btn-twitter">
                {" "}
                <i className="fab fa-twitter"></i>   Login via Twitter
                </button>
            </div> */}
            <Button variant="twitter" className="mb-2 w-100">
                <FontAwesomeIcon icon={ faTwitter } />   Login via Twitter
            </Button>
            {/* <a href="#" className="btn btn-block btn-facebook">
              {" "}
              <i className="fab fa-facebook-f"></i>   Login via facebook
            </a> */}
            <Button className="mb-2 w-100">
                <FontAwesomeIcon icon={ faFacebook } />   Login via facebook
            </Button>
          </p>
          <p className="divider-text">
            <span className="bg-light">OR</span>
          </p>
          <form>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
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
                  {" "}
                  <i className="fa fa-envelope"></i>{" "}
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
                  {" "}
                  <i className="fa fa-phone"></i>{" "}
                </span>
              </div>
              <select className="custom-select" style={{ maxWidth: "120px" }}>
                <option defaultValue="">+971</option>
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
                  {" "}
                  <i className="fa fa-building"></i>{" "}
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
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
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
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Repeat password"
                type="password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                {" "}
                Create Account{" "}
              </button>
            </div>
            <p className="text-center">
              Have an account? <a href="#">Log In</a>{" "}
            </p>
          </form>
        </article>
      </div>
    </div>
  );
};

export default RegistrationForm;
