import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

import { makeStyles } from "@material-ui/core/styles";
import Library from "@material-ui/icons/LocalLibrary";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    outerColumn: {
      borderRight: "1px solid grey",
      borderBottom: "1px solid grey",
      borderLeft: "1px solid grey"
    },
    centerColumn: {
      borderBottom: "1px solid grey"
    }
  },
}));

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#fffde7" };
  else return { color: "#f57c00" };
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

const Menu = withRouter(({ history }) => {
  const classes = useStyles();

  return(
  <AppBar position="static" style={{ zIndex: 12343455 }}>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Teach Learn Game
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
      </div>
      <div>
      <Link to="/setup">
          <Button style={isActive(history, "/setup")}>
            Setup
          </Button>
        </Link>
        <Link to="/teachers">
          <Button style={isActive(history, "/teachers")}>
            Teachers
          </Button>
        </Link>
        <Link to="/learners">
          <Button style={isActive(history, "/learners")}>
            Learners
          </Button>
        </Link>
        <Link to="/gamers">
          <Button style={isActive(history, "/gamers")}>
            Gamers
          </Button>
        </Link>
      </div>
      <div style={{ position: "absolute", right: "10px" }}>
        <span style={{ float: "right" }}>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button style={isActive(history, "/signup")}>Sign up</Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive(history, "/signin")}>Sign In</Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              {auth.isAuthenticated().user.educator && (
                <Link to="/teach/courses">
                  <Button style={isPartActive(history, "/teach/")}>
                    <Library /> Teach
                  </Button>
                </Link>
              )}
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button
                  style={isActive(
                    history,
                    "/user/" + auth.isAuthenticated().user._id
                  )}
                >
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => history.push("/"));
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </span>
      </div>
    </Toolbar>
  </AppBar>

)});

export default Menu;
