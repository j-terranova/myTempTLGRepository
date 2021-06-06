import React from "react";
import { useState } from "react";
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
import TeacherSetupRouter from "./teacherSetupRouter";
import TeacherSetupMenu from "./teacherSetupMenu";
import {useRouteMatch} from "react-router-dom";

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

export default function TeacherSetupContainer() {
  const classes = useStyles();
  
  let { path, url } = useRouteMatch();
  console.log ("TeacherSetupRouter - path = ", path);
  console.log ("TeacherSetupRouter - url = ", url);
  const setupPath = path + "/setup";
  console.log ("TeacherSetupRouter - setupPath = ", setupPath);
  console.log ("TeacherSetupRouter - useRouteMatch() = ", useRouteMatch());

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
            Use left side menu to select Learning Type you would like to Add or Update
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
       <TeacherSetupMenu
           teacherURL={url}
       />
      </Drawer> 
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
          <TeacherSetupRouter/>

          {/*(url === "/teachers") && <Container direction="row" maxWidth="lg" className={classes.container}>

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
