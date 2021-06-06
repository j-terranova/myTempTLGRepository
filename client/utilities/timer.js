import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../controls/Controls";

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
  Timers: {
    width: theme.spacing(0),
    margin: "auto",
    textAlign: "center",

  },
}));

const Timer = (props) => {
  const {
    time,
    setTime,
    timerOn,
    setTimerOn,
    startDate,
    showButtons = true,
  } = props;

  //const [time, setTime] = useState(0);
  //const [timerOn, setTimerOn] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        //setTime((prevTime) => prevTime + 1000);
        setTime(Date.now()-startDate)
      }, 2000);
      
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);




  return (
    <div className={classes.Timers}>
      Timer
      <div id="display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      {showButtons && (
      <div id="buttons">
        {!timerOn && time === 0 && (
          <Controls.Button 
            text="Start"
            variant="contained"
            size="small"
            color="secondary"
            component="span"
            onClick={() => setTimerOn(true)}
          />
        )}
        {timerOn && (
            <Controls.Button 
            text="Stop"
            variant="contained"
            size="small"
            color="secondary"
            component="span"
            onClick={() => setTimerOn(false)}
          />
        )}
        {!timerOn && time > 0 && (
            <Controls.Button 
            text="Reset"
            variant="contained"
            size="small"
            color="secondary"
            component="span"
            onClick={() => setTime(0)} //setTime(0)}
          />
        )}
        {!timerOn && time > 0 && (
            <Controls.Button 
            text="Resume"
            variant="contained"
            size="small"
            color="secondary"
            component="span"
            onClick={() => setTimerOn(true)}
          />
        )}
      </div>)}
    </div>
  );
};

export default Timer;

/*
Suggested Timer
https://stackoverflow.com/questions/61671564/react-state-repeatedly-reverts-back-to-old-value

function useInterval(callback) {
 const savedCallback = React.useRef();

 useEffect(() => {
   savedCallback.current = callback;
 });


 useEffect(() => {
   function run() {
     savedCallback.current();
  }
   let interval = setInterval(() => run ,1000);
   return () => clearInterval(interval);
  }, [])
 }



//Inside the Timer Component
 const [currTime, setCurrTime] = useState(null);

 useInterval(()=>
     setCurrTime((new Date(`${Months(props.counterInfo.year)[props.counterInfo.month-1].name} ${props.counterInfo.day} ${props.counterInfo.year} ${props.counterInfo.hour}:${props.counterInfo.minute}:${props.counterInfo.second}`).getTime()) - new Date().getTime()))

*/