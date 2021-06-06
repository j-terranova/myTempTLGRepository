import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {ConstructSetupMenuItems} from "./constructSetupMenuItems";
import {ConstructPreferencesMenuItems} from "./constructSetupMenuItems";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import auth from "./../../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function constructSetupMenu(props) {
  const { constructURL } = props;
  const classes = useStyles();

  const preferencesDrawerList = (
    <List>
      {ConstructPreferencesMenuItems.map((menuItem) => (
          <Link to={`${constructURL}/${menuItem.path}`} key ={menuItem.path}>
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

  const constructDrawerList = (
      <List>
        {ConstructSetupMenuItems.map((menuItem, index) => (
            <Link to={`${constructURL}/${menuItem.path}`} key ={menuItem.path}>
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
            {constructDrawerList}

    </div>
  );
}
