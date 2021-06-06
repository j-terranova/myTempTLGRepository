import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./HomeMenu";
import Users from "./../user/Users";
import Signup from"./../user/Signup";
import Signin from"./../auth/Signin";
import EditProfile from"./../user/EditProfile";
import Profile from"./../user/Profile";
import PrivateRoute from"./../auth/PrivateRoute";
import Menu from "./Menu";
import NewCourse from"./../course/NewCourse";
import Course from"./../course/Course";
import EditCourse from"./../course/EditCourse";
import MyCourses from"./../course/MyCourses";
import Enrollment from"./../enrollment/Enrollment";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
//import SetupMenu from "./SetupMenu";
import SetupRandomOptions from "./SetupRandomOptions";
import ConstructSetupContainer from "./../constructs/setup/constructSetupContainer";
import EducationSetupContainer from "../frameworks/setup/educationSetupContainer";
import GamerDevelopmentSetupContainer from "../frameworks/setup/gamerSetupContainer";
import LearnerSetupContainer from "./../learners/setup/learnerSetupContainer";
import TeacherSetupContainer from "./../teachers/setup/teacherSetupContainer";
import GamerSetupContainer from "./../gamers/setup/gamerSetupContainer";

import GroupAccessContainer from "./../groupAccess/groupAccessContainer";
import ImageStoreContainer from "./../constructs/images/imageStoreContainer";


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

const MainRouter = () => {
  const classes = useStyles();
  return (   
    <div>     
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
        <Route path="/course/:courseId" component={Course} />

        <PrivateRoute
          path="/setup"
          component={SetupRandomOptions}
        />

        <PrivateRoute
          path="/constructs"
          component={ConstructSetupContainer}
        />

        <PrivateRoute
          path="/education"
          component={EducationSetupContainer}
        />

        <PrivateRoute
          path="/gameDevelopment"
          component={GamerDevelopmentSetupContainer}
        />
        <PrivateRoute
          path="/teachers"
          component={TeacherSetupContainer}
        />
        <PrivateRoute
          path="/learners"
          component={LearnerSetupContainer}
        />
          <PrivateRoute
            path="/gamers"
            component={GamerSetupContainer}
          />
        <PrivateRoute
          path="/groups"
          component={GroupAccessContainer}
        />
        <PrivateRoute
          path="/images"
          component={ImageStoreContainer}
        />
        <PrivateRoute
          path="/affiliations"
          component={GamerSetupContainer}
        />
        <PrivateRoute path="/teach/courses" component={MyCourses} />

        <PrivateRoute path="/teach/course/new" component={NewCourse} />
        <PrivateRoute
          path="/teach/course/edit/:courseId"
          component={EditCourse}
        />
        <PrivateRoute path="/teach/course/:courseId" component={Course} />
        <PrivateRoute path="/learn/:enrollmentId" component={Enrollment} />
      </Switch>
      </div>
  );
};

export default MainRouter;
