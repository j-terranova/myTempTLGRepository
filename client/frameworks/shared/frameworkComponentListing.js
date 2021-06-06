import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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
import FrameworkComponentEdit from "./frameworkComponentEdit.js"
import FrameworkComponentSelectionContainer from "./frameworkComponentSelectionContainer.js"

import Notification from "../../components/shared/Notification";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import EnhancedTableHead from "../../components/shared/EnhancedTableHead";
import {EnhancedComponentListingTableToolBar} from "../../components/shared/EnhancedComponentListingTableToolBar";

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
  { id: "constructDetail", numeric: false, disablePadding: true, label: "Detail" },
  { id: "sequenceNo", numeric: true, disablePadding: true, label: "Sequence No" },
  { id: "subType", numeric: false, disablePadding: true, label: "Sub Type" },
  { id: "constructPrimaryColumn", numeric: false, disablePadding: false, label: "Primary Column" },
  { id: "constructOptionsSource", numeric: false, disablePadding: false, label: "Options Source" },
  { id: "constructResponseFormat", numeric: false, disablePadding: false, label: "Response Format" },
];


  /*
  sequenceNo: 0,
  constructDetail: "",
  type: "Component",
  subType: "",
  constructPrimaryColumn:  "",

  constructOptionsSource: "",
  constructNumberOfOptions:  4,
  constructResponseFormat:  "",
  constructColor:  "",
  constructId:  "",
  */

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

