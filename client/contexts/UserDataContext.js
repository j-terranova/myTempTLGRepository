import React, { createContext, useReducer, useContext } from "react";
import { userDataReducer } from "../reducers/UserDataReducer";

const UserDataContext = createContext();
const UserDataDispatchContext = createContext();

function UserDataProvider({ children }) {


  const [UserData, UserDataDispatch] = useReducer(userDataReducer, {
    user_id: "",
    educator:  "",
    status:  "",
    affiliation_id:  "",
    importLimit:  50,
    membershipLevel:  "Standard",
    state:  "",
    city:  "",
    zip:  "",
    groupsUserOwns:  [],
    groupsUserMembership:  [],
  });
  return (
    <UserDataContext.Provider value={UserData}>
      <UserDataDispatchContext.Provider value={UserDataDispatch}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}

function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}

function useUserDataDispatch() {
  const context = useContext(UserDataDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useUserDataDispatch must be used within a UserDataProvider"
    );
  }
  return context;
}

export { UserDataProvider, useUserData, useUserDataDispatch };
