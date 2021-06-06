import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {shuffleArray} from "./displayConstructSwitch"
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Controls from "../controls/Controls";
import {DisplayMatchingSwitch} from "./displayMatchingSwitch";
import TicTacToeScoring from "./../utilities/scoring"

import auth from "../auth/auth-helper";
import ConfirmDialog from "./../components/shared/ConfirmDialog";
import Notification from "../components/shared/Notification";
import { useGamerResultData, useGamerResultDataDispatch } from "./../contexts/GamerResultDataContext";
import Timer from "./../utilities/timer"

export const DisplayTabularContainer = (props) => {
    const { setOpenDisplayContainerPopup,
            displayFramework,
            setDisplayFramework,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            numberOfConstructs,
            time,
            setTime,
            timerOn,
            setTimerOn, 
            updateGamerResultDataComplete,   
            resetGamerResultData,
          } = props;
         
    const [arrayOfMatchingItems, setArrayOfMatchingItems] = useState([]);  
    const [triggerRender, setTriggerRender] = useState("NotYet"); 
    const [inquiryChoices, setInquiryChoices] = useState([]);
    const [availableInquiryChoices, setAvailableInquiryChoices] = useState([]);
    const [responseChoices, setResponseChoices] = useState([]);

    const displayTopic = displayFramework.topic;
    const displayDescription = displayFramework.description;
    const gamerResultData = useGamerResultData();
    const gamerResultDataDispatch = useGamerResultDataDispatch();

    const [numberCorrect, setNumberCorrect]= useState();
    const [inCorrectAttempts, setInCorrectAttempts]=useState();
    const [totalAttempts, setTotalAttempts] = useState();

    const [current, setCurrent] = useState(null);
    const [selected, setSelected] = useState({});

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
  
      const resetAvailableInquiryChoices = ()=> {
          let newChoices = [];
          for (let i =0; i< inquiryChoices.length; i++)
          {
              newChoices.push(inquiryChoices[i]);
              //console.log("displayTabularContainer - New Inquiry Choices - inquiryChoices[i] =", inquiryChoices[i])
          }
          //console.log("displayTabularContainer - New Inquiry Choices - newChoices =", newChoices)
          return newChoices;
      };

      const resetGame = () => {
        setCurrent(null);
        setSelected({});
        const value = Math.random().toString(36).substring(7);
        let newChoices = resetAvailableInquiryChoices();
        setTime(0);
        setNumberCorrect(0);
        setInCorrectAttempts(0);
        setTotalAttempts(0);
    };
  
    const handleResetGame = () => {
      console.log( "displayTabularContainer - handleResetGame - gamerResultData = ", gamerResultData);
      console.log( "displayTabularContainer - handleResetGame - displayFramework = ", displayFramework);
      save()
      //resetGamerResultData();
      //resetGame();
  };

  const gameStop = (gamerStatus) => {
    console.log( "displayTabularContainer - gameStop - gamerStatus = ", gamerStatus);

    const stopDate = Date.now();
    const startDate = gamerResultData.startDate;  
    console.log( "displayTabularContainer - gameStop - startDate = ", startDate);
    console.log( "displayTabularContainer - gameStop - stopDate = ", stopDate);
    let selected = [];
    for (let i=0; i<finalDisplayConstructs.length; i++)
    {
      selected.push(finalDisplayConstructs[i].selectedValues[0]);
    }
    console.log( "displayTabularContainer - gameStop - selected = ", selected);
    console.log( "displayTabularContainer - gameStop - totalAttempts = ", totalAttempts);
    console.log( "displayTabularContainer - gameStop - numberCorrect = ", numberCorrect);
    console.log( "displayTabularContainer - gameStop - inCorrectAttempts = ", inCorrectAttempts);
    updateGamerResultDataComplete(gamerStatus, totalAttempts, numberCorrect, inCorrectAttempts, selected, startDate, stopDate)
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
  console.log( "displayTabularContainer - save - gamerResultData.modified = ", gamerResultData.modified);
  if (gamerResultData.modified)
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

  const handleInputChange = e => {
    const name = e.target.name;
    const value =  e.target.value;
    if (name ==="playerLevel")
    {
        console.log("displayTabularContainer - handleInputChange playerLevel = ",gamerResultData.playerLevel)
        console.log("displayTabularContainer - handleInputChange new value = ",value)

        if (value != gamerResultData.playerLevel)
        {
            const opponentResponseFrequency = TicTacToeScoring.getOpponentResponseFrequency(value);

            gamerResultDataDispatch({
                type: "SET_GAMERRESULTDATA_PLAYERLEVEL",
                playerLevel: value,
                opponentResponseFrequency: opponentResponseFrequency,
                modified: true,
                });
        }
  
    } else if ( name === "opponent")
    {
        console.log("displayTabularContainer - handleInputChange opponent = ",gamerResultData.opponent);
        console.log("displayTabularContainer - handleInputChange value = ",value);

        gamerResultDataDispatch({
            type: "SET_GAMERRESULTDATA_OPPONENT",
            opponent: value,
            modified: true,
            });
    } else if (name === "gameSize")
    {
        console.log("displayTabularContainer - handleInputChange old size = ",size);
        console.log("displayTabularContainer - handleInputChange new size = ",value);
        setSize(value);
    }
}
    useEffect (() => {
      //console.log("DisplayTabularContainer - useEffect - numberOfConstructs =  ",numberOfConstructs);
      //console.log("DisplayTabularContainer - useEffect -  finalDisplayConstructs =  ",finalDisplayConstructs);
      if (finalDisplayConstructs.length === numberOfConstructs )
      {
        //console.log("DisplayTabularContainer - useEffect - finalDisplayConstructs = ",finalDisplayConstructs);
        let newArrayOfMatchingItems = [];
        let newInquiryArray = [];
        let newAvailableInquiryArray = [];
        let newResponseArray = [];
        for (let i =0; i< finalDisplayConstructs.length; i++)
        {
            let inquiryItem = finalDisplayConstructs[i].inquiryLine;
            let responseItem = finalDisplayConstructs[i].responseLine;
            let matchingItems = [ inquiryItem,responseItem];
            newArrayOfMatchingItems.push(matchingItems);
            newInquiryArray.push({value:inquiryItem});
            newAvailableInquiryArray.push({value:inquiryItem});
            newResponseArray.push({value:responseItem});
        }
        setArrayOfMatchingItems(newArrayOfMatchingItems);
        shuffleArray(newInquiryArray);
        setInquiryChoices(newInquiryArray);
        setAvailableInquiryChoices(newAvailableInquiryArray);
        shuffleArray(newResponseArray);
        setResponseChoices(newResponseArray);

        setNumberCorrect(0);
        setInCorrectAttempts(0);
        setTotalAttempts(0);
      }
    }, []);  

      useEffect(() => {
        console.log("DisplayTabularContainer - useEffect - sorted inquiryChoices = ",inquiryChoices);
        console.log("DisplayTabularContainer - useEffect - sorted responseChoices = ",responseChoices);
        if (inquiryChoices.length > 0  && responseChoices.length > 0 && availableInquiryChoices.length > 0)
        {
          setTriggerRender("OkNow")
        }
      }, [inquiryChoices, responseChoices, availableInquiryChoices]);
   
      return  (triggerRender === "OkNow")  && (
    <>
    {/*<Container maxWidth="lg" >*/}
    <Grid container alignItems="center">
    <Grid item xs={4}>
    <Typography>
        Matching Words - {displayDescription}
      </Typography>
      </Grid>
      <Grid item xs={4}>
      <Typography>          
       First select the word/phrase
        to be matched (Left Column) and then matching word/phrase (Right Column)
      </Typography>
    </Grid>
    <Grid item xs={2}>

      {/*<Timer
          time ={time}
          setTime={setTime}
          timerOn={timerOn}
          setTimerOn= {setTimerOn}
          startDate={gamerResultData.startDate}
          showButtons= {false}
      />*/}
    </Grid>
    <Grid item xs={2}>
    <Controls.Button
        text= "Save/Reset"
        variant="contained"
        color = "primary"
        onClick={() => handleResetGame()}
        className="reset"
        fullwidth = "true"
        />
    </Grid>
    <Grid item xs={12}>
      <DisplayMatchingSwitch  arrayOfMatchingItems ={arrayOfMatchingItems}
                              inquiryChoices = {inquiryChoices}
                              availableInquiryChoices={availableInquiryChoices}
                              setAvailableInquiryChoices={setAvailableInquiryChoices}
                              responseChoices = {responseChoices}
                              displayTopic = {displayTopic}
                              displayDescription={displayDescription}
                              displayFramework={displayFramework}
                              setDisplayFramework={setDisplayFramework}
                              finalDisplayConstructs={finalDisplayConstructs}
                              setFinalDisplayConstructs={setFinalDisplayConstructs}
                              updateGamerResultDataComplete={updateGamerResultDataComplete}
                              turnTimerOnOff={turnTimerOnOff}
                              current = {current}
                              setCurrent = {setCurrent}
                              selected = {selected}
                              setSelected = {setSelected}
                              numberCorrect={numberCorrect} 
                              setNumberCorrect={setNumberCorrect} 
                              inCorrectAttempts={inCorrectAttempts}  
                              setInCorrectAttempts={setInCorrectAttempts} 
                              totalAttempts={totalAttempts} 
                              setTotalAttempts={setTotalAttempts} 
                              />
     </Grid>
     </Grid>

    </>
  );
}
