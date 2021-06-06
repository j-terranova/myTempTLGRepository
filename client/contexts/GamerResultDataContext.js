import React, { createContext, useReducer, useContext } from "react";
import { gamerResultDataReducer } from "../reducers/GamerResultDataReducer";

const GamerResultDataContext = createContext();
const GamerResultDataDispatchContext = createContext();

function GamerResultDataProvider({ children }) {

  const [GamerResultData, GamerResultDataDispatch] = useReducer(gamerResultDataReducer, {
    userId: null,
    framework_id: null,
    description: "",
    topic: "",
    myClass: "",
    category: "",
    subject: "",
    type: "",
    subType: "",
    playerLevel: 0,
    gamerLevel: 0,
    playTime: 0,
    gamerScore: 0,
    gamerLevelMaxScore: 0,
    attemptsMade: 0,
    inCorrectAttempts: 0,
    numberCorrect: 0,
    gamerStatus: "",
    opponent: "",
    winLossDraw: "",
    selectedValues: [],
    includeConstructs: [],
    startDate:  null,
    completedDate: null,
    updateDate: null,
    gamerResult_id: null,
    modified: false,
  });
  return (
    <GamerResultDataContext.Provider value={GamerResultData}>
      <GamerResultDataDispatchContext.Provider value={GamerResultDataDispatch}>
        {children}
      </GamerResultDataDispatchContext.Provider>
    </GamerResultDataContext.Provider>
  );
}

function useGamerResultData() {
  const context = useContext(GamerResultDataContext);
  if (context === undefined) {
    throw new Error("useGamerResultData must be used within a GamerResultDataProvider");
  }
  return context;
}

function useGamerResultDataDispatch() {
  const context = useContext(GamerResultDataDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useGamerResultDataDispatch must be used within a GamerResultDataProvider"
    );
  }
  return context;
}

export { GamerResultDataProvider, useGamerResultData, useGamerResultDataDispatch };
