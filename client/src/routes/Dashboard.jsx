import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import StyledButton from "../components/StyledButton";

export default function Dashboard(props) {
  return (
    <div className="dash">
      {props.user !== null ? (
        <>
          <h1 style={{ color: "#fff" }}>
            Welcome {props.user.username} <br />
            <br />
            Get Started by creating a link
          </h1>
          <div className="redirect middle">
            <Link className="links" to="/create-links">
              <StyledButton content="Create a new Link" />
            </Link>
            <Link className="links" to="/view-links">
              <StyledButton content="View Created Links" />
            </Link>
          </div>
        </>
      ) : <CircularProgress />}
    </div>
  );
}
