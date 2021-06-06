
import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Controls from "../../controls/Controls";


//  ************Start of EnhancedTableToolbar*****************

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 25%",
    },
  }));
  
  export const EnhancedCRUDTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { filterOn } = props;
    const { handleRequestDelete} =props;
    const { handleRequestFilter}=props;
    const { idToUpdate } = props;
    const { numSelected } = props;
    const { handleRequestSave } = props;
    const { setConfirmDialog } = props;
    const { setOpenAddPopup} = props;
    const { setOpenExitPopup} = props;
    const { setOpenUpdatePopup} = props;
    const { setRecordForEdit} = props;
    const { setSelectedRecord} = props;

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            //component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            //component="div"
          >
            Listing
          </Typography>
        )}
         {(handleRequestSave != undefined) && (handleRequestSave != null) &&(<Controls.Button
              text="Save"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                setRecordForEdit(null);
                handleRequestSave();
                 }}
          />)}
          <Controls.Button
              text="Add New"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                setRecordForEdit(null);
                setOpenAddPopup(true); 
                 }}
          />
          <Controls.Button
              text="Exit"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                setRecordForEdit(null);
                setOpenExitPopup(false); 
                 }}
          />
        {numSelected === 1 && (
          <div>
            <Controls.Button
              text = "Update"
              color="secondary"
              variant="contained"
              onClick= {() => {
                setSelectedRecord (idToUpdate);
                setOpenUpdatePopup(true); 
              }}
              className={classes.submit}
            />
          </div>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title=  "Delete">
            <IconButton
              aria-label="delete"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "If confirmed, this option will delete the entry",
                  subTitle: "Confirm Delete?",
                  onConfirm: () => {
                    handleRequestDelete();
                  },
                });
              }}
            >
              Delete
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          //<Tooltip title="Filter">
          <div>
            <Controls.Input
                type ="text"
                name="search"
                label={"Search: " + filterOn}
                placeholder= {"Search:" + filterOn}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleRequestFilter}
            />
          </div>
        )}
      </Toolbar>
    );
  };
  
  EnhancedCRUDTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  //  ************End of EnhancedCRUDTableToolbar*****************
  