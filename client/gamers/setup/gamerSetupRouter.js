import React from "react";
import {Switch, useRouteMatch} from "react-router-dom";
import PrivateRoute from "../../auth/PrivateRoute";
import SetupContainer from "./gamerSetupContainer";
import GamerContainer from "./../gamerContainer";
import TabularContainer from "./../tabulars/gamerTabularContainer";
import TicTacToeContainer from "./../ticTacToes/gamerTicTacToeContainer";
import TriviaContainer from "./../trivias/gamerTriviaContainer";
import PreferencesContainer from"./gamerPreferencesContainer";

const GamerSetupRouter = () => {
  let { path, url } = useRouteMatch();
  console.log ("GamerSetupRouter - path = ", path);
  console.log ("GamerSetupRouter - url = ", url);

  return (
    <>
      <Switch>
        <PrivateRoute
          path={`${path}/Setups`}
          component={SetupContainer}
        />
        <PrivateRoute
          path={`${path}/GamerPreferences`}
          component={PreferencesContainer}
        />
        {/*<PrivateRoute
          path={`${path}/Adventure`}
          component={AdventureContainer}
        />
        <PrivateRoute
          path={`${path}/Combat`}
          component={CombatContainer}
        />
        <PrivateRoute
          path={`${path}/Flight`}
          component={FlightContainer}
        />*/}
        <PrivateRoute
          path={`${path}/Matching`}
          component={TabularContainer}
        />
        {/*<PrivateRoute
          path={`${path}/Puzzles`}
          component={GamerContainer}
        />

        <PrivateRoute
          path={`${path}/Racing`}
          component={GamerContainer}
        />*/}
        {/* <PrivateRoute
          path={`${path}/Strategy`}
          component={StrategyContainer}
        />*/}
         <PrivateRoute
          path={`${path}/TicTacToe`}
          component={TicTacToeContainer}
        />
        <PrivateRoute
          path={`${path}/Trivia`}
          component={TriviaContainer}
        />
        {/*<PrivateRoute
          path={`${path}/Scores`}
          component={ScoresContainer}
        />
        <PrivateRoute
          path={`${path}/Rankings`}
          component={RankingsContainer}
        />
        <PrivateRoute
          path={`${path}/Levels`}
          component={LevelsContainer}
        />*/}
      </Switch>
    </>
  );
};

export default GamerSetupRouter;
