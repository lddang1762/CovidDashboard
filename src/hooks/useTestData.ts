import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export interface TestReturnData {
  date: string;
  positive: number;
  negative: number;
  pending: number;
}

const POLL_INTERVAL = 600000; // every 10 minutes

export const useTestData = () => {
  const [data, setData] = useState<TestReturnData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://api.covidtracking.com/v1/us/daily.json`);
      const dataArr = [];
      for (let x = 300; x > 0; x -= 30) {
        const { date, ...rest } = result.data[x];
        const reformat = moment(date, "YYYYMMDD").format("MM/DD/yy");
        dataArr.push({ date: reformat, ...rest });
      }
      setData(dataArr);
    };
    fetchData();
    setInterval(fetchData, POLL_INTERVAL);
  }, []);

  return data;
};

export default useTestData;
