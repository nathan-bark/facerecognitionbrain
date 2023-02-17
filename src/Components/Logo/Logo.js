import React from "react";
import Tilty from "react-tilty";
import logo from "./icons8-brain-100.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-div ma4 mt0 pa3">
      <Tilty className="tilty" max={45} perspective={100}>
        <img className="inner-tilty" src={logo} alt="logo" />
      </Tilty>
    </div>
  );
};

export default Logo;
