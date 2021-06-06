import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {GamerSetupMenuItems} from "./gamerSetupMenuItems";
import {GamerPreferencesMenuItems} from "./gamerSetupMenuItems";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function gameSetupMenu(props) {
  const { gameURL } = props;
  const classes = useStyles();

  const preferencesDrawerList = (
    <List>
      {GamerPreferencesMenuItems.map((menuItem) => (
          <Link to={`${gameURL}/${menuItem.path}`} key ={menuItem.path}>
          <ListItem button >
            <ListItemIcon>
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText primary={menuItem.title} />
          </ListItem>
        </Link>
      ))}
    </List>
);

  const gameDrawerList = (
      <List>
        {GamerSetupMenuItems.map((menuItem) => (
            <Link to={`${gameURL}/${menuItem.path}`} key ={menuItem.path}>
            <ListItem button >
              <ListItemIcon>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItem>
          </Link>
        ))}
      </List>
  );

  return (
    <div>
    <Divider />
      <Typography align="center">
        Preferences
      </Typography>
        {preferencesDrawerList}
    <Divider />
      <Typography align="center">
        Components
      </Typography>
        {gameDrawerList}

</div>
  );
}

export default gameSetupMenu;
