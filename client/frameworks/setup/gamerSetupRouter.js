import React from "react";
import {Switch, useRouteMatch} from "react-router-dom";
import PrivateRoute from "../../auth/PrivateRoute";

import SetupContainer from"./gamerSetupContainer";
import PreferencesContainer from"./gamerPreferencesContainer";
import GamerContainer from "../../gamers/gamerContainer";
import TabularContainer from "../tabular/frameworkTabularContainer";
import TicTacToeContainer from "../ticTacToe/frameworkTicTacToeContainer";
import TriviaContainer from "../trivia/frameworkTriviaContainer";

const GameSetupRouter = () => {
  let { path, url } = useRouteMatch();
  console.log ("GameSetupRouter - path = ", path);
  console.log ("GameSetupRouter - url = ", url);

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
        <PrivateRoute
          path={`${path}/Adventure`}
          component={GamerContainer}
        />
        <PrivateRoute
          path={`${path}/BoardGames`}
          component={GamerContainer}
        />
        <PrivateRoute
          path={`${path}/Combat`}
          component={GamerContainer}
        />
        <PrivateRoute
          path={`${path}/Flight`}
          component={GamerContainer}
        />
        <PrivateRoute
          path={`${path}/Puzzles`}
          component={GamerContainer}
        />
        <PrivateRoute
          path={`${path}/Racing`}
          component={GamerContainer}
        />
        <PrivateRoute
          path={`${path}/Strategy`}
          component={GamerContainer}
        />
        <PrivateRoute
          path={`${path}/Tabular`}
          component={TabularContainer}
        />
        <PrivateRoute
          path={`${path}/TicTacToe`}
          component={TicTacToeContainer}
        />
        <PrivateRoute
          path={`${path}/Trivia`}
          component={TriviaContainer}
        />
        
      </Switch>
    </>
  );
};

export default GameSetupRouter;
