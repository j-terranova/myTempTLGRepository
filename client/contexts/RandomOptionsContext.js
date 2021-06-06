import React, { createContext, useReducer, useContext } from "react";
import { randomOptionsReducer } from "../reducers/RandomOptionsReducer";
import auth from "../auth/auth-helper";

const jwt = auth.isAuthenticated();

const RandomOptionsContext = createContext();
const RandomOptionsDispatchContext = createContext();

function RandomOptionsProvider({ children }) {
  const [randomOptions, randomOptionsDispatch] = useReducer(randomOptionsReducer, {
    assocAntonymRandomOptionsWord: [],
    assocAntonymRandomOptionsAnt: [],
    assocSynonymRandomOptionsWord: [],
    assocSynonymRandomOptionsSyn: [],
    definitionRandomOptionsWord: [],
    definitionRandomOptionsDef: [],
    factRandomOptionsFact: [],  //fact
    factRandomOptionsSource: [], //source
    factRandomOptionsProof: [], //proof
    factRandomOptionsContrary: [], //contraryStatements
    prefixRandomOptionsPrefix: [], //prefix
    prefixRandomOptionsMeaning: [], //meaning
    questionRandomOptionsQues: [],
    questionRandomOptionsResp: [],
    quoteRandomOptionsQuote: [], //quote
    quoteRandomOptionsAuthor: [], // author
    quoteRandomOptionsSource: [], //sourceOrSituation
    quoteRandomOptionsYear: [], //year
    suffixRandomOptionsSuffix: [], //suffix
    suffixRandomOptionsMeaning: [], //meaning
  });

  return (
    <RandomOptionsContext.Provider value={randomOptions}>
      <RandomOptionsDispatchContext.Provider value={randomOptionsDispatch}>
        {children}
      </RandomOptionsDispatchContext.Provider>
    </RandomOptionsContext.Provider>
  );
}

function useRandomOptions() {
  const context = useContext(RandomOptionsContext);
  if (context === undefined) {
    throw new Error("useRandomOptions must be used within a RandomOptionsProvider");
  }
  return context;
}

function useRandomOptionsDispatch() {
  const context = useContext(RandomOptionsDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useRandomOptionsDispatch must be used within a RandomOptionsProvider"
    );
  }
  return context;
}

export { RandomOptionsProvider, useRandomOptions, useRandomOptionsDispatch };
