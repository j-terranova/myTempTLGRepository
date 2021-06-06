// displayInquiryFunctions.js
/*
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

            {id: "Matching", title: "Matching"},
            {id: "QuestionMultiChoice", title: "Question Multi-Choice"},
            {id: "Reading",title: "Reading"},
            {id: "StatementFillIn",title: "Statement Fill-In"},
            {id: "TrueFalse", title: "True/False"},
            {id: "YesNo",title: "Yes/No"},
*/

function Association(wordToAssociate, associatedWord, associationType, responseFormat, primaryColumn) 
{
    console.log("displayInquiryFunctions - Association - start");
    let inquiryLine = "";
    if (primaryColumn === "wordToAssociate")
    {
        switch(responseFormat) {
            case "Matching": 
                if (associationType === "Antonym") 
                {
                    inquiryLine =  wordToAssociate ;
                } else
                {
                    inquiryLine =  wordToAssociate ;
                }
              break;
            case "StatementFillIn": 
                if (associationType === "Antonym") 
                {
                    inquiryLine = "A word that has the opposite meaning to " + wordToAssociate + " is ";
                } else
                {
                    inquiryLine = "A word has the same or similar meaning to " + wordToAssociate + " is ";
                }
              break;
            case "QuestionMultiChoice":  
                if (associationType === "Antonym") 
                {
                    inquiryLine = "Which word means the opposite of " + wordToAssociate + " ?";
                } else
                {
                    inquiryLine = "Which word has the same or similar meaning to " + wordToAssociate + " ?";
                }
              break;
            case "TrueFalse":  
                if (associationType === "Antonym") 
                {
                    inquiryLine = "True or False - " + wordToAssociate + " has the opposite meaning to " + associatedWord;
                } else
                {
                    inquiryLine = "True or False - " + wordToAssociate + " has the same or similar meaning to " + associatedWord;
                }
              break;
            case "YesNo":  
                if (associationType === "Antonym") 
                {
                    inquiryLine = "Yes or No - " + wordToAssociate + " has the opposite meaning to " + associatedWord;
                } else
                {
                    inquiryLine = "Yes or No - " + wordToAssociate + " has the same or similar meaning to " + associatedWord;
                }
              break;
            default:
                if (associationType === "Antonym") 
                {
                    inquiryLine = "What word means the opposite of " + wordToAssociate + " ?";
                } else
                {
                    inquiryLine = "What word has the same or similar meaning to " + wordToAssociate + " ?";
                }
              break;
        }
    } else
    {
        switch(responseFormat) {
            case "Matching": 
                if (associationType === "Antonym") 
                {
                    inquiryLine =  associatedWord ;
                } else
                {
                    inquiryLine =  associatedWord ;
                }
              break;
            case "StatementFillIn": 
                if (associationType === "Antonym") 
                {
                    inquiryLine = "A word that has the opposite meaning to " + associatedWord + " is ";
                } else
                {
                    inquiryLine = "A word has the same or similar meaning to " + associatedWord + " is ";
                }
              break;
            case "QuestionMultiChoice":  
                if (associationType === "Antonym") 
                {
                    inquiryLine = "Which word means the opposite of " + associatedWord + " ?";
                } else
                {
                    inquiryLine = "Which word has the same or similar meaning to " + associatedWord + " ?";
                }
              break;
            case "TrueFalse":  
                if (associationType === "Antonym") 
                {
                    inquiryLine = "True or False - " + associatedWord + " has the opposite meaning to " + wordToAssociate;
                } else
                {
                    inquiryLine = "True or False - " + associatedWord + " has the same or similar meaning to " + wordToAssociate;
                }
              break;
            case "YesNo":  
                if (associationType === "Antonym") 
                {
                    inquiryLine = "Yes or No - " + associatedWord + " has the opposite meaning to " + wordToAssociate;
                } else
                {
                    inquiryLine = "Yes or No - " + associatedWord + " has the same or similar meaning to " + wordToAssociate;
                }
              break;
            default:
                if (associationType === "Antonym") 
                {
                    inquiryLine = "What word means the opposite of " + wordToAssociate + " ?";
                } else
                {
                    inquiryLine = "What word has the same or similar meaning to " + wordToAssociate + " ?";
                }
              break;
        }
    }
    return inquiryLine;
}


