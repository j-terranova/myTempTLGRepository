import React from "react";

export default function DisplayFrameworkOptions(props) {

    const displayFrameworkOptions = {  
        frameworkLayoutFormatOptions :  [ //formally frameworkFormatOptions
            {id: "BoardGame", title: "Board Game"},
            {id: "Carousel",title: "Carousel"},
            {id: "CarouselwImage",title: "Carousel w/ Image"},
            {id: "FullPage", title: "Full Page"},
            {id: "Racing", title: "Racing"},
            {id: "Tabular", title: "Tabular"},
            {id: "TicTacToe", title: "TicTacToe"},
            {id: "Trivia", title: "Trivia"},
            
        ],
        frameworkResponseFormatOptions :  [  //formally layoutOptionOptions
            {id: "ComponentDefined",title: "Component Defined"},
            {id: "Matching", title: "Matching"},
            {id: "QuestionMultiChoice", title: "Question Multi-Choice"},
            {id: "Reading",title: "Reading"},
            {id: "StatementFillIn",title: "Statement Fill-In"},
            {id: "TrueFalse", title: "True/False"},
            {id: "YesNo",title: "Yes/No"},
        ],

    /*
    frameworkLayoutFormat: "Carousel",
    frameworkResponseFormat: "QuestionMultiChoice",
    frameworkPresentationMethod:  "Fixed",
    frameworkSolutionMethod:  "PostGrading",
    frameworkIncludeSpeech:  false,
    frameworkIncludeTimer:  false,
    frameworkIncludeScoring:  false,
    frameworkColor:  "Default",
    */

        frameworkPresentationMethodOptions :  [  //formally layoutOptionOptions
            {id: "Fade",title: "Fade"},
            {id: "Fixed",title: "Fixed"},
        ],

        frameworkSolutionMethodOptions :  [  //formally layoutMethodOptions
            {id: "CorrectableAsGo",title: "Correctable (As-Go)"},
            {id: "CorrectableEnd", title: "Correctable (End)"},
            {id: "ImmediateRightWrong", title: "Immediate (Right/Wrong)"},
            {id: "NotCorrectableAsGo", title: "Not Correctable (As-Go)"},
            {id: "NotCorrectableEnd", title: "Not Correctable (End)"},
            {id: "PerInstructor", title: "Per Instructor"},
            {id: "PostGrading", title: "Post Grading"},
        ],

        frameworkIncludeSpeechOptions :  [   
            {id: "false",title: "false"},
            {id: "true",title: "true"},
        ],

        frameworkIncludeTimerOptions :  [   
            {id: "false",title: "false"},
            {id: "true",title: "true"},
        ],

        frameworkIncludeScoringOptions :  [   
            {id: "false",title: "false"},
            {id: "true",title: "true"},
        ],

        frameworkColorOptions :  [   //formally frameworkColorOptions
            {id: "Default",title: "Default"},
            {id: "Blue",title: "Blue"},
            {id: "Green",title: "Green"},
            {id: "Red", title: "Red"},
            {id: "Orange", title: "Orange"},
            {id: "Yellow", title: "Yellow"},
        ],

 
    }
    return displayFrameworkOptions; 
}
    