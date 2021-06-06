import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import auth from "../../auth/auth-helper";
import GamerSetupRouter from "./gamerSetupRouter";
import GamerSetupMenu from "./gamerSetupMenu";
import {useRouteMatch} from "react-router-dom";
import { readById as readUserPreferences } from "./api-gamerPreferences.js";

import { useCriteriaDispatch } from "../../contexts/CriteriaContext";
import { useAccessDispatch } from "../../contexts/AccessContext";
import { useGamerPreferences, useGamerPreferencesDispatch } from "../../contexts/GamerPreferencesContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 2px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 4,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function GamerSetupContainer() {
  const classes = useStyles();
  
  const gamerPreferences = useGamerPreferences();
  const gamerPreferencesDispatch = useGamerPreferencesDispatch();
  const criteriaDispatch = useCriteriaDispatch();
  const accessDispatch = useAccessDispatch();
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;

  let { path, url } = useRouteMatch();
  console.log ("GamerSetupRouter - path = ", path);
  console.log ("GamerSetupRouter - url = ", url);
  const setupPath = path + "/setup";
  console.log ("GamerSetupRouter - setupPath = ", setupPath);
  console.log ("GamerSetupRouter - useRouteMatch() = ", useRouteMatch());

  const GetUserPreferences = () => {
    console.log("gamerSetupContainer - GetUserPreferences -  Start  ");
    const abortController = new AbortController();
    const signal = abortController.signal;
    readUserPreferences(
      {
        userId: userId,
      },
      {
        user_id: userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "gamerSetupContainer - GetUserPreferences - No Data so dispatch, Check Criteria - gamerPreferences =", gamerPreferences
        );
        setEmptyGamerPreferences();
      } else {
        if (data.error) {
          setEmptyGamerPreferences();
          console.log(
            "gamerSetupContainer - GetUserPreferences - No Data so error is returned gamerPreferences =: ",
            gamerPreferences
          );
          console.log(
            "gamerSetupContainer - GetUserPreferences - No Data so error is returned data.error =: ",
            data.error
          );
        } else {
          console.log(
            "gamerSetupContainer - GetUserPreferences - Right after data is returned gamerPreferences data =: ",
            data
          );
          if (data.group_id == undefined || data.group_id == null)
          {
            data.group_id = "";
          }
          gamerPreferencesDispatch({
            type: "SET_GAMERPREFERENCES",
            gamerPreferences: data,
          });
          criteriaDispatch({
            type: "SET_CRITERIAFROMCURRENTITEM",
            currentSourceOfCriteria: data,
          });
          accessDispatch({
            type: "SET_ACCESSFROMCURRENTITEM",
            currentSourceOfAccess: data,
          });
        }
      }
    });
  }
  
  const setEmptyGamerPreferences = () => {
    let emptyConstructPreferences =  {
      user_id: "",
      topic: "",
      myClass: "",
      category:"",
      subject: "",
      type: "Game",
      subType: "Preferences",
      difficultyLevel: 27,
      ageRange: 6,
      group_id: "",
      keepPrivate: true,
      rowsPerPage: 10,
      themeBrightness: "main",
      primaryButtonColor: "blue",
      primaryBackgroundColor: "white",  
      createDate:  Date.now(),
      updatedBy: "",
      updateDate:  Date.now(),
      _v: "0",
      _id: "",
    }
    gamerPreferencesDispatch({
      type: "SET_GAMERPREFERENCES",
      gamerPreferences: emptyGamerPreferences,
    });
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    GetUserPreferences();
    return function cleanup() {
    abortController.abort();
    };
  }, []);
  
    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      console.log ("gamerSetupContainer - useEffect - gamerPreferences = ", gamerPreferences);
    return function cleanup() {
      abortController.abort();
      };
    }, [gamerPreferences]);

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
     <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="subtitle1"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Use left side menu to select Component Type you would like to Add or Update
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        style={{  height: 'calc(100vh - 127px)' }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
       <GamerSetupMenu
           gameURL={url}
       />
      </Drawer> 
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          <GamerSetupRouter/>

          </Grid>
        </Container>
    </div>
    </>
  );
}
