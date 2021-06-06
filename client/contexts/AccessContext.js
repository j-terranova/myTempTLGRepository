import React, { createContext, useReducer, useContext } from "react";
import { accessReducer } from "../reducers/AccessReducer";
import auth from "../auth/auth-helper";

const jwt = auth.isAuthenticated();

const AccessContext = createContext();
const AccessDispatchContext = createContext();

function AccessProvider({ children }) {
  const [currentAccess, accessDispatch] = useReducer(accessReducer, {
    allowFriendsReadAccess: false,
    allowPublicReadAccess: false,
    approvedPublicReadAccess: false,
  });
  return (
    <AccessContext.Provider value={currentAccess}>
      <AccessDispatchContext.Provider value={accessDispatch}>
        {children}
      </AccessDispatchContext.Provider>
    </AccessContext.Provider>
  );
}

function useAccess() {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error("useAccess must be used within a useAccessProvider");
  }
  return context;
}

function useAccessDispatch() {
  const context = useContext(AccessDispatchContext);
  if (context === undefined) {
    throw new Error("useAccessDispatch must be used within a AccessProvider");
  }
  return context;
}

export { AccessProvider, useAccess, useAccessDispatch };
