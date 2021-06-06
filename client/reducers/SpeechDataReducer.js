
export const speechDataReducer = (speechData, action) => {
  switch (action.type) {
    case "INITIATE_SPEECHDATA": {
      console.log(
        "speechDataReducer - INITIATE_SPEECHDATA - action.speechData =: ",
        action.speechData
      );
      if (action.speechData != undefined && action.speechData != null)
      {
        return {
          speechReference:action.speechData.speechReference,
          primaryUtteranceObject: action.speechData.primaryUtteranceObject,
          secondaryUtteranceObject: action.speechData.secondaryUtteranceObject,
          primaryVoiceOptions: action.speechData.primaryVoiceOptions,
          secondaryVoiceOptions: action.speechData.secondaryVoiceOptions,
          primaryVoiceLang: action.speechData.primaryVoiceLang,
          secondaryVoiceLang: action.speechData.secondaryVoiceLang,
          primaryVoicePitch: action.speechData.primaryVoicePitch,
          secondaryVoicePitch: action.speechData.secondaryVoicePitch,
          primaryVoiceRate: action.speechData.primaryVoiceRate,
          secondaryVoiceRate: action.speechData.secondaryVoiceRate,
          primaryVoiceObject: action.speechData.primaryVoiceObject,
          secondaryVoiceObject: action.speechData.secondaryVoiceObject,
          primaryVoiceVolume: action.speechData.primaryVoiceVolume,
          secondaryVoiceVolume: action.speechData.secondaryVoiceVolume,
          primaryIntro: action.speechData.primaryIntro,
          secondaryIntro: action.speechData.secondaryIntro,
          modified: action.speechData.modified,
        };
      } else 
      {
        return speechData;
      }
    }
    case "SET_SPEECHDATA_SPEECHREFERENCE": {
      console.log(
        "speechDataReducer - SET_SPEECHDATA_SPEECHREFERENCE - action.SpeechReference =: ",
        action.SpeechReference
      );
        return {...speechData,
          speechReference: action.SpeechReference,
          modified: true,
        };
    }
    case "SET_SPEECHDATA_PRIMARYUTTERANCEOBJECT": {
      console.log(
        "speechDataReducer - SET_SPEECHDATA_PRIMARYUTTERANCEOBJECT - action.primaryUtteranceObject =: ",
        action.primaryUtteranceObject
      );
        return {...speechData,
          primaryUtteranceObject: action.primaryUtteranceObject,
          modified: true,
        };
    }
    case "SET_SPEECHDATA_SECONDARYUTTERANCEOBJECT": {
      console.log(
        "speechDataReducer - SET_SPEECHDATA_SECONDARYUTTERANCEOBJECT - action.secondaryUtteranceObject =: ",
        action.secondaryUtteranceObject
      );
        return {...speechData,
          secondaryUtteranceObject: action.secondaryUtteranceObject,
          modified: true,
        };
    }

    case "SET_SPEECHDATA_PRIMARYVOICEOBJECT": {
      console.log(
        "speechDataReducer - SET_SPEECHDATA_PRIMARYVOICEOBJECT - action.PrimaryVoiceObject =: ",
        action.PrimaryVoiceObject
      );
        return {...speechData,
          primaryVoiceObject: action.PrimaryVoiceObject,
          modified: true,
        };
    }
    case "SET_SPEECHDATA_SECONDARYVOICEOBJECT": {
      console.log(
        "speechDataReducer - SET_SPEECHDATA_SECONDARYVOICEOBJECT - action.SecondaryVoiceObject =: ",
        action.SecondaryVoiceObject
      );
        return {...speechData,
          secondaryVoiceObject: action.SecondaryVoiceObject,
          modified: true,
        };
    }

    case "SET_SPEECHDATA_INTROS": {
      console.log(
        "speechDataReducer - SET_SPEECHDATA_INTROS - action.intro.primary =: ",
        action.intro.primary
      );
      console.log(
        "speechDataReducer - SET_SPEECHDATA_INTROS - action.intro.secondary =: ",
        action.intro.secondary
      );
        return {...speechData,
          primaryIntro: action.intro.primaryIntro,
          secondaryIntro: action.intro.secondaryIntro,
          modified: true,
        };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return speechData;
    }
  }
};
