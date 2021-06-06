import React from "react";
import Grid from "@material-ui/core/Grid";

import {DisplayTicTacToeMatch} from "./displayTicTacToeMatch";
import SpeechVoiceSelections from "../speech/speechVoiceSelection"

export const DisplayTicTacToeSwitch = (props) => {
    const { arrayOfMatchingItems,
            inquiryChoices,
            responseChoices,
            displayTopic,
            displayDescription,
            current,
            setCurrent,
            selected,
            setSelected,} = props;

    return (
    <>
      <Grid container maxWidth="lg" alignItems="center" spacing={1}>
      <DisplayTicTacToeMatch   arrayOfMatchingItems ={arrayOfMatchingItems}
                            inquiryChoices = {inquiryChoices}
                            responseChoices = {responseChoices}
                            displayTopic = {displayTopic}
                            displayDescription={displayDescription}     
                            current = {current}
                            setCurrent = {setCurrent}
                            selected = {selected}
                            setSelected = {setSelected}

                            />
        </Grid>
    </>
    )
}
