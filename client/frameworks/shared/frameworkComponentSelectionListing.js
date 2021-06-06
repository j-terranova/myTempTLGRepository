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
import {EnhancedComponentSelectTableToolBar} from "../../components/shared/EnhancedComponentSelectTableToolBar";

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
  { id: "topic", numeric: false, disablePadding: false, label: "Topic" },
  { id: "description", numeric: false, disablePadding: true, label: "Description" },
  { id: "difficultyLevel", numeric: true, disablePadding: false, label: "Level" },
  { id: "subject", numeric: false, disablePadding: false, label: "Subject" },
  //{
  //  id: "description",
  //  numeric: false,
  //  disablePadding: false,
  //  label: "Description",
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
}));

const FrameworkComponentSelectionListing = (props) => {
  const {
    frameworkComponentSelectionListing,
    setFrameworkComponentSelectionListing,
    frameworkComponentSelectionListingPreFilter,
    frameworkComponents,
    setFrameworkComponents,
    selectedComponent,
    frameworkComponentOptions,
    formValues,
    setFormValues,
  } = props;

  const classes = useStyles();
  const [selected, setSelected] = useState([]);

  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("topic");

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterOn, setFilterOn] = useState("topic");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
const addComponentsToFrameWork = () =>  {
  console.log("FrameworkComponentSelectionListing - addComponentsToFrameWork for frameworkComponents = ",
    frameworkComponents
  );
  let currentSeqNo = frameworkComponents.length;
  for (let i = 0; i < selected.length; i++) {
    console.log(selected[i]);
    const indexToSelect = findMatchingIndex(selected[i]);
    console.log("FrameworkComponentSelectionListing - " );
    
    const addComponent = getSelectedComponent(selected[i]);
    console.log("FrameworkComponentSelectionListing - addComponentsToFrameWork- addComponent = ",addComponent);
    if (addComponent != undefined && addComponent != null)
    {
      currentSeqNo=currentSeqNo+1;

      const newComponent = 
      { sequenceNo: currentSeqNo,
        constructDetail: addComponent.topic,
        type: "Component",
        subType: selectedComponent,
        constructPrimaryColumn: frameworkComponentOptions.constructPrimaryColumn,
        constructOptionsSource: frameworkComponentOptions.constructOptionsSource,
        constructNumberOfOptions: frameworkComponentOptions.constructNumberOfOptions,
        constructResponseFormat: frameworkComponentOptions.constructResponseFormat,
        constructColor: frameworkComponentOptions.constructColor,
        constructId: addComponent._id,
       };
       addComponentToList(newComponent);
    }    
  }
  setSelected([]);
  setNotify({
    isOpen: true,
    message: "Components added to the current Framework",
    type: "success",
  });
}

const addComponentToList = (newComponent) => {
  setFrameworkComponents(frameworkComponents => 
    [...frameworkComponents, newComponent])
    setFormValues({ ...formValues,
                    modified: true})
  }

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const getSelectedComponent = (idToSelect) => {
    console.log("frameworkComponentListing - getSelectedComponent idToSelect = ", idToSelect)
    const indexSelected = findMatchingIndex(idToSelect);
    console.log("frameworkComponentListing - getSelectedComponent indexSelected = ", indexSelected)
    if (indexSelected >= 0)
    {
      console.log("frameworkComponentListing - getSelectedComponent frameworkComponentSelectionListing[indexSelected] = ", frameworkComponentSelectionListing[indexSelected])
      return frameworkComponentSelectionListing[indexSelected];
    } else
    { 
      console.log("frameworkComponentListing - getSelectedComponent returning null ")
      return null;
    }
  }

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("FrameworkComponentSelectionListing - search_id = ", search_id);
    for (var i = 0; i < frameworkComponentSelectionListing.length; i++) {
      //console.log(
      //  "FrameworkComponentSelectionListing - frameworkComponentSelectionListing[i]._id = ",
      //  frameworkComponentSelectionListing[i]._id
      //);
      if (frameworkComponentSelectionListing[i]._id == search_id) {
        index = i;
        console.log(
          "FrameworkComponentSelectionListing - _id match found index = ",
          index
        );
        break;
      }
    }
    return index;
  };

  const handleRequestFilter = (event) => {
    console.log(
      "FrameworkComponentSelectionListing - Inside handleRequestFilter event.target.value = ",
      event.target.value
    );
    console.log(
      "FrameworkComponentSelectionListing - Inside handleRequestFilter filter on = ",
      filterOn
    );

    //difficultyLevel
    let newFrameworkComponentSelectList =[];
    if (frameworkComponentSelectionListingPreFilter.length > 0) {
      if (filterOn != "difficultyLevel")
      {
          newFrameworkComponentSelectList = frameworkComponentSelectionListingPreFilter.filter(
          (frameworkComponent) => {
            return frameworkComponent[filterOn]
              .toLowerCase()
              .includes(event.target.value.toLowerCase());
          }
        );
      } else
      {
          newFrameworkComponentSelectList = frameworkComponentSelectionListingPreFilter.filter(
          (frameworkComponent) => {
            return frameworkComponent.difficultyLevel == event.target.value;
          }
        );
      }
      console.log(
        "FrameworkComponentSelectionListing - Inside handleRequestFilter newFrameworkComponentSelectList = ",
       newFrameworkComponentSelectList
      );
      setFrameworkComponentSelectionListing(newFrameworkComponentSelectList);
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
      const newSelecteds = frameworkComponentSelectionListing.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    console.log("FrameworkComponentSelectionListing - handleClick -id = ",id );
    console.log("FrameworkComponentSelectionListing - handleClick - selectedIndex = ",selectedIndex );
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
    console.log("FrameworkComponentSelectionListing - handleClick - setSelected/newSelected = ",newSelected );
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
    Math.min(rowsPerPage, frameworkComponentSelectionListing.length - page * rowsPerPage);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "FrameworkComponentSelectionListing - Inside useEffect for OrderBY UseEffect for orderBy = ",
      orderBy
    );
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
      console.log(
        "FrameworkComponentSelectionListing - Inside useEffect for OrderBY UseEffect for filterOn set but is async= ",
        filterOn
      );
    }
  }, [orderBy]);

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedComponentSelectTableToolBar          
            filterOn={filterOn}
            handleRequestFilter={handleRequestFilter}     
            numSelected={selected.length}
            addComponentsToFrameWork ={addComponentsToFrameWork}
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
                rowCount={frameworkComponentSelectionListing.length}
              />
              <TableBody>
                {stableSort(frameworkComponentSelectionListing, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((frameworkComponentSelection, index) => {
                    const isItemSelected = isSelected(frameworkComponentSelection._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return frameworkComponentSelectionListing.length > 0 ? (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(frameworkComponentSelection._id)
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
                            {!frameworkComponentSelection.markDeleted
                              ? frameworkComponentSelection.topic
                              : "DELETED ENTRY!-" + frameworkComponentSelection.topic}
                          </TableCell>
                          <TableCell align="right">
                            {frameworkComponentSelection.description}
                          </TableCell>
                          <TableCell align="right">
                            {frameworkComponentSelection.difficultyLevel}
                          </TableCell>
                          <TableCell align="right">
                            {frameworkComponentSelection.subject}
                          </TableCell>                       
                        </TableRow>
                      </Fragment>
                    ) : (
                      <div> No Components meet the defined criteria</div>
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
            count={frameworkComponentSelectionListing.length}
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
export default FrameworkComponentSelectionListing;