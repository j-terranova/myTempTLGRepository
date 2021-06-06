import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {DisplayTabularContainer} from "./displayTabularContainer";
import {DisplayTicTacToeContainer} from "./displayTicTacToeContainer";
import {DisplayTriviaContainer} from "./displayTriviaContainer";
import Notification from "../components/shared/Notification";

import auth from "../auth/auth-helper";
import {create, update} from "../gamers/results/api-gamerResult"
import { useGamerPreferences } from "../contexts/GamerPreferencesContext";
import { useGamerResultData, useGamerResultDataDispatch } from "../contexts/GamerResultDataContext";
import GameScoring from "../utilities/scoring"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function DisplayGamerSwitchContainer(props) {
  const { 
    setOpenDisplayContainerPopup,
    displayFramework,
    setDisplayFramework,
    finalDisplayConstructs,
    setFinalDisplayConstructs,
    numberOfConstructs,
    okToChange,
    setOkToChange,} = props;

    const classes = useStyles();

    const [timerOn, setTimerOn] = useState();
    const [time, setTime] = useState();
    const gamerPreferences = useGamerPreferences();
    const jwt = auth.isAuthenticated();
    const userId = jwt.user._id;
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
    const [completed, setCompleted] = useState(false);
    const gamerResultData = useGamerResultData();
    const gamerResultDataDispatch = useGamerResultDataDispatch();

  console.log( "DisplayGameSwitchContainer  displayFramework = ", displayFramework );

  console.log("DisplayGameSwitchContainer - start - displayFramework = ", displayFramework );
  console.log("DisplayGameSwitchContainer - start - finalDisplayConstructs = ", finalDisplayConstructs );

   
  const updateGamerResultDataComplete = (winLossDraw, totalAttempts, numberCorrect, inCorrectAttempts, selected, startDate, stopDate) => {
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-gamerResultData = ", gamerResultData);
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-winLossDraw = ", winLossDraw);

    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-totalAttempts = ", totalAttempts);
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-numberCorrect = ", numberCorrect);
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-inCorrectAttempts = ", inCorrectAttempts);
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-selected = ", selected);

    const gamerLevelMaxScore = GameScoring.getGamerLevelMaxScore(gamerResultData.gamerLevel);
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - gamerLevelMaxScore = ", gamerLevelMaxScore);

    const rT = (stopDate - startDate)/1000;
    const runTime = rT.toPrecision(2);

    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-gamerResultData.startDate = ", startDate);
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-stopDate = ", stopDate);
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - BEFORE UPDATE-runTime = ", runTime);

    const gamerScore = 0;
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - gamerScore = ", gamerScore);

    let inquiryCount = finalDisplayConstructs.length;
    let inCorrectCount = 0;
    let unAnsweredCount = 0;
    let gamerStatus = "";
    let winLossStatus = "";
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - gamerResultData = ", gamerResultData);
    switch(gamerResultData.subType) {
      case "Matching": 
        if (numberCorrect > 0 || inCorrectAttempts > 0)
        {
          if (numberCorrect < inquiryCount)
          {
            unAnsweredCount = inquiryCount - numberCorrect;
          }
          inCorrectCount = unAnsweredCount + inCorrectAttempts;
        }
        if (unAnsweredCount === 0)
        {
          gamerStatus = "Complete";
        } else if (winLossDraw != "InProgress")
        {
          gamerStatus = "Complete";
        } else
        {
          gamerStatus = "InProgress";
        }
    
        if (unAnsweredCount === 0 && winLossDraw === "InProgress")
        {
          winLossStatus = "Win";
        } else 
        {
          winLossStatus = winLossDraw;
        } 
        break;
      case "TicTacToe": 
        inCorrectCount = inCorrectAttempts;
        gamerStatus = winLossStatus === "InProgress" ? "InProgress" : "Complete"
        winLossStatus = winLossDraw;
        break;
      case "Trivia": 
        inCorrectCount = inCorrectAttempts;
        gamerStatus = winLossStatus === "InProgress" ? "InProgress" : "Complete"
        winLossStatus = winLossDraw;
        break;
      default:

        break;
    }



    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - unAnsweredCount = ", unAnsweredCount);
    console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - inCorrectCount = ", inCorrectCount);




    let gamerResultComplete = {
        playTime: runTime,
        gamerScore: gamerScore,
        gamerLevelMaxScore: gamerLevelMaxScore,
        attemptsMade: totalAttempts,
        inCorrectAttempts: inCorrectCount,
        numberCorrect: numberCorrect,
        gamerStatus: gamerStatus,
        winLossDraw: winLossStatus,
        selectedValues: selected,
        completedDate: stopDate,
        readyToSave: true,
        modified: true,
    }
    gamerResultDataDispatch({
      type: "COMPLETE_GAMERRESULTDATA",
      gamerResultComplete: gamerResultComplete,
    });
  }

  const resetGamerResultData = () => {
    setDisplayFramework({ ...displayFramework, 
      gamerResult_id: null,
      modified: false });
      setTimerOn(false);
      setTime(0);

      let gamerResultReset = {
          playTime: 0,
          gamerScore: 0,
          gamerLevelMaxScore: 0,
          attemptsMade: 0,
          inCorrectAttempts: 0,
          numberCorrect: 0,
          gamerStatus: "PreStart",
          winLossDraw: "PreStart",
          selectedValues: [],
          startDate: null,
          completedDate: null,
          updateDate: null,
          gamerResult_id: null,
          readyToSave: false,
          modified: false,
        }
        gamerResultDataDispatch({
          type: "RESET_GAMERRESULTDATA",
          gamerResultReset: gamerResultReset,
        });
  }

  const saveGamerResult = () => {
    console.log("DisplayGamerSwitchContainer - Add Save Results here " );
    let listOfconstructs = [];
    let respStatus = "";
    let gamerStatus = "Complete";
    let numberCorrect = 0;
    let inCorrectAttempts = 0;
    let attemptsMade = 0;

      for (let i = 0; i < finalDisplayConstructs.length; i++)
      {
        if  (finalDisplayConstructs[i].correctResponses[0] === finalDisplayConstructs[i].selectedValues[0])
        { 
          respStatus = "Correct";
          numberCorrect=numberCorrect+1;
        }
          else
        { 
          if (finalDisplayConstructs[i].selectedValues[0] != undefined &&
            finalDisplayConstructs[i].selectedValues[0] != null &&
            finalDisplayConstructs[i].selectedValues[0] != "")
          {
            respStatus = "InCorrect"
           }else 
          {
            respStatus = "NoResponse";
            gamerStatus = "InProgress";
          }
          inCorrectAttempts=inCorrectAttempts+1;
        }
        attemptsMade = attemptsMade+1;

        let nextConstruct = {
          sequenceNo: finalDisplayConstructs[i].sequenceNo,
          constructPrimaryColumn: finalDisplayConstructs[i].constructPrimaryColumn,
          correctResponses:finalDisplayConstructs[i].correctResponses,
          selectedValues: finalDisplayConstructs[i].selectedValues,
          responseStatus: respStatus,
          constructId: finalDisplayConstructs[i].constructId,
        }

        listOfconstructs.push(nextConstruct);
      }

      if (gamerResultData.gamerStatus === "Complete")
      {
        gamerStatus = "Complete";
      }
      let winLossDraw =   (gamerResultData.winLossDraw === "Win") ? "Win" :
                          (gamerResultData.winLossDraw === "Loss") ? "Loss" :
                          (gamerResultData.winLossDraw === "Complete") ? "Win" : "InProgress";
      let gamerScore = 0;
      if (gamerResultData.gamerScore===0)
      {
        gamerScore = GameScoring.getGamerScore(gamerResultData.gamerLevel, gamerResultData.playTime, inCorrectAttempts,winLossDraw)
        console.log( "DisplayGamerSwitchContainer - updateGamerResultDataComplete - gamerScore = ", gamerScore);
      }

      if (winLossDraw != "InProgress")
      {
        setCompleted(true);
      }
      
      let newGamerResult = {
        userId: gamerResultData.userId,
        framework_id: gamerResultData.framework_id,
        description: gamerResultData.description,
        topic: gamerResultData.topic,
        myClass: gamerResultData.myClass,
        category:gamerResultData.category,
        subject: gamerResultData.subject,
        type: gamerResultData.type,
        subType: gamerResultData.subtype,
        playerLevel: gamerResultData.playerLevel,
        gamerLevel: gamerResultData.gamerLevel,
        playTime: gamerResultData.playTime,
        gamerScore: gamerResultData.gamerScore===0?gamerScore:gamerResultData.gamerScore,
        gamerLevelMaxScore: gamerResultData.gamerLevelMaxScore,
        attemptsMade: (gamerResultData.attemptsMade>0)?gamerResultData.attemptsMade:attemptsMade,
        inCorrectAttempts: (gamerResultData.inCorrectAttempts>0)?gamerResultData.inCorrectAttempts:inCorrectAttempts,
        numberCorrect: (gamerResultData.numberCorrect>0)?gamerResultData.numberCorrect:numberCorrect,
        gamerStatus: gamerStatus,
        opponent: gamerResultData.opponent,
        winLossDraw: winLossDraw,
        includeConstructs: listOfconstructs,
        startDate:gamerResultData.startDate,
        completedDate:  gamerStatus === "InProgress" ? null : Date.now(),
        updateDate: Date.now(),       
      };

      console.log("DisplayGamerSwitchContainer - inserting new gamerResultData.gamerResult_id = ", gamerResultData.gamerResult_id );
      if (  gamerResultData.gamerResult_id === undefined ||
            gamerResultData.gamerResult_id === null ||
            gamerResultData.gamerResult_id === "")
      {
        console.log("DisplayGamerSwitchContainer - inserting new GamerResultData = ", newGamerResult );
        insertGamerResult(newGamerResult);      
      } else
      {
        //gamerResult._id =  gamerResultData.gamerResult_id,
        console.log("DisplayGamerSwitchContainer - updating GamerResultData = ", newGamerResult );
        newGamerResult._id = gamerResultData.gamerResult_id
        console.log("DisplayGamerSwitchContainer - updating GamerResultData.gamerResult_id = ", newGamerResult.gamerResult_id );
        updateGamerResult(newGamerResult);
      }
      
      //if (gamerResultData.gamerStatus === "Complete")
      //{
      //  setOpenDisplayContainerPopup(false);
      //}
    }

    const updateGamerResult = (gamerResult) =>
    {
      console.log(
        "DisplayGamerSwitchContainer -  updategamerResult just before update - gamerResult = ", gamerResult
      );
      update(
        {
          userId: userId,
        },
        {
          t: jwt.token,
        },
        gamerResult
      ).then((data) => {
        if (!data) {
          console.log(
            "DisplayGamerSwitchContainer - No data returned from the gamerResult update"
          );
        } else {
          if (data.error) {
            console.log(
              "DisplayGamerSwitchContainer - update failed, error returned from the gamerResult update = " + data.error
            );
          } else {       
            console.log(
              "DisplayGamerSwitchContainer - gamerResult update Successful!!!"
            );
            console.log(
              "DisplayGamerSwitchContainer - gamerResultData.gamerStatus =",gamerResultData.gamerStatus
            );
            if (gamerResultData.gamerStatus ==="Complete")
            {
              resetGamerResultData();
            } else 
            {
              gamerResultDataDispatch({
                type: "SET_GAMERRESULTDATA_READYTOSAVE",
                readyToSave: false,
                modified: false,
              });
            }
            setNotify({
              isOpen: true,
              message: "Changes Saved!",
              type: "success",
            });
          }
        }
      }); // End of Update function
    }

    const insertGamerResult = (gamerResult) =>
    {
      create(
        {
          userId: userId,
        },
        {
          t: jwt.token,
        },
        gamerResult
      ).then((data) => {
        if (!data) {
          console.log(
            "DisplayGamerSwitchContainer - No data returned from the gamerResult create "
          );
        } else {
          if (data.error) {
            console.log(
              "DisplayGamerSwitchContainer - DisplayGamerSwitchContainer - create failed, error returned from the gamerResult create = " + data.error
            );
          } else {
            console.log(
              "DisplayGamerSwitchContainer - gamerResult Create Successful!!!"
            );
            if (gamerResultData.gamerStatus ==="Complete")
            {
              resetGamerResultData();
            } else
            {
              setDisplayFramework({ ...displayFramework, 
                gamerResult_id: data._id,
                modified: false });

              gamerResultDataDispatch({
                type: "SET_GAMERRESULTDATA_ID",
                gamerResult_id: data._id,
                readyToSave: false,
                modified: false,
              });
            }
            setNotify({
              isOpen: true,
              message: "Changes Saved!",
              type: "success",
            });
          }
        }
      }); // End of Create function

    }

    useEffect (() => {
      setTimerOn(false);
      setTime(0);

      let gamerLevel =  gamerPreferences.preferredGamerLevel;
      if (gamerLevel == undefined || gamerLevel == null)
      {
        gamerLevel = 4;
      }
      const opponentResponseFrequency = GameScoring.getOpponentResponseFrequency(gamerLevel);
      const gamerLevelMaxScore = GameScoring.getGamerLevelMaxScore(gamerLevel);
    
      let gamerResultData = {
        userId: userId,
        framework_id: displayFramework.framework_id,
        description: displayFramework.description,
        topic: displayFramework.topic,
        myClass: displayFramework.myClass,
        category:displayFramework.category,
        subject: displayFramework.subject,
        type: displayFramework.type,
        subType: displayFramework.subType,
        difficultyLevel: displayFramework.difficultyLevel,
        ageRange: displayFramework.ageRange,
        playerLevel: gamerPreferences.playerLevel?gamerPreferences.playerLevel:4,
        gamerLevel: gamerLevel,
        playTime: displayFramework.playTime?displayFramework.playTime:0,
        gamerScore: displayFramework.gamerScore?displayFramework.gamerScore:0,
        gamerLevelMaxScore: gamerLevelMaxScore,
        attemptsMade: displayFramework.attemptsMade?displayFramework.attemptsMade:0,
        inCorrectAttempts: displayFramework.inCorrectAttempts?displayFramework.inCorrectAttempts:0,
        numberCorrect: displayFramework.numberCorrect?displayFramework.numberCorrect:0,
        gamerStatus: displayFramework.gamerStatus?displayFramework.gamerStatus:"PreStart",
        opponent: displayFramework.opponent?displayFramework.opponent:"Automatic",
        opponentResponseFrequency: opponentResponseFrequency?opponentResponseFrequency:85,
        winLossDraw: displayFramework.winLossDraw?displayFramework.winLossDraw:"PreStart",
        selectedValues: displayFramework.selectedValues?displayFramework.selectedValues:[],
        includeConstructs: displayFramework.includeConstructs?displayFramework.includeConstructs:[],
        startDate:displayFramework.startDate?displayFramework.startDate:null,
        completedDate: displayFramework.completedDate?displayFramework.completedDate:null,
        updateDate: null,
        gamerResult_id: displayFramework.gamerResult_id?displayFramework.gamerResult_id:null,
        readyToSave: false,
        modified: false,
      }

      gamerResultDataDispatch({
        type: "INITIATE_GAMERRESULTDATA",
        gamerResultData: gamerResultData,
      });
    }, []);

    useEffect(() => {
      console.log( "DisplayGamerSwitchContainer useEffect for gamerResultData = ", gamerResultData)
      if  (gamerResultData.readyToSave && 
          (gamerResultData.gamerStatus =="Win" || 
           gamerResultData.gamerStatus =="Complete" || 
           gamerResultData.gamerStatus =="InProgress"))
      {
          console.log( "DisplayGamerSwitchContainer gamerResultData = ", gamerResultData)
          
          setTimerOn(false);
          saveGamerResult()
      }
        
    }, [gamerResultData.readyToSave]);

//----------------------------------------------------
  return (
    <div>
        {(displayFramework.frameworkLayoutFormat === "Tabular") && 
        ( finalDisplayConstructs.length === numberOfConstructs) &&
            <DisplayTabularContainer
              setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
              displayFramework={displayFramework}
              setDisplayFramework={setDisplayFramework}
              finalDisplayConstructs={finalDisplayConstructs}
              setFinalDisplayConstructs={setFinalDisplayConstructs}
              numberOfConstructs={numberOfConstructs}
              time={time}
              setTime={setTime}
              timerOn={timerOn} 
              setTimerOn={setTimerOn} 
              updateGamerResultDataComplete={updateGamerResultDataComplete}   
              resetGamerResultData={resetGamerResultData}  
              />} 
        {(displayFramework.frameworkLayoutFormat === "TicTacToe") && 
        ( finalDisplayConstructs.length === numberOfConstructs) &&
            <DisplayTicTacToeContainer
              setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
              displayFramework={displayFramework}
              setDisplayFramework={setDisplayFramework}
              finalDisplayConstructs={finalDisplayConstructs}
              setFinalDisplayConstructs={setFinalDisplayConstructs}
              numberOfConstructs={numberOfConstructs}
              time={time}
              setTime={setTime}
              timerOn={timerOn} 
              setTimerOn={setTimerOn} 
              updateGamerResultDataComplete={updateGamerResultDataComplete}   
              resetGamerResultData={resetGamerResultData}  
              />} 
        {(displayFramework.frameworkLayoutFormat === "Trivia") && 
        ( finalDisplayConstructs.length === numberOfConstructs) && 
            <DisplayTriviaContainer
              setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
              displayFramework ={displayFramework}
              setDisplayFramework = {setDisplayFramework}
              finalDisplayConstructs = {finalDisplayConstructs}
              setFinalDisplayConstructs = {setFinalDisplayConstructs}
              numberOfConstructs  ={numberOfConstructs}
              okToChange = {okToChange}
              setOkToChange= {setOkToChange}
              completed= {completed}
              time={time}
              setTime={setTime}
              timerOn={timerOn} 
              setTimerOn={setTimerOn} 
              updateGamerResultDataComplete={updateGamerResultDataComplete}   
              resetGamerResultData={resetGamerResultData}  
              />} 
        <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
