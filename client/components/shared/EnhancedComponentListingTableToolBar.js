
import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from '@material-ui/icons/Add';
import Controls from "../../controls/Controls";


//  ************Start of EnhancedComponentListingTableToolBar*****************

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
      flexGrow: "1",
    },
  }));
  
  export const EnhancedComponentListingTableToolBar = (props) => {
    const classes = useToolbarStyles();
    const { filterOn } = props;
    const { handleRequestDelete} =props;
    const { handleSave} =props;
    const { handleAddNew} =props;
    const { handleExit} =props;
    const { handleCancel} =props;
    const { handleRequestFilter}=props;
    const { idToUpdate } = props;
    const { numSelected } = props;
    const { setSelected } = props;
    const { setConfirmDialog } = props;
    const { setOpenPopup} = props;
    const { setOpenSelectPopup} = props;
    const {setOpenEditPopup} = props;
    const {saveComponentListing} = props;
    const { moveComponentUp} = props;
    const { moveComponentDown} = props;
    const { setSelectedRecord} = props;
    const { okToUpdate } = props;
    
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
          
        })}
      >
        {numSelected > 0 ? (
          <>
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              //component="div"
            >
              {numSelected} selected
            </Typography>
          </>
        ) : (
          <>
          <Controls.Button
            text="Components" 
            startIcon={<AddIcon />} 
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={() => { 
            setOpenSelectPopup(true); 
              }}
            disabled = {okToUpdate?false:true}
          />

        <Controls.Button
          text="Save"  
          color="primary"
          variant="contained"
          className={classes.submit}
          onClick={handleSave}
          disabled = {okToUpdate?false:true}
        />
      <Controls.Button
        text="Exit"  
        color="primary"
        variant="contained"
        className={classes.submit}
        onClick={handleExit}
        disabled = {okToUpdate?false:true}
        />
        </>
        )}
                {numSelected >= 2 && (
          <>
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              //component="div"
            >
              No functions available with more than 1 component selected
            </Typography>
          </>
        )}

        {numSelected === 1 && (
          <div>

            <Controls.Button
              text="Move Up"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                moveComponentUp(); 
              }}
              disabled = {okToUpdate?false:true}
            />
            <Controls.Button
              text="Move Down"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                moveComponentDown(); 
              }}
              disabled = {okToUpdate?false:true}
            />
            <Controls.Button
              text = "Update"
              color="secondary"
              variant="contained"
              onClick= {() => {
                setSelectedRecord (idToUpdate);
                setOpenEditPopup(true); 
              }}
              className={classes.submit}
              disabled = {okToUpdate?false:true}
            />

            <Controls.Button
              text = "Delete"
              color="secondary"
              variant="contained"
              onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "If confirmed, the selected record(s) will be deleted",
                    subTitle: "Are you sure you want to delete this component?",
                    onConfirm: () => {
                      handleRequestDelete();
                    },
                  });
                }}
            />
            <Controls.Button
              text="Cancel"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={handleCancel}
            />
          </div>
        )}
  
        {numSelected === 0 && (       
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
              <Controls.Button
                text="Add New"  
                color="primary"
                variant="contained"
                className={classes.submit}
                onClick={handleAddNew}
              />
          </div>
        )}
      </Toolbar>
    );
  };
  
  EnhancedComponentListingTableToolBar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  //  ************End of EnhancedComponentListingTableToolBar*****************
  