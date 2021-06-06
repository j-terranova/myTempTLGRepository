import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import auth from "./../auth/auth-helper";
import { makeStyles } from '@material-ui/core/styles';
import SetupMenu from "./SetupMenu";

import { getAntonymRandomOptions as getAntonymRandomOptions} from "../constructs/associations/api-constructAssociation";
import { getSynonymRandomOptions as getSynonymRandomOptions} from "../constructs/associations/api-constructAssociation";
import { getRandomOptions as getDefinitionRandomOptions} from "../constructs/definitions/api-constructDefinition";
import { getRandomOptions as getFactRandomOptions} from "../constructs/facts/api-constructFact";
import { getRandomOptions as getPrefixRandomOptions} from "../constructs/prefixes/api-constructPrefix";
import { getRandomOptions as getQuestionRandomOptions} from "../constructs/questions/api-constructQuestion";
import { getRandomOptions as getQuoteRandomOptions} from "../constructs/quotes/api-constructQuote";
import { getRandomOptions as getSuffixRandomOptions} from "../constructs/suffixes/api-constructSuffix";

import { useRandomOptions, useRandomOptionsDispatch } from "../contexts/RandomOptionsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

function SetupRandomOptions() {
  const classes = useStyles();

  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const randomOptionsList = useRandomOptions();
  const randomOptionsDispatch = useRandomOptionsDispatch();
  //AssociateRandomOptions(userId, jwt, "Antonym",7,50, "associatedWord");

  const AssociateRandomOptions = (userId, jwt, associationType,maximumDifficultyLevel,numberToRetrieve,secondaryColumn)=> {
    const abortController = new AbortController();
    const signal = abortController.signal;

    console.log("displayRandomOptions - AssociateRandomOptions - Start ");
    let randomOptions = [];
    if (associationType === "Antonym")
    {
      getAntonymRandomOptions(
        {
          userId: userId,
        },
        { t: jwt.token },
        {difficultyLevel: maximumDifficultyLevel,
        numberToRetrieve: numberToRetrieve},
        signal,
      ).then((data) => {
        if (!data) {
          console.log(
            "displayRandomOptions -Antonym- No Data so need other list method"
          );
        } else {
          if (data.error) {
            console.log(
              "displayRandomOptions -Antonym- No Data so error is returned data =: ",
              data
            );
            console.log(
              "displayRandomOptions -Antonym- No Data so error is returned data.error =: ",
              data.error
            );
            //setRedirectToSignin(true);
          } else {
            //console.log(
            //  "displayRandomOptions -Antonym- Right after data is returned data =: ",
            //  data
            //);
            if (secondaryColumn ==="associatedWord")
            {
              randomOptions = (data.map(
                (opts)=> { return opts.constructAssociation.associatedWords[0]})) ;
              //console.log("displayRandomOptions -Antonym- randomOptions = ",randomOptions  );
              setAssocAntonymRandomOptionsAnt(randomOptions);
            } else
            {
              randomOptions = (data.map(
                (opts)=> { return opts.constructAssociation.wordToAssociate})) ;
              //console.log("displayRandomOptions -Antonym- randomOptions = ",randomOptions  );
              setAssocAntonymRandomOptionsWord(randomOptions);
            }
          }
        }
      });
    } else
    {
      getSynonymRandomOptions(
        {
          userId: userId,
        },
        { t: jwt.token },
        {difficultyLevel: maximumDifficultyLevel,
        numberToRetrieve: numberToRetrieve},
        signal,
      ).then((data) => {
        if (!data) {
          console.log(
            "displayRandomOptions -Synonym- No Data so need other list method"
          );
        } else {
          if (data.error) {
            console.log(
              "displayRandomOptions -Synonym- No Data so error is returned data =: ",
              data
            );
            console.log(
              "displayRandomOptions -Synonym- No Data so error is returned data.error =: ",
              data.error
            );
            //setRedirectToSignin(true);
          } else {
            //console.log(
            //  "displayRandomOptions -Synonym- Right after data is returned data =: ",
            //  data
            //);
            if (secondaryColumn ==="associatedWord")
            {
              randomOptions = (data.map(
                (opts)=> { return opts.constructAssociation.associatedWords[0]})) ;
              //console.log("displayRandomOptions -Synonym- randomOptions = ",randomOptions  );
              setAssocSynonymRandomOptionsSyn(randomOptions);
             } else
            {
              randomOptions = (data.map(
                (opts)=> { return opts.constructAssociation.wordToAssociate})) ;
              //console.log("displayRandomOptions -Synonym- randomOptions = ",randomOptions  );
              setAssocSynonymRandomOptionsWord(randomOptions);
             }
          }
        }
      });
    }
 
  }

  const DefinitionRandomOptions = (userId, jwt, maximumDifficultyLevel,numberToRetrieve,secondaryColumn) =>{ 

    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("displayRandomOptions - DefinitionList - Start ");
    let randomOptions = [];
    getDefinitionRandomOptions(
      {
        userId: userId,
      },
      { t: jwt.token },
      {difficultyLevel: maximumDifficultyLevel,
      numberToRetrieve: numberToRetrieve},
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "displayRandomOptions - No Data so need other list method"
        );
      } else {
        if (data.error) {
          console.log(
            "displayRandomOptions - No Data so error is returned data =: ",
            data
          );
          console.log(
            "displayRandomOptions - No Data so error is returned data.error =: ",
            data.error
          );
          //setRedirectToSignin(true);
        } else {
          //console.log(
          //  "displayRandomOptions - Right after data is returned data =: ",
          //  data
          //);
          if (secondaryColumn ==="wordDefinition")
          {
            randomOptions = (data.map(                 
              (opts)=> { return opts.constructDefinition.wordDefinitions[0]})) ;
            setDefinitionRandomOptionsDef(randomOptions);
          } else
          {
            randomOptions = (data.map(
              (opts)=> { return opts.constructDefinition.wordToDefine})) ;
            setDefinitionRandomOptionsWord(randomOptions);
          }
        }
      }
    });
    return randomOptions;
  }

   const FactRandomOptions = (userId, jwt, maximumDifficultyLevel,numberToRetrieve,secondaryColumn) =>{ 

    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("displayRandomOptions - FactList - Start ");
    let randomOptions = [];
    getFactRandomOptions(
      {
        userId: userId,
      },
      { t: jwt.token },
      {difficultyLevel: maximumDifficultyLevel,
      numberToRetrieve: numberToRetrieve},
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "displayRandomOptions - No Data so need other list method"
        );
      } else {
        if (data.error) {
          console.log(
            "displayRandomOptions - No Data so error is returned data =: ",
            data
          );
          console.log(
            "displayRandomOptions - No Data so error is returned data.error =: ",
            data.error
          );
          //setRedirectToSignin(true);
        } else {
          //console.log(
          //  "displayRandomOptions - Right after data is returned data =: ",
          //  data
          //);
        // Note that the options for source and
        // proof are not included.  These can be easily added
        // if it is found that they are required in the future.
          if (secondaryColumn ==="contraryStatement")
          {
            randomOptions = (data.map(                 
              (opts)=> { return opts.constructFact.contraryStatements[0]})) ;
            setFactRandomOptionsContrary(randomOptions);
          } else
          {
            randomOptions = (data.map(
              (opts)=> { return opts.constructFact.fact})) ;
            setFactRandomOptionsFact(randomOptions);
          }
        }
      }
    });
    return randomOptions;
  }

  const PrefixRandomOptions = (userId, jwt, maximumDifficultyLevel,numberToRetrieve,secondaryColumn) =>{ 

    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("displayRandomOptions - PrefixList - Start ");
    let randomOptions = [];
    getPrefixRandomOptions(
      {
        userId: userId,
      },
      { t: jwt.token },
      {difficultyLevel: maximumDifficultyLevel,
      numberToRetrieve: numberToRetrieve},
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "displayRandomOptions - No Data so need other list method"
        );
      } else {
        if (data.error) {
          console.log(
            "displayRandomOptions - No Data so error is returned data =: ",
            data
          );
          console.log(
            "displayRandomOptions - No Data so error is returned data.error =: ",
            data.error
          );
          //setRedirectToSignin(true);
        } else {
          //console.log(
          //  "displayRandomOptions - Right after data is returned data =: ",
          //  data
          //);
          if (secondaryColumn ==="meaning")
          {
            randomOptions = (data.map(                 
              (opts)=> { return opts.constructPrefix.meaning})) ;
            setPrefixRandomOptionsMeaning(randomOptions);
          } else
          {
            randomOptions = (data.map(
              (opts)=> { return opts.constructPrefix.prefix})) ;
            setPrefixRandomOptionsPrefix(randomOptions);
          }
        }
      }
    });
    return randomOptions;
  }

  const QuestionRandomOptions = (userId, jwt,maximumDifficultyLevel,numberToRetrieve,secondaryColumn) => {

    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("displayRandomOptions - QuestionList - Start ");
    let randomOptions = [];
    getQuestionRandomOptions(
      {
        userId: userId,
      },
      { t: jwt.token },
      {difficultyLevel: maximumDifficultyLevel,
      numberToRetrieve: numberToRetrieve},
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "displayRandomOptions - No Data so need other list method"
        );
      } else {
        if (data.error) {
          console.log(
            "displayRandomOptions - No Data so error is returned data =: ",
            data
          );
          console.log(
            "displayRandomOptions - No Data so error is returned data.error =: ",
            data.error
          );
          //setRedirectToSignin(true);
        } else {
          //console.log(
          //  "displayRandomOptions - Right after data is returned data =: ",
          //  data
          //);
          if (secondaryColumn ==="correctResponse")
          {
            randomOptions = (data.map(
              (opts)=> { return opts.constructQuestion.correctResponses[0]})) ;
            setQuestionRandomOptionsResp(randomOptions);
          } else
          {
            randomOptions = (data.map(
              (opts)=> { return opts.constructQuestion.questionPosed})) ;
            setQuestionRandomOptionsQues(randomOptions);
          }
        }
      }
    });
    return randomOptions;
  }

