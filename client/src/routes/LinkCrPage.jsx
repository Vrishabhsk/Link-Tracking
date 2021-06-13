import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import image from "../icons/coding.png";
import errorImage from "../icons/error.jpg";

export default function LinkCrPage() {
  const { username, linkName } = useParams();
  const [avail, setAvail] = useState(false);

  useEffect(() => {
    checkAvail();
    //eslint-disable-next-line
  }, []);

  const checkAvail = async () => {
    const res = await axios.get(`/data/${username}/${linkName}`);
    if (res.data) {
      setAvail(res.data);
      const resp = await axios.get(
        `http://api.userstack.com/api/detect?access_key=b38a778400d8940f6a42af5931c4810e&ua=${navigator.userAgent}`
      );
      const respon = await axios.get("https://api.country.is");
      axios.post("/api/data", {
        device: resp.data.os.name,
        browser: resp.data.browser.name,
        ip: respon.data.ip,
        country: respon.data.country,
        linkName: linkName,
      });
    }
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
