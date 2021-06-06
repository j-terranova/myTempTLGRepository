import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {LearnerSetupRegistrationMenuItems} from "./learnerSetupMenuItems";
import {LearnerSetupLearningMenuItems} from "./learnerSetupMenuItems";
import {LearnerSetupGradingMenuItems} from "./learnerSetupMenuItems";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function LearnerSetupMenu(props) {
  const { learnerURL } = props;
  const classes = useStyles();

  const registrationDrawerList = (
      <List>
        {LearnerSetupRegistrationMenuItems.map((menuItem) => (
            <Link to={`${learnerURL}/${menuItem.path}`} key ={menuItem.path}>
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
      {LearnerSetupLearningMenuItems.map((menuItem) => (
          <Link to={`${learnerURL}/${menuItem.path}`} key ={menuItem.path}>
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
    {LearnerSetupGradingMenuItems.map((menuItem) => (
        <Link to={`${learnerURL}/${menuItem.path}`} key ={menuItem.path}>
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


