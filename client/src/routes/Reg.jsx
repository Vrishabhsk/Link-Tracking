import React, { useState } from "react";
import StyledButton from "../components/StyledButton";
import Text from "../components/Text";
import axios from "axios";
import { toast } from "react-toastify";

export default function Reg({ Auth }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function registerUser(event) {
    if (
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.password2 === ""
    ) {
      toast.warning("Missing Credentials");
    } else if (user.password !== user.password2) {
      toast.warning("Password Do Not Match");
    } else {
      axios({
        method: "POST",
        data: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
        withCredentials: true,
        url: "/register",
      }).then((res) => {
        toast.success(res.data);
        Auth(true);
      });
    }
  }

  return (
    <div className="register">
      <h1 className="title">Registration</h1>
      <form encType="multipart/form-data" className="reg">
        <Text
          label="Username"
          name="username"
          onChange={handleChange}
          autoFocus
          value={user.username}
        />
        <br />
        <br />
        <Text
          label="Email"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
        <br />
        <br />
        <Text
          label="Password"
          name="password"
          onChange={handleChange}
          value={user.password}
          type="password"
        />
        <br />
        <br />
        <Text
          label="Confirm Password"
          name="password2"
          onChange={handleChange}
          value={user.password2}
          type="password"
        />
        <br />
        <br />
        <StyledButton onClick={registerUser} content="Register" />
      </form>
    </div>
  );
}
