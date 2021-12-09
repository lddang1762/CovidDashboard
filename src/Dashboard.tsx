import React from "react";
import Map from "./components/Map/Map";
import StateTable from "./components/CurrentTable/StateTable";
import HistoricalTable from "./components/HistoricalTable/HistoricalTable";
import HistoricalGraph from "./components/HistoricalGraph/HistoricalGraph";
import VaccineGraph from "./components/VaccineGraph/VaccineGraph";
import TestGraph from "./components/TestGraph/TestGraph";

import usePollCovidData from "./hooks/useCovidData";
import useHistoricalData from "./hooks/useHistoricalData";
import useVaccineData from "./hooks/useVaccineData";

export default function Dashboard() {
  const data = usePollCovidData();
  const historicalData = useHistoricalData();
  const vaccineData = useVaccineData();

  return (
    <div>
      <div className="container">
        <h1 className="title">USA Covid Dashboard</h1>
        <h4 className="subtitle">{`Updates every 10 minutes`}</h4>
        <Map data={data} />
        <div className="tables">
          <div className="historicalGraph">
            <HistoricalGraph data={historicalData} />
          </div>
          <div className="historicalTable">
            <HistoricalTable data={historicalData} />
          </div>
        </div>
        <TestGraph />

        <VaccineGraph data={vaccineData} />

        <StateTable data={data} />
      </div>
      <div className="footer">
        <p>
          Data sources: <a href="https://www.worldometers.info/">https://www.worldometers.info/</a> (Updated every 24
          hours) & <a href="https://covidtracking.com/data">https://covidtracking.com/data</a>
        </p>
        <p>Created by: Luc Dang</p>
        <p>
          Github: <a href="https://github.com/lddang1762">https://github.com/lddang1762</a>
        </p>
      </div>
    </div>
  );
}
