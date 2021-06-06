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
import {EnhancedGamerTableToolbar} from "../../components/shared/EnhancedGamerTableToolbar";
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

const GamerLineItemListing = (props) => {
  const {
    selected,
    setSelected,
    gamerLineItems,
    setGamerLineItems,
    gamerLineItemsPreFilter,
    updateGamerLineItem,
    handleRequestGamesPlayed,
    handleRequestGamerLevelSuggestions,
    handleSelectedGaming,
    page,
    setPage,
    listingTitle,
  } = props;

  const classes = useStyles();
  
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("topic");
  const currentCriteria = useCriteria();
  const currentAccess = useAccess();
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idToUpdate, setIdToUpdate] = useState();
  const [filterOn, setFilterOn] = useState("topic");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("GamerLineItemListing - search_id = ", search_id);
    for (var i = 0; i < gamerLineItems.length; i++) {
      console.log(
        "GamerLineItemListing - gamerLineItems[i]._id = ",
        gamerLineItems[i].frameworkId
      );
      if (gamerLineItems[i].frameworkId == search_id) {
        index = i;
        console.log("GamerLineItemListing - MATCH FOUND!!!  Search Id = ", search_id);
        console.log( "GamerLineItemListing - _id match found index = ", index );
        break;
      }
    }
    return index;
  };

  const handleRequestFilter = (event) => {
    if (gamerLineItemsPreFilter.length > 0) {
      const newGamerLineItems = gamerLineItemsPreFilter.filter(
        (gamerLineItem) => {
          return gamerLineItem[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );
      setGamerLineItems(newGamerLineItems);
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
      const newSelecteds = gamerLineItems.map((n) => n.frameworkId);
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
    Math.min(rowsPerPage, gamerLineItems.length - page * rowsPerPage);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "GamerLineItemListing - Inside handleClick UseEffect for selected = ",
      selected
    );
     if (selected.length === 1) {
       setIdToUpdate(selected[0]);
     } else {
       setIdToUpdate("");
     }
  }, [selected]);

  useEffect(() => {
    console.log(
      "GamerLineItemListing - Inside useEffect for OrderBY UseEffect for idToUpdate = ",
      idToUpdate
    );
  }, [idToUpdate]);

  useEffect(() => {
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
    }
  }, [orderBy]);

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedGamerTableToolbar          
            filterOn={filterOn}
            handleRequestFilter={handleRequestFilter}
            handleRequestGamesPlayed ={handleRequestGamesPlayed}
            handleRequestGamerLevelSuggestions={handleRequestGamerLevelSuggestions}
            handleSelectedGaming={handleSelectedGaming}     
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
                rowCount={gamerLineItems.length}
              />
              <TableBody>
                {stableSort(gamerLineItems, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((gamerLineItem, index) => {
                    const isItemSelected = isSelected(gamerLineItem.frameworkId);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return  (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(gamerLineItem.frameworkId)
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
                            {!gamerLineItem.markDeleted
                              ? gamerLineItem.topic
                              : "DELETED ENTRY!-" + gamerLineItem.topic}
                          </TableCell>
                          <TableCell align="left">
                            {gamerLineItem.description}
                          </TableCell>
                          <TableCell align="right">
                            {gamerLineItem.role}
                          </TableCell>
                          <TableCell align="left">
                            {gamerLineItem.subType}
                          </TableCell>
                          <TableCell align="left">
                            {gamerLineItem.lastViewed}
                          </TableCell>
                          <TableCell align="left">
                            {gamerLineItem.difficultyLevel}
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
            count={gamerLineItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
export default GamerLineItemListing;