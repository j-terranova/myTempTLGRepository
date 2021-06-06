import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {EducationSetupMenuItems} from "./educationSetupMenuItems";
import {EducationPreferencesMenuItems} from "./educationSetupMenuItems";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function educationSetupMenu(props) {
  const { educationURL } = props;
  const classes = useStyles();

  const preferencesDrawerList = (
    <List>
      {EducationPreferencesMenuItems.map((menuItem) => (
          <Link to={`${educationURL}/${menuItem.path}`} key ={menuItem.path}>
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

  const educationDrawerList = (
      <List>
        {EducationSetupMenuItems.map((menuItem) => (
            <Link to={`${educationURL}/${menuItem.path}`} key ={menuItem.path}>
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
        {educationDrawerList}

</div>
  );
}

export default educationSetupMenu;
