import React, { createContext, useReducer, useContext } from "react";
import { gamerPreferencesReducer } from "../reducers/GamerPreferencesReducer";

const GamerPreferencesContext = createContext();
const GamerPreferencesDispatchContext = createContext();

function GamerPreferencesProvider({ children }) {

  const [GamerPreferences, GamerPreferencesDispatch] = useReducer(gamerPreferencesReducer, {
    user_id: "",
    topic:  "",
    myClass:  "",
    category:  "",
    subject:  "",
    type:  "Game",
    subType:  "Preference",
    difficultyLevel:  27,
    ageRange:  6,
    playerLevel: 4,
    preferredGamerLevel: 4 ,
    group_id:  "",
    themeBrightness: "main",
    primaryButtonColor: "blue",
    primaryBackgroundColor: "white",
    createDate:  Date.now(),
    updatedBy:  "",
    updateDate: Date.now(),
    _v:  "0",
    _id:  null,
  });
  return (
    <GamerPreferencesContext.Provider value={GamerPreferences}>
      <GamerPreferencesDispatchContext.Provider value={GamerPreferencesDispatch}>
        {children}
      </GamerPreferencesDispatchContext.Provider>
    </GamerPreferencesContext.Provider>
  );
}

function useGamerPreferences() {
  const context = useContext(GamerPreferencesContext);
  if (context === undefined) {
    throw new Error("useGamerPreferences must be used within a GamerPreferencesProvider");
  }
  return context;
}

function useGamerPreferencesDispatch() {
  const context = useContext(GamerPreferencesDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useGamerPreferencesDispatch must be used within a GamerPreferencesProvider"
    );
  }
  return context;
}

export { GamerPreferencesProvider, useGamerPreferences, useGamerPreferencesDispatch };
