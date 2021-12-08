export const standardColumns = [
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Population",
    accessor: "population",
  },
  {
    Header: "Current Cases",
    accessor: "current",
  },

  {
    Header: "Active Cases",
    accessor: "active",
  },
  {
    Header: "Recovered",
    accessor: "recovered",
  },
  {
    Header: "Deaths ",
    accessor: "deaths",
  },
];

export const perPopulationColumns = [
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Cases Per Million",
    accessor: "casesPerOneMillion",
  },
  {
    Header: "Deaths Per Million",
    accessor: "deathsPerOneMillion",
  },

  {
    Header: "Covid Tests Per Million",
    accessor: "testsPerOneMillion",
  },
];

export default standardColumns;
