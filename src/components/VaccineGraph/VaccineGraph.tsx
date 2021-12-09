import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import GraphData from "./GraphData";

am4core.useTheme(am4themes_animated);

export default function VaccineGraph({ data }) {
  const _chart = useRef(null);
  const [graphData, setGraphData] = useState(GraphData);

  useEffect(() => {
    const updateData = () => {
      const dates = Object.keys(data);
      const updated = graphData.slice().map((data1, index) => {
        return {
          date: dates[index],
          vaccines: data[dates[index]],
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
    const chart = am4core.create("vacGraph", am4charts.XYChart);
    const title = chart.titles.create();
    title.text = "Covid Vaccines in the US";
    title.marginTop = 30;
    title.fontSize = 28;
    title.marginBottom = 10;

    const xAxis = chart.xAxes.push(new am4charts.DateAxis());
    xAxis.dateFormatter.dateFormat = "MM/dd/yy";
    xAxis.baseInterval.timeUnit = "day";
    xAxis.baseInterval.count = 1;
    xAxis.title.text = "Date (Past 30 days)";

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = "Vaccines";

    const caseSeries = chart.series.push(new am4charts.LineSeries());
    caseSeries.name = "Vaccines";
    caseSeries.dataFields.valueY = "vaccines";
    caseSeries.dataFields.dateX = "date";
    caseSeries.stroke = am4core.color("#405ee3");
    caseSeries.tooltipText = "{name}: {valueY}";
    caseSeries.tooltip.getFillFromObject = false;
    caseSeries.tooltip.background.fill = am4core.color("#405ee3");
    caseSeries.data = graphData;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    chart.cursor = new am4charts.XYCursor();
    // chart.legend = new am4charts.Legend();
    _chart.current = chart;

    return () => {
      chart.dispose();
    };
  }, [graphData]);

  return <div id="vacGraph" style={{ width: "100%", height: "500px", marginTop: "10px" }}></div>;
}
