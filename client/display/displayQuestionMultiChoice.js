import React, { useState, useEffect } from "react";
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import  Radio  from '@material-ui/core/Radio';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";

import { useGamerResultData, useGamerResultDataDispatch } from "./../contexts/GamerResultDataContext";
import { useSpeechData, useSpeechDataDispatch } from "./../contexts/SpeechDataContext";

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function DisplayQuestionMultiChoice(props) {
    const { finalDisplayConstruct,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            displayFramework,
            setDisplayFramework,
            okToChange,
            setOkToChange,
            completed, 
            time,
            setTime,
            timerOn,
            setTimerOn, 
            updateGamerResultDataComplete,   
            resetGamerResultData, 
            numberCorrect,
            setNumberCorrect,
            inCorrectAttempts,
            setInCorrectAttempts,
            totalAttempts,
            setTotalAttempts,} = props;

  const classes = useStyles();
  const gamerResultData = useGamerResultData();
  const gamerResultDataDispatch = useGamerResultDataDispatch();
  const speechData = useSpeechData();
  const speechDataDispatch = useSpeechDataDispatch();
  const questionPosed = finalDisplayConstruct.inquiryLine;
  const correctResponses = finalDisplayConstruct.responseLine;

  const [reveal, setReveal] = useState(false);  
  const [dataloaded,setDataloaded] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState(finalDisplayConstruct.optionChoices);
  const [questionSelection, setQuestionSelection] = useState(finalDisplayConstruct.selectedValues[0] || "");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let active = true;

    if (shuffledOptions != undefined &&  (shuffledOptions.length >0)) 
    {
      setDataloaded(true);
    } 
    console.log("DisplayQuestion - useEffect - questionOptions = ", shuffledOptions );

    return () => {
      active = false;
      abortController.abort();
    };

  }, [shuffledOptions]);

  const handleSelectionChange = e => {
    const value = e.target.value;
    console.log("DisplayQuestion - handleSelectionChange - value = ", value );
    console.log("DisplayQuestion - handleSelectionChange - okToChange = ", okToChange );
    if (gamerResultData.startDate === null)
    {
        console.log ("BoardContainer - clickSquareHandler - inside Null Check - gamerResultData.startDate = ",gamerResultData.startDate);
        gamerResultDataDispatch({
            type: "SET_GAMERRESULTDATA_STARTDATE",
            startDate: Date.now(),
            modified: true,
            });
    }
    if (okToChange)
    {
      setQuestionSelection(value);
      const index = finalDisplayConstruct.sequenceNo -1;
      setFinalDisplayConstructs([
      ...finalDisplayConstructs.slice(0, index), // everything before current post
      {...finalDisplayConstructs[index], 
          selectedValues:  [value],}, 
          ...finalDisplayConstructs.slice(index + 1), // everything after current post
      ]);
      setDisplayFramework({...displayFramework, modified: true});
    }
    console.log("DisplayQuestion - handleSelectionChange - questionSelection = ", value );
    console.log("DisplayQuestion - handleSelectionChange - finalDisplayConstruct = ", finalDisplayConstruct );
  }

  const revealCorrect = () => {
    console.log("DisplayQuestion - revealCorrect - Start ");
    if ((questionSelection.length > 0  && displayFramework.frameworkSolutionMethod === "CorrectableAsGo") ||
        (completed &&  ((displayFramework.frameworkSolutionMethod === "CorrectableEnd") || (displayFramework.frameworkSolutionMethod === "NotCorrectableEnd") )))
    {      
      setReveal(true);
      //totalAttempts, 
      setTotalAttempts(totalAttempts+1);
      if ( questionSelection === correctResponses[0])
      {
        //numberCorrect, 
        setNumberCorrect(numberCorrect+1);
      } else
      {
        //inCorrectAttempts, 
        setInCorrectAttempts(inCorrectAttempts+1);
      }      
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let active = true;
    console.log("DisplayQuestion - useEffect - numberCorrect = ", numberCorrect );
    console.log("DisplayQuestion - useEffect - inCorrectAttempts = ", inCorrectAttempts );
    console.log("DisplayQuestion - useEffect - totalAttempts = ", totalAttempts );

    return () => {
      active = false;
      abortController.abort();
    };

  }, [numberCorrect, inCorrectAttempts, ]);

    return (dataloaded === true)  &&  (
        <>
        <Paper className={classes.paper} elevation={3}>
        <label>
          {questionPosed}
        </label>
        <MuiRadioGroup column="true"
            name='question'
            value={questionSelection}
            onChange={handleSelectionChange}>
            {
                shuffledOptions.map(
                    item => (
                        <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                    )
                )
            }
        </MuiRadioGroup>
        {((questionSelection.length > 0  && ( displayFramework.frameworkSolutionMethod === "CorrectableAsGo" || displayFramework.frameworkSolutionMethod === "NotCorrectableAsGo")) ||
          ( completed && (( displayFramework.frameworkSolutionMethod === "CorrectableEnd") || (displayFramework.frameworkSolutionMethod === "NotCorrectableEnd"))))
          && <Button onClick={revealCorrect} variant="contained" color="secondary">
                Show answer
            </Button>}
        <div>
          Correct Responses = {correctResponses}
        </div>
        <div>
           frameworkSolutionMethod ={displayFramework.frameworkSolutionMethod}
        </div>
        <div>
          {((questionSelection.length > 0  && displayFramework.frameworkSolutionMethod === "ImmediateRightWrong") || reveal) && correctResponses}
        </div>
        </Paper>
        </>
    )
}

