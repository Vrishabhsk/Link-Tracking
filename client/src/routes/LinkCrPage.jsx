import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import image from "../icons/coding.png";
import errorImage from "../icons/error.jpg";
import { toast } from "react-toastify";
import { osName, browserName, osVersion } from "react-device-detect";

export default function LinkCrPage() {
  const { username, linkName } = useParams();
  const [avail, setAvail] = useState(false);

  useEffect(() => {
    checkAvail();
    //eslint-disable-next-line
  }, []);

  const checkAvail = async () => {
    const res = await axios.get(`/data/${username}/${linkName}`);
    setAvail(res.data);
    if (res.data) {
      sendData();
    }
  };

  const sendData = async () => {
    const res = await axios.get("https://api.country.is");
    axios
      .post("/getTraffic", {
        device: `${osName} ${osVersion}`,
        browser: browserName,
        ip: res.data.ip,
        country: res.data.country,
        link: `https://link-tracking.herokuapp.com/${username}/${linkName}`,
      })
      .then(() => {
        toast.success("data stored");
      });
  };

  return (
    <div className="linkCr">
      {avail ? (
        <div className="avail">
          <p>
            Welcome to the Link produced by the Creator {username}
            <br />
            Link created using Linkr
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
