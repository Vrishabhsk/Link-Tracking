import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import image from "../icons/coding.png";
import errorImage from "../icons/error.jpg";
import { osName, browserName, osVersion } from "react-device-detect";
import Cookies from "universal-cookie";

export default function LinkCrPage() {
  const { username, linkName } = useParams();
  const [avail, setAvail] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    checkAvail();
    //eslint-disable-next-line
  }, []);

  const checkAvail = async () => {
    const res = await axios.get(`/data/${username}/${linkName}`);
    setAvail(res.data);
    if (res.data) {
      if (cookies.get("user") === undefined) {
        cookies.set("user", "LinkCookie", { path: `/${username}/${linkName}` });
        sendData(true);
      }
      else sendData(false);
    }
  };

  const sendData = async (bool) => {
    const result = await axios.get("https://api.country.is");
    const data = {
      cookieName: cookies.get("user"),
      device: `${osName} ${osVersion}`,
      browser: browserName,
      country: result.data.country,
      link: `https://link-tracking.herokuapp.com/${username}/${linkName}`,
    };
    if (bool)
      axios.post("/setTraffic", data).then(() => {
        console.log("data stored");
      });
    else if (!bool)
      axios
        .post("/updTraffic", {
          cookieName: cookies.get("user"),
        })
        .then(() => {
          console.log("data updated");
        });
  };

  return (
    <div className="linkCr">
      {avail ? (
        <div className="avail">
          <p>
            Welcome to the Link produced by the Creator {username}
            <br />
            Link created using link-tracking.herokuapp.com
          </p>
          <br />
          <img src={image} alt="coding" className="codImg" />
        </div>
      ) : (
        <div className="avail">
          <img src={errorImage} className="error" alt="error404" />
        </div>
      )}
    </div>
  );
}
