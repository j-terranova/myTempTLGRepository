
import React, { useEffect } from "react";
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
  
  export const EnhancedTableToolbar = (props) => {
    const { filterOn } = props;
    const { handleRequestDelete} =props;
    const { handleRequestFilter}=props;
    const { idToUpdate } = props;
    const { numSelected } = props;
    const { setConfirmDialog } = props;
    const { setOpenPopup} = props;
    const { setOpenImportPopup} = props;
    const { getSelectedItem} = props;
    const { prepareFormValues} = props; 
    const { listingTitle } = props; 
    const { okToUpdate } = props;   
    const { handleRequestImport } = props;

    const classes = useToolbarStyles();
      const handleRequestUpdate = () => {
      console.log("EnhancedTableToolBar - Inside handleRequestUpdate before getSelectedItem  idToUpdate = ", idToUpdate );
      getSelectedItem (idToUpdate)
      setOpenPopup(true);
      }

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
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
          >
            {listingTitle}
          </Typography>
        )}
        <Controls.Button
              text="Import"  
              color="default"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                console.log ("EnhancedTableToolBar for handleRequestImport to set popup for Import")
                handleRequestImport(); 
                 }}
              disabled  = {handleRequestImport?false:true}
          />
          <Controls.Button
              text="Add New"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                prepareFormValues(null);
                setOpenPopup(true); 
                 }}
          />
        {numSelected === 1 && (
          <div>
            <Controls.Button
              text = {okToUpdate? "Update" : "View"}
              color="secondary"
              variant="contained"
              className={classes.submit}
              onClick= {() => {
                handleRequestUpdate();
              }}
            />
          </div>
        )}
  
        {(numSelected > 0 && okToUpdate) ? (
          <Tooltip title=  "Toggle Delete">
            <IconButton
              aria-label="delete"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "If confirmed, this option will mark delete or unmark delete the selected record",
                  subTitle: "An after hours process will remove records marked DELETED if there are no dependencies",
                  onConfirm: () => {
                    handleRequestDelete();
                  },
                });
              }}
            >
              Toggle Delete
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
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  //  ************End of EnhancedTableToolbar*****************
  