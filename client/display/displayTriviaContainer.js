import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {DisplayTriviaQuestion} from "./displayTriviaQuestion";

import auth from "../auth/auth-helper";
import ConfirmDialog from "./../components/shared/ConfirmDialog";
import Notification from "../components/shared/Notification";
import { useGamerResultData, useGamerResultDataDispatch } from "./../contexts/GamerResultDataContext";
import Timer from "./../utilities/timer"

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: theme.spacing(3),
    width: "100%",
    height: "100%",
 
    margin: "0 auto"
  }),
  questionMeta:{
    marginLeft: 10,
    display: "inline"
  },
  footer:{
    marginTop: "40px",
    marginBottom: "40px",
  }
}));

export const DisplayTriviaContainer = (props) => {
    const { setOpenDisplayContainerPopup,
            displayFramework,
            setDisplayFramework,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            numberOfConstructs,
            okToChange,
            completed,
            time,
            setTime,
            timerOn,
            setTimerOn, 
            updateGamerResultDataComplete,   
            resetGamerResultData, } = props;

const classes = useStyles();

const gamerResultData = useGamerResultData();
const gamerResultDataDispatch = useGamerResultDataDispatch();

const [notify, setNotify] = useState({
  isOpen: false,
  message: "",
  type: "",
});
const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: "",
  subTitle: "",
});

const [playerLevelOptions, setPlayerLevelOptions] = useState([ 
  {id: 1, title: "PreSchooler"}, 
  {id: 2, title: "Beginner"},
  {id: 3, title: "Learner"},
  {id: 4, title: "Intermediate"},
  {id: 5, title: "Scholar"},   
  {id: 6, title: "Expert"}, 
  {id: 7, title: "Wizard"},                 
]);

const [sizeOptions, setSizeOptions] = useState([ 
  {id: 3, title: 3}, 
  {id: 4, title: 4},
  {id: 5, title: 5},              
]);

const [opponentOptions, setOpponentOptions] = useState([ 
      {id: "Automatic", title: "Automatic"}, 
      {id: "RealPerson", title: "Real Person"},              
  ])

