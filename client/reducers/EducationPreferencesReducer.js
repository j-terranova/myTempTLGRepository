
export const educationPreferencesReducer = (userEducationPreferences, action) => {
  switch (action.type) {
    case "SET_EDUCATIONPREFERENCES": {
      console.log(
        "educationPreferencesReducer - SET_EDUCATIONPREFERENCES - action.userEducationPreferences =: ",
        action.educationPreferences
      );
      if (action.educationPreferences != undefined && action.educationPreferences != null)
      {
        return {
          user_id: action.educationPreferences.user_id,
          topic: action.educationPreferences.topic,
          myClass: action.educationPreferences.myClass,
          category: action.educationPreferences.category,
          subject: action.educationPreferences.subject,
          type: action.educationPreferences.type ,
          subType: action.educationPreferences.subType ,
          difficultyLevel: action.educationPreferences.difficultyLevel,
          ageRange: action.educationPreferences.ageRange,
          group_id: action.educationPreferences.group_id ,
          keepPrivate: action.educationPreferences.keepPrivate ,
          rowsPerPage: action.educationPreferences.rowsPerPage,
          themeBrightness: action.educationPreferences.themeBrightness,
          primaryButtonColor: action.educationPreferences.primaryButtonColor,
          primaryBackgroundColor: action.educationPreferences.primaryBackgroundColor,    
          createDate:  action.educationPreferences.createDate,
          updatedBy: action.educationPreferences.updatedBy,
          updateDate:  action.educationPreferences.updateDate,
          _id: action.educationPreferences._id,
        };
      } else 
      {
        return userEducationPreferences;
      }
    }
    case "GET_EDUCATIONPREFERENCES": {
      return userEducationPreferences;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return userEducationPreferences;
    }
  }
};