const QuoteRandomOptions = (userId, jwt, maximumDifficultyLevel,numberToRetrieve,secondaryColumn) =>{ 

  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("displayRandomOptions - QuoteList - Start ");
  let randomOptions = [];
  getQuoteRandomOptions(
    {
      userId: userId,
    },
    { t: jwt.token },
    {difficultyLevel: maximumDifficultyLevel,
    numberToRetrieve: numberToRetrieve},
    signal
  ).then((data) => {
    if (!data) {
      console.log(
        "displayRandomOptions - No Data so need other list method"
      );
    } else {
      if (data.error) {
        console.log(
          "displayRandomOptions - No Data so error is returned data =: ",
          data
        );
        console.log(
          "displayRandomOptions - No Data so error is returned data.error =: ",
          data.error
        );
        //setRedirectToSignin(true);
      } else {
        //console.log(
        //  "displayRandomOptions - Right after data is returned data =: ",
        //  data
        //);
        // Note that the options for sourceOrSituation and
        // year are not included.  These can be easily added
        // if it is found that they are required in the future.
        if (secondaryColumn ==="author")
        {
          randomOptions = (data.map(                 
            (opts)=> { return opts.constructQuote.author})) ;
          setQuoteRandomOptionsAuthor(randomOptions);
        } else
        {
          randomOptions = (data.map(
            (opts)=> { return opts.constructQuote.quote})) ;
          setQuoteRandomOptionsQuote(randomOptions);
        }
      }
    }
  });
  return randomOptions;
}

