import React from "react";
import {Switch, useRouteMatch} from "react-router-dom";
import PrivateRoute from "../../auth/PrivateRoute";

import SetupContainer from"./educationSetupContainer";
import PreferencesContainer from"./educationPreferencesContainer";
import LessonContainer from"../lessons/frameworkLessonContainer";

const EducationSetupRouter = () => {
  let { path, url } = useRouteMatch();
  console.log ("EducationSetupRouter - path = ", path);
  console.log ("EducationSetupRouter - url = ", url);

  return (
    <>
      <Switch>
        <PrivateRoute
          path={`${path}/Setups`}
          component={SetupContainer}
        />
      <PrivateRoute
          path={`${path}/EducationPreferences`}
          component={PreferencesContainer}
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
          path={`${path}/Resoources`}
          component={LessonContainer}
        />
        <PrivateRoute
          path={`${path}/Tests`}
          component={LessonContainer}
        />
        
      </Switch>
    </>
  );
};

export default EducationSetupRouter;
