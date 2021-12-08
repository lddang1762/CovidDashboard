import states from "../States";

export interface TableData {
  state: string;
  population: number;
  current: number;
  active: number;
  recovered: number;
  tests: number;
  deaths: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  testsPerOneMillion: number;
}

export const tableData = states.map((state) => {
  return {
    testsPerOneMillion: 0,
    casesPerOneMillion: 0,
    deathsPerOneMillion: 0,
    population: 0,
    current: 0,
    active: 0,
    recovered: 0,
    deaths: 0,
    state: state,
  };
});

export default tableData;
