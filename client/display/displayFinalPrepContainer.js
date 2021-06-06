import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import DisplayGamerSwitchContainer from "./displayGamerSwitchContainer";
import DisplayLessonSwitchContainer from "./displayLessonSwitchContainer";

import Notification from "../components/shared/Notification";
import {shuffleArray} from "./displayConstructSwitch"
import { useRandomOptions, useRandomOptionsDispatch } from "../contexts/RandomOptionsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function DisplayFinalPrepContainer(props) {
  const { 
    setOpenDisplayContainerPopup,
    displayFramework,
    setDisplayFramework,
    displayConstructs,
    setDisplayConstructs,
    numberOfConstructs,
    responseOptions,} = props;

  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [okToChange, setOkToChange] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [prepComplete, setPrepComplete] = useState(false);

   const [finalDisplayConstructs, setFinalDisplayConstructs] = useState([]);

  const randomOptions = useRandomOptions();

  console.log( "DisplayFinalPrepContainer  displayFramework = ", displayFramework );
  console.log( "DisplayFinalPrepContainer  responseOptions = ", responseOptions );

  console.log("DisplayFinalPrepContainer - start - displayFramework = ", displayFramework );
  console.log("DisplayFinalPrepContainer - start - displayConstructs = ", displayConstructs );
 
  useEffect(() => {
    console.log("DisplayFinalPrepContainer - start - useEffect = ");

    let newDisplayConstructs = displayConstructs;
    let newResponseOptions = [];
    for (let i = 0; i < newDisplayConstructs.length; i++)
    {
      newDisplayConstructs[i].correctResponses = [];
      newDisplayConstructs[i].correctResponses.push(newDisplayConstructs[i].responseLine);
      //newDisplayConstructs[i].
      if (newDisplayConstructs[i].constructResponseFormat === "QuestionMultiChoice") 
      {
        let endOptionCount = newDisplayConstructs[i].constructNumberOfOptions;
        if (newDisplayConstructs[i].constructOptionsSource === "RandomOptions")
        {
          let randomOptionList = []
          let subType = newDisplayConstructs[i].subType;
          switch(subType) {
            case "Association": 
              if ( newDisplayConstructs[i].constructDetail.associtionType === "Antonym")
              {
                if (newDisplayConstructs[i].constructDetail.constructPrimaryColumn === "DefinitionOrResponse")
                {
                  randomOptionList = randomOptions.assocAntonymRandomOptionsWord; 
                } else
                {
                  randomOptionList = randomOptions.assocAntonymRandomOptionsAnt; 
                }
              } else  // Synonym
              {
                if (newDisplayConstructs[i].constructDetail.constructPrimaryColumn === "DefinitionOrResponse")
                {
                  randomOptionList = randomOptions.assocSynonymRandomOptionsWord; 
                } else
                {
                  randomOptionList = randomOptions.assocSynonymRandomOptionsSyn; 
                }
              }
              console.log ("displayFinalPrepContainer - Association - randomOptions = ",randomOptions );
              break;
            case "Definition": 
              if (newDisplayConstructs[i].constructDetail.constructPrimaryColumn === "DefinitionOrResponse")
              {
                randomOptionList = randomOptions.definitionRandomOptionsWord; 
              } else
              {
                randomOptionList = randomOptions.definitionRandomOptionsDef; 
              }
              console.log ("displayFinalPrepContainer - Definition - randomOptions = ",randomOptions );
              break;

              case "Fact": 
              if (newDisplayConstructs[i].constructDetail.constructPrimaryColumn === "DefinitionOrResponse")
              {
                randomOptionList = randomOptions.factRandomOptionsFact; 
              } else
              {
                randomOptionList = randomOptions.factRandomOptionsContrary; 
              }
              console.log ("displayFinalPrepContainer - Definition - randomOptions = ",randomOptions );
              break;

              case "Prefix": 
              if (newDisplayConstructs[i].constructDetail.constructPrimaryColumn === "DefinitionOrResponse")
              {
                randomOptionList = randomOptions.prefixRandomOptionsPrefix; 
              } else
              {
                randomOptionList = randomOptions.prefixRandomOptionsMeaning; 
              }
              console.log ("displayFinalPrepContainer - Definition - randomOptions = ",randomOptions );
              break;
            case "Question":  
              if (newDisplayConstructs[i].constructDetail.constructPrimaryColumn === "DefinitionOrResponse")
              {
                randomOptionList = randomOptions.questionRandomOptionsQues; 
              } else
              {
                randomOptionList = randomOptions.questionRandomOptionsResp;
              }
              console.log ("displayFinalPrepContainer - Question - randomOptions = ",randomOptions );
              break;

              case "Quote": 
              if (newDisplayConstructs[i].constructDetail.constructPrimaryColumn === "DefinitionOrResponse")
              {
                randomOptionList = randomOptions.quoteRandomOptionsQuote; 
              } else
              {
                randomOptionList = randomOptions.quoteRandomOptionsAuthor; 
              }
              console.log ("displayFinalPrepContainer - Definition - randomOptions = ",randomOptions );
              break;
              case "Suffix": 
              if (newDisplayConstructs[i].constructDetail.constructPrimaryColumn === "DefinitionOrResponse")
              {
                randomOptionList = randomOptions.suffixRandomOptionsSuffix; 
              } else
              {
                randomOptionList = randomOptions.suffixRandomOptionsMeaning; 
              }
              console.log ("displayFinalPrepContainer - Definition - randomOptions = ",randomOptions );
              break;
            default:

              break;
          }
          shuffleArray(randomOptionList);
          newResponseOptions = randomOptionList;
          console.log("DisplayFinalPrepContainer - useEffect - RandomOptions newResponseOptions = ",newResponseOptions);
        } else  if (newDisplayConstructs[i].constructOptionsSource === "SecondaryColumns")
        {
          console.log("DisplayFinalPrepContainer - useEffect - SecondaryColumns responseOptions = ",responseOptions);
          shuffleArray(responseOptions);
          newResponseOptions = responseOptions;
          console.log("DisplayFinalPrepContainer - useEffect - SecondaryColumns newResponseOptions = ",newResponseOptions);
        } else 
        {
          newResponseOptions = newDisplayConstructs[i].optionChoices;
          endOptionCount = newDisplayConstructs[i].optionChoices.length;
          console.log("DisplayFinalPrepContainer - useEffect - SecondaryColumns newResponseOptions = ",newResponseOptions);
        }
        if (newResponseOptions != undefined)
        {
          let optionChoices = [];
          if (endOptionCount <= 1 ||  endOptionCount >= 8)
          {
            endOptionCount = 5
          }
          let totalOptionCount = 1;
          let getOptionCount = newResponseOptions.length
          optionChoices.push(newDisplayConstructs[i].responseLine)
          if (newDisplayConstructs[i].selectedValues != undefined)
          {
            if (  newDisplayConstructs[i].selectedValues.length > 0  && 
                  !optionChoices.includes(newDisplayConstructs[i].selectedValues[0]) && 
                  (newDisplayConstructs[i].selectedValues[0].trim() != newDisplayConstructs[i].inquiryLine.trim()))
              {
                optionChoices.push(newDisplayConstructs[i].selectedValues[0])
                totalOptionCount = 2
              }
          }
          for  (let j = 0; j < getOptionCount; j++)
          {
            if (newResponseOptions[j] != undefined)
            {
              if (newResponseOptions[j].length > 0)
              {
                if (!optionChoices.includes(newResponseOptions[j])  &&
                    (newResponseOptions[j].trim() != newDisplayConstructs[i].inquiryLine.trim()))
                {
                  optionChoices.push(newResponseOptions[j]);
                  totalOptionCount = totalOptionCount + 1;
                }
                if (totalOptionCount >= endOptionCount )
                {
                  break;
                }
              }
            }    
          }

          let questionOptions = (optionChoices.map(
            (opts)=> { return {id: opts, title: opts}})) ;

          shuffleArray(questionOptions);
          newDisplayConstructs[i].optionChoices=questionOptions; 
        } 
      } // End of If constructResponseFormat === "QuestionMultiChoice
      else if (newDisplayConstructs[i].constructResponseFormat === "Matching")
      {
        newDisplayConstructs[i].optionChoices.push(newDisplayConstructs[i].responseLine);
      }
      else if (newDisplayConstructs[i].constructResponseFormat === "StatementFillIn")
      {
        newDisplayConstructs[i].optionChoices.push(newDisplayConstructs[i].responseLine);
      }
      else if (newDisplayConstructs[i].constructResponseFormat === "TrueFalse")
      {
        optionChoices.push(True);
        optionChoices.push(False);
        let questionOptions = (optionChoices.map(
          (opts)=> { return {id: opts, title: opts}})) ;

        newDisplayConstructs[i].optionChoices=questionOptions;
      } 
      else if (newDisplayConstructs[i].constructResponseFormat === "YesNo")
      {
        newDisplayConstructs[i].optionChoices.push(Yes);
        newDisplayConstructs[i].optionChoices.push(No);
        let questionOptions = (optionChoices.map(
          (opts)=> { return {id: opts, title: opts}})) ;

        newDisplayConstructs[i].optionChoices=questionOptions;
      }
    } 
    console.log("DisplayFinalPrepContainer - end - useEffect newDisplayConstructs = ", newDisplayConstructs);
    let sortedDisplayConstructs = newDisplayConstructs.sort((a, b) => (a.sequenceNo > b.sequenceNo) ? 1 : -1);
    setFinalDisplayConstructs(sortedDisplayConstructs);

  }, []);
 
  useEffect(() => {
    setPrepComplete(true)
  }, [finalDisplayConstructs]);


