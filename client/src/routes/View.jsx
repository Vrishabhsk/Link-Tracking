import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function View(props) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/api/personal",
    }).then((res) => {
      setLinks(res.data);
    });
  }, []);

  return (
    <div className="view">
      <h1 className="viewTitle">My Links</h1>
      <div className="linkData">
        <h4 className="rowName">Link Name</h4>
        <h4 className="rowName">Link Description</h4>
        <h4 className="rowName">Visitors</h4>
        <h4 className="rowName">URL</h4>
        <h4 className="rowName">Generated On</h4>
        <h4 className="rowName">Actions</h4>
        {links.map((link) => {
          return (
            <>
              <h4 className="grid-line">{link.linkName}</h4>
              <h4 className="grid-line">{link.linkDes}</h4>
              <h4 className="grid-line">{link.linkData.length}</h4>
              <h4 className="grid-line">
                <a className="links" href={link.urlGen}>
                  {link.urlGen}
                </a>
              </h4>
              <h4 className="grid-line">{link.createDate}</h4>
              <Link className="links" to={`/api/${link._id}/trafficInfo`}>
                <h4 className="grid-line">View Traffic</h4>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}
