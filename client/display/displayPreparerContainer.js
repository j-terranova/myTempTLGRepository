import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import auth from "../auth/auth-helper";

import InquiryLine from "./displayInquiryLineFunctions";

import DisplayFinalPrepContainer from "./displayFinalPrepContainer";
import { readById as readAssociationById } from "../constructs/associations/api-constructAssociation.js";
import { readById as readDefinitionById } from "../constructs/definitions/api-constructDefinition.js";
import { readById as readFactById } from "../constructs/facts/api-constructFact.js";
import { readById as readPrefixById } from "../constructs/prefixes/api-constructPrefix.js";
import { readById as readQuestionById } from "../constructs/questions/api-constructQuestion.js";
import { readById as readQuoteById } from "../constructs/quotes/api-constructQuote.js";
import { readById as readSegmentById } from "../constructs/segments/api-constructSegment.js";
import { readById as readMiniSegmentById } from "../constructs/miniSegments/api-constructMiniSegment.js";
import { readById as readStatementById } from "../constructs/statements/api-constructStatement.js";
import { readById as readSuffixById } from "../constructs/suffixes/api-constructSuffix.js";

import {shuffleArray} from "./displayConstructSwitch"

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

export default function DisplayPreparerContainer(props) {
  const {
    setOpenDisplayContainerPopup,
    displayFramework,
    setDisplayFramework,
  } = props;

  const classes = useStyles();

  const frameworkLayoutFormat = displayFramework.frameworkLayoutFormat;
  const frameworkResponseFormat = displayFramework.frameworkResponseFormat;
  const frameworkPresentationMethod = displayFramework.frameworkPresentationMethod;
  const frameworkSolutionMethod = displayFramework.frameworkSolutionMethod;
  const frameworkIncludeSpeech = displayFramework.frameworkIncludeSpeech; 
  const frameworkIncludeTimer = displayFramework.frameworkIncludeTimer; 
  const frameworkIncludeScoring = displayFramework.frameworkIncludeScoring;
  const frameworkColor = displayFramework.frameworkColor;

  const includeConstructs = displayFramework.includeConstructs.sort((a, b) => (a.sequenceNo > b.sequenceNo) ? 1 : -1);
  const [displayConstructs, setDisplayConstructs] = useState([]);
  const numberOfConstructs =  includeConstructs.length;
  const [responseOptions, setResponseOptions] = useState([]);

  console.log( "DisplayPreparerContainer  displayFramework = ", displayFramework );
  console.log("DisplayPreparerContainer - includeConstructs = ", includeConstructs );
  console.log("DisplayPreparerContainer - frameworkLayoutFormat = ", frameworkLayoutFormat );

  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;

//----------------------------------------------------
/*
  frameworkLayoutFormat: 
  frameworkResponseFormat:
  frameworkPresentationMethod: 
  frameworkSolutionMethod: 
  frameworkIncludeSpeech: 
  frameworkIncludeTimer: 
  frameworkIncludeScoring: 
  frameworkColor: 

  sequenceNo: 0,
  constructDetail: "",
  type: "Component",
  subType: "",
  constructPrimaryColumn:  "",
  constructOptionsSource: "",
  constructNumberOfOptions:  0,
  constructResponseFormat:  "",
  constructColor:  "",
  constructId:  "",
  */

const addComponentToDisplayConstructs = (newComponent) => {
  setDisplayConstructs(displayConstructs => 
    [...displayConstructs, newComponent])
}

const addResponseLineToResponseOptions = (responseLine) => {
  setResponseOptions(responseOptions => 
    [...responseOptions, responseLine])
}

const setAssociationDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readAssociationById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setAssociationDetails data.error = ", data.error );
    } else {
      
      if (data != undefined && data != null)  
      { 

      const wordToAssociate = data.constructAssociation.wordToAssociate;
      const associatedWord = data.constructAssociation.associatedWords[0];
      const associationType = data.constructAssociation.associationType;
      const responseFormat = constructRecord.constructResponseFormat;
      
      let primaryColumn = "wordToAssociate";
      let responseLine = associatedWord;
      
      if (constructRecord.constructPrimaryColumn === "DefinitionOrResponse")
      {
        primaryColumn = "associatedWord";
        responseLine = wordToAssociate;
      }

      const inquiryLine = InquiryLine.Association(  wordToAssociate,
                                                    associatedWord,
                                                    associationType,
                                                    responseFormat,
                                                    primaryColumn);              

      addResponseLineToResponseOptions(responseLine);
      console.log( "DisplayPreparerContainer - setAssociationDetails inquiryLine = ", inquiryLine );
       const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructAssociation,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          inquiryLine: inquiryLine,
          responseLine: responseLine,
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setDefinitionDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readDefinitionById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setDefinitionDetails data.error = ", data.error );
    } else {
      if (data != undefined && data != null)
      {
      
      const wordToDefine = data.constructDefinition.wordToDefine;
      const wordDefinition = data.constructDefinition.wordDefinitions[0];
      const responseFormat = constructRecord.constructResponseFormat;
      let primaryColumn = "wordToDefine";
      let responseLine = wordDefinition;
      if (constructRecord.constructPrimaryColumn === "DefinitionOrResponse")
      {
        primaryColumn = "wordDefinition";
        responseLine = wordToDefine;
      }
      const inquiryLine = InquiryLine.Definition( wordToDefine,
                                                  wordDefinition,
                                                  responseFormat,
                                                  primaryColumn);              
        
      addResponseLineToResponseOptions(responseLine);
      console.log( "DisplayPreparerContainer - setDefinitionDetails inquiryLine = ", inquiryLine );
      const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructDefinition,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          inquiryLine: inquiryLine,
          responseLine: responseLine,
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
        };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setFactDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readFactById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setFactDetails data.error = ", data.error );
    } else {
      
      if (data != undefined && data != null)
      { 
      const fact = data.constructFact.fact;
      const source = data.constructFact.source;
      const proof = data.constructFact.proof;
      const contraryStatement = data.constructFact.contraryStatements[0];
      const responseFormat = constructRecord.constructResponseFormat;
      
      let primaryColumn = "fact";
      let responseLine = source;
      
      if (constructRecord.constructPrimaryColumn === "DefinitionOrResponse")
      {
        primaryColumn = "contraryStatement";
        responseLine = fact;
      }

      const inquiryLine = InquiryLine.Fact( fact,
                                            source,
                                            proof,
                                            contraryStatement,
                                            responseFormat,
                                            primaryColumn);              
      addResponseLineToResponseOptions(responseLine);

      const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructFact,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          inquiryLine: inquiryLine,
          responseLine: responseLine,
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setMiniSegmentDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readMiniSegmentById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setMiniSegmentDetails data.error = ", data.error );
    } else {
      
      if (data != undefined && data != null)
      {   const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructMiniSegment,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setPrefixDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readPrefixById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setPrefixDetails data.error = ", data.error );
    } else {
      
      if (data != undefined && data != null)
      {   
        const prefix = data.constructPrefix.prefix;
        const meaning = data.constructPrefix.meaning;
        const responseFormat = constructRecord.constructResponseFormat;
        let primaryColumn = "prefix";
        let responseLine = meaning;
        if (constructRecord.constructPrimaryColumn === "DefinitionOrResponse")
        {
          primaryColumn = "meaning";
          responseLine = prefix;
        }
        const inquiryLine = InquiryLine.Prefix( prefix,
                                                meaning,
                                                responseFormat,
                                                primaryColumn);              
          
        addResponseLineToResponseOptions(responseLine);
        
        const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructPrefix,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          inquiryLine: inquiryLine,
          responseLine: responseLine,
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setQuestionDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readQuestionById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
     ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setQuestionDetails data.error = ", data.error );
    } else {
      if (data != undefined && data != null)
      {  
        

        const questionPosed = data.constructQuestion.questionPosed;
        const correctResponse = data.constructQuestion.correctResponses[0];
        const responseFormat = constructRecord.constructResponseFormat;
        let primaryColumn = "questionPosed";
        let responseLine = correctResponse;
        if (constructRecord.constructPrimaryColumn === "DefinitionOrResponse")
        {
          primaryColumn = "correctResponse";
          responseLine = questionPosed;
        }
        const inquiryLine = InquiryLine.Question(  questionPosed,
                                                      correctResponse,
                                                      responseFormat,
                                                      primaryColumn);              

        addResponseLineToResponseOptions(responseLine);
        console.log( "DisplayPreparerContainer - setQuestionsDetails inquiryLine = ", inquiryLine );
        //const questionPosed = data.constructQuestion.questionPosed;
        const questionType = data.constructQuestion.questionType;
        const correctResponses = data.constructQuestion.correctResponses;
        const inCorrectResponses = data.constructQuestion.inCorrectResponses;
        // Add Functionality to check question type and adjust based on type.
        // Currently this just includes cod for MultipleChoice and standard


        const optionChoices = [...inCorrectResponses,...correctResponses];
        //let questionOptions = (optionChoices.map(
        //    (opts)=> { return {id: opts, title: opts}})) ;
        
        //shuffleArray(questionOptions);

        const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructQuestion,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: optionChoices,
          correctResponses:correctResponses,
          inquiryLine: inquiryLine,
          responseLine: responseLine,
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setQuoteDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readQuoteById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setQuoteDetails data.error = ", data.error );
    } else {
      
      if (data != undefined && data != null)
      {   
        const quote = data.constructQuote.quote;
        const author = data.constructQuote.author;
        const source = data.constructQuote.sourceOrSituation;
        const year = data.constructQuote.year;
        const responseFormat = constructRecord.constructResponseFormat;
        
        let primaryColumn = "quote";
        let responseLine = author;
        
        if (constructRecord.constructPrimaryColumn === "DefinitionOrResponse")
        {
          primaryColumn = "author";
          responseLine = quote;
        }
  
        const inquiryLine = InquiryLine.Quote(  quote,
                                                author,
                                                source,
                                                year,
                                                responseFormat,
                                                primaryColumn);              
        addResponseLineToResponseOptions(responseLine);
  
        const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructQuote,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          inquiryLine: inquiryLine,
          responseLine: responseLine,
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setSegmentDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readSegmentById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setSegmentDetails data.error = ", data.error );
    } else {
      if (data != undefined && data != null)
      {   const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructSegment,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setStatementDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readStatementById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setStatementDetails data.error = ", data.error );
    } else {
      if (data != undefined && data != null)
      {   const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructStatement,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setSuffixDetails = (constructRecord,index) => {
  const abortController = new AbortController()
  const signal = abortController.signal
  readSuffixById(
    { userId: userId, },
    { id: constructRecord.constructId}, 
    {
      t: jwt.token,
    },
    signal,
    ).then((data) => {
    if (data.error) {
      console.log( "DisplayPreparerContainer - setSuffixDetails data.error = ", data.error );
    } else {
      
      if (data != undefined && data != null)
      {   
        const suffix = data.constructSuffix.suffix;
        const meaning = data.constructSuffix.meaning;
        const responseFormat = constructRecord.constructResponseFormat;
        let primaryColumn = "suffix";
        let responseLine = meaning;
        if (constructRecord.constructPrimaryColumn === "DefinitionOrResponse")
        {
          primaryColumn = "meaning";
          responseLine = suffix;
        }
        const inquiryLine = InquiryLine.Suffix( suffix,
                                                meaning,
                                                responseFormat,
                                                primaryColumn);              
          
        addResponseLineToResponseOptions(responseLine);
        
        const newComponent = 
        { 
          sequenceNo: constructRecord.sequenceNo,
          constructDetail: data.constructSuffix,
          image_id: data.image_id,
          imageFileName: data.imageFileName,
          type: constructRecord.type,
          subType: constructRecord.subType,
          constructPrimaryColumn: constructRecord.constructPrimaryColumn,
          constructOptionsSource: constructRecord.constructOptionsSource,
          constructNumberOfOptions: constructRecord.constructNumberOfOptions,
          constructResponseFormat: constructRecord.constructResponseFormat,
          constructColor: constructRecord.constructColor,
          optionChoices: [],
          inquiryLine: inquiryLine,
          responseLine: responseLine,
          correctResponses:(constructRecord.correctResponses ? constructRecord.correctResponses : []),
          selectedValues: (constructRecord.selectedValues ? constructRecord.selectedValues : []),
          responseStatus: (constructRecord.responseStatus ? constructRecord.responseStatus : "") ,
          correctable: true,
          constructId: constructRecord.constructId,
         };
         addComponentToDisplayConstructs(newComponent);
      } 
    }
  })
  return function cleanup(){
    abortController.abort()
  }
}

const setDisplayComponents = (includeConstructs) =>{
  includeConstructs.map((constructRecord,index) => {
    switch(constructRecord.subType) {
      case "Association": 
        setAssociationDetails(constructRecord,index);
        break;
      case "Definition": 
        setDefinitionDetails(constructRecord,index);
        break;
      case "Equation":  
        
        break;
      case "Fact":  
        setFactDetails(constructRecord,index);
        break;
      case "MiniSegment":  
        setminSegmentDetails(constructRecord,index);
        break;
      case "Prefix":  
        setPrefixDetails(constructRecord,index);
        break;
      case "Question":  
        setQuestionDetails(constructRecord,index);
        break;
      case "Quote":  
        setQuoteDetails(constructRecord,index);
        break;
      case "RootWord":  
        
        break;
      case "Segment":  
        setSegmentDetails(constructRecord,index);
        break;
      case "Statement":  
        setStatementDetails(constructRecord,index);
        break;
      case "Suffix":  
        setSuffixDetails(constructRecord,index);
        break;
      default:

        break;
    }
  }
)}

useEffect(() => {
  console.log(
    "DisplayPreparerContainer - useEffect with displayFramework = ", displayFramework );
  console.log(
    "DisplayPreparerContainer - useEffect with includeConstructs = ", includeConstructs );
  setDisplayComponents(includeConstructs)
}, [includeConstructs]);

useEffect(() => {
  console.log(
    "DisplayPreparerContainer - useEffect with numberOfConstructs = ", numberOfConstructs );
  console.log(
    "DisplayPreparerContainer - useEffect with displayConstructs = ", displayConstructs );

}, [displayConstructs]);

//----------------------------------------------------
  return (
    <div className={classes.root}>
      <CssBaseline />
        {( displayConstructs.length === numberOfConstructs) &&
            <DisplayFinalPrepContainer
              setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
              displayFramework={displayFramework}
              setDisplayFramework={setDisplayFramework}
              displayConstructs={displayConstructs}
              setDisplayConstructs={setDisplayConstructs}
              numberOfConstructs={numberOfConstructs}
              responseOptions ={responseOptions}
              frameworkLayoutFormat ={frameworkLayoutFormat}
              frameworkResponseFormat ={frameworkResponseFormat}
              frameworkPresentationMethod ={frameworkPresentationMethod}
              frameworkSolutionMethod ={frameworkSolutionMethod}
              frameworkIncludeSpeech={frameworkIncludeSpeech}
              frameworkIncludeTimer={frameworkIncludeTimer}
              frameworkIncludeScoring={frameworkIncludeScoring}
              frameworkColor={frameworkColor}
              />} 
    </div>
  );
}
