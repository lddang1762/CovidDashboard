import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import chartData, { MapData } from "./ChartData";
import { ReturnData } from "../../hooks/useCovidData";

import * as am4core from "@amcharts/amcharts4/core";
import geodata_usa from "@amcharts/amcharts4-geodata/usaHigh";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export function Map({ data }: { data: ReturnData[] }) {
  const chart = useRef(null);
  const [mapData, setMapData] = useState<MapData[]>(chartData);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const updateData = () => {
      const updated = mapData.slice().map((data1) => {
        const matching = data.find((data2) => data2.state === data1.name);
        if (matching) {
          data1.value = matching.cases;
        }
        return matching;
      });
      console.log(updated);
    };
    if (data) {
      updateData();
      setMax(
        Math.max.apply(
          Math,
          data.map((data) => {
            return data.cases;
          })
        )
      );
    }
  }, [data, mapData]);

  useLayoutEffect(() => {
    const map = am4core.create("chartdiv", am4maps.MapChart);
    map.projection = new am4maps.projections.AlbersUsa();
    map.geodata = geodata_usa;

    const polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.tooltipPosition = "fixed";
    polygonSeries.heatRules.push({
      target: polygonSeries.mapPolygons.template,
      property: "fill",
      min: am4core.color("#F5DBCB"),
      max: am4core.color("#db4450"),
      dataField: "value",
    });

    polygonSeries.data = mapData;
    polygonSeries.mapPolygons.template.events.on("over", (e) => {
      heatLegend.valueAxis.showTooltipAt(e.target.dataItem.value);
    });

    polygonSeries.mapPolygons.template.events.on("out", () => {
      heatLegend.valueAxis.hideTooltip();
    });

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value} cases";
    polygonTemplate.strokeOpacity = 0.4;

    const heatLegend = map.createChild(am4maps.HeatLegend);
    heatLegend.orientation = "vertical";
    heatLegend.height = am4core.percent(100);
    heatLegend.minColor = am4core.color("#F5DBCB");
    heatLegend.maxColor = am4core.color("#db4450");
    heatLegend.minValue = 0;
    heatLegend.maxValue = max;
    heatLegend.valueAxis.renderer.labels.template.fontSize = 16;
    heatLegend.valueAxis.renderer.minGridDistance = 60;
    const minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.label.horizontalCenter = "left";
    const maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.label.horizontalCenter = "right";

    map.series.push(polygonSeries);
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.valign = "middle";

    chart.current = map;

    return () => {
      map.dispose();
    };
  }, [max]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}
export default Map;