const turnTimerOnOff = (turnOn)=> {
  setTimerOn(turnOn);
}
    const [current, setCurrent] = useState(0);
    const [moveRight, setMoveRight] = useState(true);
    const [moveLeft, setMoveLeft] = useState(false);
    
    const jwt = auth.isAuthenticated();
    const userId = jwt.user._id;

    console.log("DisplayTriviaContainer - start - displayFramework = ", displayFramework );
    console.log("DisplayTriviaContainer - start - finalDisplayConstructs = ", finalDisplayConstructs );
    console.log("DisplayTriviaContainer - start - current = ", current );
    console.log("DisplayTriviaContainer - start - finalDisplayConstructs[current] = ", finalDisplayConstructs[current] );
    console.log("DisplayTriviaContainer - start - moveRight = ", moveRight );
    console.log("DisplayTriviaContainer - start - moveLeft = ", moveLeft );

    const gameStop = (gamerStatus) => {
      console.log( "DisplayTriviaContainer - gameStop - gamerStatus = ", gamerStatus);

      const stopDate = Date.now();
      const startDate = gamerResultData.startDate;  
      console.log( "DisplayTriviaContainer - gameStop - startDate = ", startDate);
      console.log( "DisplayTriviaContainer - gameStop - stopDate = ", stopDate);
      let selected = [];
      for (let i=0; i<finalDisplayConstructs.length; i++)
      {
        selected.push(finalDisplayConstructs[i].selectedValues[0]);
      }
      console.log( "DisplayTriviaContainer - gameStop - selected = ", selected);
      updateGamerResultDataComplete(gamerStatus, 0, 0, 0, selected, startDate, stopDate)
  }

    const goFirst = () => {
      turnTimerOnOff(true);
      if (gamerResultData.startDate === null)
      {
          console.log ("DisplayTriviaContainer - clickSquareHandler - inside Null Check - gamerResultData.startDate = ",gamerResultData.startDate);
          gamerResultDataDispatch({
              type: "SET_GAMERRESULTDATA_STARTDATE",
              startDate: Date.now(),
              modified: true,
              });
      }
      let index = current;
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
      setCurrent(0);
  }
  
  const goLast = () => {
    turnTimerOnOff(true);
    if (gamerResultData.startDate === null)
    {
        console.log ("DisplayTriviaContainer - clickSquareHandler - inside Null Check - gamerResultData.startDate = ",gamerResultData.startDate);
        gamerResultDataDispatch({
            type: "SET_GAMERRESULTDATA_STARTDATE",
            startDate: Date.now(),
            modified: true,
            });
    }
    let index = current;
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
    setCurrent(finalDisplayConstructs.length-1);
  }

    const moveNext = () => {
      turnTimerOnOff(true);
      if (gamerResultData.startDate === null)
      {
          console.log ("DisplayTriviaContainer - clickSquareHandler - inside Null Check - gamerResultData.startDate = ",gamerResultData.startDate);
          gamerResultDataDispatch({
              type: "SET_GAMERRESULTDATA_STARTDATE",
              startDate: Date.now(),
              modified: true,
              });
      }
      let index = current;
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
        setCurrent(current+1);
    }

    const movePrevious = () => {
      turnTimerOnOff(true);
      if (gamerResultData.startDate === null)
      {
          console.log ("DisplayTriviaContainer - clickSquareHandler - inside Null Check - gamerResultData.startDate = ",gamerResultData.startDate);
          gamerResultDataDispatch({
              type: "SET_GAMERRESULTDATA_STARTDATE",
              startDate: Date.now(),
              modified: true,
              });
      }
      let index = current;
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
        setCurrent(current-1);
    }
 
      const markComplete = () => {
        gameStop("Complete");
      }

    const exit = () => {
      if (!displayFramework.modified)
        {
          setOpenDisplayContainerPopup(false);
        }
      else
        {
          setConfirmDialog({
            isOpen: true,
            title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
            subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
            onConfirm: () => {
              setOpenDisplayContainerPopup(false);
              }
          }); 
        }
      //return (<Redirect to="/learners/Lessons" />);
    }

    const save = () => {
      if (displayFramework.modified)
      {
          gameStop("InProgress");
          setNotify({
            isOpen: true,
            message: "Changes Saved!",
            type: "success",
          });
      } else
      {
        setNotify({
          isOpen: true,
          message: "No changes to save!",
          type: "warning",
        });
      }
    }
 
    const resetGame = () => {
      setTime(0);
      turnTimerOnOff(false);
    };

    const handleResetGame = () => {
      resetGamerResultData();
      resetGame();
    };

    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      let active = true;
  
      if (finalDisplayConstructs.length === numberOfConstructs )
      {
          setMoveRight(current+1 < finalDisplayConstructs.length);
          setMoveLeft(current != 0);
      }

      console.log("DisplayTriviaContainer - start - moveRight = ", moveRight );
      console.log("DisplayTriviaContainer - start - moveLeft = ", moveLeft );

      return () => {
        active = false;
        abortController.abort();
      };
  
    }, [current]);
  return (finalDisplayConstructs.length > 0 && finalDisplayConstructs.length ===numberOfConstructs && current != undefined && current != null)  && (
    <>
    <div >
    <Container maxWidth="lg" className={classes.container}>
    <Grid container spacing={1}>
        <Grid item xs={12} >
      <Paper className={classes.root} elevation={4}>
        <Typography component="p">
          <span className={classes.questionMeta}> Page # {current + 1} / {numberOfConstructs}</span>     
          {/*<Timer
                        time ={time}
                        setTime={setTime}
                        timerOn={timerOn}
                        setTimerOn= {setTimerOn}
                        startDate={gamerResultData.startDate}
                        showButtons= {false}
          />*/}
          <Button onClick={exit} variant="contained" color="secondary" style={{float: "right", marginLeft: "50px", marginright: "50px"}}>
              Exit
          </Button>
          <Button onClick={markComplete} variant="contained" color="secondary" style={{float: "right", marginLeft: "50px", marginRight: "50px"}}>
              Mark Complete
          </Button>

        </Typography>

        <hr style={{marginBottom: "60px"}}/>
        {displayFramework.description}
        {displayFramework.frameworkLayoutFormat === "Trivia" && (
         
                        <DisplayTriviaQuestion  
                            finalDisplayConstruct = {finalDisplayConstructs[current]}
                            finalDisplayConstructs={finalDisplayConstructs}
                            setFinalDisplayConstructs={setFinalDisplayConstructs}
                            displayFramework={displayFramework}
                            setDisplayFramework={setDisplayFramework}
                            okToChange={okToChange}
                            completed={completed}
                            turnTimerOnOff={turnTimerOnOff}
                            />)}



        <div className={classes.footer}>

        {(moveLeft)? ( <Button onClick={movePrevious} variant="contained" color="primary" style={{float: "left", marginLeft: "50px"}}>
                Previous
            </Button>): ( <Button onClick={movePrevious} disabled variant="contained" color="primary"style={{float: "left", marginLeft: "50px"}}>
                Previous
            </Button>)}

            {(moveRight)? (<Button onClick={moveNext} variant="contained" color="primary" style={{float: "left" , marginLeft: "50px"}}>
                Next
            </Button>): (<Button onClick={moveNext} disabled variant="contained" color="primary" style={{float: "left", marginLeft: "50px"}}>
                Next
            </Button>)}        

            <Button onClick={() => {save();}} variant="contained" color="secondary" style={{float: "center", marginLeft: "50px", marginright: "50px"}}>
              Save'n Continue
            </Button> 

            

            <Button onClick={goFirst} variant="contained" color="primary" style={{float: "right",  marginLeft: "50px", marginRight: "50px"}}>
              First
            </Button>
            <Button onClick={goLast} variant="contained" color="primary" style={{float: "right", marginLeft: "50px", marginRight: "50px"}}>  
              Last
            </Button>
        </div>
      </Paper>
      </Grid>
    </Grid>
    </Container>
    </div>
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
    />
  </>
  );}


