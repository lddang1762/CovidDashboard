export interface HistoricalTableData {
  country: string;
  province: [string];
  timeline: {
    cases: any;
    deaths: any;
    recovered: any;
  };
}

export const tableData = Array.from(Array(30).keys()).map(() => {
  return { date: "", cases: 0, deaths: 0, recovered: 0 };
});

export default tableData;
