import "./App.css";
import Barchart from "./Components/Barchart/barchart";
import Staticdata from "./Components/Staticdata/staticdata";
import DenseTable from "./Components/Table/table2";

function App() {
  return (
    <div className="App">
      <DenseTable />
      <Staticdata />
      <Barchart/>
    </div>
  );
}

export default App;
