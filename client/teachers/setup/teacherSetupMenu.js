import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {TeacherSetupRegistrationMenuItems} from "./teacherSetupMenuItems";
import {TeacherSetupLearningMenuItems} from "./teacherSetupMenuItems";
import {TeacherSetupGradingMenuItems} from "./teacherSetupMenuItems";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function TeacherSetupMenu(props) {
  const { teacherURL } = props;
  const classes = useStyles();

  const registrationDrawerList = (
      <List>
        {TeacherSetupRegistrationMenuItems.map((menuItem) => (
            <Link to={`${teacherURL}/${menuItem.path}`} key ={menuItem.path}>
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

  const learningDrawerList = (
    <List>
      {TeacherSetupLearningMenuItems.map((menuItem) => (
          <Link to={`${teacherURL}/${menuItem.path}`} key ={menuItem.path}>
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

const gradingDrawerList = (
  <List>
    {TeacherSetupGradingMenuItems.map((menuItem) => (
        <Link to={`${teacherURL}/${menuItem.path}`} key ={menuItem.path}>
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
        Registration
      </Typography>
        {registrationDrawerList}
      <Divider />
      <Typography align="center">
        Assignments
      </Typography>
        {learningDrawerList}
      <Divider />
      <Typography align="center">
        Grading
      </Typography>
        {gradingDrawerList}
    </div>
  );
}


