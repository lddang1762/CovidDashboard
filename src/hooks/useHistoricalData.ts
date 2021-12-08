import { useEffect, useState } from "react";
import axios from "axios";

export interface NYTReturnData {
  date: string;
  state: string;
  fips: string;
  cases: number;
  deaths: number;
}

const POLL_INTERVAL = 600000; // every 10 minutes

export const useHistoricalData = (lastdays: number = 30) => {
  const [data, setData] = useState<NYTReturnData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://disease.sh/v3/covid-19/historical/USA?lastdays=${lastdays}`);
      setData(result.data.timeline);
    };
    fetchData();
    setInterval(fetchData, POLL_INTERVAL);
  }, [lastdays]);

  return data;
};