//----------------------------------------------------
return (
  <div className={classes.root}>
    <CssBaseline />
      { ( finalDisplayConstructs.length === numberOfConstructs) && 
        ((displayFramework.frameworkLayoutFormat === "Tabular") || 
         (displayFramework.frameworkLayoutFormat === "TicTacToe") ||
         (displayFramework.frameworkLayoutFormat === "Trivia") ) &&
         (prepComplete) &&
          <DisplayGamerSwitchContainer
            setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
            displayFramework={displayFramework}
            setDisplayFramework={setDisplayFramework}
            finalDisplayConstructs={finalDisplayConstructs}
            setFinalDisplayConstructs={setFinalDisplayConstructs}
            numberOfConstructs={numberOfConstructs}
            okToChange = {okToChange}
            setOkToChange= {setOkToChange}
            />} 

      {(displayFramework.frameworkLayoutFormat === "Carousel") && 
       (finalDisplayConstructs.length === numberOfConstructs) && 
       (prepComplete) &&
          <DisplayLessonSwitchContainer
            setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
            displayFramework={displayFramework}
            setDisplayFramework={setDisplayFramework}
            finalDisplayConstructs={finalDisplayConstructs}
            setFinalDisplayConstructs={setFinalDisplayConstructs}
            numberOfConstructs={numberOfConstructs}
            okToChange = {okToChange}
            setOkToChange= {setOkToChange}
            completed= {completed}
            />} 
  </div>
);
}
