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
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Popup from "../../components/shared/Popup";
import {ConstructInputPopup} from "./constructInputPopup.js"

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
  //{
  //  id: "constructDetail",
  //  disablePadding: false,
  //  label: "Construct Details",
  //},
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

const ConstructLineItemListing = (props) => {
  const {
    selected,
    setSelected,
    constructLineItems,
    setConstructLineItems,
    constructLineItemsPreFilter,
    setConstructLineItemsPreFilter,
    updateConstructLineItem,
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
    handleRequestImport,
    loading,
    setLoading,
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
    console.log("constructLineItemListing - getSelectedItem - before ReadById id to get = ", id );

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
          "constructLineItemListing - getSelectedItem -readById - No Data Found!!!!"
        );
        prepareFormValues(null);
      } else {
        if (data.error) {
          console.log(
            "constructLineItemListing - getSelectedItem -readById - Error!!!!", data.error
          );
          prepareFormValues(null);
        } else {
          console.log("constructLineItemListing - getSelectedItem - after  ReadById" );
          console.log(
            "constructLineItemListing - getSelectedItem  data = ",data );
          prepareFormValues(data);
        } 
      }
    });    
  }

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("ConstructLineItemListing - search_id = ", search_id);
    for (var i = 0; i < constructLineItems.length; i++) {
      console.log(
        "ConstructLineItemListing - constructLineItems[i]._id = ",
        constructLineItems[i]._id
      );
      if (constructLineItems[i]._id == search_id) {
        index = i;
        console.log("ConstructLineItemListing - MATCH FOUND!!!  Search Id = ", search_id);
        console.log( "ConstructLineItemListing - _id match found index = ", index );
        break;
      }
    }
    return index;
  };

  const handleRequestDelete = () => {
    console.log(
      "ConstructLineItemListing - Inside handleRequestDelete + before update confirmDialog",
      confirmDialog
    );
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log(
      "ConstructLineItemListing - Inside handleRequestDelete selected = ",
      selected
    );
    const lastIndexToUpdate = selected.length -1;
    for (let i = 0; i < selected.length; i++) {
      console.log(selected[i]);
      const indexToDelete = findMatchingIndex(selected[i]);
      if (indexToDelete>=0)
      {
        updateConstructLineItem(indexToDelete, true, lastIndexToUpdate, currentCriteria,currentAccess);
      }     
    }
  }

  const handleRequestFilter = (event) => {
    if (constructLineItemsPreFilter.length > 0) {
      const newConstructLineItems = constructLineItemsPreFilter.filter(
        (constructLineItem) => {
          return constructLineItem[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );
      setConstructLineItems(newConstructLineItems);
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
      const newSelecteds = constructLineItems.map((n) => n._id);
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
    Math.min(rowsPerPage, constructLineItems.length - page * rowsPerPage);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "ConstructLineItemListing - Inside handleClick UseEffect for selected = ",
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
      "ConstructLineItemListing - Inside useEffect for OrderBY UseEffect for idToUpdate = ",
      idToUpdate
    );
  }, [idToUpdate]);

  useEffect(() => {
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
    }
  }, [orderBy]);

  useEffect(() => {
    
    if (loading) {
      console.log("Loading Circle should appear")
      //return <CircularProgressWithLabel value="Loading..." />;
    }
  }, [loading]);

  return (
    <>
    {loading ? 
    <div>
      <LinearProgress/>
      <LinearProgress color="secondary" />
      <p>&nbsp;</p> 
      <p>&nbsp;</p> 
      <p>&nbsp;</p> 
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please wait while loading data ... </p> 
    </div> :
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
            getSelectedItem={getSelectedItem}
            prepareFormValues= {prepareFormValues}
            listingTitle ={listingTitle}
            okToUpdate = {okToUpdate}
            handleRequestImport = {handleRequestImport}
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
                rowCount={constructLineItems.length}
              />
              <TableBody>
                {stableSort(constructLineItems, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((constructLineItem, index) => {
                    const isItemSelected = isSelected(constructLineItem._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return constructLineItems.length > 0 ? (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(constructLineItem._id)
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
                            {!constructLineItem.markDeleted
                              ? constructLineItem.topic
                              : "DELETED ENTRY!-" + constructLineItem.topic}
                          </TableCell>
                          <TableCell align="left">
                            {constructLineItem.description}
                          </TableCell>
                          <TableCell align="left">
                            {/*constructLineItem.constructLineItem*/}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ) : (
                      <div> No Construct Line Items </div>
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
            count={constructLineItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>}
      <Popup
          title= {formTitle}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          formValues = {formValues}
          setFormValues = {setFormValues}

      >
      {formValues != null && ConstructInputPopup(   formValues,
                                                    setFormValues,
                                                    setOpenPopup,
                                                    setSelected,
                                                    findMatchingIndex,
                                                    constructLineItems,
                                                    setConstructLineItems,
                                                    setConstructLineItemsPreFilter,
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
export default ConstructLineItemListing;