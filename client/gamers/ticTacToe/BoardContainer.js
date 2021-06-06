import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import MyAux from './myAux';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Icon from '@material-ui/core/Icon';
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Controls from "../../controls/Controls";

import ButtonGroup from '@material-ui/core/ButtonGroup';
import {shuffleArray} from "../../display/displayConstructSwitch"
import SimpleTicTacToeMover from "../../utilities/simpleTicTacToeMoves"
import TicTacToeScoring from "../../utilities/scoring"
import { useGamerResultData, useGamerResultDataDispatch } from "./../../contexts/GamerResultDataContext";
import { useSpeechData, useSpeechDataDispatch } from "./../../contexts/SpeechDataContext";

/*
.Paper {
    width: 82px;
    height: 82px;
}

.Grid {
    margin: 0px !important;
    width: 100% !important;
}

.Icon {
    color: #E91E63;
}

.Clicked {
    pointer-events: none;
}
*/

const useStyles = makeStyles((theme) => ({
    Paper: {
        width: "21",
        height: "21",
    },
    Grid: {
        margin: 0,
        width: "100%",
    },
    Icon: {
        color: "#E91E63",
    },
    Clicked: {
        disablePointerEvents: "true",
    }
}));

const BoardContainer = (props) => {
    const { arrayOfMatchingItems,
            inquiryChoices,
            availableInquiryChoices,
            setAvailableInquiryChoices, 
            responseChoices,
            displayFramework,
            setDisplayFramework,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            updateGamerResultDataComplete,
            turnTimerOnOff,
            size,
            won,
            key, } = props;

    const classes = useStyles();
    const gamerResultData = useGamerResultData();
    const gamerResultDataDispatch = useGamerResultDataDispatch();
    const speechData = useSpeechData();
    const speechDataDispatch = useSpeechDataDispatch();
    
    const [moveCount, setMoveCount]= useState();
    const [numberCorrect, setNumberCorrect]= useState();
    const [inCorrectAttempts, setInCorrectAttempts]=useState();
    const [totalAttempts, setTotalAttempts] = useState();
    const [inquiry, setInquiry ] = useState();
    const [response, setResponse ] = useState();
    const [currentPlayer, setCurrentPlayer] = useState();
    const [showStatus, setShowStatus] = useState();
    const [boardLayout, setBoardLayout] = useState(Array.from({length: size},
            () => Array.from({length: size},
                () => "0"
            )
        ));
    const [clickedValues, setClickedValues] = useState();
    const [matchStatus, setMatchStatus] = useState();
    // matchStatus Options
    // NoMatch
    // Match
    // Next

const [selected, setSelected] = useState({});
const random = (array) => array[Math.floor(Math.random() * array.length)];
//let utteranceObject = new SpeechSynthesisUtterance("Start");
console.log("BoardContainer - start - arrayOfMatchingItems = ", arrayOfMatchingItems);
//console.log("BoardContainer - start - inquiryChoices = ", inquiryChoices);
//console.log("BoardContainer - start - availableInquiryChoices = ", availableInquiryChoices);
//console.log("BoardContainer - start - responseChoices = ", responseChoices);
//console.log("BoardContainer - start - gamerLevel = ", gamerResultData.gamerLevel);
//console.log("BoardContainer - start - opponent = ", gamerResultData.opponent);

//console.log("BoardContainer - started ");

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

const automaticMover = () => {
    //Math.floor(Math.random() * 100) + 1
    const responseFrequency = randomIntFromInterval(1,100)
    console.log ("BoardContainer - automaticMover - responseFrequency = ", responseFrequency)
    console.log ("BoardContainer - automaticMover - gamerLevel = ", gamerResultData.gamerLevel)
    console.log ("BoardContainer - automaticMover - gamerResultData.opponentResponseFrequency = ", gamerResultData.opponentResponseFrequency)
    if (responseFrequency <= gamerResultData.opponentResponseFrequency)
    {
        let selectSquare = SimpleTicTacToeMover.findSquareForAutomatedMove(boardLayout);
        //console.log ("BoardContainer - automaticMover - selectSquare = ", selectSquare)
        if (selectSquare != null)
        {

            //console.log ("BoardContainer - automaticMover - before boardLayout update - boardLayout = ", boardLayout)
            let x = selectSquare.x;
            let y = selectSquare.y;
            let squareId = "Square" + x.toString() +  y.toString();
            //console.log ("BoardContainer - automaticMover - squareId = ", squareId)
            let squareElement = document.getElementById(squareId);
            //console.log ("BoardContainer - automaticMover - doc = ", squareElement)
            let target = squareElement;
            //console.log ("BoardContainer - automaticMover - target = ", target)
            let parent =  squareElement.parentElement;
            //console.log ("BoardContainer - automaticMover - parent = ", parent)
            let child =  squareElement.children[0];
            //console.log ("BoardContainer - automaticMover - child = ", child)
            boardLayout[x][y] = 'X'
            child.innerHTML = 'close';

            //console.log ("BoardContainer - automaticMover - after boardLayout update - boardLayout = ", boardLayout)
            setMoveCount(moveCount + 1);
            //console.log("MoveCount = ", moveCount)
            checkWinner(x,y)
            //}
            setTimeout(function(){ 
                    switchPlayer(); 
                    setShowStatus("Player 2's turn is completed - Player 1 should select a square" );
                }, 2000);
        } else
        {
            console.log("BoardContainer - automaticMover - No square selected - it is a DRAW! ")
            gameStop("Draw");
            won('Its a tie!!');
            setScore('DRAWS');  
        }
    } else
    {
        //console.log("No move action by Automated Player")
        setTimeout(function(){ 
            switchPlayer(); 
            setShowStatus("Player 2's turn is completed - Player 1 should select a square" );
        }, 1000);

    }
}

const switchPlayer = () => {
if  (currentPlayer === "Player 1: O")
    {
        setCurrentPlayer("Player 2: X")
    } else
    {
        setCurrentPlayer("Player 1: O")
    }
}

const removeItemFromAvailableInquiryChoices = () => {
    let newChoices = availableInquiryChoices;
    for (let i=0; i< newChoices.length; i++)
    {
        if (newChoices[i].value === inquiry)
        {
            newChoices.splice(i, 1);
            break;
        }
    }
    setAvailableInquiryChoices(newChoices);
}

  const correct = () => {
    const words = ["Good one!", "Great Job!", "You got it!"];
    //console.log("BoardContainer - correct - words = ", words);

    speechData.secondaryUtteranceObject.text=random(words);
    setTimeout(() => {
      speechData.speechReference.current.speak(speechData.secondaryUtteranceObject);
    }, 500);

    removeItemFromAvailableInquiryChoices();
    setShowStatus("That is correct!!! - Next Player should select a square" );
    setMatchStatus("Match");
    okToMove(); 
    switchPlayer();

    setTotalAttempts(totalAttempts+1);
    setNumberCorrect(numberCorrect+1);

  };


  const incorrect = () => {
    const words = ["Please Try Again", "Yuck!", "Nope, not this time", "Oops, you must have it the wrong button"];
    //console.log("BoardContainer - inCorrect - words = ", words);
    speechData.secondaryUtteranceObject.text=random(words);
    setTimeout(() => {
      speechData.speechReference.current.speak(speechData.secondaryUtteranceObject);
    }, 500);

    setShowStatus("That is NOT correct!!! - Next Player should select a square" );
    setMatchStatus("NoMatch");
    switchPlayer();

    setTotalAttempts(totalAttempts+1);
    setInCorrectAttempts(inCorrectAttempts+1);
  };

  const isMatch = (inquiryItem, responseItem) =>
  arrayOfMatchingItems.some(
    ([baseChoice, matchingChoice]) =>
      (baseChoice === inquiryItem && matchingChoice === responseItem) ||
      (baseChoice === responseItem && matchingChoice === inquiryItem)
  );

  const matchChecker = (currentInquiry, currentResponse) => {
    //console.log("BoardContainer - currentInquiry = ", currentInquiry);
    //console.log("BoardContainer - currentResponse = ", currentResponse);

    if (currentInquiry != undefined && currentInquiry != null  &&
        currentResponse != undefined && currentResponse != null) 
        {
        if (currentInquiry.value.trim().length > 0 && currentResponse.value.trim().length > 0)
        {
            if (isMatch(currentInquiry.value, currentResponse.value)) {
                correct();
                setSelected((val) => ({ ...val, [currentResponse.value]: true }));
            } else {
                incorrect();
                setSelected((val) => ({ ...val, [currentResponse.value]: false }));
            }
        }

    } else {

     }
  };

    const getNextInquiryChoice = () => {
        shuffleArray(availableInquiryChoices);
        //console.log ("BoardContainer - getNextInquiryChoice - availableInquiryChoices = ",availableInquiryChoices);
        //console.log ("BoardContainer - getNextInquiryChoice - availableInquiryChoices[0] = ",availableInquiryChoices[0]);
        return availableInquiryChoices[0].value;
    }

    const clickSquareHandler = (event) => {
        console.log ("BoardContainer - clickSquareHandler - Just before check - gamerResultData.startDate = ",gamerResultData.startDate);
        if (gamerResultData.startDate === null)
        {
            console.log ("BoardContainer - clickSquareHandler - inside Null Check - gamerResultData.startDate = ",gamerResultData.startDate);
            gamerResultDataDispatch({
                type: "SET_GAMERRESULTDATA_STARTDATE",
                startDate: Date.now(),
                modified: true,
                });
        }
        turnTimerOnOff(true);
        setClickedValues({
        target: event.currentTarget,
        parent:  event.currentTarget.parentElement,
        child:  event.currentTarget.children[0],
        })
        
        let nextInquiry = getNextInquiryChoice();
        setInquiry(nextInquiry);
        speechData.primaryUtteranceObject.text = nextInquiry;
        speechData.speechReference.current.speak(speechData.primaryUtteranceObject);
  
        setShowStatus("Awaiting response from player: " + currentPlayer)
        setResponse("");
    }

    const okToMove = () => {
        //console.log( "BoardContainer - OkToMove start - clickedValues = ", clickedValues)
        const [x, y] = clickedValues.target.dataset.coord.split(':');
        const className = clickedValues.parent.getAttribute("class");
        clickedValues.parent.setAttribute("class", className + " Clicked");
        const value = clickedValues.child.innerHTML;
        //console.log( "BoardContainer - OkToMove start - value = ", value)
        if (value === '') {
            if  (currentPlayer === "Player 1: O") {
                //console.log( "First Players, O, Turn - BoardContainer = ", boardLayout)
                clickedValues.child.innerHTML = 'radio_button_unchecked';
                //child.innerHTML = 'fiber_manual_record';
                console.log ("BoardContainer = ", boardLayout);
                //console.log ("X = ", x);
                //console.log ("Y = ", y);
                boardLayout[x][y] = 'O'
            } else {
                console.log( "Second Players, X, Turn - BoardContainer = ", boardLayout)
                clickedValues.child.innerHTML = 'close';
                //child.innerHTML = 'games';
                boardLayout[x][y] = 'X'
            }
        }
        //console.log("MoveCount = ", moveCount)
        setMoveCount(moveCount + 1);
        //console.log("MoveCount = ", moveCount)
        //if (moveCount >= size ) {
        checkWinner(x,y)
        //}
    };
    
    const gameStop = (winLossDraw) => {
        console.log( "BoardContainer - gameStop - winLossDraw = ", winLossDraw);
        const stopDate = Date.now();
        const startDate = gamerResultData.startDate;      
        updateGamerResultDataComplete(winLossDraw, totalAttempts, numberCorrect, inCorrectAttempts, selected, startDate, stopDate)
    }

    const announcement = (val) => {
        if (val === "O") {
            //console.log( "BoardContainer announcement = Os win - right before gameStop moveCount=",moveCount)
            gameStop("Win");
            //setTimeout(function(){ 
                won("The O's have won!!");
                setScore('WONS');                
            // }, 3000);

        }
        else {
            //console.log( "BoardContainer announcement = Xs win - right before gameStop moveCount =",moveCount)
            gameStop("Loss");
            //setTimeout(function(){ 
                won("The X's have won!!");
                setScore('LOSS');                
            //}, 3000);

        }
    };

    const checkWinner = (x, y) => {
        //console.log("Checking Row x = ", x)
        //console.log("Checking Column  = ", y)
        console.log("BoardContainer = ", boardLayout)
        const width = size;
        //Columns check
        let column = [];
        for (let i = 0; i < width; i++) {
            column.push(boardLayout[i][y]);
        }
        if (column.every((val, i, arr) => val === arr[0])) {
            //console.log("Column Win = ", column)
            announcement(column[0]);
            return
        }

        //Rows check
        let row = boardLayout[x];
        if (row.every((val, i, arr) => val === arr[0])) {
            //console.log("Row Win = ", row)
            announcement(row[0]);
            return
        }

        //Diagonal check
        let diagonal = [];
        if (x === y) {
            for (let i = 0; i < width; i++) {
                diagonal.push(boardLayout[i][i])
            }
            if (diagonal.every((val, i, arr) => val === arr[0])) {
                //console.log("Diagonal Win = ", diagonal)
                announcement(diagonal[0]);
                return
            }
        }
        //Anti diagonal check
        diagonal = [];
        if ((parseInt(x, 10) + parseInt(y, 10)) === (width - 1)) {
            for (let i = 0; i < width; i++) {
                diagonal.push(boardLayout[i][(width - 1) - i])
            }
            if (diagonal.every((val, i, arr) => val === arr[0])) {
                //console.log("Anti-Diagonal Win = ", diagonal)
                announcement(diagonal[0]);
                return
            }
        }
        //Check tie
        //console.log( "BoardContainer moveCount =",moveCount)
        if (moveCount + 1 >= Math.pow(width, 2)) {
            //console.log( "BoardContainer announcement = DRAW! - right before gameStop moveCount =",moveCount)
            gameStop("Draw");
            //setTimeout(function(){ 
                won('Its a tie!!');
                setScore('DRAWS');                
            //}, 3000);

            return
        }
    };

    const setScore = (text) => {
        let oldvalue = localStorage.getItem(text);
        oldvalue = oldvalue === null ? 0 : oldvalue;
        localStorage.setItem(text, parseInt(oldvalue, 10) + 1);
    };

      const chooseChecker = (newResponse) => {
          //console.log ("BoardContainer - chooseChecker - inquiry = ", inquiry)
          //console.log ("BoardContainer - chooseChecker - newResponse = ", newResponse)
          speechData.secondaryUtteranceObject.text = newResponse.value;
          speechData.speechReference.current.speak(speechData.secondaryUtteranceObject);
    
          setResponse(newResponse);
          matchChecker({value: inquiry}, newResponse);
      }

      useEffect(() => {
        //console.log( "BoardContainer Value Changed = ", boardLayout)
        setMoveCount(0);
        setTotalAttempts(0);
        setNumberCorrect(0);
        setInCorrectAttempts(0);
        setInquiry("                              ");
        setResponse("");
        setShowStatus("Beginning of Game - waiting for Player 1: O, to select a square");
        setMatchStatus("Next")
        setSelected({});
        setCurrentPlayer("Player 1: O")
        setClickedValues({  target: "",
                            parent: "",
                            child: "",
    })
    }, []);
    

    useEffect(() => {
    //console.log( "useEffect - currentPlayer = ", currentPlayer);
    //console.log( "useEffect - opponent = ", gamerResultData.opponent);
    if  (currentPlayer === "Player 2: X")
    {
        if (gamerResultData.opponent === "Automatic")
        {
            automaticMover();
        }
    } 
    }, [currentPlayer]);

    return (
        <>
        <Grid container maxwidth="lg" alignItems="center" spacing={1}>
            <Grid item xs={9}>
                <Grid container alignItems="center">
                    <Grid item xs={9}>
                        <Typography variant = "body1">                      
                        Select a square to start.  When the "Inquiry" challenge appears, find the correct response 
                        from choices on the right. Correct response will fill the selected square with an "O" or "X" (2nd Player).
                        If the 2nd player is automatic, the response will appear promtly if it meets the criteria.  
                        </Typography>
                        <div style={{ width: '100%' }}>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                        css={{ maxWidth: 900 }}
                    >
                    <Box p={1} bgcolor="grey.300">
                        Inquiry : {inquiry}
                    </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                        css={{ maxWidth: 900 }}
                    >
                    <Box p={1} bgcolor="grey.300">
                        Next move by : {currentPlayer}
                    </Box>

                    <Box p={1} bgcolor="grey.300">
                        {showStatus}
                    </Box>
                    </Box>
                    </div>
                    </Grid>

                </Grid>
                        <MyAux>
                            {boardLayout.map((row, rowId) => { 
            const columns = row.map((column, columnId) => (
    
                <Grid key={columnId} item>
                    <ButtonBase > 
                        <Paper
                            onClick={(e) => {
                                clickSquareHandler(e);
                                }}
                            elevation={4}
                            data-coord={rowId + ':' + columnId}
                            id={"Square" + rowId.toString() +  columnId.toString()}
                            className={classes.Paper}>
                            <Icon
                                className={classes.Icon}
                                style={{fontSize: 78}}>
                            </Icon>
                        </Paper>
                    </ButtonBase>
                </Grid>
                ));
                return (
                <Grid
                    key={rowId}
                    className={classes.Grid}
                    container
                    spacing={2}>
                    {columns}

                </Grid>)
           })}
                        </MyAux>
                        </Grid>

        <Grid item xs={3} >
        <Paper className={classes.paper}>
        <Typography variant = "body1">    
            Response Options - {displayFramework.description}
        </Typography>
            <ButtonGroup
            orientation="vertical"
            color="secondary"
            aria-label="vertical outlined secondary button group"
        >
            {responseChoices.map((choice) => (
                              
                <Controls.Button
                    key ={choice.value}  
                    text={choice.value}
                    variant="contained"
                    color = "secondary"
                    onClick={() => {
                    chooseChecker(choice);
                    }}
                    className={
                    response && response.value === choice.value ? "selected" : ""
                    }
                    disabled={!!selected[choice.value]}
                    fullWidth = "true"
                    size = "small"
                    />
                ))}
            </ButtonGroup>
            </Paper>
            </Grid>
            </Grid>
                </>
    )
}

BoardContainer.propTypes = {
    won: PropTypes.func,
    size: PropTypes.number
};

export default BoardContainer;
