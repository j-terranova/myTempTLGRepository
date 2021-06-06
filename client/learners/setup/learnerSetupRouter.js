import React from "react";
import {Switch, useRouteMatch} from "react-router-dom";
import PrivateRoute from "../../auth/PrivateRoute";
import SetupContainer from"./learnerSetupContainer";
import LessonContainer from"./../lessons/learnerLessonContainer";

const LearnerSetupRouter = () => {
  let { path, url } = useRouteMatch();
  console.log ("LearnerSetupRouter - path = ", path);
  console.log ("LearnerSetupRouter - url = ", url);

  return (
    <>
      <Switch>
        <PrivateRoute
          path={`${path}/Setups`}
          component={SetupContainer}
        />
        <PrivateRoute
          path={`${path}/RequestCourse`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Books`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Chapters`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Courses`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Lessons`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Drills`}
          component={LessonContainer}
        />

        <PrivateRoute
          path={`${path}/StudyGuides`}
          component={LessonContainer}
        />
         <PrivateRoute
          path={`${path}/Resources`}
          component={LessonContainer}
        />
         <PrivateRoute
          path={`${path}/Homework`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Quizes`}
          component={LessonContainer}
        />
                <PrivateRoute
          path={`${path}/Exams`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Grades`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Results`}
          component={LessonContainer}
        />
      </Switch>
    </>
  );
};

export default LearnerSetupRouter;
