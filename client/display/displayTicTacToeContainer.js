import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {DisplayTicTacToeMatch} from "./displayTicTacToeMatch";
import {shuffleArray} from "./displayConstructSwitch"
import Container from "@material-ui/core/Container";

export const DisplayTicTacToeContainer = (props) => {
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

    useEffect (() => {
      //console.log("DisplayTicTacToeContainer - useEffect - numberOfConstructs =  ",numberOfConstructs);
      //console.log("DisplayTicTacToeContainer - useEffect -  finalDisplayConstructs =  ",finalDisplayConstructs);
      if (finalDisplayConstructs.length === numberOfConstructs )
      {
        //console.log("DisplayTicTacToeContainer - useEffect - finalDisplayConstructs = ",finalDisplayConstructs);
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
      }
    }, []);

    useEffect(() => {
      //console.log("DisplayTicTacToeContainer - useEffect - sorted inquiryChoices = ",inquiryChoices);
      //console.log("DisplayTicTacToeContainer - useEffect - sorted responseChoices = ",responseChoices);
      if (inquiryChoices.length > 0  && responseChoices.length > 0)
      {
        setTriggerRender("OkNow")
      }
    }, [inquiryChoices, responseChoices]);
   

    return (triggerRender === "OkNow")  && (
    <>
    <Container maxWidth="lg" >
      { inquiryChoices && responseChoices  && 
      <DisplayTicTacToeMatch  arrayOfMatchingItems ={arrayOfMatchingItems}
                              inquiryChoices = {inquiryChoices}
                              availableInquiryChoices ={availableInquiryChoices} 
                              setAvailableInquiryChoices ={setAvailableInquiryChoices}
                              responseChoices = {responseChoices}
                              displayFramework={displayFramework}
                              setDisplayFramework={setDisplayFramework}
                              finalDisplayConstructs={finalDisplayConstructs}
                              setFinalDisplayConstructs={setFinalDisplayConstructs}
                              time={time}
                              setTime={setTime}
                              timerOn={timerOn} 
                              setTimerOn={setTimerOn} 
                              updateGamerResultDataComplete={updateGamerResultDataComplete}   
                              resetGamerResultData={resetGamerResultData}                                         
                              />}
    </Container>
    </>
  );
}
