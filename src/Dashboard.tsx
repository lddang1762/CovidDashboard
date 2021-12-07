import React from "react";
import Map from "./components/Map/Map";
import usePollCovidData from "./hooks/useCovidData";

export default function Dashboard() {
  const data = usePollCovidData();

  return (
    <div>
      <div className="container">
        <h1 className="title">Covid Dashboard</h1>
        <h4 className="subtitle">{`Updates every 10 minutes`}</h4>
        <Map data={data} />
      </div>
      <div className="footer">
        <p>Data source: https://www.worldometers.info/</p>
        <p>Created by: Luc Dang</p>
        <p>Github: https://github.com/lddang1762</p>
      </div>
    </div>
  );
}
