import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import axios from "axios";

const chartSetting = {
  yAxis: [
    {
      label: "Count",
    },
  ],
  series: [
    { dataKey: "count", label: "Count", valueFormatter: (value) => value },
  ],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function Barchart() {
  const [dataset, setDataset] = React.useState([]);
  const [month, setMonth] = React.useState("January");

  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/bar-chart?month=${month}`
      );
      console.log(response.data);
      setDataset(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData(month);
  }, [month]);

  return (
    <div
      style={{
        width: "80%",
        margin: "10rem",
        backgroundColor: "rgb(161, 158, 158)",
        padding: "3rem",
      }}
    >
      <div className="fhaksfklas" style={{ paddingBottom: "4rem" }}>
        <h3>Transaction Bar Chart </h3>
        <select
          name="month"
          id="month"
          className="search1"
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "range",
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
