import React from "react";

import { useRouteMatch, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";

import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default function CustomTable(props) {
  const match = useRouteMatch();
  const history = useHistory();

  const {
    headText = ["Id", "Name", "Status"],
    selectedKey,
    rows,
    rowsPerPageOptions = [5, 10, 25],
    rowsPerPage: rpp = 5,
    navigate = false,
    navigateParam = "id",
    dense = false,
  } = props;

  const [page, setPage] = React.useState(0);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(rpp);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <TableContainer>
        <Table size={dense ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              {headText.map((item, index) => (
                <TableCell key={index} align="right">
                  {item}
                </TableCell>
              ))}
              {navigate ? <TableCell align="right">#</TableCell> : null}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows && rows.length ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover>
                    {selectedKey
                      ? selectedKey.map((key, index) => (
                          <TableCell key={index} align="right">
                            {row[key]}
                          </TableCell>
                        ))
                      : Object.keys(row).map((key, index) => (
                          <TableCell key={index} align="right">
                            {row[key]}
                          </TableCell>
                        ))}

                    {navigate ? (
                      <TableCell align="right">
                        <Button
                          onClick={() =>
                            history.push(`${match.url}/${row[navigateParam]}`)
                          }
                          variant="contained"
                          size="small"
                          // style={{ padding: 0 }}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  (Empty)
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
