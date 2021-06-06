import { v4 as uuidv4 } from "uuid";

export const accessReducer = (currentAccess, action) => {
  switch (action.type) {
    case "APPLY_ACCESS":
      console.log(
        "accessReducer - APPLY_ACCESS - action.currentAccess =: ",
        action.currentAccess
      );
      console.log(
        "accessReducer - APPLY_ACCESS - currentAccess =: ",
        currentAccess
      );
      return action.currentAccess;
    case "SET_ACCESSFROMCURRENTITEM": {
      console.log(
        "accessReducer - SET_ACCESSFROMCURRENTITEM - action.currentSourceOfAccess =: ",
        action.currentSourceOfAccess
      );
      if (action.currentSourceOfAccess != undefined && action.currentSourceOfAccess !=null)
      {
        return {
          keepPrivate:
            action.currentSourceOfAccess.keepPrivate,
          approvedForPublicUse:
            action.currentSourceOfAccess.approvedForPublicUse,
          group_id:
            action.currentSourceOfAccess.group_id,
           
        };
      }else
      {
        return currentAccess;
      }
    }

    case "GET_ACCESS":
      return currentAccess;

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return currentAccess;
    }
  }
};
