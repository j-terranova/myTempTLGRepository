import React from "react";

export default function DisplayConstructOptions() {
    const displayConstructOptions = {
        componentOptions: [
            {id: "Association",title: "Association"},
            {id: "Definition",title: "Definition"},
            {id: "Equation",title: "Equation"},
            {id: "Fact",title: "Fact"},
            {id: "Prefix",title: "Prefix"},
            {id: "Question",title: "Question"},
            {id: "Quote",title: "Quote"},
            {id: "RootWord",title: "RootWord"},
            {id: "Segment",title: "Segment-Enhanced"},
            {id: "MiniSegment",title: "Segment-Mini"},
            {id: "Statement",title: "Statement"},
            {id: "Suffix",title: "Suffix"},
            ],

        constructResponseFormatOptions : [  // formally constructFormatOptions
            {id: "Matching", title: "Matching"},
            {id: "QuestionMultiChoice", title: "Question Multi-Choice"},
            {id: "Reading",title: "Reading"},
            {id: "StatementFillIn",title: "Statement Fill-In"},
            {id: "TrueFalse", title: "True/False"},
            {id: "YesNo",title: "Yes/No"},
        ],
        constructOptionsSourceOptions :  [  // formally presentationMethodOptions
            //{id: "DefaultOptions", title: "Default Options"},
            {id: "RandomOptions", title: "Random Options"},
            {id: "SecondaryColumns", title: "Secondary Columns"},
            {id: "ComponentProvided", title: "Component Provided"},             
        ],

        constructNumberOfOptionsOptions :  [   //formally maxItemsPerPageOptions
            {id: "1", title: "1"},
            {id: "2", title: "2"},
            {id: "3", title: "3"},
            {id: "4", title: "4"},
            {id: "5", title: "5"},
            {id: "6",title: "6"},
            {id: "7",title: "7"},
            {id: "8", title: "8"},
            {id: "9", title: "9"},
            {id: "10", title: "10"},
            {id: "999", title: "999"},
        ],

        constructPrimaryColumnOptions :  [ 
            {id: "KeyWordOrQuestion",title: "KeyWord or Question"},
            {id: "DefinitionOrResponse",title: "Definition Or Response"},
        ],

        constructColorOptions :  [ 
            {id: "Default",title: "Default"},
            {id: "Blue",title: "Blue"},
            {id: "Green",title: "Green"},
            {id: "Red", title: "Red"},
            {id: "Orange", title: "Orange"},
            {id: "Yellow", title: "Yellow"},
        ],
       
    }   
    return displayConstructOptions;
}
