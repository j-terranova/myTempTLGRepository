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

import GroupAccessForm from "./groupAccessForm.js"
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
  { id: "groupName", numeric: false, disablePadding: true, label: "Name" },
  { id: "groupDescription", numeric: true, disablePadding: false, label: "Description" },
  {
    id: "groupFunction",
    numeric: true,
    disablePadding: false,
    label: "Function",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Unique Identifier",
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

const GroupAccessListing = (props) => {
  const {
    selected,
    setSelected,
    groupAccessListing, 
    setGroupAccessListing,
    groupAccessListingPreFilter,
    setGroupAccessListingPreFilter,
    recordForEdit, 
    setRecordForEdit,
    deleteGroup,
    setSelectedRecord,
    groupUsersAdded,
    setGroupUsersAdded,
    groupUsersRemoved,
    setGroupUsersRemoved,
    addGroupsToUserMembership,
    removeGroupsFromUserMembership,
    trackUsersAddedAndRemoved,
    page,
    setPage,
  } = props;

  const addButtonText = "Add Group";
  const classes = useStyles();

  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const tableHeading = "Groups you own"

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("groupName");

  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [idToUpdate, setIdToUpdate] = useState();
  const [filterOn, setFilterOn] = useState("groupName");

  const [openGroupListingPopup, setOpenGroupListingPopup] = useState(true);
  const [openGroupFormPopup, setOpenGroupFormPopup] = useState(false);
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

  const handleRequestDelete = () => {
    console.log(
      "GroupAccessListing - Inside handleRequestDelete + before update confirmDialog",
      confirmDialog
    );
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const idToDelete = selected[0];

    deleteGroup(idToDelete);
    setSelected([]);
    setNotify({
      isOpen: false,
      message: "",
      type: "",
    });
  }

   const handleRequestFilter = (event) => {
    console.log(
      "GroupAccessListing - Inside handleRequestFilter event.target.value = ",
      event.target.value
    );
    console.log(
      "GroupAccessListing - Inside handleRequestFilter filter on = ",
      filterOn
    );
    if (groupAccessListingPreFilter.length > 0) {
      const newGroupAccess = groupAccessListingPreFilter.filter(
        (groupAccess) => {
          return groupAccess[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );
      setGroupAccessListing(newGroupAccess);
      console.log(
        "GroupAccessListing - Inside handleRequestFilter newGroupAccess = ",
        newGroupAccess
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
      const newSelecteds = groupAccessListing.map((n) => n._id);
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
    Math.min(rowsPerPage, groupAccessListing.length - page * rowsPerPage);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "GroupAccessListing - Inside handleClick UseEffect for selected = ",
      selected
    );
    console.log(
      "GroupAccessListing - Inside handleClick UseEffect for newSelected selected.length = ",
      selected.length
    );
    console.log(
      "GroupAccessListing - Inside handleClick UseEffect for newSelected  selected[0] = ",
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
      "GroupAccessListing - Inside useEffect for OrderBY UseEffect for orderBy = ",
      orderBy
    );
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
      console.log(
        "GroupAccessListing - Inside useEffect for OrderBY UseEffect for filterOn set but is async= ",
        filterOn
      );
    }
  }, [orderBy]);

  const clearTable = (rowsToClear) => {
    console.log(
      "groupAccessListing - clearTable rowsToClear = ",
      rowsToClear
    );
    console.log("groupAccessListing - clearTable dense = ", dense);
    for (let i = 0; i < 5; i++) {
      rowsToClear > 0 && (
        <TableRow style={{ height: (dense ? 33 : 53) * rowsToClear }}>
          <TableCell colSpan={6} />
        </TableRow>
      );
    }
  };

  if (!openGroupListingPopup) {
    return (<Redirect to={'/' }/>)
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
            handleRequestSave={null}
            setConfirmDialog ={setConfirmDialog}
            setOpenAddPopup ={setOpenGroupFormPopup}
            setOpenExitPopup ={setOpenGroupListingPopup}
            setOpenUpdatePopup ={setOpenGroupFormPopup}
            setRecordForEdit ={setRecordForEdit}            
            setSelectedRecord={setSelectedRecord}
            tableHeading = {tableHeading}
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
                rowCount={groupAccessListing.length}
              />
              <TableBody>
                {stableSort(groupAccessListing, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((groupAccess, index) => {
                    const isItemSelected = isSelected(groupAccess._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return groupAccessListing.length > 0 ? (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(groupAccess._id)
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
                            {!groupAccess.markDeleted
                              ? groupAccess.groupName
                              : "DELETED ENTRY!-" + groupAccess.groupName}
                          </TableCell>
                          <TableCell align="right">
                            {groupAccess.groupDescription}
                          </TableCell>
                          <TableCell align="right">
                            {groupAccess.groupFunction}
                          </TableCell>
                          <TableCell align="right">
                            {groupAccess.role}
                          </TableCell>
                          <TableCell align="right">
                            {groupAccess._id}
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
            count={groupAccessListing.length}
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
          openPopup={openGroupFormPopup}
          setOpenPopup={setOpenGroupFormPopup}
      >
          <GroupAccessForm
              recordForEdit={recordForEdit}
              setOpenPopup={setOpenGroupFormPopup}
              groupAccessListing={groupAccessListing}
              setGroupAccessListing={setGroupAccessListing}
              groupAccessListingPreFilter={groupAccessListingPreFilter}
              setGroupAccessListingPreFilter={setGroupAccessListingPreFilter}
              setRecordForEdit ={setRecordForEdit}
              groupUsersAdded = {groupUsersAdded}
              setGroupUsersAdded = {setGroupUsersAdded}
              groupUsersRemoved = {groupUsersRemoved}
              setGroupUsersRemoved = {setGroupUsersRemoved}
              addGroupsToUserMembership = {addGroupsToUserMembership}
              removeGroupsFromUserMembership = {removeGroupsFromUserMembership} 
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
export default GroupAccessListing;