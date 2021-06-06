
export const gamerResultDataReducer = (gamerResultData, action) => {
  switch (action.type) {
    case "INITIATE_GAMERRESULTDATA": {
      console.log(
        "gamerResultDataReducer - INITIATE_GAMERRESULTDATA - action.gamerResultData =: ",
        action.gamerResultData
      );
      if (action.gamerResultData != undefined && action.gamerResultData != null)
      {
        return {
          userId: action.gamerResultData.userId,
          framework_id: action.gamerResultData.framework_id,
          description: action.gamerResultData.description,
          topic: action.gamerResultData.topic,
          myClass: action.gamerResultData.myClass,
          category: action.gamerResultData.category,
          subject: action.gamerResultData.subject,
          type: action.gamerResultData.type ,
          subType: action.gamerResultData.subType ,
          difficultyLevel: action.gamerResultData.difficultyLevel,
          ageRange: action.gamerResultData.ageRange,
          playerLevel: action.gamerResultData.playerLevel ,
          gamerLevel: action.gamerResultData.gamerLevel,
          playTime: action.gamerResultData.playTime,
          gamerScore: action.gamerResultData.gamerScore,
          gamerLevelMaxScore: action.gamerResultData.gamerLevelMaxScore,
          attemptsMade: action.gamerResultData.attemptsMade,
          inCorrectAttempts: action.gamerResultData.inCorrectAttempts,
          numberCorrect: action.gamerResultData.numberCorrect,
          gamerStatus: action.gamerResultData.gamerStatus,
          opponent: action.gamerResultData.opponent,
          opponentResponseFrequency: action.gamerResultData.opponentResponseFrequency,
          winLossDraw: action.gamerResultData.winLossDraw,
          selectedValues: action.gamerResultData.selectedValues,
          includeConstructs: action.gamerResultData.includeConstructs,
          startDate:action.gamerResultData.startDate,
          completedDate: action.gamerResultData.completedDate,
          updateDate: action.gamerResultData.updateDate,
          gamerResult_id: action.gamerResultData.gamerResult_id,
          readyToSave: action.gamerResultData.readyToSave,
          modified: action.gamerResultData.modified,
        };
      } else 
      {
        return gamerResultData;
      }
    }
    case "COMPLETE_GAMERRESULTDATA": {
      console.log(
        "gamerResultDataReducer - COMPLETE_GAMERRESULTDATA - action.gamerResultComplete =: ",
        action.gamerResultComplete
      );
      if (action.gamerResultComplete != undefined && action.gamerResultComplete != null)
      {
        return {...gamerResultData,
          playTime: action.gamerResultComplete.playTime,
          gamerScore: action.gamerResultComplete.gamerScore,
          gamerLevelMaxScore: action.gamerResultComplete.gamerLevelMaxScore,
          attemptsMade: action.gamerResultComplete.attemptsMade,
          inCorrectAttempts: action.gamerResultComplete.inCorrectAttempts,
          numberCorrect: action.gamerResultComplete.numberCorrect,
          gamerStatus: action.gamerResultComplete.gamerStatus,
          winLossDraw: action.gamerResultComplete.winLossDraw,
          selectedValues: action.gamerResultComplete.selectedValues,
          completedDate: action.gamerResultComplete.completedDate,
          readyToSave: action.gamerResultComplete.readyToSave,
          modified: action.gamerResultComplete.modified,
        };
      } else 
      {
        return gamerResultData;
      }
    }
    case "RESET_GAMERRESULTDATA": {
      console.log(
        "gamerResultDataReducer - RESET_GAMERRESULTDATA - action.gamerResultReset =: ",
        action.gamerResultReset
      );
      if (action.gamerResultReset != undefined && action.gamerResultReset != null)
      {
        return {...gamerResultData,
          playTime: action.gamerResultReset.playTime,
          gamerScore: action.gamerResultReset.gamerScore,
          gamerLevelMaxScore: action.gamerResultReset.gamerLevelMaxScore,
          attemptsMade: action.gamerResultReset.attemptsMade,
          inCorrectAttempts: action.gamerResultReset.inCorrectAttempts,
          numberCorrect: action.gamerResultReset.numberCorrect,
          gamerStatus: action.gamerResultReset.gamerStatus,
          winLossDraw: action.gamerResultReset.winLossDraw,
          selectedValues: action.gamerResultReset.selectedValues,
          startDate: action.gamerResultReset.startDate,
          completedDate: action.gamerResultReset.completedDate,
          updateDate: action.gamerResultReset.updateDate,
          gamerResult_id: action.gamerResultReset.gamerResult_id,
          readyToSave: action.gamerResultReset.readyToSave,
          modified: action.gamerResultReset.modified,
        };
      } else 
      {
        return gamerResultData;
      }
    }
    case "SET_GAMERRESULTDATA_ID": {
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_ID - action.gamerResult_id: = ",
        action.gamerResult_id
      );
        return {...gamerResultData,
          gamerResult_id: action.gamerResult_id,
          readyToSave: action.readyToSave,
          modified: action.modified,
        };
    }
    case "SET_GAMERRESULTDATA_STARTDATE": {
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_STARTDATE - action.startDate =: ",
        action.startDate
      );
        return {...gamerResultData,
          startDate: action.startDate,
          modified: action.modified,
        };
    }
    case "SET_GAMERRESULTDATA_PLAYERLEVEL": {
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_PLAYERLEVEL - action.playerLevel =: ",
        action.playerLevel
      );
        return {...gamerResultData,
          playerLevel: action.playerLevel,
          opponentResponseFrequency: action.opponentResponseFrequency,
          modified: action.modified,
        };
    }
    case "SET_GAMERRESULTDATA_GAMELEVEL": {
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_GAMELEVEL - action.gamerLevel =: ",
        action.gamerLevel
      );
        return {...gamerResultData,
          gamerLevel: action.gamerLevel,
          modified: action.modified,
        };
    }
    case "SET_GAMERRESULTDATA_OPPONENT": {
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_OPPONENT - action.opponent =: ",
        action.opponent
      );
        return {...gamerResultData,
          opponent: action.opponent,
          modified: action.modified,
        };
    }

    case "SET_GAMERRESULTDATA_ATTEMPTS": {
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_OPPONENT - action.attemptsMade =: ",
        action.attemptsMade
      );
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_OPPONENT - action.inCorrectAttempts =: ",
        action.inCorrectAttempts
      );
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_OPPONENT - action.numberCorrect =: ",
        action.numberCorrect
      );
        return {...gamerResultData,
          attemptsMade: action.attemptsMade,
          inCorrectAttempts: action.inCorrectAttempts,
          numberCorrect: action.numberCorrect,
          modified: action.modified,
        };
    }

    case "SET_GAMERRESULTDATA_READYTOSAVE": {
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_READYTOSAVE - action.readyToSave: = ",
        action.readyToSave
      );
        return {...gamerResultData,
          readyToSave: action.readyToSave,
          modified: action.modified,
        };
    }

    case "SET_GAMERRESULTDATA_MODIFIED": {
      console.log(
        "gamerResultDataReducer - SET_GAMERRESULTDATA_MODIFIED - action.modified: = ",
        action.modified
      );
        return {...gamerResultData,
          modified: action.modified,
        };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return gamerResultData;
    }
  }
};
