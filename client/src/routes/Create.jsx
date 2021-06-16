import React, { useState } from "react";
import _ from "lodash";
import StyledButton from "../components/StyledButton";
import { toast } from "react-toastify";
import axios from "axios";

export default function Create(props) {
  const [link, setLink] = useState({
    linkName: "",
    linkDes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLink((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function clear() {
    setLink({
      linkName: "",
      linkDes: "",
    });
  }

  function handleSubmit(event) {
    if (link.linkName === "" || link.linkDes === "") {
      toast.warning("Missing Credentials");
    } else {
      const urlGen = `http://link-tracking.herokuapp.com/${
        props.user.username
      }/${_.kebabCase(link.linkName)}`;
      axios({
        method: "POST",
        withCredentials: true,
        data: {
          linkName: link.linkName,
          linkDes: link.linkDes,
          url: urlGen,
        },
        url: "/api/create",
      }).then((res) => {
        toast.success(res.data);
        clear();
      });
    }
  }

  return (
    <div className="create">
      <form className="linkForm">
        <h1 className="title">Create a new link</h1>
        <p>Username: {props.user.username}</p>
        <label htmlFor="linkName">Enter Link Name: </label>
        <br />
        <input name="linkName" value={link.linkName} onChange={handleChange} />
        <br />
        <label htmlFor="linkDes">Enter Link Description: </label>
        <br />
        <textarea
          name="linkDes"
          value={link.linkDes}
          onChange={handleChange}
          rows="7"
          cols="80"
        />
        <br />
        <div>
          URL generated: http://link-tracking.herokuapp.com/{props.user.username}/
          {_.kebabCase(link.linkName)}
        </div>
        <br />
        <div className="redirect">
          <StyledButton onClick={handleSubmit} content="Create Link" />
          <StyledButton onClick={clear} content="Cancel" />
        </div>
      </form>
    </div>
  );
}
