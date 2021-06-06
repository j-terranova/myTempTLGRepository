import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import {GamerSetupPreferencesMenuItems} from "./gamerSetupMenuItems";
import {GamerSetupGamingMenuItems} from "./gamerSetupMenuItems";
import {GamerSetupScoringMenuItems} from "./gamerSetupMenuItems";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function GamerSetupMenu(props) {
  const { gamerURL } = props;
  const classes = useStyles();

  const preferenceDrawerList = (
      <List>
        {GamerSetupPreferencesMenuItems.map((menuItem) => (
            <Link to={`${gamerURL}/${menuItem.path}`} key ={menuItem.path}>
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

  const gamingDrawerList = (
    <List>
      {GamerSetupGamingMenuItems.map((menuItem) => (
          <Link to={`${gamerURL}/${menuItem.path}`} key ={menuItem.path}>
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

const scoringDrawerList = (
  <List>
    {GamerSetupScoringMenuItems.map((menuItem) => (
        <Link to={`${gamerURL}/${menuItem.path}`} key ={menuItem.path}>
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
            {preferenceDrawerList}
        <Divider />
            {gamingDrawerList}
        <Divider />
            {scoringDrawerList}
    </div>
  );
}


