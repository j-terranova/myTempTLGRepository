import React from "react";
import { createElement } from "react";
import DisplayAssociation from "./displayQuestionMultiChoice";
import DisplayDefinition from "./displayDefinition";
import DisplayQuestionMultiChoice from "./displayQuestionMultiChoice";
import DisplaySegment from "./displaySegment";
import DisplayStatement from "./displayQuestionMultiChoice";

const Components =  {
  Association: DisplayAssociation,
  Definition: DisplayDefinition,
  QuestionMultiChoice: DisplayQuestionMultiChoice,
  Segment: DisplaySegment,
  Statement: DisplayStatement,
};

export const DisplayConstructSwitch = ( block,
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
                                  resetGamerResultData, ) => {

  // component does exist
  console.log("DisplayConstructFunction - start - DisplayConstructSwitch block = ", block );
  console.log("DisplayConstructFunction - start - DisplayConstructSwitch block.constructResponseFormat = ", block.constructResponseFormat );
  console.log("DisplayConstructFunction - start - DisplayConstructSwitch typeof Components[block.constructResponseFormat] = ", typeof Components[block.constructResponseFormat] );
  if (typeof Components[block.constructResponseFormat] !== "undefined") {
    return createElement(Components[block.constructResponseFormat], {
                                                            key: block.constructId,
                                                            finalDisplayConstruct: block,
                                                            finalDisplayConstructs: finalDisplayConstructs,
                                                            setFinalDisplayConstructs: setFinalDisplayConstructs,
                                                            displayFramework: displayFramework,
                                                            setDisplayFramework: setDisplayFramework,
                                                            okToChange: okToChange,
                                                            setOkToChange:  setOkToChange,
                                                            completed: completed,
                                                            time: time,
                                                            setTime: setTime,
                                                            timerOn: timerOn,
                                                            setTimerOn: setTimerOn, 
                                                            updateGamerResultDataComplete: updateGamerResultDataComplete,   
                                                            resetGamerResultData: resetGamerResultData, 
                                                          });
  }
  // component doesn't exist yet
  return createElement(
    () => <div>The component {block.constructResponseFormat} has not been created yet.</div>,
    { key: block.constructId }
  );
}

// Randomize array in-place using Durstenfeld shuffle algorithm 
export const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

