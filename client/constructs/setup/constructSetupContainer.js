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
import auth from "./../../auth/auth-helper";
import ConstructSetupRouter from "./constructSetupRouter";
import ConstructSetupMenu from "./constructSetupMenu";
import {  useRouteMatch} from "react-router-dom";
import { readById as readUserPreferences } from "./api-constructPreferences.js";

import { useCriteriaDispatch } from "./../../contexts/CriteriaContext";
import { useAccessDispatch } from "./../../contexts/AccessContext";
import { useConstructPreferences, useConstructPreferencesDispatch } from "./../../contexts/ConstructPreferencesContext";

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

export default function ConstructSetupContainer() {
  const classes = useStyles();

  const constructPreferences = useConstructPreferences();
  const constructPreferencesDispatch = useConstructPreferencesDispatch();
  const criteriaDispatch = useCriteriaDispatch();
  const accessDispatch = useAccessDispatch();
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;

  let { path, url } = useRouteMatch();
  console.log ("ConstructSetupRouter - path = ", path);
  console.log ("ConstructSetupRouter - url = ", url);
  const setupPath = path + "/setup";
  console.log ("ConstructSetupRouter - setupPath = ", setupPath);
  console.log ("ConstructSetupRouter - useRouteMatch() = ", useRouteMatch());

  const GetUserPreferences = () => {
    console.log("constructSetupContainer - GetUserPreferences -  Start  ");
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
          "constructSetupContainer - GetUserPreferences - No Data so dispatch, Check Criteria - constructPreferences =",constructPreferences
        );
        setEmptyConstructPreferences();
      } else {
        if (data.error) {
          setEmptyConstructPreferences();
          console.log(
            "constructSetupContainer - GetUserPreferences - No Data so error is returned constructPreferences =: ",
            constructPreferences
          );
          console.log(
            "constructSetupContainer - GetUserPreferences - No Data so error is returned data.error =: ",
            data.error
          );
        } else {
          console.log(
            "constructSetupContainer - GetUserPreferences - Right after data is returned constructPreferences data =: ",
            data
          );
          if (data.group_id == undefined || data.group_id == null)
          {
            data.group_id = "";
          }
          constructPreferencesDispatch({
            type: "SET_CONSTRUCTPREFERENCES",
            constructPreferences: data,
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
  
  const setEmptyConstructPreferences = () => {
    let emptyConstructPreferences =  {
      user_id: "",
      topic: "",
      myClass: "",
      category:"",
      subject: "",
      type: "Component",
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
    constructPreferencesDispatch({
      type: "SET_CONSTRUCTPREFERENCES",
      constructPreferences: emptyConstructPreferences,
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
      console.log ("constructSetupContainer - useEffect - constructPreferences = ", constructPreferences);
    return function cleanup() {
      abortController.abort();
      };
    }, [constructPreferences]);

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
       <ConstructSetupMenu
           constructURL={url}
       />
      </Drawer> 
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          <ConstructSetupRouter/>

          {/*(url === "/constructs") && <Container direction="row" maxWidth="lg" className={classes.container}>

            <Grid
              container
              xs={6}
              direction="column"
              style={{ border: "solid 5px", height: "50%" }}
            >
              <Grid item xs style={{ border: "solid 1px", backgroundColor: "yellow" }}>
                Section Top Left
              </Grid>
              <Grid item xs style={{ border: "solid 1px", backgroundColor: "yellow" }}>
                Section Bottom Left
              </Grid>
            </Grid>

            <Grid
              container
              xs={6}
              direction="column"
              style={{ border: "solid 5px", height: "50%" }}
            >
              <Grid item xs style={{ border: "solid 1px", backgroundColor: "yellow" }}>
                Section Top Right
              </Grid>
              <Grid item xs style={{ border: "solid 1px", backgroundColor: "yellow" }}>
                Section Bottom Right
              </Grid>
            </Grid>
          </Container>*/}
          </Grid>
        </Container>
    </div>
    </>
  );
}