function Definition(wordToDefine, wordDefinition, responseFormat, primaryColumn) 
{
    console.log("displayInquiryFunctions - Definition - start");
    let inquiryLine = "";
    if (primaryColumn === "wordToDefine")
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  wordToDefine ;
              break;
            case "StatementFillIn": 
                inquiryLine = "A word or phrase that you could use to define " + wordToDefine + " is ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Which of the the meanings below best describes " + wordToDefine + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + wordToDefine + " can be described as " + wordDefinition;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + wordToDefine + " an be described as " + wordDefinition;
              break;
            default:
                inquiryLine = "What is the meaning of " + wordToDefine + " ?";
              break;
        }
    } else
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  wordDefinition ;
              break;
            case "StatementFillIn": 
                inquiryLine = "The word that this definition, " + wordDefinition + ", best describes is ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Which of the words below can be defined by, " + wordDefinition + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + wordDefinition + " is the definition of the word, " + wordToDefine;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + wordDefinition + " is the definition of the word, " + wordToDefine;
              break;
            default:
                inquiryLine = "Which of the words below can be defined by, " + wordDefinition + " ?";
              break;
        }
    }
    return inquiryLine;
}

function Fact(fact, source, proof, contraryStatement, responseFormat, primaryColumn) 
{
    console.log("displayInquiryFunctions - Definition - start");
    let inquiryLine = "";
    if (primaryColumn === "quote")
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  fact ;
              break;
            case "StatementFillIn": 
                inquiryLine = "The source of the fact, " + fact + ", is: ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "What is the source of the fact, " + fact + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + proof + ", is proof of the statement, " + fact;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + proof + ", is proof of the statement, " + fact;
              break;
            default:
                inquiryLine = "What is the source of the fact, " + fact + " ?";
              break;
        }
    } else if (primaryColumn === "contraryStatement")
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  contraryStatement ;
              break;
            case "StatementFillIn": 
                inquiryLine = "According to, " + source + ", " + proof + ", is proof that, " + fact + " is a true statement and which is not: ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Which of the following statements is true and contrary to, " + contraryStatement + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + "The statment, " + contraryStatement + ", contradicts the statment, " + fact + " ?";
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + "The statment, " + contraryStatement + ", contradicts the statment, " + fact + " ?";
              break;
            default:
                inquiryLine = "Which of the following statements is true and contrary to, " + contraryStatement + " ?";
              break;
        }
    }
    return inquiryLine;
}


function Prefix(prefix, meaning, responseFormat, primaryColumn) 
{
    console.log("displayInquiryFunctions - Definition - start");
    let inquiryLine = "";
    if (primaryColumn === "prefix")
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  prefix ;
              break;
            case "StatementFillIn": 
                inquiryLine = "A word or phrase that you could use to define the prefix, " + prefix + ", is: ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Which of the the meanings below best describes the prefix, " + prefix + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + prefix + " is a prefix that can be described as, " + meaning;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + prefix + " is a prefix that can be described as, " + meaning;
              break;
            default:
                inquiryLine = "What is the meaning of the prefix, " + prefix + " ?";
              break;
        }
    } else
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  meaning ;
              break;
            case "StatementFillIn": 
                inquiryLine = "The prefix that this definition, " + meaning + ", best describes is: ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Which of the prefixes below can be defined by, " + meaning + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + meaning + " is the definition of the prefix, " + prefix;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + meaning + " is the definition of the prefix, " + prefix;
              break;
            default:
                inquiryLine = "Which of the prefixes below can be defined by, " + meaning + " ?";
              break;
        }
    }
    return inquiryLine;
}

