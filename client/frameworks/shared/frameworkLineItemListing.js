import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import auth from "../../auth/auth-helper";
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
import Popup from "../../components/shared/Popup";
import {FrameworkInputPopup} from "./frameworkInputPopup"

import Notification from "../../components/shared/Notification";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import EnhancedTableHead from "../../components/shared/EnhancedTableHead";
import {EnhancedTableToolbar} from "../../components/shared/EnhancedTableToolbar";
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
  {
    id: "frameworkLayoutFormat",
    disablePadding: false,
    label: "Framework Layout",
  },
  {
    id: "frameworkResponseFormat",
    disablePadding: false,
    label: "Response Format",
  },
  {
    id: "frameworkPresentationMethod",
    disablePadding: false,
    label: "Presentation Method",
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

const FrameworkLineItemListing = (props) => {
  const {
    selected,
    setSelected,
    frameworkLineItems,
    setFrameworkLineItems,
    frameworkLineItemsPreFilter,
    setFrameworkLineItemsPreFilter,
    updateFrameworkLineItem,
    formValues,
    setFormValues,
    prepareFormValues,
    readById,
    page,
    setPage,
    checkCurrentCriteria,
    checkCurrentAccess,
    formTitle,
    listingTitle,
    groupsUserOwns,
    okToUpdate,
    checkIfUserCanUpdate,
  } = props;
  const classes = useStyles();
  
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("topic");
  const currentCriteria = useCriteria();
  const currentAccess = useAccess();
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idToUpdate, setIdToUpdate] = useState();
  const [filterOn, setFilterOn] = useState("topic");
  const [openPopup, setOpenPopup] = useState(false);
  const [openImportPopup, setOpenImportPopup] = useState(false);
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

  const getSelectedItem = (id) =>
  {
    console.log("frameworkLineItemListing - getSelectedItem - before ReadById id to get = ", id );

    const abortController = new AbortController();
    const signal = abortController.signal;
    readById(
      { userId: userId, },
      {
        id: id,
      },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "frameworkLineItemListing - getSelectedItem -readById - No Data Found!!!!"
        );
        prepareFormValues(null);
      } else {
        if (data.error) {
          console.log(
            "frameworkLineItemListing - getSelectedItem -readById - Error!!!!", data.error
          );
          prepareFormValues(null);
        } else {
          console.log("frameworkLineItemListing - getSelectedItem - after  ReadById" );
          console.log(
            "frameworkStatementContainer - Update listing by ListByCriteria  data = ",data );
          prepareFormValues(data);
        } 
      }
    });    
  }

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("FrameworkLineItemListing - search_id = ", search_id);
    for (var i = 0; i < frameworkLineItems.length; i++) {
      console.log(
        "FrameworkLineItemListing - frameworkLineItems[i]._id = ",
        frameworkLineItems[i]._id
      );
      if (frameworkLineItems[i]._id == search_id) {
        index = i;
        console.log("FrameworkLineItemListing - MATCH FOUND!!!  Search Id = ", search_id);
        console.log( "FrameworkLineItemListing - _id match found index = ", index );
        break;
      }
    }
    return index;
  };

  const handleRequestDelete = () => {
    console.log(
      "FrameworkLineItemListing - Inside handleRequestDelete + before update confirmDialog",
      confirmDialog
    );
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log(
      "FrameworkLineItemListing - Inside handleRequestDelete selected = ",
      selected
    );
    const lastIndexToUpdate = selected.length -1;
    for (let i = 0; i < selected.length; i++) {
      console.log(selected[i]);
      const indexToDelete = findMatchingIndex(selected[i]);
      if (indexToDelete>=0)
      {
        updateFrameworkLineItem(indexToDelete, true, lastIndexToUpdate, currentCriteria,currentAccess);
      }     
    }
  }

  const handleRequestFilter = (event) => {
    if (frameworkLineItemsPreFilter.length > 0) {
      const newFrameworkLineItems = frameworkLineItemsPreFilter.filter(
        (frameworkLineItem) => {
          return frameworkLineItem[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );
      setFrameworkLineItems(newFrameworkLineItems);
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
      const newSelecteds = frameworkLineItems.map((n) => n._id);
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
    Math.min(rowsPerPage, frameworkLineItems.length - page * rowsPerPage);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "FrameworkLineItemListing - Inside handleClick UseEffect for selected = ",
      selected
    );
     if (selected.length === 1) {
       setIdToUpdate(selected[0]);
        //  okToUpdate,
        //  setOkToUpdate,
        //  checkIfUserCanUpdate,
        //  owner_id: lesson.owner_id,
        //  group_id: lesson.group_id,
        const indexToUpdate = findMatchingIndex(selected[0]);
        console.log(
          "FrameworkLineItemListing - UseEffect indexToUpdate = ",indexToUpdate);
        console.log(
          "FrameworkLineItemListing - UseEffect frameworkLineItems = ",frameworkLineItems);
        console.log(
          "FrameworkLineItemListing - UseEffect frameworkLineItems[indexToUpdate].owner_id = ",
          frameworkLineItems[indexToUpdate].owner_id);
        console.log(
          "FrameworkLineItemListing - UseEffect frameworkLineItems[indexToUpdate].group_id) = ",
          frameworkLineItems[indexToUpdate].group_id);
        let isOkToUpdate = checkIfUserCanUpdate( frameworkLineItems[indexToUpdate].owner_id,
                                            frameworkLineItems[indexToUpdate].group_id)
        console.log(
          "FrameworkLineItemListing -  isOkToUpdate = ", isOkToUpdate );
     } else {
       setIdToUpdate("");
     }
  }, [selected]);

  useEffect(() => {
    console.log(
      "FrameworkLineItemListing - useEffect for okToUpdate = ", okToUpdate );
  }, [okToUpdate]);

  useEffect(() => {
    console.log(
      "FrameworkLineItemListing - Inside useEffect for OrderBY UseEffect for idToUpdate = ",
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
          <EnhancedTableToolbar          
            filterOn={filterOn}
            handleRequestDelete={handleRequestDelete}
            handleRequestFilter={handleRequestFilter}
            idToUpdate={idToUpdate}          
            numSelected={selected.length}
            setConfirmDialog ={setConfirmDialog}
            setOpenPopup ={setOpenPopup}
            setOpenImportPopup ={setOpenImportPopup}
            getSelectedItem={getSelectedItem}
            prepareFormValues= {prepareFormValues}
            listingTitle ={listingTitle}
            okToUpdate = {okToUpdate}
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
                rowCount={frameworkLineItems.length}
              />
              <TableBody>
                {stableSort(frameworkLineItems, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((frameworkLineItem, index) => {
                    const isItemSelected = isSelected(frameworkLineItem._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return frameworkLineItems.length > 0 ? (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(frameworkLineItem._id)
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
                            {!frameworkLineItem.markDeleted
                              ? frameworkLineItem.topic
                              : "DELETED ENTRY!-" + frameworkLineItem.topic}
                          </TableCell>
                          <TableCell align="left">
                            {frameworkLineItem.description}
                          </TableCell>
                          <TableCell align="left">
                            {frameworkLineItem.frameworkLayoutFormat}
                          </TableCell>
                          <TableCell align="left">
                            {frameworkLineItem.frameworkResponseFormat}
                          </TableCell>
                          <TableCell align="left">
                            {frameworkLineItem.frameworkPresentationMethod}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ) : (
                      <div> No Framework Line Items </div>
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
          <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
           />

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={frameworkLineItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <Popup
          title= {formTitle}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          formValues = {formValues}
          setFormValues = {setFormValues}
      >

      {formValues != null && FrameworkInputPopup(   formValues,
                                                    setFormValues,
                                                    prepareFormValues,
                                                    setOpenPopup,
                                                    setSelected,           
                                                    findMatchingIndex,
                                                    frameworkLineItems,
                                                    setFrameworkLineItems,
                                                    setFrameworkLineItemsPreFilter,
                                                    checkCurrentCriteria,
                                                    checkCurrentAccess,
                                                    groupsUserOwns,
                                                    okToUpdate,
)}
                                                           
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
export default FrameworkLineItemListing;