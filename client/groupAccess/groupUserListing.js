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
import Popup from "../components/shared/Popup";
import FindUserContainer from "./findUserContainer.js"
import Notification from "../components/shared/Notification";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import EnhancedTableHead from "../components/shared/EnhancedTableHead";
import {EnhancedCRUDTableToolbar} from "../components/shared/EnhancedCRUDTableToolbar";


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
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "User Name",
  },
  { id: "lastName", numeric: false, disablePadding: true, label: "Last Name" },
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

const GroupUserListing = (props) => {
  const {
    formValues,
    setFormValues,
    saveEntries,
    groupUserListing,
    setGroupUserListing,
    groupUserListingPreFilter,
    setGroupUserListingPreFilter,
    setOpenGroupUserListingPopup,
    removeSelectedUsers,
    trackUsersAddedAndRemoved,
    setSelectedRecord,
    setRecordForEdit,
    selected, 
    setSelected,
    page,
    setPage,
  } = props;

  const classes = useStyles();
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const addButtonText = "Add Users";
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("email");
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [idToUpdate, setIdToUpdate] = useState();
  const [filterOn, setFilterOn] = useState("email");
  const [openUserSelectPopup, setOpenUserSelectPopup] = useState(false);
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
      "GroupUserListing - Inside handleRequestFilter event.target.value = ",
      event.target.value
    );
    console.log(
      "GroupUserListing - Inside handleRequestFilter filter on = ",
      filterOn
    );

    if (groupUserListingPreFilter.length > 0) {
      const newGroupUser = groupUserListingPreFilter.filter(
        (groupUser) => {
          return groupUser[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );

      setGroupUserListing(newGroupUser);
      console.log(
        "GroupUserListing - Inside handleRequestFilter newGroupUser = ",
        newGroupUser
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
      const newSelecteds = groupUserListing.map((n) => n.id);
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
    Math.min(rowsPerPage, groupUserListing.length - page * rowsPerPage);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "GroupUserListing - Inside handleClick UseEffect for selected = ",
      selected
    );
    console.log(
      "GroupUserListing - Inside handleClick UseEffect for newSelected selected.length = ",
      selected.length
    );
    console.log(
      "GroupUserListing - Inside handleClick UseEffect for newSelected  selected[0] = ",
      selected[0]
    );

    if (selected.length === 1) {
      setIdToUpdate(selected[0]);
    } else {
      setIdToUpdate("");
    }
  }, [selected]);

  useEffect(() => {
    console.log(
      "GroupUserListing - Inside useEffect for OrderBY UseEffect for idToUpdate = ",
      idToUpdate
    );
  }, [idToUpdate]);

  useEffect(() => {
    console.log(
      "GroupUserListing - Inside useEffect for OrderBY UseEffect for orderBy = ",
      orderBy
    );
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
      console.log(
        "GroupUserListing - Inside useEffect for OrderBY UseEffect for filterOn set but is async= ",
        filterOn
      );
    }
  }, [orderBy]);

    const clearTable = (rowsToClear) => {
    console.log(
      "groupUserListing - clearTable rowsToClear = ",
      rowsToClear
    );
    console.log("groupUserListing - clearTable dense = ", dense);
    for (let i = 0; i < 5; i++) {
      rowsToClear > 0 && (
        <TableRow style={{ height: (dense ? 33 : 53) * rowsToClear }}>
          <TableCell colSpan={6} />
        </TableRow>
      );
    }
  };

  const handleRequestSave = () => {
    saveEntries()
  }

  const handleRequestDelete = () => {
    console.log(
      "GroupAccessListing - Inside handleRequestDelete + before update confirmDialog",
      confirmDialog
    );
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log(
      "GroupUserListing - Inside handleRequestDelete selected = ",
      selected
    );
    removeSelectedUsers()
    setSelected([]);
    setNotify({
      isOpen: false,
      message: "",
      type: "",
    });
  }

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedCRUDTableToolbar          
            filterOn={filterOn}
            handleRequestDelete={handleRequestDelete}
            handleRequestFilter={handleRequestFilter}
            idToUpdate={idToUpdate}          
            numSelected={selected.length}
            handleRequestSave={handleRequestSave}
            setConfirmDialog ={setConfirmDialog}
            setOpenAddPopup ={setOpenUserSelectPopup}
            setOpenExitPopup ={setOpenGroupUserListingPopup}
            setOpenUpdatePopup ={setOpenUserSelectPopup}            
            setRecordForEdit ={setRecordForEdit}            
            setSelectedRecord={setSelectedRecord}
            addButtonText = {addButtonText}
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
                rowCount={groupUserListing.length}
              />
              <TableBody>
                {stableSort(groupUserListing, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((groupUser, index) => {
                    const isItemSelected = isSelected(groupUser.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return groupUserListing.length > 0 ? (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(groupUser.id)
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
                            {groupUser.email}
                          </TableCell>
                          <TableCell align="left">
                            {groupUser.name}
                          </TableCell>
                          <TableCell align="left">
                            {groupUser.lastName}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ) : (
                      <div> No Group Access </div>
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
            count={groupUserListing.length}
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
      <Popup
          title="Group Access Entry and Update Form"
          openPopup={openUserSelectPopup}
          setOpenPopup={setOpenUserSelectPopup}
      >
          <FindUserContainer
              formValues = {formValues}
              setFormValues = {setFormValues}
              groupUserListing={groupUserListing}
              setGroupUserListing={setGroupUserListing}
              groupUserListingPreFilter ={groupUserListingPreFilter}
              setGroupUserListingPreFilter = {setGroupUserListingPreFilter}
              setOpenUserSelectPopup={setOpenUserSelectPopup}
              trackUsersAddedAndRemoved = {trackUsersAddedAndRemoved}
          />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
export default GroupUserListing;

