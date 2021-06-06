import React from "react";
import Grid from "@material-ui/core/Grid";

import {DisplayButtonMatch} from "./displayButtonMatch";
import SpeechVoiceSelections from "./../speech/speechVoiceSelection"

export const DisplayMatchingSwitch = (props) => {
    const { arrayOfMatchingItems,
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
            setTotalAttempts, } = props;
            

    return (
    <>
      <Grid container maxwidth="lg" alignItems="center" spacing={1}>

        <Grid item xs={6}>
      <DisplayButtonMatch   arrayOfMatchingItems ={arrayOfMatchingItems}
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
           {/*<Grid item xs={4}>
           <SpeechVoiceSelections 
                            speechReference = {speechReference}
                            utteranceObject = {utteranceObject}
                            voiceObjects = {voiceObjects}
                            primaryVoiceObject = {primaryVoiceObject}
                            setPrimaryVoiceObject = {setPrimaryVoiceObject}
                            secondaryVoiceObject = {secondaryVoiceObject}
                            setSecondaryVoiceObject = {setSecondaryVoiceObject}
                            />
                                      </Grid>
          <Grid item xs={2}>
          <p>   </p>
    </Grid>*/}
        </Grid>
    </>
    )
}