function Question(questionPosed, correctResponse, responseFormat, primaryColumn) 
{
    console.log("displayInquiryFunctions - Question - start");
    let inquiryLine = "";
    if (primaryColumn === "questionPosed")
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  questionPosed ;
              break;
            case "QuestionMultiChoice":  
                if (questionPosed.substr(questionPosed.trim().length-1)==="?")
                {
                  inquiryLine = questionPosed;
                }else
                {
                  inquiryLine = questionPosed.Trim() + "?";
                }          
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - The answer to the question, " + questionPosed + ", is: " + correctResponse;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No -The answer to the question, " + questionPosed + ", is: " + correctResponse;
              break;
            default:
                inquiryLine = questionPosed;
              break;
        }
    } else
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  correctResponse ;
              break;
            case "QuestionMultiChoice":  
                inquiryLine = correctResponse + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + correctResponse + " is the correct answer to the question, " + questionPosed ;            break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + correctResponse + " is the correct answer to the question, " + questionPosed ; 
              break;
            default:
                inquiryLine = correctResponse + " ?";
              break;
        }
    }
    return inquiryLine;
}

function Quote(quote, author, source, year, responseFormat, primaryColumn) 
{
    console.log("displayInquiryFunctions - Definition - start");
    let inquiryLine = "";
    if (primaryColumn === "quote")
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  quote ;
              break;
            case "StatementFillIn": 
                inquiryLine = "The author of the quote, " + quote + ", is: ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Who is the author of the quote, " + quote + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + quote + ", is a famous quote made by, " + author;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + quote + " is a famous quote made by , " + author;
              break;
            default:
                inquiryLine = "Who is the author of the quote, " + quote + " ?";
              break;
        }
    } else if (primaryColumn === "author")
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  author ;
              break;
            case "StatementFillIn": 
                inquiryLine = "According to, " + source + ", in the year, " + year + ", the author, " + author + "made what famous quote: ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Which of the following quotes can be attributed to, " + author + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + "According to, " + source + ", in the year, " + year + ", the author, " + author + "made the following statement, " + quote;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + "According to, " + source + ", in the year, " + year + ", the author, " + author + "made the following statement, " + quote;
              break;
            default:
                inquiryLine = "Which of the following quotes can be attributed to, " + author + " ?";
              break;
        }
    }
    return inquiryLine;
}

function Suffix(suffix, meaning, responseFormat, primaryColumn) 
{
    console.log("displayInquiryFunctions - Definition - start");
    let inquiryLine = "";
    if (primaryColumn === "suffix")
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  suffix ;
              break;
            case "StatementFillIn": 
                inquiryLine = "A word or phrase that you could use to define the suffix, " + suffix + ", is: ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Which of the the meanings below best describes the suffix, " + suffix + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + suffix + " is a suffix that can be described as, " + meaning;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + suffix + " is a suffix that can be described as, " + meaning;
              break;
            default:
                inquiryLine = "What is the meaning of the suffix, " + suffix + " ?";
              break;
        }
    } else
    {
        switch(responseFormat) {
            case "Matching": 
                inquiryLine =  meaning ;
              break;
            case "StatementFillIn": 
                inquiryLine = "The suffix that this definition, " + meaning + ", best describes is: ";
              break;
            case "QuestionMultiChoice":  
                inquiryLine = "Which of the prefixes below can be defined by, " + meaning + " ?";
              break;
            case "TrueFalse":  
                inquiryLine = "True or False - " + meaning + " is the definition of the suffix, " + suffix;
              break;
            case "YesNo":  
                inquiryLine = "Yes or No - " + meaning + " is the definition of the suffix, " + suffix;
              break;
            default:
                inquiryLine = "Which of the prefixes below can be defined by, " + meaning + " ?";
              break;
        }
    }
    return inquiryLine;
}

export default {
    Association,
    Definition,
    Fact,
    Prefix,
    Question,
    Quote,
    //RootWord,
    //Segment,
    //MinSegment,
    //Statement,
    Suffix,
};
