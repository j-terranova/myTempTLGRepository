import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#f57c00" };
  else return { color: "#fffde7" };
};
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path))
    return { color: "#fffde7", backgroundColor: "#f57c00", marginRight: 10 };
  else
    return {
      color: "#616161",
      backgroundColor: "#fffde7",
      border: "1px solid #f57c00",
      marginRight: 10,
    };
};


export default function MenuDropDown(props) {
  const {history} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
      <>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{ color: "#fffde7"}}
        >
          Setup
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem 
                      component={Link} to="/constructs" 
                      onClick={handleClose} 
                      onSelect={() => history.push("/constructs")}
                      //style={isActive(history, "/constructStatementContainer")}
                      >Components</MenuItem>
                    <MenuItem
                      component={Link} to="/frameworks" 
                      onClick={handleClose} 
                      onSelect={() => history.push("/frameworks")}
                      >Frameworks</MenuItem>
                    <MenuItem                       
                      component={Link} to="/constructStatementContainer" 
                      onClick={handleClose} 
                      onSelect={() => history.push("/my/route")}
                      >Games</MenuItem>
                    <MenuItem                       
                      component={Link} to="/constructStatementContainer" 
                      onClick={handleClose} 
                      onSelect={() => history.push("/my/route")}
                      >Reports</MenuItem>
                    <MenuItem                       
                      component={Link} to="/groupAccessContainer" 
                      onClick={handleClose} 
                      onSelect={() => history.push("/my/route")}
                      >Groups</MenuItem>
                    <MenuItem                       
                      component={Link} to="/imageContainer" 
                      onClick={handleClose} 
                      onSelect={() => history.push("/my/route")}
                      >Images</MenuItem>
                    <MenuItem                       
                      component={Link} to="/affiliationContainer" 
                      onClick={handleClose} 
                      onSelect={() => history.push("/my/route")}
                      >Affiliations</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </>
  );
}
