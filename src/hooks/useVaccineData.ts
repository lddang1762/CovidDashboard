import { useEffect, useState } from "react";
import axios from "axios";

export interface VaccineReturnData {
  date: string;
}

const POLL_INTERVAL = 600000; // every 10 minutes

export const useVaccineData = (lastdays: number = 30) => {
  const [data, setData] = useState<VaccineReturnData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/USA?lastdays=${lastdays}`);
      setData(result.data.timeline);
    };
    fetchData();
    setInterval(fetchData, POLL_INTERVAL);
  }, [lastdays]);

  return data;
};

export default useVaccineData;
