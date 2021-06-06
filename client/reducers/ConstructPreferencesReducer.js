
export const constructPreferencesReducer = (userConstructPreferences, action) => {
  switch (action.type) {
    case "SET_CONSTRUCTPREFERENCES": {
      console.log(
        "constructPreferencesReducer - SET_CONSTRUCTPREFERENCES - action.userConstructPreferences =: ",
        action.constructPreferences
      );
      if (action.constructPreferences != undefined && action.constructPreferences != null)
      {
        return {
          user_id: action.constructPreferences.user_id,
          topic: action.constructPreferences.topic,
          myClass: action.constructPreferences.myClass,
          category: action.constructPreferences.category,
          subject: action.constructPreferences.subject,
          type: action.constructPreferences.type ,
          subType: action.constructPreferences.subType ,
          difficultyLevel: action.constructPreferences.difficultyLevel,
          ageRange: action.constructPreferences.ageRange,
          group_id: action.constructPreferences.group_id ,
          keepPrivate: action.constructPreferences.keepPrivate ,
          rowsPerPage: action.constructPreferences.rowsPerPage,
          themeBrightness: action.constructPreferences.themeBrightness,
          primaryButtonColor: action.constructPreferences.primaryButtonColor,
          primaryBackgroundColor: action.constructPreferences.primaryBackgroundColor,    
          createDate:  action.constructPreferences.createDate,
          updatedBy: action.constructPreferences.updatedBy,
          updateDate:  action.constructPreferences.updateDate,
          _id: action.constructPreferences._id,
        };
      } else 
      {
        return userConstructPreferences;
      }
    }
    case "GET_CONSTRUCTPREFERENCES": {
      return userConstructPreferences;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return userConstructPreferences;
    }
  }
};
