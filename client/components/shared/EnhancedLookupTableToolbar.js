
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
  
  export const EnhancedLookupTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { filterOn } = props;
    const { handleRequestFilter}=props;
    const { numSelected } = props;
    const { setOpenPopup} = props;
    const { addSelectedUsers} = props;
    
    const handleAddClick = () => {
      setOpenPopup(false);
      addSelectedUsers();
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
            Listing
          </Typography>
        )}
          <Controls.Button
              text="Exit"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                setOpenPopup(false); 
                 }}
          />
        {numSelected > 0 && (
          <div>
            <Controls.Button
              text = "Add Selected to Group"
              color="secondary"
              variant="contained"              
              className={classes.submit}
              onClick= {handleAddClick}
            />
          </div>
        )}
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
      </Toolbar>
    );
  };
  
  EnhancedLookupTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  //  ************End of EnhancedLookupTableToolbar*****************
  