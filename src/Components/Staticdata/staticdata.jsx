import axios from "axios";
import React from "react";

const Staticdata = () => {
  const [dataset, setDataset] = React.useState([]);
  const [month, setMonth] = React.useState("January");

  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/statistics?month=${month}`
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
    <div className="container-static">
      <div className="static">
        <div className="fhaksfklas">
          <h3>Statistics Data </h3>
          <select
            name="month"
            id="month"
            className="search1"
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="january">January</option>
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
        <div className="fdsa">
          <div>
            <p>Total Sale</p>
            <p>Total sold item</p>
            <p>Total not sold item</p>
          </div>
          <div>
            <p>{dataset && dataset.totalSaleAmount}</p>
            <p>{dataset && dataset.totalSoldItems}</p>
            <p>{dataset && dataset.totalNotSoldItems}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staticdata;
