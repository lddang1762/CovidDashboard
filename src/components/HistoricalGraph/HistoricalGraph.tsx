import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import GraphData from "./GraphData";

am4core.useTheme(am4themes_animated);

export default function HistoricalGraph({ data }) {
  const _chart = useRef(null);
  const [graphData, setGraphData] = useState(GraphData);

  useEffect(() => {
    const updateData = () => {
      const dates = Object.keys(data.cases);
      const updated = graphData.slice().map((data1, index) => {
        return {
          date: dates[index],
          cases: data.cases[dates[index]],
          deaths: data.deaths[dates[index]],
          recovered: data.recovered[dates[index]],
        };
      });
      setGraphData(updated);
      return updated;
    };
    if (data) {
      updateData();
    }
  }, [data]);

  useLayoutEffect(() => {
    const chart = am4core.create("histGraph", am4charts.XYChart);
    const title = chart.titles.create();
    title.text = "Covid Cases and Deaths in the US";
    title.marginTop = 30;
    title.fontSize = 28;
    title.marginBottom = 10;

    const xAxis = chart.xAxes.push(new am4charts.DateAxis());
    xAxis.dateFormatter.dateFormat = "MM/dd/yy";
    xAxis.baseInterval.timeUnit = "day";
    xAxis.baseInterval.count = 1;
    xAxis.title.text = "Date (Past 30 days)";

    const yAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis1.title.text = "Cases";

    const yAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis2.title.text = "Deaths";
    yAxis2.renderer.opposite = true;

    const caseSeries = chart.series.push(new am4charts.LineSeries());
    caseSeries.name = "Cases";
    caseSeries.dataFields.valueY = "cases";
    caseSeries.dataFields.dateX = "date";
    caseSeries.stroke = am4core.color("#405ee3");
    caseSeries.tooltipText = "{name}: {valueY}";
    caseSeries.tooltip.getFillFromObject = false;
    caseSeries.tooltip.background.fill = am4core.color("#405ee3");
    caseSeries.data = graphData;

    const deathSeries = chart.series.push(new am4charts.LineSeries());
    deathSeries.name = "Deaths";
    deathSeries.yAxis = yAxis2;
    deathSeries.dataFields.valueY = "deaths";
    deathSeries.tooltipText = "{name}: {valueY}";
    deathSeries.tooltip.getFillFromObject = false;
    deathSeries.tooltip.background.fill = am4core.color("#db4450");
    deathSeries.dataFields.dateX = "date";

    deathSeries.stroke = am4core.color("#db4450");
    deathSeries.data = graphData;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    chart.cursor = new am4charts.XYCursor();
    chart.legend = new am4charts.Legend();
    _chart.current = chart;

    return () => {
      chart.dispose();
    };
  }, [graphData]);

  return <div id="histGraph" style={{ width: "100%", height: "100%", marginTop: "10px" }}></div>;
}
