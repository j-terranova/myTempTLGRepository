
export const gamerPreferencesReducer = (userGamerPreferences, action) => {
  switch (action.type) {
    case "SET_GAMERPREFERENCES": {
      console.log(
        "gamerPreferencesReducer - SET_GAMERPREFERENCES - action.userGamerPreferences =: ",
        action.gamerPreferences
      );
      if (action.gamerPreferences != undefined && action.gamerPreferences != null)
      {
        return {
          user_id: action.gamerPreferences.user_id,
          topic: action.gamerPreferences.topic,
          myClass: action.gamerPreferences.myClass,
          category: action.gamerPreferences.category,
          subject: action.gamerPreferences.subject,
          type: action.gamerPreferences.type ,
          subType: action.gamerPreferences.subType ,
          difficultyLevel: action.gamerPreferences.difficultyLevel,
          ageRange: action.gamerPreferences.ageRange,
          playerLevel: action.gamerPreferences.playerLevel ,
          preferredGamerLevel: action.gamerPreferences.preferredGamerLevel ,
          group_id: action.gamerPreferences.group_id ,
          themeBrightness: action.gamerPreferences.themeBrightness,
          primaryButtonColor: action.gamerPreferences.primaryButtonColor,
          primaryBackgroundColor: action.gamerPreferences.primaryBackgroundColor,    
          createDate:  action.gamerPreferences.createDate,
          updatedBy: action.gamerPreferences.updatedBy,
          updateDate:  action.gamerPreferences.updateDate,
          _id: action.gamerPreferences._id,
        };
      } else 
      {
        return userGamerPreferences;
      }
    }
    case "GET_GAMERPREFERENCES": {
      return userGamerPreferences;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return userGamerPreferences;
    }
  }
};
