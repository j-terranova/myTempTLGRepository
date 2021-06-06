import React from "react";
import { useEffect } from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import  ThemeProvider  from "@material-ui/styles/ThemeProvider";
import theme from "./theme";
import { hot } from "react-hot-loader";

import { UserDataProvider } from"./../contexts/UserDataContext";
import { ConstructPreferencesProvider } from"./../contexts/ConstructPreferencesContext";
import { EducationPreferencesProvider } from"./../contexts/EducationPreferencesContext";
import { GamerPreferencesProvider } from"./../contexts/GamerPreferencesContext";
import { GamerResultDataProvider } from"./../contexts/GamerResultDataContext";
import { CriteriaProvider } from"./../contexts/CriteriaContext";
import { RandomOptionsProvider } from"./../contexts/RandomOptionsContext";
import { AccessProvider } from"./../contexts/AccessContext";
import {SpeechDataProvider } from"./../contexts/SpeechDataContext";

const App = () => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
  <React.StrictMode>
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <UserDataProvider>
      <EducationPreferencesProvider>
        <GamerPreferencesProvider>
        <GamerResultDataProvider>
        <SpeechDataProvider>
          <ConstructPreferencesProvider>
            <CriteriaProvider>
              <AccessProvider>
                <RandomOptionsProvider>
                  <MainRouter />
                </RandomOptionsProvider>
              </AccessProvider>
            </CriteriaProvider>
          </ConstructPreferencesProvider>
          </SpeechDataProvider>
        </GamerResultDataProvider>
        </GamerPreferencesProvider>
      </EducationPreferencesProvider>
    </UserDataProvider>
  </ThemeProvider>
  </BrowserRouter>
  </React.StrictMode>
  );
};

export default hot(module)(App);

