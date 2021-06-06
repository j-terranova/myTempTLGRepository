import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import Popup from "../../components/shared/Popup";
import auth from "../../auth/auth-helper";
import GamerCriteria from "../shared/gamerCriteria";
import GamerLineItemListing from "../shared/gamerLineItemListing";
import { getInProgressGamePlayedBySubType} from "../results/api-gamerResult";
import { listByCriteria  as listGameResultsByCriteria} from "../results/api-gamerResult";
import { listByCriteria as listTriviaByCriteria } from "./../../frameworks/trivia/api-frameworkTrivia";
import { readById as readTriviaById } from "./../../frameworks/trivia/api-frameworkTrivia";
import { listByDifficultyLevelRange } from "./../../frameworks/trivia/api-frameworkTrivia";

import DisplayPreparerContainer from "../../display/displayPreparerContainer";

import { useCriteria, useCriteriaDispatch } from "../../contexts/CriteriaContext";
import TriviaScoring from "../../utilities/scoring"
import { useGamerPreferences } from "../../contexts/GamerPreferencesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    outerColumn: {
      borderRight: "1px solid grey",
      borderBottom: "1px solid grey",
      borderLeft: "1px solid grey"
    },
    centerColumn: {
      borderBottom: "1px solid grey"
    }
  },
  paper: {
    padding: theme.spacing(0),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));


