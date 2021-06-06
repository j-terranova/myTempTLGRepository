import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TicTacToe from "./../gamers/ticTacToe/ticTacToeContainer"

export const DisplayTicTacToeMatch = (props)  => {
const   {   arrayOfMatchingItems,
            inquiryChoices,
            availableInquiryChoices, 
            setAvailableInquiryChoices,
            responseChoices,
            displayFramework,
            setDisplayFramework,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            time,
            setTime,
            timerOn, 
            setTimerOn, 
            updateGamerResultDataComplete,
            resetGamerResultData,
            } = props;

return (
          <TicTacToe
              arrayOfMatchingItems ={arrayOfMatchingItems}
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
           />
  );
}