const SuffixRandomOptions = (userId, jwt, maximumDifficultyLevel,numberToRetrieve,secondaryColumn) =>{ 

  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log("displayRandomOptions - SuffixList - Start ");
  let randomOptions = [];
  getSuffixRandomOptions(
    {
      userId: userId,
    },
    { t: jwt.token },
    {difficultyLevel: maximumDifficultyLevel,
    numberToRetrieve: numberToRetrieve},
    signal
  ).then((data) => {
    if (!data) {
      console.log(
        "displayRandomOptions - No Data so need other list method"
      );
    } else {
      if (data.error) {
        console.log(
          "displayRandomOptions - No Data so error is returned data =: ",
          data
        );
        console.log(
          "displayRandomOptions - No Data so error is returned data.error =: ",
          data.error
        );
        //setRedirectToSignin(true);
      } else {
        //console.log(
        //  "displayRandomOptions - Right after data is returned data =: ",
        //  data
        //);
        if (secondaryColumn ==="meaning")
        {
          randomOptions = (data.map(                 
            (opts)=> { return opts.constructSuffix.meaning})) ;
          setSuffixRandomOptionsMeaning(randomOptions);
        } else
        {
          randomOptions = (data.map(
            (opts)=> { return opts.constructSuffix.suffix})) ;
          setSuffixRandomOptionsSuffix(randomOptions);
        }
      }
    }
  });
  return randomOptions;
}


  const [assocAntonymRandomOptionsWord, setAssocAntonymRandomOptionsWord] = useState([]);
  const [assocAntonymRandomOptionsAnt, setAssocAntonymRandomOptionsAnt] = useState([]);
  const [assocSynonymRandomOptionsWord, setAssocSynonymRandomOptionsWord] = useState([]);
  const [assocSynonymRandomOptionsSyn, setAssocSynonymRandomOptionsSyn] = useState([]);
  
  const [definitionRandomOptionsWord, setDefinitionRandomOptionsWord] = useState([]);
  const [definitionRandomOptionsDef, setDefinitionRandomOptionsDef] = useState([]);

  const [factRandomOptionsFact, setFactRandomOptionsFact] = useState([]);
  const [factRandomOptionsSource, setFactRandomOptionsSource] = useState([]);
  const [factRandomOptionsProof, setFactRandomOptionsProof] = useState([]);
  const [factRandomOptionsContrary, setFactRandomOptionsContrary] = useState([]);

  const [prefixRandomOptionsPrefix, setPrefixRandomOptionsPrefix] = useState([]);
  const [prefixRandomOptionsMeaning, setPrefixRandomOptionsMeaning] = useState([]);

  const [questionRandomOptionsQues, setQuestionRandomOptionsQues] = useState([]);
  const [questionRandomOptionsResp, setQuestionRandomOptionsResp] = useState([]);

  const [quoteRandomOptionsQuote, setQuoteRandomOptionsQuote] = useState([]);
  const [quoteRandomOptionsAuthor, setQuoteRandomOptionsAuthor] = useState([]);  
  const [quoteRandomOptionsSource, setQuoteRandomOptionsSource] = useState([]);
  const [quoteRandomOptionsYear, setQuoteRandomOptionsYear] = useState([]);

  const [suffixRandomOptionsSuffix, setSuffixRandomOptionsSuffix] = useState([]);
  const [suffixRandomOptionsMeaning, setSuffixRandomOptionsMeaning] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Conditions may be added to ensure these only run once when started.
    // It might also be possible to find a more optimal location for  collecting this data
    if (  randomOptionsList.assocAntonymRandomOptionsWord == undefined ||
          randomOptionsList.assocAntonymRandomOptionsWord == null ||
          randomOptionsList.assocAntonymRandomOptionsWord.length === 0)
        {
          AssociateRandomOptions(userId, jwt, "Antonym",7,50, "wordToAssociate");
        }
    if (  randomOptionsList.assocAntonymRandomOptionsAnt == undefined ||
          randomOptionsList.assocAntonymRandomOptionsAnt == null ||
          randomOptionsList.assocAntonymRandomOptionsAnt.length === 0)
        {
          AssociateRandomOptions(userId, jwt, "Antonym",7,50, "associatedWord");
        }
    if (  randomOptionsList.assocSynonymRandomOptionsWord == undefined ||
          randomOptionsList.assocSynonymRandomOptionsWord == null ||
          randomOptionsList.assocSynonymRandomOptionsWord.length === 0)
        {
          AssociateRandomOptions(userId, jwt, "Synonym",7,50, "wordToAssociate");
        }
    if (  randomOptionsList.assocSynonymRandomOptionsSyn == undefined ||
          randomOptionsList.assocSynonymRandomOptionsSyn == null ||
          randomOptionsList.assocSynonymRandomOptionsSyn.length === 0)
        {
          AssociateRandomOptions(userId, jwt, "Synonym",7,50, "associatedWord");
        }
    if (  randomOptionsList.definitionRandomOptionsWord == undefined ||
          randomOptionsList.definitionRandomOptionsWord == null ||
          randomOptionsList.definitionRandomOptionsWord.length === 0)
       {
          DefinitionRandomOptions(userId, jwt, 7,50,"wordToDefine");
        }
    if (  randomOptionsList.definitionRandomOptionsDef == undefined ||
          randomOptionsList.definitionRandomOptionsDef == null ||
          randomOptionsList.definitionRandomOptionsDef.length === 0)
        {
          DefinitionRandomOptions(userId, jwt, 7,50,"wordDefinition");
        }
    if (  randomOptionsList.factRandomOptionsFact == undefined ||
          randomOptionsList.factRandomOptionsFact == null ||
          randomOptionsList.factRandomOptionsFact.length === 0)
        {
          FactRandomOptions(userId, jwt, 7,50,"fact");
        }
    if (  randomOptionsList.factRandomOptionsSource == undefined ||
          randomOptionsList.factRandomOptionsSource == null ||
          randomOptionsList.factRandomOptionsSource.length === 0)
        {
          FactRandomOptions(userId, jwt, 7,50,"source");
        }
    if (  randomOptionsList.factRandomOptionsProof == undefined ||
          randomOptionsList.factRandomOptionsProof == null ||
          randomOptionsList.factRandomOptionsProof.length === 0)
        {
          FactRandomOptions(userId, jwt, 7,50,"proof");
        }
    if (  randomOptionsList.factRandomOptionsContrary == undefined ||
          randomOptionsList.factRandomOptionsContrary == null ||
          randomOptionsList.factRandomOptionsContrary.length === 0)
        {
          FactRandomOptions(userId, jwt, 7,50,"contraryStatement");
        }
    if (  randomOptionsList.prefixRandomOptionsPrefix == undefined ||
          randomOptionsList.prefixRandomOptionsPrefix == null ||
          randomOptionsList.prefixRandomOptionsPrefix.length === 0)
        {
          PrefixRandomOptions(userId, jwt, 7,50,"prefix");
        }
    if (  randomOptionsList.prefixRandomOptionsMeaning == undefined ||
          randomOptionsList.prefixRandomOptionsMeaning == null ||
          randomOptionsList.prefixRandomOptionsMeaning.length === 0)
        {
          PrefixRandomOptions(userId, jwt, 7,50,"meaning");
        }
    if (  randomOptionsList.questionRandomOptionsQues == undefined ||
          randomOptionsList.questionRandomOptionsQues == null ||
          randomOptionsList.questionRandomOptionsQues.length === 0)
        {
          QuestionRandomOptions(userId, jwt, 7,50,"questionPosed");
        }
    if (  randomOptionsList.questionRandomOptionsResp == undefined ||
          randomOptionsList.questionRandomOptionsResp == null ||
          randomOptionsList.questionRandomOptionsResp.length === 0)
        {
          QuestionRandomOptions(userId, jwt, 7,50,"correctResponse");
        }
    if (  randomOptionsList.quoteRandomOptionsQuote == undefined ||
          randomOptionsList.quoteRandomOptionsQuote == null ||
          randomOptionsList.quoteRandomOptionsQuote.length === 0)
        {
          QuoteRandomOptions(userId, jwt, 7,50,"quote");
        }
    if (  randomOptionsList.quoteRandomOptionsAuthor == undefined ||
          randomOptionsList.quoteRandomOptionsAuthor == null ||
          randomOptionsList.quoteRandomOptionsAuthor.length === 0)
        {
          QuoteRandomOptions(userId, jwt, 7,50,"author");
        }
    if (  randomOptionsList.quoteRandomOptionsSource == undefined ||
          randomOptionsList.quoteRandomOptionsSource == null ||
          randomOptionsList.quoteRandomOptionsSource.length === 0)
        {
          QuoteRandomOptions(userId, jwt, 7,50,"sourceOrSituation");
        }
    if (  randomOptionsList.quoteRandomOptionsYear == undefined ||
          randomOptionsList.quoteRandomOptionsYear == null ||
          randomOptionsList.quoteRandomOptionsYear.length === 0)
        {
          QuoteRandomOptions(userId, jwt, 7,50,"year");
        }
    if (  randomOptionsList.suffixRandomOptionsSuffix == undefined ||
          randomOptionsList.suffixRandomOptionsSuffix == null ||
          randomOptionsList.suffixRandomOptionsSuffix.length === 0)
        {
          SuffixRandomOptions(userId, jwt, 7,50,"suffix");
        }
    if (  randomOptionsList.suffixRandomOptionsMeaning == undefined ||
          randomOptionsList.suffixRandomOptionsMeaning == null ||
          randomOptionsList.suffixRandomOptionsMeaning.length === 0)
        {
          SuffixRandomOptions(userId, jwt, 7,50,"meaning");
        }

    return function cleanup() {
    abortController.abort();
    };
  }, []);

  useEffect(() => {
    console.log("SetupRandomOptions - assocAntonymRandomOptionsWord = ", assocAntonymRandomOptionsWord);
    
    if (assocAntonymRandomOptionsWord != undefined)
    {  if (assocAntonymRandomOptionsWord.length > 0)
      {
        randomOptionsDispatch({
          type: "SET_ASSOCANTONYMRANDOMOPTIONSWORD",
          assocAntonymRandomOptionsWord: assocAntonymRandomOptionsWord,
        });
        //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [assocAntonymRandomOptionsWord]);

  useEffect(() => {
    console.log("SetupRandomOptions - assocAntonymRandomOptionsAnt = ", assocAntonymRandomOptionsAnt);
    if (assocAntonymRandomOptionsAnt != undefined)
    {  
     if (assocAntonymRandomOptionsAnt.length > 0)
     {
        randomOptionsDispatch({
          type: "SET_ASSOCANTONYMRANDOMOPTIONSANT",
          assocAntonymRandomOptionsAnt: assocAntonymRandomOptionsAnt,
        });
        //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [assocAntonymRandomOptionsAnt]);
  
  useEffect(() => {
    console.log("SetupRandomOptions - assocSynonymRandomOptionsWord = ", assocSynonymRandomOptionsWord);
    if (assocSynonymRandomOptionsWord != undefined)
    {  
     if (assocSynonymRandomOptionsWord.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_ASSOCSYNONYMRANDOMOPTIONSWORD",
        assocSynonymRandomOptionsWord: assocSynonymRandomOptionsWord,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
    }
    }
  }, [assocSynonymRandomOptionsWord]);

  useEffect(() => {
    console.log("SetupRandomOptions - assocSynonymRandomOptionsSyn = ", assocSynonymRandomOptionsSyn);
    if (assocSynonymRandomOptionsSyn != undefined)
    {  
     if (assocSynonymRandomOptionsSyn.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_ASSOCSYNONYMRANDOMOPTIONSSYN",
        assocSynonymRandomOptionsSyn: assocSynonymRandomOptionsSyn,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [assocSynonymRandomOptionsSyn]);
  
  useEffect(() => {
    console.log("SetupRandomOptions - definitionRandomOptionsWord = ", definitionRandomOptionsWord);
    if (definitionRandomOptionsWord != undefined)
    {  
     if (definitionRandomOptionsWord.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_DEFINITIONRANDOMOPTIONSWORD",
        definitionRandomOptionsWord: definitionRandomOptionsWord,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [definitionRandomOptionsWord]);
  
  useEffect(() => {
    console.log("SetupRandomOptions - definitionRandomOptionsDef = ", definitionRandomOptionsDef);
    if (definitionRandomOptionsDef != undefined)
    {  
      if (definitionRandomOptionsDef.length > 0)
      {
      randomOptionsDispatch({
        type: "SET_DEFINITIONRANDOMOPTIONSDEF",
        definitionRandomOptionsDef: definitionRandomOptionsDef,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [definitionRandomOptionsDef]);
  
  //Fact
  useEffect(() => {
    console.log("SetupRandomOptions - factRandomOptionsFact = ", factRandomOptionsFact);
    if (factRandomOptionsFact != undefined)
    {  
     if (factRandomOptionsFact.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_FACTRANDOMOPTIONSFACT",
        factRandomOptionsFact: factRandomOptionsFact,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [factRandomOptionsFact]);
  useEffect(() => {
    console.log("SetupRandomOptions - factRandomOptionsSource = ", factRandomOptionsSource);
    if (factRandomOptionsSource != undefined)
    {  
     if (factRandomOptionsSource.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_FACTRANDOMOPTIONSSOURCE",
        factRandomOptionsSource: factRandomOptionsSource,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [factRandomOptionsSource]);
  useEffect(() => {
    console.log("SetupRandomOptions - factRandomOptionsProof = ", factRandomOptionsProof);
    if (factRandomOptionsProof != undefined)
    {  
     if (factRandomOptionsProof.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_FACTRANDOMOPTIONSPROOF",
        factRandomOptionsProof: factRandomOptionsProof,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [factRandomOptionsProof]);
  useEffect(() => {
    console.log("SetupRandomOptions - factRandomOptionsContrary = ", factRandomOptionsContrary);
    if (factRandomOptionsContrary != undefined)
    {  
     if (factRandomOptionsContrary.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_FACTRANDOMOPTIONSCONTRARY",
        factRandomOptionsContrary: factRandomOptionsContrary,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [factRandomOptionsContrary]);

  //Prefix
  useEffect(() => {
    console.log("SetupRandomOptions - prefixRandomOptionsPrefix = ", prefixRandomOptionsPrefix);
    if (prefixRandomOptionsPrefix != undefined)
    {  
     if (prefixRandomOptionsPrefix.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_PREFIXRANDOMOPTIONSPREFIX",
        prefixRandomOptionsPrefix: prefixRandomOptionsPrefix,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [prefixRandomOptionsPrefix]);
  useEffect(() => {
    console.log("SetupRandomOptions - prefixRandomOptionsMeaning = ", prefixRandomOptionsMeaning);
    if (prefixRandomOptionsMeaning != undefined)
    {  
     if (prefixRandomOptionsMeaning.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_PREFIXRANDOMOPTIONSMEANING",
        prefixRandomOptionsMeaning: prefixRandomOptionsMeaning,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [prefixRandomOptionsMeaning]);


  useEffect(() => {
    console.log("SetupRandomOptions - questionRandomOptionsQues = ", questionRandomOptionsQues);
    if (questionRandomOptionsQues != undefined)
    {  
      if (questionRandomOptionsQues.length > 0)
      {
      randomOptionsDispatch({
        type: "SET_QUESTIONRANDOMOPTIONSQUES",
        questionRandomOptionsQues: questionRandomOptionsQues,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [questionRandomOptionsQues]);

  useEffect(() => {
    console.log("SetupRandomOptions - questionRandomOptionsResp = ", questionRandomOptionsResp);
    if (questionRandomOptionsResp != undefined)
    {  
      if (questionRandomOptionsResp.length > 0)
      {
        randomOptionsDispatch({
          type: "SET_QUESTIONRANDOMOPTIONSRESP",
          questionRandomOptionsResp: questionRandomOptionsResp,
        });
        //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
    }
  }
  }, [questionRandomOptionsResp]);

  //Quote
  useEffect(() => {
    console.log("SetupRandomOptions - quoteRandomOptionsQuote = ", quoteRandomOptionsQuote);
    if (quoteRandomOptionsQuote != undefined)
    {  
     if (quoteRandomOptionsQuote.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_QUOTERANDOMOPTIONSQUOTE",
        quoteRandomOptionsQuote: quoteRandomOptionsQuote,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [quoteRandomOptionsQuote]);
  useEffect(() => {
    console.log("SetupRandomOptions - quoteRandomOptionsAuthor = ", quoteRandomOptionsAuthor);
    if (quoteRandomOptionsAuthor != undefined)
    {  
     if (quoteRandomOptionsAuthor.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_QUOTERANDOMOPTIONSAUTHOR",
        quoteRandomOptionsAuthor: quoteRandomOptionsAuthor,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [quoteRandomOptionsAuthor]);
  useEffect(() => {
    console.log("SetupRandomOptions - quoteRandomOptionsSource = ", quoteRandomOptionsSource);
    if (quoteRandomOptionsSource != undefined)
    {  
     if (quoteRandomOptionsSource.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_QUOTERANDOMOPTIONSSOURCE",
        quoteRandomOptionsSource: quoteRandomOptionsSource,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [quoteRandomOptionsSource]);
  useEffect(() => {
    console.log("SetupRandomOptions - quoteRandomOptionsYear = ", quoteRandomOptionsYear);
    if (quoteRandomOptionsYear != undefined)
    {  
     if (quoteRandomOptionsYear.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_QUOTERANDOMOPTIONSYEAR",
        quoteRandomOptionsYear: quoteRandomOptionsYear,
      });
      //console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [quoteRandomOptionsYear]);

  //Suffix
  useEffect(() => {
    console.log("SetupRandomOptions - suffixRandomOptionsSuffix = ", suffixRandomOptionsSuffix);
    if (suffixRandomOptionsSuffix != undefined)
    {  
     if (suffixRandomOptionsSuffix.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_SUFFIXRANDOMOPTIONSSUFFIX",
        suffixRandomOptionsSuffix: suffixRandomOptionsSuffix,
      });
      console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [suffixRandomOptionsSuffix]);
  useEffect(() => {
    console.log("SetupRandomOptions - suffixRandomOptionsMeaning = ", suffixRandomOptionsMeaning);
    if (suffixRandomOptionsMeaning != undefined)
    {  
     if (suffixRandomOptionsMeaning.length > 0)
     {
      randomOptionsDispatch({
        type: "SET_SUFFIXRANDOMOPTIONSMEANING",
        suffixRandomOptionsMeaning: suffixRandomOptionsMeaning,
      });
      console.log("SetupRandomOptions - randomOptionsList = ", randomOptionsList);
      }
    }
  }, [suffixRandomOptionsMeaning]);

  return (
    <>
      <div className={classes.root}>
        <SetupMenu/>
      </div>
    </>
    );
}

export default SetupRandomOptions;