export default function TriviaContainer() {
  const classes = useStyles();
  const gamerPreferences = useGamerPreferences();
  const [selected, setSelected] = useState([]);
  const currentCriteria = useCriteria();
  const criteriaDispatch = useCriteriaDispatch();
  const [page, setPage] = useState(0);
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const listingTitle = "Trivia Listing";
  const [openDisplayContainerPopup,setOpenDisplayContainerPopup] = useState(false);
  const [displayFramework, setDisplayFramework] = useState({});
 
  const preferredGamerLevel = gamerPreferences.preferredGamerLevel;

   const [
    gamerLineItems,
    setGamerLineItems,
  ] = useState([]); 
   const [
    gamerLineItemsPreFilter,
    setGamerLineItemsPreFilter,
  ] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const getGameResultsByCriteria = () => {
    console.log( "gamerTriviaContainer -getGameResultsByCriteria- Inside handleApplyGameResult " );
    console.log( "gamerTriviaContainer -getGameResultsByCriteria- just before - listFrameworkByGameResult " );  
    const abortController = new AbortController();
    const signal = abortController.signal;
    listGameResultsByCriteria(  
        { userId: userId, },  
        { userId: userId,
          subType: "Trivia", 
          gamerStatus: "InProgress", },
        { t: jwt.token, },
        signal,
      ).then((data) => {
      if (!data) {
        console.log(
          "gamerTriviaContainer -getGameResultsByCriteria- No Data so dispatch, Check GameResult - !data", data
        );
        console.log(
          "gamerTriviaContainer -getGameResultsByCriteria- no error but no data so set to one blank record - dadta = ", data
        );
        setGamerLineItems([]);
        setGamerLineItemsPreFilter([]);
      } else {
        if (data.error) {
          console.log(
            "gamerTriviaContainer -getGameResultsByCriteria- error returned -data.error = " + data.error
          );
          console.log(
            "gamerTriviaContainer -getGameResultsByCriteria- no error but no data so set to one blank record - dada = ", data
          );
          setGamerLineItems([]);
          setGamerLineItemsPreFilter([]);
        } else if (data.length > 0) {
          console.log(
            "gamerTriviaContainer -getGameResultsByCriteria- data.length > 0 = " + data
          );
          const resultArray = data.map(lineItem => ({  
            topic: lineItem.topic,
            description: lineItem.description,
            subType: "Trivia",
            difficultyLevel: lineItem.difficultyLevel,
            gamerLevel: lineItem.gamerLevel,
            playTime: lineItem.playTime,
            gamerScore: lineItem.gamerScore,
            gamerStatus: lineItem.gamerStatus,
            frameworkId: lineItem.framework_id,
            gameResultId: lineItem._id, 
            }));
          setGamerLineItems(resultArray);
          setGamerLineItemsPreFilter(resultArray);
        } else {
          console.log(
            "gamerTriviaContainer -getGameResultsByCriteria- no error but no data so set to one blank record - dadta = ", data
          );
          setGamerLineItems([]);
          setGamerLineItemsPreFilter([]);
        }
      }
    })      
  }

  const handleRequestGamesPlayed = () => {
    getGameResultsByCriteria();
  }

  const getGameSuggestionsByPreferredGamerLevel = () => {
    console.log( "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- Start " );
     const abortController = new AbortController();
    const signal = abortController.signal;
    const minDifficultyLevel = TriviaScoring.getMinDifficultyLevel(preferredGamerLevel);
    const maxDifficultyLevel = TriviaScoring.getMaxDifficultyLevel(preferredGamerLevel);
    console.log( "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- minDifficultyLevel = ",minDifficultyLevel );
    console.log( "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- maxDifficultyLevel = ",maxDifficultyLevel );  

    listByDifficultyLevelRange(  
        { userId: userId, },  
        { minDifficultyLevel: minDifficultyLevel,
          maxDifficultyLevel: maxDifficultyLevel, 
          subType: "Trivia",},
        { t: jwt.token, },
        signal,
      ).then((data) => {
      if (!data) {
        console.log(
          "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- No Data so dispatch, Check GameResult - !data", data
        );
        console.log(
          "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- no error but no data so set to one blank record - dadta = ", data
        );
        setGamerLineItems([]);
        setGamerLineItemsPreFilter([]);
      } else {
        if (data.error) {
          console.log(
            "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- error returned -data.error = " + data.error
          );
          console.log(
            "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- no error but no data so set to one blank record - dada = ", data
          );
          setGamerLineItems([]);
          setGamerLineItemsPreFilter([]);
        } else if (data.length > 0) {
          console.log(
            "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- data.length > 0 = " + data
          );
          const resultArray = data.map(lineItem => ({  
            topic: lineItem.topic,
            description: lineItem.description,
            subType: "Trivia",
            difficultyLevel: lineItem.difficultyLevel,
            gamerLevel: preferredGamerLevel,
            playTime: 0,
            gamerScore: 0,
            gamerStatus: "",
            frameworkId: lineItem._id,
            gameResultId: "", 
            }));
          setGamerLineItems(resultArray);
          setGamerLineItemsPreFilter(resultArray);
        } else {
          console.log(
            "gamerTriviaContainer -getGameSuggestionsByPreferredGamerLevel- no error but no data so set to one blank record - dadta = ", data
          );
          setGamerLineItems([]);
          setGamerLineItemsPreFilter([]);
        }
      }
    })      
  }

  const handleRequestGamerLevelSuggestions = () => {
    getGameSuggestionsByPreferredGamerLevel();
  }

  const getListByCriteria = (values) => {   
    console.log(
      "gamerTriviaContainer - Update Listing whenever the critiera changes, currentCriteria = ",
      values
    );
    checkCurrentCriteria(values);
    if (values != undefined && values != null )
    {
      if (
        ((values.myClass != null &&
          values.category != null &&
          values.subject != null &&
          values.difficultyLevel != null &&
          values.ageRange != null &&
          values.topic != null) 
        &&
        (
          values.myClass.length != 0 ||
          values.category.length != 0 ||
          values.subject.length != 0 ||
          values.difficultyLevel.length != 0 ||
          values.ageRange.length != 0 ||
          values.topic.length != 0))
        ) {
        const myClassVar = values.myClass;
        const categoryVar = values.category;
        const subjectVar = values.subject;
        const difficultyLevelVar = values.difficultyLevel;
        const ageRangeVar = values.ageRange;
        const topicVar = values.topic;

        const abortController = new AbortController();
        const signal = abortController.signal;

        listTriviaByCriteria(
          { userId: userId, },
          {
            myClass: myClassVar,
            category: categoryVar,
            subject: subjectVar,
            difficultyLevel: difficultyLevelVar,
            ageRange: ageRangeVar,
            topic: topicVar,
          },
          {t: jwt.token,
          signal,
        }
        ).then((data) => {
          if (!data) {
            console.log(
              "gamerTriviaContainer - getTriviasByCriteriaListing- No Data so dispatch, Check Criteria - !data", data
            );
            console.log(
              "gamerTriviaContainer - getTriviasByCriteriaListing- no error but no data so set to one blank record - dadta = ", data
            );
            setGamerLineItems([]);
            setGamerLineItemsPreFilter([]);
          } else {
            if (data.error) {
              console.log(
                "gamerTriviaContainer - getTriviasByCriteriaListing- error returned -data.error = " + data.error
              );
              console.log(
                "gamerTriviaContainer - getTriviasByCriteriaListing- no error but no data so set to one blank record - dadta = ", data
              );
              setGamerLineItems([]);
              setGamerLineItemsPreFilter([]);
            } else if (data.length > 0) {
              console.log(
                "gamerTriviaContainer - getTriviasByCriteriaListing- error returned -data.length > 0 = " + data
              );
              const resultArray = data.map(lineItem => ({  
                topic: lineItem.topic,
                description: lineItem.description,
                subType: "Trivia",
                difficultyLevel: lineItem.difficultyLevel,
                gamerLevel: 0,
                playTime: 0,
                gamerScore: 0,
                gamerStatus: "",
                frameworkId: lineItem._id,
                gameResultId: "", 
                }));
              setGamerLineItems(resultArray);
              setGamerLineItemsPreFilter(resultArray);    
            } else {
              console.log(
                "gamerTriviaContainer - getTriviasByCriteriaListing- no error but no data so set to one blank record - dadta = ", data
              );
              setGamerLineItems([]);
              setGamerLineItemsPreFilter([]);
            }
          }
        })
      } else{
        setGamerLineItems([]);
        setGamerLineItemsPreFilter([]);
      }
    } else {
      setGamerLineItems([]);
      setGamerLineItemsPreFilter([]);
    }
  }

  const handleApplyCriteria = (values) => {
    getListByCriteria(values);
    }

const updateDisplayFrameworkData = (baseGamerData,updatedIncludeConstructs,gameResultUpdates) =>{

   let priorSelectedValues = [];
   if (gameResultUpdates != undefined && gameResultUpdates != null) 
   {
     if (gameResultUpdates.includeConstructs.length > 0)
     {
       for (let i=0; i< gameResultUpdates.includeConstructs.length; i++)
       {
          priorSelectedValues.push(gameResultUpdates.includeConstructs[i].selectedValues[0]);
       }
     }
   }  

  setDisplayFramework( 
    {
      userId: userId,
      framework_id: baseGamerData._id,
      description: baseGamerData.description,
      topic: baseGamerData.topic,
      myClass: baseGamerData.myClass,
      category: baseGamerData.category,
      subject: baseGamerData.subject,
      type: baseGamerData.type,
      subType: "Trivia",
      difficultyLevel: baseGamerData.difficultyLevel,
      ageRange: baseGamerData.ageRange,
      image_id: baseGamerData.image_id,
      imageFileName: baseGamerData.imageFileName,
      owner_id: baseGamerData.owner_id,
      group_id:  baseGamerData.group_id,
      keepPrivate:  baseGamerData.keepPrivate,
      approvedForPublicUse: baseGamerData.approvedForPublicUse,
      frameworkLayoutFormat: baseGamerData.frameworkLayoutFormat,
      frameworkResponseFormat: baseGamerData.frameworkResponseFormat,
      frameworkPresentationMethod: baseGamerData.frameworkPresentationMethod,
      frameworkSolutionMethod: baseGamerData.frameworkSolutionMethod,
      frameworkIncludeSpeech: baseGamerData.frameworkIncludeSpeech,
      frameworkIncludeTimer: baseGamerData.frameworkIncludeTimer,
      frameworkIncludeScoring: baseGamerData.frameworkIncludeScoring,
      frameworkColor: baseGamerData.frameworkColor,
      includeConstructs: (updatedIncludeConstructs != undefined && updatedIncludeConstructs != null) ? updatedIncludeConstructs : [],
      markDeleted: baseGamerData.markDeleted,
      createDate: baseGamerData.createDate,
      updatedBy: baseGamerData.updatedBy, 
      gamerLevel: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.gamerLevel : 4,
      playTime: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.playTime : 0,
      gamerScore: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.gamerScore : 0,
      gamerLevelMaxScore: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.gamerLevelMaxScore : 0,
      inCorrectAttempts: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.inCorrectAttempts : 0,
      numberCorrect: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.numberCorrect : 0,       
      gamerStatus:(gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.gamerStatus: "PreStart",
      opponent: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.opponent: "Automatic",
      opponentResponseFrequency: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.opponentResponseFrequency:85,
      winLossDraw: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.winLossDraw: "PreStart",
      startDate: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.startDate : null,
      completedDate: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.completedDate : null,
      updateDate: (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates.updateDate : null,
      gamerResult_id:  (gameResultUpdates != undefined && gameResultUpdates != null) ?  gameResultUpdates._id : "",
      modified: false,
    });

}
    
const getTriviaGameResults = (frameworkId, triviaData) => {
  console.log("gamerTriviaContainer - getTriviaGameResults - Start, just before getGamingResults " );

  console.log("gamerTriviaContainer - getTriviaGameResults - frameworkId ",frameworkId );
  console.log("gamerTriviaContainer - getTriviaGameResults - triviaData ",triviaData );
  const abortController = new AbortController();
  const signal = abortController.signal;
  getInProgressGamePlayedBySubType(
    { userId: userId, },
    { userId: userId, 
      framework_id: frameworkId,
      subType: "Trivia", 
      gamerStatus: "InProgress", },
    { t: jwt.token},
    signal,
    ).then((data) => {
      if (data != null && data.error) {
        console.log(
          "gamerTriviaContainer - getTriviaGameResults - error returned -data.error = " + data.error
        );
      } else if (data) {
        console.log(
          "gamerTriviaContainer - getTriviaGameResults -data.length > 0 = " + data
        );       
        let newIncludeConstructs = [];
        const gamerResults = data;
        console.log("gamerTriviaContainer - getTriviaGameResults - gamerResults ",gamerResults );
        console.log("gamerTriviaContainer - getTriviaGameResults - gamerResults.includeConstructs ",gamerResults.includeConstructs );
        console.log("gamerTriviaContainer - getTriviaGameResults - data ",triviaData );
        console.log("gamerTriviaContainer - getTriviaGameResults.includeConstructs - data ",triviaData.includeConstructs );

        if (triviaData.includeConstructs.length === gamerResults.includeConstructs.length)
        {
          for (let i = 0; i<gamerResults.includeConstructs.length; i++)
          {
            console.log("gamerTriviaContainer - Inside For loop to add gamerResults.includeConstructs! ");
            let newComponent = {}
            if ((triviaData.includeConstructs[i].sequenceNo === gamerResults.includeConstructs[i].sequenceNo) && 
            ( triviaData.includeConstructs[i].constructId === gamerResults.includeConstructs[i].constructId))
            {
              console.log("gamerTriviaContainer -getTriviaGameResults- Sequence No and Construct Ids match! ",gamerResults.includeConstructs[i].sequenceNo);
              newComponent = 
              { sequenceNo: gamerResults.includeConstructs[i].sequenceNo,
                constructDetail: triviaData.includeConstructs[i].constructDetail,
                type: triviaData.includeConstructs[i].type,
                subType: triviaData.includeConstructs[i].subType,
                constructPrimaryColumn: gamerResults.includeConstructs[i].constructPrimaryColumn,
                constructOptionsSource: triviaData.includeConstructs[i].constructOptionsSource,
                constructNumberOfOptions:triviaData.includeConstructs[i].constructNumberOfOptions,
                constructResponseFormat: triviaData.includeConstructs[i].constructResponseFormat,
                constructColor: triviaData.includeConstructs[i].constructColor,
                optionChoices: [],
                correctResponses:gamerResults.includeConstructs[i].correctResponses,
                selectedValues: gamerResults.includeConstructs[i].selectedValues,
                responseStatus: gamerResults.includeConstructs[i].responseStatus,
                constructId: gamerResults.includeConstructs[i].constructId,
                };

            } else
            {
              console.log("gamerTriviaContainer -getTriviaGameResults- Sequence No and Construct Ids DO NOT MATCH! ",gamerResults.includeConstructs[i].sequenceNo);
              newComponent = 
              { sequenceNo: triviaData.includeConstructs[i].sequenceNo,
                constructDetail: triviaData.includeConstructs[i].constructDetail,
                type: triviaData.includeConstructs[i].type,
                subType: triviaData.includeConstructs[i].subType,
                constructPrimaryColumn: triviaData.includeConstructs[i].constructPrimaryColumn,
                constructOptionsSource: triviaData.includeConstructs[i].constructOptionsSource,
                constructNumberOfOptions: triviaData.includeConstructs[i].constructNumberOfOptions,
                constructResponseFormat: triviaData.includeConstructs[i].constructResponseFormat,
                constructColor: triviaData.includeConstructs[i].constructColor,
                optionChoices: [],
                correctResponses: triviaData.includeConstructs[i].correctResponses,
                selectedValues:  [],
                responseStatus: "",
                constructId: triviaData.includeConstructs[i].constructId,
              };
            }
            newIncludeConstructs.push(newComponent);
          }
          updateDisplayFrameworkData(triviaData,newIncludeConstructs,gamerResults)
        } else
        {
        console.log("gamerTriviaContainer -getTriviaGameResults- lengths DO NOT MATCH! ",gamerResults.includeConstructs.length );
        for (let i = 0; i<triviaData.includeConstructs.length; i++)
        {
            newComponent = 
            { sequenceNo: triviaData.includeConstructs[i].sequenceNo,
              constructDetail: triviaData.includeConstructs[i].constructDetail,
              type: triviaData.includeConstructs[i].type,
              subType: triviaData.includeConstructs[i].subType,
              constructPrimaryColumn: triviaData.includeConstructs[i].constructPrimaryColumn,
              constructOptionsSource: triviaData.includeConstructs[i].constructOptionsSource,
              constructNumberOfOptions: triviaData.includeConstructs[i].constructNumberOfOptions,
              constructResponseFormat: triviaData.includeConstructs[i].constructResponseFormat,
              constructColor: triviaData.includeConstructs[i].constructColor,
              optionChoices: [],
              correctResponses: triviaData.includeConstructs[i].correctResponses,
              selectedValues:  [],
              responseStatus: "",
              constructId: triviaData.includeConstructs[i].constructId,
              };
              newIncludeConstructs.push(newComponent);
        }  
      }

      updateDisplayFrameworkData(triviaData,newIncludeConstructs,gamerResults)              
      } else {
        console.log(
          "gamerTriviaContainer - getTriviaGameResults - no error but no data so set to one blank record - data = ", data
        );
        let newIncludeConstructs = [];
        let newComponent = {};
        for (let i = 0; i<triviaData.includeConstructs.length; i++)
        {
            newComponent = 
            { sequenceNo: triviaData.includeConstructs[i].sequenceNo,
              constructDetail: triviaData.includeConstructs[i].constructDetail,
              type: triviaData.includeConstructs[i].type,
              subType: triviaData.includeConstructs[i].subType,
              constructPrimaryColumn: triviaData.includeConstructs[i].constructPrimaryColumn,
              constructOptionsSource: triviaData.includeConstructs[i].constructOptionsSource,
              constructNumberOfOptions: triviaData.includeConstructs[i].constructNumberOfOptions,
              constructResponseFormat: triviaData.includeConstructs[i].constructResponseFormat,
              constructColor: triviaData.includeConstructs[i].constructColor,
              optionChoices: [],
              correctResponses: triviaData.includeConstructs[i].correctResponses,
              selectedValues:  [],
              responseStatus: "",
              constructId: triviaData.includeConstructs[i].constructId,
              };
              newIncludeConstructs.push(newComponent);
        } 
        updateDisplayFrameworkData(triviaData,newIncludeConstructs,null)  
      }
  })
}
const getSelectedTrivia = (frameworkId) =>
{
  const abortController = new AbortController();
  const signal = abortController.signal;
  readTriviaById(
      { userId: userId, },
      { id: frameworkId},  //frameworkId = selected[0]
      {
        t: jwt.token,
      },
      signal,
    ).then((data) => {
        if (!data) {
          console.log(
            "gamerCriteriaFrameworkContainer - getSelectedTrivia - no error but no data so set to one blank record - data = ", data
          );
          setNotify({
            isOpen: true,
            message: "Record NOT available! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else {
          if (data.error) {
            console.log(
              "gamerCriteriaFrameworkContainer - getSelectedTrivia - error returned -data.error = " + data.error
            );
            setNotify({
              isOpen: true,
              message: "Record NOT available! Please try again.. Notify Administrator if problem persists.",
              type: "error",
            });
          } else if (data) {
            console.log(
              "gamerCriteriaFrameworkContainer - getSelectedTrivia -data.length > 0 = " + data
            );
            getTriviaGameResults(frameworkId, data);
              
          } else {
            console.log(
              "gamerCriteriaFrameworkContainer - getSelectedTrivia - no error but no data so set to one blank record - dadta = ", data
            );
          }
        }
      })
}

  const handleSelectedGaming = () => {
    console.log("gamerTriviaContainer - handleSelectedGaming - Start, just before getSelectedTrivia - selected[0] =", selected[0] );
    getSelectedTrivia(selected[0]);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listGameResultsByCriteria(
      { userId: userId, },
      { userId: userId,
        subType: "Trivia", 
        gamerStatus: "InProgress", },
      {t: jwt.token,},
      signal,
      ).then((data) => {
          if (!data) {
            console.log(
              "GamerTriviaContainer-useEffect-listGameResultsByCriteria - No Data "
            );
          } else {
            if (data.error) {
              console.log(
                "GamerTriviaContainer-useEffect-listGameResultsByCriteria  - error returned = " + data.error
              );
            } else if (data.length > 0) {
              console.log(
                "GamerTriviaContainer-useEffect-listGameResultsByCriteria  - data =  ",
                data
              );
              const resultArray = data.map(lineItem => ({  
                topic: lineItem.topic,
                description: lineItem.description,
                subType: "Trivia",
                difficultyLevel: lineItem.difficultyLevel,
                gamerLevel: lineItem.gamerLevel,
                playTime: lineItem.playTime,
                gamerScore: lineItem.gamerScore,
                gamerStatus: lineItem.gamerStatus,
                frameworkId: lineItem.framework_id,
                gameResultId: lineItem._id, 
                }));
                setGamerLineItems(resultArray);
                setGamerLineItemsPreFilter(resultArray);
            }
          }
      })
      setPage(0);
      return function cleanup() {
      abortController.abort();
    };
  },[]);


  useEffect(() => {
    console.log(
      "GamerContainer - change to displayFramework = ", displayFramework );     
      if (displayFramework != null && displayFramework.includeConstructs != undefined )
      {
        console.log(
          "GamerContainer - right before running opening DisplayContainerPrep "); 
        setOpenDisplayContainerPopup(true) 
      } else
      {
        console.log(
          "GamerContainer - skips running of DisplayContainerPrep displayFramework.includeConstructs = ",displayFramework.includeConstructs); 
      }        
  }, [displayFramework]);

  console.log(
    "gamerTriviaContainer - right after start of currentCriteria = ",
    currentCriteria
  );

  const checkCurrentCriteria = (valuesToCheck) =>
  {
    console.log(
      "gamerTriviaContainer - checkCurrentCriteria = ",
      currentCriteria
    );
    if (valuesToCheck != undefined && valuesToCheck != null)
    {
      if (
        valuesToCheck.myClass != currentCriteria.myClass ||
        valuesToCheck.category != currentCriteria.category ||
        valuesToCheck.subject != currentCriteria.subject ||
        valuesToCheck.difficultyLevel != currentCriteria.difficultyLevel ||
        valuesToCheck.ageRange != currentCriteria.ageRange ||
        valuesToCheck.topic != currentCriteria.topic 
      )
      {
        console.log(
          "gamerTriviaContainer - checkCurrentCriteria - Criteria found to have changed, valuesToCheck = ",
          valuesToCheck
        );
        criteriaDispatch({
          type: "SET_CRITERIAFROMCURRENTITEM",
          currentSourceOfCriteria: valuesToCheck,
        });
      }
      else{
        console.log(
          "gamerTriviaContainer - checkCurrentCriteria - Criteria did not change" );
      }
    }      else{
      console.log(
        "gamerTriviaContainer - checkCurrentCriteria - Criteria did not change" );
    }
  }

  return (
    <>
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
            <Grid item xs={9} >             
                <GamerLineItemListing 
                selected = {selected}
                setSelected = {setSelected}
                gamerLineItems = {gamerLineItems}
                setGamerLineItems = {setGamerLineItems}
                gamerLineItemsPreFilter ={gamerLineItemsPreFilter}
                updateGamerLineItem={false}
                handleRequestGamesPlayed ={handleRequestGamesPlayed}
                handleRequestGamerLevelSuggestions={handleRequestGamerLevelSuggestions}
                handleSelectedGaming = {handleSelectedGaming}
                page = { page}
                setPage = { setPage}
                listingTitle={listingTitle}
                />
            </Grid>
            <Grid item xs={3} >
              {" "}
              <Paper className={classes.paper}>
                {" "}
                <GamerCriteria 
                  handleApplyCriteria={handleApplyCriteria}
                  />
                </Paper>
             </Grid>
             </Grid>
     </Paper>
    </div>
    <Popup
          title="Trivia for Smarties"
          openPopup={openDisplayContainerPopup}
          setOpenPopup={setOpenDisplayContainerPopup}
          formValues = {displayFramework}
          setFormValues = {setDisplayFramework}
      >
          <DisplayPreparerContainer
              setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
              displayFramework = {displayFramework}
              setDisplayFramework={setDisplayFramework}
          />
      </Popup>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

