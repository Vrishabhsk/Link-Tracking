import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Traffic() {
  const { id } = useParams();
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    axios.get(`/api/${id}`).then((res) => {
      setVisitors(res.data);
    }); //eslint-disable-next-line
  }, []);

  return (
    <div className="traffic">
      <h1 className="viewTitle">Link Traffic Data</h1>
      <div className="trafficData">
        <h4 className="rowName">Sr. No.</h4>
        <h4 className="rowName">Unique Visitor UUID</h4>
        <h4 className="rowName">First Visited</h4>
        <h4 className="rowName">Last Visited</h4>
        <h4 className="rowName">Total Visits</h4>
        <h4 className="rowName">Country</h4>
        <h4 className="rowName">Device</h4>
        {visitors.map((person, key) => {
          return (
            <>
              <h4 className="grid-line">{key + 1}</h4>
              <h4 className="grid-line">{person.uuid}</h4>
              <h4 className="grid-line">{person.firstVisit}</h4>
              <h4 className="grid-line">{person.lastVisit}</h4>
              <h4 className="grid-line">{person.totalVisits}</h4>
              <h4 className="grid-line">{person.country}</h4>
              <h4 className="grid-line">{person.browser} on {person.device}</h4>
            </>
          );
        })}
      </div>
    </div>
  );
}
