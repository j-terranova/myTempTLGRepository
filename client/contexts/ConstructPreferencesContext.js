import React, { createContext, useReducer, useContext } from "react";
import { constructPreferencesReducer } from "../reducers/ConstructPreferencesReducer";
import auth from "../auth/auth-helper";


const ConstructPreferencesContext = createContext();
const ConstructPreferencesDispatchContext = createContext();

function ConstructPreferencesProvider({ children }) {


  const [ConstructPreferences, ConstructPreferencesDispatch] = useReducer(constructPreferencesReducer, {
    user_id: "",
    topic:  "",
    myClass:  "",
    category:  "",
    subject:  "",
    type:  "Component",
    subType:  "Preference",
    difficultyLevel:  27,
    ageRange:  6,
    image_id:  "",
    group_id:  "",
    keepPrivate:  true,
    rowsPerPage: 10,
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
    <ConstructPreferencesContext.Provider value={ConstructPreferences}>
      <ConstructPreferencesDispatchContext.Provider value={ConstructPreferencesDispatch}>
        {children}
      </ConstructPreferencesDispatchContext.Provider>
    </ConstructPreferencesContext.Provider>
  );
}

function useConstructPreferences() {
  const context = useContext(ConstructPreferencesContext);
  if (context === undefined) {
    throw new Error("useConstructPreferences must be used within a ConstructPreferencesProvider");
  }
  return context;
}

function useConstructPreferencesDispatch() {
  const context = useContext(ConstructPreferencesDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useConstructPreferencesDispatch must be used within a ConstructPreferencesProvider"
    );
  }
  return context;
}

export { ConstructPreferencesProvider, useConstructPreferences, useConstructPreferencesDispatch };
