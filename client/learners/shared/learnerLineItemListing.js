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

import Notification from "../../components/shared/Notification";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import EnhancedTableHead from "../../components/shared/EnhancedTableHead";
import {EnhancedSelectorTableToolbar} from "../../components/shared/EnhancedSelectorTableToolbar";
import { useCriteria } from "../../contexts/CriteriaContext";
import { useAccess } from "../../contexts/AccessContext";

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
  { id: "topic",  disablePadding: true, label: "Topic" },
  {
    id: "description",
    disablePadding: false,
    label: "Description",
  },
  { id: "role", numeric: true, disablePadding: false, label: "Role" },
  { id: "subType", numeric: true, disablePadding: false, label: "Type" },
  {
    id: "lastViewed",
    numeric: true,
    disablePadding: false,
    label: "Last Viewed",
  },
  { id: "difficultyLevel", numeric: true, disablePadding: false, label: "Difficulty Level" },
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
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  addNew: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    direction: "row",
    position: "center",
    variant: "contained",
    size: "small",
  },
}));

const LearnerLineItemListing = (props) => {
  const {
    selected,
    setSelected,
    learnerLineItems,
    setLearnerLineItems,
    learnerLineItemsPreFilter,
    handleRequestEnrolled,
    handleRequestRecentlyViewed,
    handleSelectedLearning,
    page,
    setPage,
    listingTitle,
  } = props;


  const classes = useStyles();
  
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("topic");
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idToGet, setIdToGet] = useState();
  const [filterOn, setFilterOn] = useState("topic");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

    const handleRequestFilter = (event) => {
    if (learnerLineItemsPreFilter.length > 0) {
      const newLearnerLineItems = learnerLineItemsPreFilter.filter(
        (learnerLineItem) => {
          return learnerLineItem[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );
      setLearnerLineItems(newLearnerLineItems);
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
      const newSelecteds = learnerLineItems.map((n) => n.frameworkId);
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
    Math.min(rowsPerPage, learnerLineItems.length - page * rowsPerPage);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "LearnerLineItemListing - Inside handleClick UseEffect for selected = ",
      selected
    );
     if (selected.length === 1) {
       setIdToGet(selected[0]);
     } else {
       setIdToGet("");
     }
  }, [selected]);

  useEffect(() => {
    console.log(
      "LearnerLineItemListing - Inside useEffect for OrderBY UseEffect for idToGet = ",
      idToGet
    );
  }, [idToGet]);

  useEffect(() => {
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
    }
  }, [orderBy]);

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedSelectorTableToolbar 
            filterOn={filterOn}         
            handleRequestFilter={handleRequestFilter}
            handleRequestEnrolled ={handleRequestEnrolled}
            handleRequestRecentlyViewed ={handleRequestRecentlyViewed}
            handleSelectedAction={handleSelectedLearning}     
            numSelected={selected.length}
            listingTitle ={listingTitle}
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
                rowCount={learnerLineItems.length}
              />
              <TableBody>
                {stableSort(learnerLineItems, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((learnerLineItem, index) => {
                    const isItemSelected = isSelected(learnerLineItem.frameworkId);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return  (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(learnerLineItem.frameworkId)
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
                            {!learnerLineItem.markDeleted
                              ? learnerLineItem.topic
                              : "DELETED ENTRY!-" + learnerLineItem.topic}
                          </TableCell>
                          <TableCell align="left">
                            {learnerLineItem.description}
                          </TableCell>
                          <TableCell align="right">
                            {learnerLineItem.role}
                          </TableCell>
                          <TableCell align="left">
                            {learnerLineItem.subType}
                          </TableCell>
                          <TableCell align="left">
                            {learnerLineItem.lastViewed}
                          </TableCell>
                          <TableCell align="left">
                            {learnerLineItem.difficultyLevel}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ) 
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
           />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={learnerLineItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
export default LearnerLineItemListing;