const FrameworkComponentListing = (props) => {
  const { setOpenPopup,} = props;
  const { formValues } = props;
  const { setFormValues } = props;
  const { addNewFramework } = props;
  const { prepareFormValues } = props;
  const { SaveEntries } = props;
  const { validate } = props;
  const { frameworkComponents,} = props;
  const { setFrameworkComponents,} = props;
  const { frameworkComponentOptions,} = props;
  const { setFrameworkComponentOptions,} = props;
  const { frameworkComponentsPreFilter,} = props;
  const { setFrameworkComponentsPreFilter ,} = props;
  const { updateFrameworkComponents } = props;
  const { findMatchingComponentIndex } = props;
  const { getSelectedComponent } = props; 
  const { selected,} = props;
  const { setSelected } = props;
  const { okToUpdate } = props;

  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("topic");

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idToUpdate, setIdToUpdate] = useState();
  const [filterOn, setFilterOn] = useState("topic");
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openComponentEditPopup, setOpenComponentEditPopup] = useState(false);
  const [openComponentSelectListPopup, setOpenComponentSelectListPopup] = useState(false);

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


  const moveComponentUp = () => {
    var moveIndex = -1;
    let newFrameworkComponents = [];
    console.log("FrameworkComponentListing - moveComponentUp - selected = ", selected);
    for (var i = 0; i < selected.length; i++) {
      moveIndex = findMatchingComponentIndex(selected[i])
      console.log("FrameworkComponentListing - moveComponentUp - moveIndex = ",moveIndex );
      if (moveIndex > 0 && moveIndex < frameworkComponents.length) 
      {
        console.log("FrameworkComponentListing - moveComponentUp - frameworkComponents[moveIndex] = ", frameworkComponents[moveIndex]);
        const temp1 = frameworkComponents[moveIndex];
        const temp2 = frameworkComponents[moveIndex-1];
        newFrameworkComponents = [...frameworkComponents.slice(0, moveIndex-1),
           temp1,
           temp2,
          ...frameworkComponents.slice(moveIndex + 1), // everything after current post
        ];
      } else
      {
        return
      }
    }
    console.log("FrameworkComponentListing - moveComponentUp - newFrameworkComponents = ", newFrameworkComponents)
    reNumberSequenceNo(newFrameworkComponents);
  };

  const moveComponentDown = () => {
    var moveIndex = -1;
    let newFrameworkComponents = [];
    console.log("FrameworkComponentListing - moveComponentUp - selected = ", selected);
    for (var i = 0; i < selected.length; i++) {
      moveIndex = findMatchingComponentIndex(selected[i])
      console.log("FrameworkComponentListing - moveComponentUp - moveIndex = ",moveIndex );
      if (moveIndex >= 0 && moveIndex < frameworkComponents.length-1) 
      {
        console.log("FrameworkComponentListing - moveComponentUp - frameworkComponents[moveIndex] = ", frameworkComponents[moveIndex]);
        const temp1 = frameworkComponents[moveIndex+1];
        const temp2 = frameworkComponents[moveIndex];
        newFrameworkComponents = [...frameworkComponents.slice(0, moveIndex),
          temp1,
          temp2,
         ...frameworkComponents.slice(moveIndex + 2), // everything after current post
       ];
      }else
      {
        return
      }
    }
    console.log("FrameworkComponentListing - moveComponentUp - newFrameworkComponents = ", newFrameworkComponents)
    reNumberSequenceNo(newFrameworkComponents);
  };

  function deleteSelectedRecords ()  
  {
    var deleteIndex = -1;
    let newFrameworkComponents = [];
    console.log("FrameworkComponentListing - moveComponentUp - frameworkComponents.length = ", frameworkComponents.length);
    console.log("FrameworkComponentListing - moveComponentUp - selected = ", selected);
    deleteIndex = findMatchingComponentIndex(selected[0])
    console.log("FrameworkComponentListing - moveComponentUp - deleteIndex = ",deleteIndex );
    if (deleteIndex >= 0 && deleteIndex < frameworkComponents.length) 
    {
      console.log("FrameworkComponentListing - moveComponentUp - frameworkComponents[deleteIndex] = ", frameworkComponents[deleteIndex]);
      newFrameworkComponents = [...frameworkComponents.slice(0, deleteIndex),
        ...frameworkComponents.slice(deleteIndex + 1), 
      ];
    }
    console.log("FrameworkComponentListing - moveComponentUp - newFrameworkComponents = ", newFrameworkComponents)
    reNumberSequenceNo(newFrameworkComponents);
    setSelected([]);

  }

  const setSelectedRecord = (id) =>
  {
    const componentToUpdate = getSelectedComponent(id)
    setRecordForEdit(componentToUpdate);
  }

  const reNumberSequenceNo = (arrayToReNumber) => {
    for (let i = 0; i < arrayToReNumber.length; i++) {
      console.log("FrameworkComponentListing - reNumberSequenceNo - arrayToReNumber[i] = ", arrayToReNumber[i]);
      arrayToReNumber[i].sequenceNo = i+1;
    }
    setFrameworkComponents(arrayToReNumber);
    setFrameworkComponentsPreFilter(arrayToReNumber)
    setFormValues({...formValues, modified: true})
  }


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = frameworkComponents.map((n) => n.constructId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    console.log("FrameworkComponentListing - handleClick -id = ",id );
    console.log("FrameworkComponentListing - handleClick - selectedIndex = ",selectedIndex );

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
    Math.min(rowsPerPage, frameworkComponents.length - page * rowsPerPage);

  useEffect(() => {
    console.log(
      "FrameworkComponentListing - Inside handleClick UseEffect for selected = ",
      selected
    );
    console.log(
      "FrameworkComponentListing - Inside handleClick UseEffect for newSelected selected.length = ",
      selected.length
    );
    console.log(
      "FrameworkComponentListing - Inside handleClick UseEffect for newSelected  selected[0] = ",
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
      "FrameworkComponentListing - Inside useEffect for OrderBY UseEffect for idToUpdate = ",
      idToUpdate
    );
  }, [idToUpdate]);

  useEffect(() => {
    console.log(
      "FrameworkComponentListing - Inside useEffect for OrderBY UseEffect for orderBy = ",
      orderBy
    );
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
      console.log(
        "FrameworkComponentListing - Inside useEffect for OrderBY UseEffect for filterOn set but is async= ",
        filterOn
      );
    }
  }, [orderBy]);

  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    saveComponentListing();
    console.log(
      "FrameworkComponentListing - useEffect for change to frameworkComponents = ",frameworkComponents);
      return function cleanup() {
        abortController.abort();
      };
  }, [frameworkComponents]);

  const handleRequestFilter = (event) => {
    console.log(
      "FrameworkComponentListing - Inside handleRequestFilter event.target.value = ",
      event.target.value
    );
    console.log(
      "FrameworkComponentListing - Inside handleRequestFilter filter on = ",
      filterOn
    );

    if (frameworkComponentsPreFilter.length > 0) {
      const newFrameworkComponents = frameworkComponentsPreFilter.filter(
        (frameworkComponent) => {
          return frameworkComponent[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );

      console.log(
        "FrameworkComponentListing - Inside handleRequestFilter newFrameworkComponents = ",
        newFrameworkComponents
      );
      setFrameworkComponents(newFrameworkComponents);
    }
    setPage(0);
  };


  const saveComponentListing = () => {
    setFormValues({ ...formValues,
                    includeConstructs:frameworkComponents,})
    console.log(
      "FrameworkComponentListing - saveComponentListing for frameworkComponents = ",
      frameworkComponents
    );
    setSelected([]);
  }

  const handleRequestDelete = () => {
    console.log(
      "FrameworkComponentListing - Inside handleRequestDelete + before update confirmDialog",
      confirmDialog
    );

    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log(
      "FrameworkComponentListing - Inside handleRequestDelete + afterdate confirmDialog",
      confirmDialog
    );
    console.log(
      "FrameworkComponentListing - Inside handleRequestDelete selected = ",
      selected
    );
    deleteSelectedRecords()
    setFormValues({...formValues, modified: true})
    setSelected([]);
  }

  
const handleSave = (e) => {
e.preventDefault()
console.log("FrameworkComponentListing - handleSave - start");
console.log("FrameworkComponentListing - handleSave - start - formValues.includeConstructs", formValues.includeConstructs);
if (formValues.includeConstructs.length === 0)
  {
    console.log("FrameworkComponentListing - handleSave - Should show error if no components/includeConstructs");
    setFormValues({
      ...formValues,
      isError: true,
      errorMessage:
      "Error alert!!! You must have include at least one Component!",
    });
  } else
  {
    console.log("FrameworkComponentListing - handleSave - formValues.modified", formValues.modified);
    if (formValues.modified)
    {
      console.log("FrameworkComponentListing - handleSave - validate()", validate());
      if (validate()) {
        SaveEntries()
      }  
    } else
    {
      setNotify({
        isOpen: true,
        message: "No changes to save!",
        type: "warning",
      });
    }
  }
}

const handleAddNew = (e) => {
  e.preventDefault()
  console.log("FrameworkComponentListing - handleAddNew - Start")
  console.log("FrameworkComponentListing - handleAddNew - formValues.modified = ", formValues.modified)
  if (formValues.modified)
  {
    setConfirmDialog({
      isOpen: true,
      title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
      subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
      onConfirm: () => {
        console.log("FrameworkComponentListing - right before validate")
        if (validate()) {
          console.log("FrameworkComponentListing - After validate right before save")
          //addNewFramework(); 
          prepareFormValues();
          setSelected([]);
        }
      }
    }); 
  } else
  {
    console.log("FrameworkComponentListing - in else when modified not true")
    //addNewFramework(); 
    prepareFormValues();
    setSelected([]);
  }
}


const handleExit = (e)=> {
  e.preventDefault()
  if (formValues.modified)
  {
    setConfirmDialog({
      isOpen: true,
      title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
      subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before exiting",
      onConfirm: () => {
        setOpenPopup(false);
        setSelected([]);
        setFormValues({ ...formValues, 
          modified: false,
          isError: false, 
          errorMessage:""});
      },
    });
  } else
  {
    setOpenPopup(false);
    setSelected([]);
  }
}

const handleCancel = (e) => {
  e.preventDefault()
  if (formValues.modified)
  {
    setConfirmDialog({
      isOpen: true,
      title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
      subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before exiting",
      onConfirm: () => {
        setOpenPopup(false);
        setSelected([]);
        setFormValues({ ...formValues, 
          modified: false,
          isError: false, 
          errorMessage:""});
      },
    });
  } else
  {
    setOpenPopup(false);
    setSelected([]);
  }
}


  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedComponentListingTableToolBar          
            filterOn={filterOn}
            handleRequestDelete={handleRequestDelete}
            handleSave={handleSave}
            handleAddNew = {handleAddNew}
            handleExit={handleExit}
            handleCancel={handleCancel}
            handleRequestFilter={handleRequestFilter}
            idToUpdate={idToUpdate}          
            numSelected={selected.length}
            setSelected={setSelected}
            setConfirmDialog ={setConfirmDialog}
            setOpenPopup ={setOpenPopup}
            setOpenSelectPopup ={setOpenComponentSelectListPopup}
            setOpenEditPopup ={setOpenComponentEditPopup}
            saveComponentListing = {saveComponentListing}
            moveComponentUp ={moveComponentUp}
            moveComponentDown ={moveComponentDown}         
            setSelectedRecord={setSelectedRecord}
            okToUpdate={okToUpdate}
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
                rowCount={frameworkComponents.length}
              />
              <TableBody>
                {stableSort(frameworkComponents, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((frameworkComponent, index) => {
                    const isItemSelected = isSelected(frameworkComponent.constructId);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return frameworkComponents.length > 0 ? (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(frameworkComponent.constructId)
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
                            {!frameworkComponent.markDeleted
                              ? frameworkComponent.constructDetail
                              : "DELETED ENTRY!-" + frameworkComponent.constructDetail}
                          </TableCell>
                          <TableCell align="right">
                            {frameworkComponent.sequenceNo}
                          </TableCell>
                          <TableCell align="right">
                            {frameworkComponent.subType}
                          </TableCell>
                          <TableCell align="right">
                            {frameworkComponent.constructPrimaryColumn}
                          </TableCell>
                          <TableCell align="right">
                            {frameworkComponent.constructOptionsSource}
                          </TableCell>                       
                          <TableCell align="right">
                            {frameworkComponent.constructResponseFormat}
                          </TableCell>  
                        </TableRow>
                        </Fragment>
                    ) : (
                      <div> No Framework Components </div>
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
            count={frameworkComponents.length}
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
          title="Edit Component"
          openPopup={openComponentEditPopup}
          setOpenPopup={setOpenComponentEditPopup}
      >
          <FrameworkComponentEdit
              recordForEdit={recordForEdit}
              updateFrameworkComponents={updateFrameworkComponents}
              setSelected={setSelected}
              setOpenEditPopup={setOpenComponentEditPopup}
          />
      </Popup>

      <Popup
          title="Select Component(s) to add to Framework"
          openPopup={openComponentSelectListPopup}
          setOpenPopup={setOpenComponentSelectListPopup}
      >
          <FrameworkComponentSelectionContainer
              setOpenPopup={setOpenComponentSelectListPopup}
              frameworkComponents = {frameworkComponents}
              setFrameworkComponents = {setFrameworkComponents}
              frameworkComponentOptions ={frameworkComponentOptions}
              formValues={formValues}
              setFormValues={setFormValues}
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
export default FrameworkComponentListing;