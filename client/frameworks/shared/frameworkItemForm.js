import React from "react";
import { createElement} from "react";
import FrameworkLessonForm from "./../lessons/frameworkLessonForm";


const Components =  {
  Lesson: FrameworkLessonForm,
};

export const FrameworkItemForm = (  
                                    block,
                                    setFormValues,
                                    addNewFramework, 
                                    setSelected,
                                    setOpenPopup,
                                    findMatchingIndex,
                                    frameworkLineItems,
                                    setFrameworkLineItems,
                                    setFrameworkLineItemsPreFilter, 
                                    checkCurrentCriteria,
                                    checkCurrentAccess,
                                    groupsUserOwns,
                                    okToUpdate  
) => {
        
  console.log("FrameworkItemForm - start - DisplayComponent block = ", block );
  console.log("FrameworkItemForm - start - DisplayComponent block.subType = ", block.subType );
  console.log("FrameworkItemForm - start - DisplayComponent block._id = ", block._id );
  console.log("FrameworkItemForm - start - DisplayComponent typeof Components[formValues.subType] = ", typeof Components[block.subType] );
  if (typeof Components[block.subType] !== "undefined") {
    return createElement(Components[block.subType], {
                                                            key: block._id,
                                                            formValues:  block,
                                                            setFormValues: setFormValues,
                                                            addNewFramework: addNewFramework,
                                                            setSelected: setSelected,
                                                            setOpenPopup: setOpenPopup,
                                                            findMatchingIndex: findMatchingIndex,
                                                            frameworkLineItems : frameworkLineItems,
                                                            setFrameworkLineItems :setFrameworkLineItems,
                                                            setFrameworkLineItemsPreFilter: setFrameworkLineItemsPreFilter,
                                                            checkCurrentCriteria: checkCurrentCriteria,
                                                            checkCurrentAccess: checkCurrentAccess,
                                                            groupsUserOwns: groupsUserOwns,
                                                            okToUpdate: okToUpdate,
                                                          });
  }
  // component doesn't exist yet
  return createElement(
    () => <div>The Components {block.subType} has not been created yet.</div>,
    { key: block._id }
  );
}

