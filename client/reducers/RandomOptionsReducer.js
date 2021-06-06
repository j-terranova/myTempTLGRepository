
//randomOptions: {
//  assocAntonymRandomOptions: []
//  assocSynonymRandomOptions: []
//  definitionRandomOptions: []
//  questionRandomOptions: []
//}
// return {...state, visitedData: {...state.visitedData, action.data}}
export const randomOptionsReducer = (randomOptions, action) => {
  switch (action.type) {
    case "SET_ASSOCANTONYMRANDOMOPTIONSWORD": {
      return {...randomOptions,
          assocAntonymRandomOptionsWord: action.assocAntonymRandomOptionsWord,
      }
    }
    case "SET_ASSOCANTONYMRANDOMOPTIONSANT": {
      return {...randomOptions,
          assocAntonymRandomOptionsAnt: action.assocAntonymRandomOptionsAnt,
      }
    }
    case "SET_ASSOCSYNONYMRANDOMOPTIONSWORD": {
      return {...randomOptions,
          assocSynonymRandomOptionsWord: action.assocSynonymRandomOptionsWord,
        }
    }
    case "SET_ASSOCSYNONYMRANDOMOPTIONSSYN": {
      return {...randomOptions,
          assocSynonymRandomOptionsSyn: action.assocSynonymRandomOptionsSyn,
        }
    }
    case "SET_DEFINITIONRANDOMOPTIONSWORD": {
      return {...randomOptions,
          definitionRandomOptionsWord: action.definitionRandomOptionsWord,
        }
    }
    case "SET_DEFINITIONRANDOMOPTIONSDEF": {
      return {...randomOptions,
          definitionRandomOptionsDef: action.definitionRandomOptionsDef,
        }
    }
    case "SET_FACTRANDOMOPTIONSFACT": {
      return {...randomOptions,
        factRandomOptionsFact: action.factRandomOptionsFact,
        }
    }
    case "SET_FACTRANDOMOPTIONSSOURCE": {
      return {...randomOptions,
        factRandomOptionsSource: action.factRandomOptionsSource,
        }
    }
    case "SET_FACTRANDOMOPTIONSPROOF": {
      return {...randomOptions,
        factRandomOptionsProof: action.factRandomOptionsProof,
        }
    }
    case "SET_FACTRANDOMOPTIONSCONTRARY": {
      return {...randomOptions,
        factRandomOptionsContrary: action.factRandomOptionsContrary,
        }
    }
    case "SET_PREFIXRANDOMOPTIONSPREFIX": {
      return {...randomOptions,
        prefixRandomOptionsPrefix: action.prefixRandomOptionsPrefix,
        }
    }
    case "SET_PREFIXRANDOMOPTIONSMEANING": {
      return {...randomOptions,
        prefixRandomOptionsMeaning: action.prefixRandomOptionsMeaning,
        }
    }
    case "SET_QUESTIONRANDOMOPTIONSQUES": {
      return {...randomOptions,
          questionRandomOptionsQues: action.questionRandomOptionsQues,
        }
    }
    case "SET_QUESTIONRANDOMOPTIONSRESP": {
      return {...randomOptions,
          questionRandomOptionsResp: action.questionRandomOptionsResp,
        }
    }
    case "SET_QUOTERANDOMOPTIONSQUOTE": {
      return {...randomOptions,
        quoteRandomOptionsQuote: action.quoteRandomOptionsQuote,
        }
    }
    case "SET_QUOTERANDOMOPTIONSAUTHOR": {
      return {...randomOptions,
        quoteRandomOptionsAuthor: action.quoteRandomOptionsAuthor,
        }
    }
    case "SET_QUOTERANDOMOPTIONSSOURCE": {
      return {...randomOptions,
        quoteRandomOptionsSource: action.quoteRandomOptionsSource,
        }
    }
    case "SET_QUOTERANDOMOPTIONSYEAR": {
      return {...randomOptions,
        quoteRandomOptionsYear: action.quoteRandomOptionsYear,
        }
    }
    case "SET_SUFFIXRANDOMOPTIONSSUFFIX": {
      return {...randomOptions,
        suffixRandomOptionsSuffix: action.suffixRandomOptionsSuffix,
        }
    }
    case "SET_SUFFIXRANDOMOPTIONSMEANING": {
      return {...randomOptions,
        suffixRandomOptionsMeaning: action.suffixRandomOptionsMeaning,
        }
    }

    case "GET_RANDOMOPTIONS": {
      return randomOptions;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
      return randomOptions;
    }
  }
};
