import { useEffect, useState } from "react";
import axios from "axios";

export interface ReturnData {
  state: string;
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  active: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  recovered: number;
  test: number;
  testsPerOneMillion: number;
  population: number;
}

const POLL_INTERVAL = 600000; // every 10 minutes

export const usePollCovidData = () => {
  const [data, setData] = useState<ReturnData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://disease.sh/v3/covid-19/states");
      setData(result.data);
    };
    fetchData();
    setInterval(fetchData, POLL_INTERVAL);
  }, []);

  return data;
};

export default usePollCovidData;
