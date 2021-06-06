import React, { createContext, useReducer, useContext } from "react";
import { educationPreferencesReducer } from "../reducers/EducationPreferencesReducer";

const EducationPreferencesContext = createContext();
const EducationPreferencesDispatchContext = createContext();

function EducationPreferencesProvider({ children }) {

  const [EducationPreferences, EducationPreferencesDispatch] = useReducer(educationPreferencesReducer, {
    user_id: "",
    topic:  "",
    myClass:  "",
    category:  "",
    subject:  "",
    type:  "Education",
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
    <EducationPreferencesContext.Provider value={EducationPreferences}>
      <EducationPreferencesDispatchContext.Provider value={EducationPreferencesDispatch}>
        {children}
      </EducationPreferencesDispatchContext.Provider>
    </EducationPreferencesContext.Provider>
  );
}

function useEducationPreferences() {
  const context = useContext(EducationPreferencesContext);
  if (context === undefined) {
    throw new Error("useEducationPreferences must be used within a EducationPreferencesProvider");
  }
  return context;
}

function useEducationPreferencesDispatch() {
  const context = useContext(EducationPreferencesDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useEducationPreferencesDispatch must be used within a EducationPreferencesProvider"
    );
  }
  return context;
}

export { EducationPreferencesProvider, useEducationPreferences, useEducationPreferencesDispatch };
