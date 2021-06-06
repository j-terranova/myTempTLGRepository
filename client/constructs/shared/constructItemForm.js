import React from "react";
import { createElement} from "react";
import ConstructAssociationForm from "../associations/constructAssociationForm";
import ConstructDefinitionForm from "./../definitions/constructDefinitionForm";
import ConstructQuestionForm from "./../questions/constructQuestionForm";
import ConstructSegmentForm from "./../segments/constructSegmentForm";
import ConstructStatementForm from "./../statements/constructStatementForm";

const Components =  {
  Association: ConstructAssociationForm,
  Definition: ConstructDefinitionForm,
  Question: ConstructQuestionForm,
  Segment: ConstructSegmentForm,
  Statement: ConstructStatementForm,
};

export const ConstructItemForm = (  
                                    block,
                                    setFormValues,
                                    setSelected,
                                    setOpenPopup,
                                    findMatchingIndex,
                                    constructLineItems,
                                    setConstructLineItems,
                                    setConstructLineItemsPreFilter, 
                                    checkCurrentCriteria,
                                    checkCurrentAccess,
                                    groupsUserOwns,
                                    okToUpdate   
) => {
        
  console.log("ConstructItemForm - start - DisplayComponent block = ", block );
  console.log("ConstructItemForm - start - DisplayComponent block.subType = ", block.subType );
  console.log("ConstructItemForm - start - DisplayComponent block._id = ", block._id );
  console.log("ConstructItemForm - start - DisplayComponent typeof Components[formValues.subType] = ", typeof Components[block.subType] );
  if (typeof Components[block.subType] !== "undefined") {
    return createElement(Components[block.subType], {
                                                            key: block._id,
                                                            formValues:  block,
                                                            setFormValues: setFormValues,
                                                            setSelected: setSelected,
                                                            setOpenPopup: setOpenPopup,
                                                            findMatchingIndex: findMatchingIndex,
                                                            constructLineItems : constructLineItems,
                                                            setConstructLineItems :setConstructLineItems,
                                                            setConstructLineItemsPreFilter: setConstructLineItemsPreFilter,
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

