export const graphData = Array.from(Array(10).keys()).map(() => {
  return {
    date: "20000101", //YYYYMMDD
    positive: 0,
    negative: 0,
    pending: 0,
  };
});

export default graphData;
