import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import GraphData from "./GraphData";
import useTestData from "../../hooks/useTestData";

am4core.useTheme(am4themes_animated);

export default function TestGraph() {
  const data = useTestData();
  const _chart = useRef(null);
  const [graphData, setGraphData] = useState(GraphData);

  console.log(graphData);
  useEffect(() => {
    const updateData = () => {
      const updated = data.map((data1) => {
        return {
          date: data1.date.toString(),
          positive: data1.positive,
          negative: data1.negative,
          pending: data1.pending,
        };
      });
      setGraphData(updated);
    };
    if (data) {
      updateData();
    }
  }, [data]);

  useLayoutEffect(() => {
    const chart = am4core.create("testGraph", am4charts.XYChart);
    const title = chart.titles.create();
    title.text = "Covid Test Results in the US";
    title.marginTop = 30;
    title.fontSize = 28;
    title.marginBottom = 10;

    const xAxis = chart.xAxes.push(new am4charts.DateAxis());
    xAxis.baseInterval.timeUnit = "day";
    xAxis.baseInterval.count = 1;
    xAxis.renderer.cellStartLocation = 0.2;
    xAxis.renderer.cellEndLocation = 0.8;

    xAxis.title.text = "Date";

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = "Amount";

    const positiveSeries = chart.series.push(new am4charts.ColumnSeries());
    positiveSeries.name = "Positive";
    positiveSeries.dataFields.valueY = "positive";
    positiveSeries.dataFields.dateX = "date";
    positiveSeries.stroke = am4core.color("#db4450");
    positiveSeries.columns.template.fill = am4core.color("#db4450");
    positiveSeries.columns.template.tooltipText = "{name}: {valueY}";
    positiveSeries.tooltip.getFillFromObject = false;
    positiveSeries.tooltip.background.fill = am4core.color("#db4450");
    positiveSeries.stacked = true;
    positiveSeries.data = graphData;

    const negativeSeries = chart.series.push(new am4charts.ColumnSeries());
    negativeSeries.name = "Negative";
    negativeSeries.dataFields.valueY = "negative";
    negativeSeries.dataFields.dateX = "date";
    negativeSeries.columns.template.tooltipText = "{name}: {valueY}";
    negativeSeries.stacked = true;
    negativeSeries.data = graphData;

    chart.scrollbarY = new am4core.Scrollbar();
    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();
    _chart.current = chart;

    return () => {
      chart.dispose();
    };
  }, [graphData]);

  return <div id="testGraph" style={{ width: "100%", height: "500px", marginTop: "10px" }}></div>;
}
