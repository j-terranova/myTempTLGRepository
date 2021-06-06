
export const userDataReducer = (userData, action) => {
  switch (action.type) {
    case "SET_USERDATA": {
      console.log(
        "userDataReducer - SET_USERDATA - action.userData =: ",
        action.userData
      );
      if (action.userData != undefined && action.userData != null)
      {
        return {
          user_id: action.userData._id,
          educator: action.userData.educator,
          status: action.userData.status,
          affiliation_id: action.userData.affiliation_id ,
          importLimit: action.userData.importLimit ,
          membershipLevel:action.userData.membershipLevel ,
          state: action.userData.state ,
          city: action.userData.city ,
          zip: action.userData.zip ,
          groupsUserOwns: action.userData.groupsUserOwns ,
          groupsUserMembership: action.userData.groupsUserMembership ,
        };
      } else 
      {
        return userData;
      }
    }
    case "GET_USERDATA": {
      return userData;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return userData;
    }
  }
};
