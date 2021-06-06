import React from "react";
import { createElement} from "react";
import FrameworkLessonInputPopup from "../lessons/frameworkLessonInputPopup";
import FrameworkTabularInputPopup from "../tabular/frameworkTabularInputPopup";
import FrameworkTicTacToeInputPopup from "../ticTacToe/frameworkTicTacToeInputPopup";
import FrameworkTriviaInputPopup from "../trivia/frameworkTriviaInputPopup";

const Components =  {
  Lesson: FrameworkLessonInputPopup,
  Tabular: FrameworkTabularInputPopup,
  TicTacToe: FrameworkTicTacToeInputPopup,
  Trivia: FrameworkTriviaInputPopup,

};

export const FrameworkInputPopup = (  
                                    block,
                                    setFormValues,
                                    prepareFormValues,
                                    setOpenPopup,
                                    setSelected,
                                    findMatchingIndex,
                                    frameworkLineItems,
                                    setFrameworkLineItems,
                                    setFrameworkLineItemsPreFilter, 
                                    checkCurrentCriteria,
                                    checkCurrentAccess,
                                    groupsUserOwns,
                                    okToUpdate   
) => {
        
  console.log("FrameworkInputPopup - start - DisplayComponent block = ", block );
  console.log("FrameworkInputPopup - start - DisplayComponent block.subType = ", block.subType );
  console.log("FrameworkInputPopup - start - DisplayComponent block._id = ", block._id );
  console.log("FrameworkInputPopup - start - DisplayComponent typeof Components[formValues.subType] = ", typeof Components[block.subType] );
  if (typeof Components[block.subType] !== "undefined") {
    return createElement(Components[block.subType], {
                                                            key: block._id,
                                                            formValues:  block,
                                                            setFormValues: setFormValues,
                                                            prepareFormValues,
                                                            setOpenPopup: setOpenPopup,
                                                            setSelected: setSelected,
                                                            findMatchingIndex: findMatchingIndex,
                                                            frameworkLineItems : frameworkLineItems,
                                                            setFrameworkLineItems :setFrameworkLineItems,
                                                            setFrameworkLineItemsPreFilter: setFrameworkLineItemsPreFilter,
                                                            checkCurrentCriteria: checkCurrentCriteria,
                                                            checkCurrentAccess: checkCurrentAccess,
                                                            groupsUserOwns: groupsUserOwns,
                                                            okToUpdate  : okToUpdate,
                                                          });
  }
  // component doesn't exist yet
  return createElement(
    () => <div>The Components {block.subType} has not been created yet.</div>,
    { key: block._id }
  );
}

