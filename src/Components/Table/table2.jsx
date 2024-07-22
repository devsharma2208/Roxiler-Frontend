import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [month, setMonth] = React.useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [transaction, setTransaction] = React.useState(null);
  const fetchData = async (month) => {
    try {
      let response;
      if (!month) {
        response = await axios.get("http://localhost:8000/transactions");
      } else {
        response = await axios.get(
          `http://localhost:8000/transactions?month=${month}`
        );
      }
      console.log(response.data);
      setTransaction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData(month);
  }, [month]);
  const emptyRows =
    page > 0 && transaction && transaction.products
      ? Math.max(0, (1 + page) * rowsPerPage - transaction.products.length)
      : 0;

  return (
    <>
      <div>
        <div className="dashboard">
          <h3>Transaction </h3>
          <h3>Dashboard</h3>
        </div>
      </div>
      <div className="search-con">
        <div>
          <button className="search">Search Transaction</button>
        </div>
        <div>
          <select
            name="month"
            id="month"
            className="search"
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Select Month
            </option>
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
      </div>
      <Paper
        sx={{ minWidth: "600", maxWidth: "100%", backgroundColor: "rgb(138, 126, 126)" }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, background: "rgb(161, 158, 158)" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Sold</TableCell>
                <TableCell align="center">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction &&
              transaction.products &&
              transaction.products.length > 0 ? (
                transaction.products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td style={{ width: 120 }} align="center">
                        {row.title.split(" ").slice(0, 5).join(" ")}....
                      </td>
                      <td style={{ width: 120 }} align="left">
                        {row.description.split(" ").slice(0, 10).join(" ")}....
                      </td>
                      <td style={{ width: 120 }} align="center">
                        {row.price.toFixed(0)}
                      </td>
                      <td style={{ width: 120 }} align="center">
                        {row.category}
                      </td>
                      <td style={{ width: 120 }} align="center">
                        {`${row.sold}`}
                      </td>
                      <td style={{ width: 120 }} align="center">
                        {row.image}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  {/* <td colSpan={7} align="center">
                  No data available
                </td> */}
                </tr>
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 60]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
