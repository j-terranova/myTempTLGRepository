import React from "react";
import {Switch, useRouteMatch} from "react-router-dom";
import PrivateRoute from "../../auth/PrivateRoute";

import SetupContainer from"./constructSetupContainer";
import PreferencesContainer from"./constructPreferencesContainer";
import AssociationContainer from"./../associations/constructAssociationContainer";
import DefinitionContainer from"./../definitions/constructDefinitionContainer";
import EquationContainer from"./../equations/constructEquationContainer";
import FactContainer from"./../facts/constructFactContainer";
import PrefixContainer from"./../prefixes/constructPrefixContainer";
import QuestionContainer from"./../questions/constructQuestionContainer";
import QuoteContainer from"./../quotes/constructQuoteContainer";
import RootWordContainer from"./../rootWords/constructRootWordContainer";
import SegmentContainer from"./../segments/constructSegmentContainer";
import MiniSegmentContainer from"./../miniSegments/constructMiniSegmentContainer";
import StatementContainer from"./../statements/constructStatementContainer";
import SuffixContainer from"./../suffixes/constructSuffixContainer";

const ConstructSetupRouter = () => {
  let { path, url } = useRouteMatch();
  console.log ("ConstructSetupRouter - path = ", path);
  console.log ("ConstructSetupRouter - url = ", url);
 
  return (
    <>
      <Switch>
        <PrivateRoute
          path={`${path}/setup`}
          component={SetupContainer}
        />
        <PrivateRoute
          path={`${path}/ConstructPreferences`}
          component={PreferencesContainer}
        />
        <PrivateRoute
          path={`${path}/Associations`}
          component={AssociationContainer}
        />
        <PrivateRoute
          path={`${path}/Definitions`}
          component={DefinitionContainer}
        />
        <PrivateRoute
          path={`${path}/Equations`}
          component={EquationContainer}
        />
        <PrivateRoute
          path={`${path}/Facts`}
          component={FactContainer}
        />
        <PrivateRoute
          path={`${path}/Prefixes`}
          component={PrefixContainer}
        />
        <PrivateRoute
          path={`${path}/Questions`}
          component={QuestionContainer}
        />
        <PrivateRoute
          path={`${path}/Quotes`}
          component={QuoteContainer}
        />
        <PrivateRoute
          path={`${path}/RootWords`}
          component={RootWordContainer}
        />
        <PrivateRoute
          path={`${path}/Segments`}
          component={SegmentContainer}
        />
        <PrivateRoute
          path={`${path}/MiniSegments`}
          component={MiniSegmentContainer}
        />
        <PrivateRoute
          path={`${path}/Statements`}
          component={StatementContainer}
        />
        <PrivateRoute
          path={`${path}/Suffixes`}
          component={SuffixContainer}
        />
      </Switch>
    </>
  );
};

export default ConstructSetupRouter;
