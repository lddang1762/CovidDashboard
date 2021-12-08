import React from "react";
import Map from "./components/Map/Map";
import StateTable from "./components/CurrentTable/StateTable";
import HistoricalTable from "./components/HistoricalTable/HistoricalTable";

import usePollCovidData from "./hooks/useCovidData";
import { useHistoricalData } from "./hooks/useHistoricalData";

export default function Dashboard() {
  const data = usePollCovidData();
  const historicalData = useHistoricalData();

  return (
    <div>
      <div className="container">
        <h1 className="title">USA Covid Dashboard</h1>
        <h4 className="subtitle">{`Updates every 10 minutes`}</h4>
        <Map data={data} />
        <div className="tables">
          <div>
            <StateTable data={data} />
          </div>
          <div>
            <HistoricalTable data={historicalData} />
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Data source: https://www.worldometers.info/ (Updated every 24 hours)</p>
        <p>Created by: Luc Dang</p>
        <p>Github: https://github.com/lddang1762</p>
      </div>
    </div>
  );
}
