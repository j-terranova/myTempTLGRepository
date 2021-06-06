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

import Notification from "../../components/shared/Notification";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import EnhancedTableHead from "../../components/shared/EnhancedTableHead";
import {EnhancedImageSelectionTableToolbar} from "../../components/shared/EnhancedImageSelectionTableToolbar";
import ImageDisplayGridContainer from "./imageDisplayGridContainer";

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

export default function ImageSelectionListing (props) {
  const {
    selected,
    setSelected,
    imageSelectionListing,
    setImageSelectionListing,
    imageSelectionListingPreFilter,
    readById,
    page,
    setPage,
    listingTitle,
    setOpenImageSelectionPopup,
    formValues,
    setFormValues,
    } = props;
  const classes = useStyles();
  const [imageDetailListing, setImageDetailListing] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("topic");
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [idToView, setIdToView] = useState();
  const [filterOn, setFilterOn] = useState("topic");
  const [openImageDisplayGridPopup, setOpenImageDisplayGridPopup] = useState(false);
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

  const prepareImageDetailListing = () =>
  {
    console.log("imageSelectionListing - prepareImageDetailListing - Start" );

    const abortController = new AbortController();
    const signal = abortController.signal;
    let imageListing = [];
    let imageDetail = {
      topic: "",
      description: "",
      imageBuffer: "",
      id: "",
    };
    console.log("imageSelectionListing - prepareImageDetailListing - before loop - selected = ",selected );
    for (let i=0; i< selected.length; i++)
    {
      readById(
        { userId: userId, },
        {
          id: selected[i],
        },
        {
          t: jwt.token,
        },
        signal
      ).then((data) => {
        if (!data) {
          console.log(
            "imageSelectionListing - getSelectedItem -readById - No Data Found!!!!"
          );
        } else {
          if (data.error) {
            console.log(
              "imageSelectionListing - getSelectedItem -readById - Error!!!!", data.error
            );
          } else {
            console.log("imageSelectionListing - getSelectedItem - after  ReadById" );
            console.log(
              "imageSelectionListing - getSelectedItem  data = ",data );
            let imageBase64 = data.imageBase64;
            let imageBinary =  Buffer(data.imageBase64, 'base64');
            let imageType = data.imageType;
            let imageStr = "data:" + imageType + ";base64," + imageBase64;
        
            imageDetail = {
              topic: data.topic,
              description: data.description,
              imageStr: imageStr,
              id: data._id,
            };
            console.log("imageSelectionListing - imageDetail = ", imageDetail);
            imageListing.push(imageDetail)
            console.log("imageSelectionListing - imageListing = ", imageListing);
            if (i === selected.length -1)
            {
            console.log("imageSelectionListing - setImageDetailListing, ", imageListing);
              setImageDetailListing(imageListing)
              setOpenImageDisplayGridPopup(true);
            }
          } 
        }
      });    
    }
  }

  const handleRequestViewSelected = () => {
    prepareImageDetailListing();
  }

  const handleRequestSelectImage = (id) => {
    setFormValues({ ...formValues,
                    image_id: id,
                    imageFileName: "",
                    modified: true,
                    })
    setOpenImageSelectionPopup(false);
  }
  
   const handleRequestFilter = (event) => {
    if (imageSelectionListingPreFilter.length > 0) {
      const newImageSelectionListing = imageSelectionListingPreFilter.filter(
        (imageSelectionLineItem) => {
          return imageSelectionLineItem[filterOn]
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      );
      setImageSelectionListing(newImageSelectionListing);
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
      const newSelecteds = imageSelectionListing.map((n) => n._id);
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
    Math.min(rowsPerPage, imageSelectionListing.length - page * rowsPerPage);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  useEffect(() => {
    console.log(
      "ImageSelectionListing - Inside handleClick UseEffect for selected = ",
      selected
    );
     if (selected.length === 1) {
       setIdToView(selected[0]);
     } else {
       setIdToView("");
     }
  }, [selected]);

  useEffect(() => {
    console.log(
      "ImageSelectionListing - Inside useEffect for OrderBY UseEffect for idToView = ",
      idToView
    );
  }, [idToView]);

  useEffect(() => {
    if (orderBy != undefined && orderBy.length > 0) {
      setFilterOn(orderBy);
    }
  }, [orderBy]);

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedImageSelectionTableToolbar
            selected={selected}          
            filterOn={filterOn}
            handleRequestFilter={handleRequestFilter}
            handleRequestViewSelected={handleRequestViewSelected}  
            handleRequestSelectImage={handleRequestSelectImage}    
            numSelected={selected.length}
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
                rowCount={imageSelectionListing.length}
              />
              <TableBody>
                {stableSort(imageSelectionListing, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((imageSelectionLineItem, index) => {
                    const isItemSelected = isSelected(imageSelectionLineItem._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return imageSelectionListing.length > 0 ? (
                      <Fragment key={index}>
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(imageSelectionLineItem._id)
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
                            {!imageSelectionLineItem.markDeleted
                              ? imageSelectionLineItem.topic
                              : "DELETED ENTRY!-" + imageSelectionLineItem.topic}
                          </TableCell>
                          <TableCell align="left">
                            {imageSelectionLineItem.description}
                          </TableCell>
                          <TableCell align="left">
                            {imageSelectionLineItem.imageSelectionDetail}
                          </TableCell>
                          <TableCell align="left">
                            {/*imageSelectionLineItem.imageSelectionLineItem*/}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ) : (
                      <div> No ImageSelection Line Items </div>
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
            count={imageSelectionListing.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <Popup
          title="Image Options"
          openPopup={openImageDisplayGridPopup}
          setOpenPopup={setOpenImageDisplayGridPopup}
      >
          <ImageDisplayGridContainer
              setOpenImageDisplayGridPopup={setOpenImageDisplayGridPopup}
              imageDetailListing={imageDetailListing}
              handleRequestSelectImage={handleRequestSelectImage}
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
