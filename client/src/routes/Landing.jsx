import React from "react";
import StyledButton from "../components/StyledButton";
import image from "../icons/landing.png";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <div className="content">
        <h1>Link Tracking</h1>
        <br />
        <div>
          <ArrowRightAltIcon />
          Create dynamic links for users can visit <br />
          <ArrowRightAltIcon />
          Collect User information
          <br />
          <ArrowRightAltIcon />
          Display stats with clean UI
          <br />
          <ArrowRightAltIcon />
          Unlimited Links to be created and explored
          <br />
          <br />
          <div className="redirect">
            <Link to="/Registration" className="links">
              <StyledButton content="Register" />
            </Link>
            <Link to="/SignIn" className="links">
              <StyledButton content="Login" />
            </Link>
          </div>
        </div>
      </div>
      <img src={image} className="icon" alt="landing" />
    </div>
  );
}
