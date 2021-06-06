import React, { createContext, useReducer, useContext } from "react";
import { criteriaReducer } from "../reducers/CriteriaReducer";
import auth from "../auth/auth-helper";

const jwt = auth.isAuthenticated();

const CriteriaContext = createContext();
const CriteriaDispatchContext = createContext();

function CriteriaProvider({ children }) {
  const [currentCriteria, criteriaDispatch] = useReducer(criteriaReducer, {
    myClass: "", //"Comedy",
    category: "", //"Basic Reading",
    subject: "", //"Reading",
    difficultyLevel: "", //"College",
    ageRange: "", //"All Ages",
  });
  return (
    <CriteriaContext.Provider value={currentCriteria}>
      <CriteriaDispatchContext.Provider value={criteriaDispatch}>
        {children}
      </CriteriaDispatchContext.Provider>
    </CriteriaContext.Provider>
  );
}

function useCriteria() {
  const context = useContext(CriteriaContext);
  if (context === undefined) {
    throw new Error("useCriteria must be used within a CriteriaProvider");
  }
  return context;
}

function useCriteriaDispatch() {
  const context = useContext(CriteriaDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCriteriaDispatch must be used within a CriteriaProvider"
    );
  }
  return context;
}

export { CriteriaProvider, useCriteria, useCriteriaDispatch };
