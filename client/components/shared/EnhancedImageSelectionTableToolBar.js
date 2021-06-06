
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


//  ************Start of EnhancedComponentSelectTableToolBar*****************

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
  
  export const EnhancedImageSelectionTableToolbar = (props) => {
    const { selected } = props;
    const { filterOn } = props;
    const { handleRequestFilter}=props;
    const { handleRequestViewSelected } = props;
    const { handleRequestSelectImage } = props;
    const { numSelected } = props;

    const classes = useToolbarStyles();
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <div>
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            //component="div"
          >
            {numSelected} selected
          </Typography>

              <Controls.Button
              text="View Selected Image(s)"  
              color="primary"
              variant="contained"
              className={classes.submit}
              onClick={() => { 
                handleRequestViewSelected(); 
                  }}
            />
            </div>
        ) : (
          <>
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              //component="div"
            >
              View and Select Image Desired
            </Typography>

          </>
        )}

<div> 
        {numSelected === 1 && (

            <Controls.Button
              text = "Select"
              color="primary"
              variant="contained"
              onClick= {() => {
                handleRequestSelectImage(selected[0]);
              }}
              className={classes.submit}
            />

            )} 
          {numSelected <= 0 && (

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

          )}
                    </div>
      </Toolbar>
    );
  };
  
  EnhancedImageSelectionTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  //  ************End of EnhancedImageSelectionTableToolbar*****************
  