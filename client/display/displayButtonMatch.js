import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Controls from "../controls/Controls";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useGamerResultData, useGamerResultDataDispatch } from "./../contexts/GamerResultDataContext";
import { useSpeechData, useSpeechDataDispatch } from "./../contexts/SpeechDataContext";

const useStyles = makeStyles((theme) => ({
    root: theme.mixins.gutters({
      paddingTop: 4,
      paddingBottom: 4,
      marginTop: theme.spacing(3),
      width: "100%",
      height: "100%",
   
      margin: "0 auto"
    }),
  }));

export const DisplayButtonMatch = (props)  => {
const   {   arrayOfMatchingItems,
            inquiryChoices,
            availableInquiryChoices,
            setAvailableInquiryChoices,
            responseChoices,
            displayTopic,
            displayDescription,
            displayFramework,
            setDisplayFramework,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            updateGamerResultDataComplete,
            turnTimerOnOff,
            current,
            setCurrent,
            selected,
            setSelected,
            numberCorrect, 
            setNumberCorrect,
            inCorrectAttempts, 
            setInCorrectAttempts,
            totalAttempts, 
            setTotalAttempts,
            } = props;

const classes = useStyles();

const speechData = useSpeechData();
const gamerResultData = useGamerResultData();
const gamerResultDataDispatch = useGamerResultDataDispatch();

const speechDataDispatch = useSpeechDataDispatch();

console.log("DisplayButtonMatch - useEffect - speechData = ", speechData);
const random = (array) => array[Math.floor(Math.random() * array.length)];

console.log("DisplayButtonMatch - start - arrayOfMatchingItems = ", arrayOfMatchingItems);
console.log("DisplayButtonMatch - start - inquiryChoices = ", inquiryChoices);
console.log("DisplayButtonMatch - start - responseChoices = ", responseChoices);

console.log("DisplayButtonMatch - started ");

const removeItemFromAvailableInquiryChoices = (currentInquiry) => {
  let newChoices = availableInquiryChoices;
  console.log("DisplayButtonMatch - removeItemFromAvailableInquiryChoices - currentInquiry = ", currentInquiry);
  for (let i=0; i< newChoices.length; i++)
  {
      if (newChoices[i].value === currentInquiry.value)
      {
          newChoices.splice(i, 1);
          break;
      }
  }
  setAvailableInquiryChoices(newChoices);
  console.log("DisplayButtonMatch - removeItemFromAvailableInquiryChoices - newChoices = ", newChoices);
  console.log("DisplayButtonMatch - removeItemFromAvailableInquiryChoices - newChoices.length = ", newChoices.length);
  if (newChoices.length === 0)
  {
    console.log("DisplayButtonMatch - useEffect - right before start of gameStop function");
    gameStop("Win");
  }
}

  const correct = (currentInquiry) => {
    const words = ["Good one!", "Great Job!", "You got it!"];
    console.log("DisplayButtonMatch - correct - words = ", words);
    speechData.secondaryUtteranceObject.text=random(words);
    setTimeout(() => {
      speechData.speechReference.current.speak(speechData.secondaryUtteranceObject);
    }, 500);

    setTotalAttempts(totalAttempts+1);
    setNumberCorrect(numberCorrect+1);
    removeItemFromAvailableInquiryChoices(currentInquiry);
  };
  
  const incorrect = () => {
    const words = ["Please Try Again", "Yuck!", "Nope, not this time", "Oops, you must have it the wrong button"];
    console.log("DisplayButtonMatch - inCorrect - words = ", words);
    speechData.secondaryUtteranceObject.text=random(words);
    setTimeout(() => {
      speechData.speechReference.current.speak(speechData.secondaryUtteranceObject);
    }, 500);

    setTotalAttempts(totalAttempts+1);
    setInCorrectAttempts(inCorrectAttempts+1);
  };

  const isMatch = (inquiryItem, responseItem) =>
  arrayOfMatchingItems.some(
    ([inquiryChoice, responseChoice]) =>
      (inquiryChoice === inquiryItem && responseChoice === responseItem) ||
      (inquiryChoice === responseItem && responseChoice === inquiryItem)
  );

  const choose = (choice) => {
    console.log("DisplayButtonMatch - choose choice = ", choice);
    console.log("DisplayButtonMatch - choose current = ", current);
    console.log("DisplayButtonMatch - choose - selected = ", selected);
    console.log("DisplayButtonMatch - choose - inquiryChoices = ", inquiryChoices);
    console.log ("DisplayButtonMatch - choose - Just before check - gamerResultData.startDate = ",gamerResultData.startDate);
    console.log ("DisplayButtonMatch - choose - Just before check - gamerResultData = ",gamerResultData);
    if (gamerResultData.startDate === null)
    {
        console.log ("BoardContainer - clickSquareHandler - inside Null Check - gamerResultData.startDate = ",gamerResultData.startDate);
        gamerResultDataDispatch({
            type: "SET_GAMERRESULTDATA_STARTDATE",
            startDate: Date.now(),
            modified: true,
        });
    } else if (!gamerResultData.modified)
    {
      gamerResultDataDispatch({
        type: "SET_GAMERRESULTDATA_MODIFIED",
        modified: true,
    });
    }
    turnTimerOnOff(true);
    if (current) {
      speechData.secondaryUtteranceObject.text = choice.value;
       speechData.speechReference.current.speak(speechData.secondaryUtteranceObject);
      if (isMatch(current.value, choice.value)) {
        correct(current);
        setSelected((val) => ({ ...val, [choice.value]: true }));
      } else {
        incorrect();
        setSelected((val) => ({ ...val, [current.value]: false }));
      }
      setCurrent(null);
    } else {
      speechData.primaryUtteranceObject.text = choice.value;
       speechData.speechReference.current.speak(speechData.primaryUtteranceObject);
      setSelected((val) => ({ ...val, [choice.value]: true }));
      setCurrent(choice);
    }
    console.log("DisplayButtonMatch - isMatch - choose = ", choose);
  };

  const gameStop = (winLossDraw) => {
    console.log( "DisplayButtonMatch - gameStop - winLossDraw = ", winLossDraw);
    const stopDate = Date.now();
    const startDate = gamerResultData.startDate;      
    updateGamerResultDataComplete(winLossDraw, totalAttempts, numberCorrect, inCorrectAttempts, selected, startDate, stopDate)
}

useEffect(() => {
    console.log("DisplayButtonMatch - useEffect - availableInquiryChoices = ", availableInquiryChoices);
    console.log("DisplayButtonMatch - useEffect - availableInquiryChoices.length = ", availableInquiryChoices.length);
    if (availableInquiryChoices.length === 0)
    {
      console.log("DisplayButtonMatch - useEffect - right before start of gameStop function");
      gameStop("Win");
    }
  }, [availableInquiryChoices]);

  return (
    <>
    {/*<Container maxwidth="lg" className={classes.container}>*/}

      {/*<Paper className={classes.root} elevation={4}>*/}
        <Grid container alignItems="center" spacing={1}>
        <Grid item xs={1}>
        </Grid>

        <Grid item xs={4}>
          Word/Phrase to be matched
                <ButtonGroup
                  orientation="vertical"
                  color="secondary"
                  aria-label="vertical outlined primary button group"
                >
                {inquiryChoices.map((choice) => (
                    <Controls.Button
                        text={choice.value}
                        variant="contained"
                        color = "secondary"
                        onClick={() => {
                          choose(choice);
                          }}
                        className={
                          current && current.value === choice.value ? "selected" : ""
                          }
                        disabled={!!selected[choice.value]}
                        fullWidth = "true"
                        size = "small"
                        />
                    
                ))}
                </ButtonGroup>
        </Grid>
        <Grid item xs={4}>

          Matching Word or Phrase
                <ButtonGroup
                  orientation="vertical"
                  color="secondary"
                  aria-label="vertical outlined secondary button group"
                >
            {responseChoices.map((choice) => (                
                <Controls.Button
                    text={choice.value}
                    variant="contained"
                    color = "secondary"
                    onClick={() => {
                      choose(choice);
                      }}
                    className={
                      current && current.value === choice.value ? "selected" : ""
                      }
                    disabled={!!selected[choice.value]}
                    fullWidth = "true"
                    size = "small"
                    />
              ))}
            </ButtonGroup>
               </Grid>
               </Grid>
    </>
  );
}


