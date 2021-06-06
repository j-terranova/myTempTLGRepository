import React from "react";
import { createElement} from "react";
import ConstructAssociationInputPopup from "../associations/constructAssociationInputPopup";
import ConstructDefinitionInputPopup from "../definitions/constructDefinitionInputPopup";
import ConstructFactInputPopup from "../facts/constructFactInputPopup";
import ConstructPrefixInputPopup from "../prefixes/constructPrefixInputPopup";
import ConstructQuestionInputPopup from "../questions/constructQuestionInputPopup";
import ConstructQuoteInputPopup from "../quotes/constructQuoteInputPopup";
import ConstructRootWordInputPopup from "../rootWords/constructRootWordInputPopup";
import ConstructSegmentInputPopup from "../segments/constructSegmentInputPopup";
import ConstructMinSegmentInputPopup from "../miniSegments/constructMiniSegmentInputPopup";
import ConstructStatementInputPopup from "../statements/constructStatementInputPopup";
import ConstructSuffixInputPopup from "../suffixes/constructSuffixInputPopup";
import ImageStoreInputPopup from "../images/imageStoreInputPopup";

const Components =  {
  Association: ConstructAssociationInputPopup,
  Definition: ConstructDefinitionInputPopup,
  Fact: ConstructFactInputPopup,
  Prefix: ConstructPrefixInputPopup,
  Question: ConstructQuestionInputPopup,
  Quote: ConstructQuoteInputPopup,
  RootWord: ConstructRootWordInputPopup,
  Segment: ConstructSegmentInputPopup,
  MiniSegment: ConstructMinSegmentInputPopup,
  Statement: ConstructStatementInputPopup,
  Suffix: ConstructSuffixInputPopup,
  ImageStore: ImageStoreInputPopup
};

export const ConstructInputPopup = (  
                                    block,
                                    setFormValues,
                                    setOpenPopup,
                                    setSelected,
                                    findMatchingIndex,
                                    constructLineItems,
                                    setConstructLineItems,
                                    setConstructLineItemsPreFilter,
                                    checkCurrentCriteria,
                                    checkCurrentAccess,
                                    groupsUserOwns,
                                    okToUpdate   
) => {
        
  console.log("ConstructInputPopup - start - DisplayComponent block = ", block );
  console.log("ConstructInputPopup - start - DisplayComponent block.subType = ", block.subType );
  console.log("ConstructInputPopup - start - DisplayComponent block._id = ", block._id );
  console.log("ConstructInputPopup - start - DisplayComponent typeof Components[formValues.subType] = ", typeof Components[block.subType] );
  if (typeof Components[block.subType] !== "undefined") {
    return createElement(Components[block.subType], {
                                                            key: block._id,
                                                            formValues:  block,
                                                            setFormValues: setFormValues,
                                                            setOpenPopup: setOpenPopup,
                                                            setSelected: setSelected,
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

