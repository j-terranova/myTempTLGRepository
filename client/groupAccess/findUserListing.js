import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Notification from "../components/shared/Notification";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import EnhancedTableHead from "../components/shared/EnhancedTableHead";
import {EnhancedLookupTableToolbar} from "../components/shared/EnhancedLookupTableToolbar";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "email", numeric: false, disablePadding: true, label: "email" },
  { id: "name", numeric: true, disablePadding: false, label: "Name" },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

const FindUserListing = (props) => {
  const {
    selected,
    setSelected,
    findUserListing, 
    setFindUserListing,
    findUserListingPreFilter, 
    addSelectedUsers,
    setOpenUserSelectPopup,
    page,
    setPage,
  } = props;
  const classes = useStyles();
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("email");
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterOn, setFilterOn] = useState("emmail");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    groupName: "",
    groupDescription: "",
  });

   const handleRequestFilter = (event) => {
    console.log(
      "FindUserListing - Inside handleRequestFilter findUserListingPreFilter = ",
      findUserListingPreFilter
    );
    console.log(
      "FindUserListing - Inside handleRequestFilter event.target.value = ",
      event.target.value
    );
    console.log(
      "FindUserListing - Inside handleRequestFilter filter on = ",
      filterOn
    );
    if (findUserListingPreFilter.length > 0) {
      const newFindUser = findUserListingPreFilter.filter(
        (findUser) => {
          return findUser[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );
      setFindUserListing(newFindUser);
      console.log(
        "FindUserListing - Inside handleRequestFilter newFindUser = ",
        newFindUser
      );
    }
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = findUserListing.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, findUserListing.length - page * rowsPerPage);
  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "FindUserListing - Inside useEffect for OrderBY UseEffect for orderBy = ",
      orderBy
    );
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
      console.log(
        "FindUserListing - Inside useEffect for OrderBY UseEffect for filterOn set but is async= ",
        filterOn
      );
    }
  }, [orderBy]);

  const clearTable = (rowsToClear) => {
    console.log(
      "findUserListing - clearTable rowsToClear = ",
      rowsToClear
    );
    console.log("findUserListing - clearTable dense = ", dense);
    for (let i = 0; i < 5; i++) {
      rowsToClear > 0 && (
        <TableRow style={{ height: (dense ? 33 : 53) * rowsToClear }}>
          <TableCell colSpan={6} />
        </TableRow>
      );
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedLookupTableToolbar          
            filterOn={filterOn}
            handleRequestFilter={handleRequestFilter}      
            numSelected={selected.length}
            setOpenPopup ={setOpenUserSelectPopup}         
            addSelectedUsers = {addSelectedUsers}
          />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                headCells={headCells}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
                order={order}
                orderBy={orderBy}
                rowCount={findUserListing.length}
              />
              <TableBody>
                {stableSort(findUserListing, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((findUser, index) => {
                    const isItemSelected = isSelected(findUser._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return findUserListing.length > 0 ? (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(findUser._id)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {findUser.email}
                          </TableCell>
                          <TableCell align="right">
                            {findUser.name}
                          </TableCell>
                          <TableCell align="right">
                            {findUser.lastName}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ) : (
                      <div> No Users </div>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={findUserListing.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
export default FindUserListing;