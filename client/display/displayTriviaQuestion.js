import React, { useState, useEffect } from "react";
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import  Radio  from '@material-ui/core/Radio';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import { useGamerResultData, useGamerResultDataDispatch } from "./../contexts/GamerResultDataContext";
import { useSpeechData } from "./../contexts/SpeechDataContext";
import ConfettiCelebration from "./../utilities/confettiCelebration";

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export const DisplayTriviaQuestion = (props) => {
    const { finalDisplayConstruct,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            displayFramework,
            setDisplayFramework,
            okToChange,
            completed, 
            turnTimerOnOff, } = props;

  const classes = useStyles();
  const gamerResultData = useGamerResultData();
  const gamerResultDataDispatch = useGamerResultDataDispatch();
  const speechData = useSpeechData();

  const questionPosed = finalDisplayConstruct.inquiryLine;
  const correctResponses = finalDisplayConstruct.responseLine;

  const [reveal, setReveal] = useState(false);  
  const [dataloaded,setDataloaded] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [questionSelection, setQuestionSelection] = useState("");

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
    turnTimerOnOff(true);
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
    console.log("DisplayQuestion - handleSelectionChange - finalDisplayConstruct.correctable = ", finalDisplayConstruct.correctable );
    const index = finalDisplayConstruct.sequenceNo -1;
    if (finalDisplayConstructs[index].correctable)
    {
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
    }
    console.log("DisplayQuestion - handleSelectionChange - questionSelection = ", value );
    console.log("DisplayQuestion - handleSelectionChange - finalDisplayConstruct = ", finalDisplayConstruct );
  }

  const revealCorrect = () => {
    console.log("DisplayQuestion - revealCorrect - Start ");
    const index = finalDisplayConstruct.sequenceNo -1;
    if (displayFramework.frameworkSolutionMethod === "NotCorrectableAsGo"  && 
    finalDisplayConstructs[index].correctable && 
    finalDisplayConstructs[index].selectedValues.length > 0 )
    {
      setFinalDisplayConstructs([
        ...finalDisplayConstructs.slice(0, index), // everything before current post
        {...finalDisplayConstructs[index], 
          correctable:  false,}, 
            ...finalDisplayConstructs.slice(index + 1), // everything after current post
        ]);
    }

    if  ((questionSelection.length > 0  && displayFramework.frameworkSolutionMethod === "CorrectableAsGo") ||
        (displayFramework.frameworkSolutionMethod === "ImmediateRightWrong") ||
        (displayFramework.frameworkSolutionMethod === "NotCorrectableAsGo") ||
        (completed &&  
        ((displayFramework.frameworkSolutionMethod === "CorrectableEnd") || 
        (displayFramework.frameworkSolutionMethod === "NotCorrectableEnd")) ))
    {      
      setReveal(true);

      if (finalDisplayConstruct.responseLine === questionSelection)
      {
        let wordsToSpeak = "Wow!  You Got it!  Great job!!!   ";
        speechData.secondaryUtteranceObject.text=wordsToSpeak;
        setTimeout(() => {
          speechData.speechReference.current.speak(speechData.secondaryUtteranceObject);
        }, 250);
      }

      console.log("DisplayQuestion - revealCorrect - questionSelection = ",questionSelection);
      console.log("DisplayQuestion - revealCorrect - finalDisplayConstruct.correctResponses[0] = ",finalDisplayConstruct.correctResponses[0]);
      console.log("DisplayQuestion - revealCorrect - finalDisplayConstruct = ",finalDisplayConstruct);
      console.log("DisplayQuestion - revealCorrect - displayFramework = ",displayFramework);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("DisplayQuestion - useEffect - reveal = ", reveal );
    let active = true;

    return () => {
      active = false;
      abortController.abort();
    };
  }, [reveal]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("DisplayQuestion - useEffect - finalDisplayConstruct = ", finalDisplayConstruct );
    let active = true;
    setQuestionSelection(finalDisplayConstruct.selectedValues[0] || "");
    setShuffledOptions(finalDisplayConstruct.optionChoices);
    setReveal(false);  

    return () => {
      active = false;
      abortController.abort();
    };
  }, [finalDisplayConstruct.sequenceNo]);
  

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let active = true;

    let wordsToSpeak = "The question is    "+ finalDisplayConstruct.inquiryLine;
    speechData.secondaryUtteranceObject.text=wordsToSpeak;
    setTimeout(() => {
      speechData.speechReference.current.speak(speechData.secondaryUtteranceObject);
    }, 250);

    return () => {
      active = false;
      abortController.abort();
    };
  }, [finalDisplayConstruct.inquiryLine]);

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
        {/*<div>
          Correct Responses = {correctResponses}
        </div>
        <div>
           frameworkSolutionMethod ={displayFramework.frameworkSolutionMethod}
        </div>*/}
        <Typography variant="h4" color="primary">
          {((questionSelection.length > 0  && displayFramework.frameworkSolutionMethod === "ImmediateRightWrong") || reveal) && ("Correct Response = '" + correctResponses + "'")}
        </Typography>
        </Paper>
        {(reveal && finalDisplayConstruct.responseLine === questionSelection && <ConfettiCelebration/>)}
        </>
    )
}

