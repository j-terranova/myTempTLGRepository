import { v4 as uuidv4 } from "uuid";

export const criteriaReducer = (currentCriteria, action) => {
  switch (action.type) {
    case "APPLY_CRITERIA": {
      console.log(
        "criteriaReducer - APPLY_CRITERIA - action.currentCriteria =: ",
        action.currentCriteria
      );
      return {
        myClass: action.currentCriteria.myClass,
        category: action.currentCriteria.category,
        subject: action.currentCriteria.subject,
        difficultyLevel: action.currentCriteria.difficultyLevel,
        ageRange: action.currentCriteria.ageRange,
        topic: action.currentCriteria.topic,
      };
    }
    case "SET_CRITERIAFROMCURRENTITEM": {
      console.log(
        "criteriaReducer - SET_CRITERIAFROMCURRENTITEM - action.currentSourceOfCriteria =: ",
        action.currentSourceOfCriteria
      );
      if (action.currentSourceOfCriteria != undefined && action.currentSourceOfCriteria != null)
      {
        return {
          myClass: action.currentSourceOfCriteria.myClass,
          category: action.currentSourceOfCriteria.category,
          subject: action.currentSourceOfCriteria.subject,
          difficultyLevel: action.currentSourceOfCriteria.difficultyLevel,
          ageRange: action.currentSourceOfCriteria.ageRange,
          topic: action.currentSourceOfCriteria.topic,
        };
      } else 
      {
        return currentCriteria;
      }
    }
    case "GET_CRITERIA": {
      return currentCriteria;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return currentCriteria;
    }
  }
};
