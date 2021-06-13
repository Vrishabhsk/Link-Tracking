import React, { useState } from "react";
import Text from "../components/Text";
import StyledButton from "../components/StyledButton";
import axios from "axios";
import { toast } from "react-toastify";

export default function Log({ Auth }) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLogin((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    if (login.username === "" || login.password === "") {
      event.preventDefault();
      toast.warning("Missing Credentials");
    } else {
      axios({
        method: "POST",
        data: {
          username: login.username,
          password: login.password,
        },
        withCredentials: true,
        url: "/login",
      }).then((res) => {
        toast.success(res.data);
        if (res.data === "Success") Auth(true);
      });
    }
  }

  return (
    <div className="login">
      <h1 className="title">Login</h1>
      <form className="reg">
        <Text
          label="Username"
          name="username"
          value={login.username}
          onChange={handleChange}
          autoFocus
        />
        <br />
        <br />
        <Text
          label="Password"
          name="password"
          value={login.password}
          onChange={handleChange}
          type="password"
        />
        <br />
        <br />
        <StyledButton content="Login" onClick={handleSubmit} />
      </form>
      <div></div>
    </div>
  );
}
