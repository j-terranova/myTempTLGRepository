import React from 'react';
import { useState } from "react";
import {useEffect} from "react";
import PropTypes from 'prop-types';
import MyAux from './myAux';
import Header from './Header';
import BoardLayout from "./BoardContainer";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Modal from "./Modal";
import Timer from "./../../utilities/timer"
import Score from "./Score";
import Refresh from '@material-ui/icons/Refresh';
import List from '@material-ui/icons/Menu';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Controls from "./../../controls/Controls";
import { Typography } from '@material-ui/core';
import { useGamerResultData, useGamerResultDataDispatch } from "./../../contexts/GamerResultDataContext";
import TicTacToeScoring from "./../../utilities/scoring"

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        backgroundColor: "#E91E63",
      },
    body: {
        margin: 0,
        padding: 0,
        fontFamily: 'Roboto', 
        backgroundColor: "#E91E63",
        },
    Grid: {
        margin: 0,
        width: "100%",
    },
}));

const TicTacToeContainer = (props) => {
    const { 
            arrayOfMatchingItems,
            inquiryChoices,
            availableInquiryChoices, 
            setAvailableInquiryChoices,
            responseChoices,
            displayFramework,
            setDisplayFramework,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            time,
            setTime,
            timerOn, 
            setTimerOn,
            updateGamerResultDataComplete, 
            resetGamerResultData,
        } = props;

    const classes = useStyles();
    const [size, setSize] = useState(4);

    const gamerResultData = useGamerResultData();
    const gamerResultDataDispatch = useGamerResultDataDispatch();

    const [playerLevelOptions, setPlayerLevelOptions] = useState([ 
        {id: 1, title: "PreSchooler"}, 
        {id: 2, title: "Beginner"},
        {id: 3, title: "Learner"},
        {id: 4, title: "Intermediate"},
        {id: 5, title: "Scholar"},   
        {id: 6, title: "Expert"}, 
        {id: 7, title: "Wizard"},                 
    ]);
    
    const [sizeOptions, setSizeOptions] = useState([ 
        {id: 3, title: 3}, 
        {id: 4, title: 4},
        {id: 5, title: 5},              
    ]);

    const [opponentOptions, setOpponentOptions] = useState([ 
            {id: "Automatic", title: "Automatic"}, 
            {id: "RealPerson", title: "Real Person"},              
        ])
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState (false);
    const [text, setText] = useState("");
    const  winner = (text) => {
        setOpen(true);
        setText(text);
    };

    const turnTimerOnOff = (turnOn)=> {
        setTimerOn(turnOn);
    }

    const resetAvailableInquiryChoices = ()=> {
        let newChoices = [];
        for (let i =0; i< inquiryChoices.length; i++)
        {
            newChoices.push(inquiryChoices[i]);
            //console.log("ticTacToeContainer - New Inquiry Choices - inquiryChoices[i] =", inquiryChoices[i])
        }
        //console.log("ticTacToeContainer - New Inquiry Choices - newChoices =", newChoices)
        return newChoices;
    };

    const [board, setBoard] = useState(<BoardLayout 
        arrayOfMatchingItems ={arrayOfMatchingItems}
        inquiryChoices = {inquiryChoices}
        availableInquiryChoices={availableInquiryChoices} 
        setAvailableInquiryChoices={setAvailableInquiryChoices}
        responseChoices = {responseChoices}
        displayFramework={displayFramework}
        setDisplayFramework={setDisplayFramework}
        finalDisplayConstructs={finalDisplayConstructs}
        setFinalDisplayConstructs={setFinalDisplayConstructs}
        updateGamerResultDataComplete={updateGamerResultDataComplete} 
        turnTimerOnOff={turnTimerOnOff}
        size={size}
        won={winner} 
        key="1"/>);

    const resetGame = () => {
        const value = Math.random().toString(36).substring(7);
        let newChoices = resetAvailableInquiryChoices();
        setTime(0);
        setTimeout(function(){ 
            setBoard(<BoardLayout 
                arrayOfMatchingItems ={arrayOfMatchingItems}
                inquiryChoices = {inquiryChoices}
                availableInquiryChoices={newChoices} 
                setAvailableInquiryChoices={setAvailableInquiryChoices}
                responseChoices = {responseChoices}
                displayFramework={displayFramework}
                setDisplayFramework={setDisplayFramework}
                finalDisplayConstructs={finalDisplayConstructs}
                setFinalDisplayConstructs={setFinalDisplayConstructs}
                updateGamerResultDataComplete={updateGamerResultDataComplete}
                turnTimerOnOff={turnTimerOnOff}
                size={size} 
                won={winner} 
                key={value}/>);
            }, 2000);
    };

    const showScore = () => {
        setScore(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        resetGame();
    };

    const handleResetGame = () => {
        resetGamerResultData();
        resetGame();
    };

    const closeScore = () => {
        setScore(false);
    };

    const clearScore = () => {
        localStorage.setItem('DRAWS',0);
        localStorage.setItem('WONS',0);
        localStorage.setItem('LOSS',0);
        setScore(false);
        setScore(true);
    };

    const handleInputChange = e => {
        const name = e.target.name;
        const value =  e.target.value;
        if (name ==="playerLevel")
        {
            console.log("ticTacToeContainer - handleInputChange playerLevel = ",gamerResultData.playerLevel)
            console.log("ticTacToeContainer - handleInputChange new value = ",value)

            if (value != gamerResultData.playerLevel)
            {
                const opponentResponseFrequency = TicTacToeScoring.getOpponentResponseFrequency(value);

                gamerResultDataDispatch({
                    type: "SET_GAMERRESULTDATA_PLAYERLEVEL",
                    playerLevel: value,
                    opponentResponseFrequency: opponentResponseFrequency,
                    modified: true,
                    });
            }
      
        } else if ( name === "opponent")
        {
            console.log("ticTacToeContainer - handleInputChange opponent = ",gamerResultData.opponent);
            console.log("ticTacToeContainer - handleInputChange value = ",value);

            gamerResultDataDispatch({
                type: "SET_GAMERRESULTDATA_OPPONENT",
                opponent: value,
                modified: true,
                });
        } else if (name === "gameSize")
        {
            console.log("ticTacToeContainer - handleInputChange old size = ",size);
            console.log("ticTacToeContainer - handleInputChange new size = ",value);
            setSize(value);
        }
    }

    useEffect(() => {
        setSize(4);
      }, []);

      useEffect(() => {
        resetGamerResultData();
        resetGame();
      }, [size]);

    return (availableInquiryChoices != undefined) && (
        <>
        <Container maxWidth="lg" className={classes.container}>
        { availableInquiryChoices.length > 0 && 
        <MyAux className = {classes.body}>
            {availableInquiryChoices.length > 0 && board}
            <Grid container justify='center' spacing={6} className={classes.Grid}>
                <Grid item> 
                    <Controls.Select
                        name="gameSize"
                        label="Game Size"
                        value={size}
                        onChange={handleInputChange}
                        options={sizeOptions}
                        color="default"
                    />
                    </Grid>
                <Grid item> 
                    <Controls.Select
                        name="playerLevel"
                        label="Player Level"
                        value={gamerResultData.playerLevel}
                        onChange={handleInputChange}
                        options={playerLevelOptions}
                        color="default"
                    />
                </Grid>
                <Grid item> 
                <Controls.Select
                        name="opponent"
                        label="Opponent Type"
                        value={gamerResultData.opponent}
                        onChange={handleInputChange}
                        options={opponentOptions}
                        color="default"
                    />
                </Grid>
                <Grid item>
                    <Button
                        onClick={handleResetGame}
                        variant="contained"
                        color="default">
                        <Refresh style={{color:'#E91E63'}}/>
                        RESET
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        onClick={showScore}
                        variant="contained"
                        color="default">
                        <List style={{color:'#E91E63'}}/>
                        Score
                    </Button>
                </Grid>

                <Grid item>
                    <Timer
                        time ={time}
                        setTime={setTime}
                        timerOn={timerOn}
                        setTimerOn= {setTimerOn}
                        startDate={gamerResultData.startDate}
                        showButtons= {false}
                    />
                </Grid>

            </Grid>
            <Modal
                text={text}
                open={open}
                onClose={handleClose}/>
            <Score
                open={score}
                onClose={closeScore}
                clearScore={clearScore}
            />
        </MyAux>}
        </Container>
        </>
    )
}

TicTacToeContainer.propTypes = {
  size: PropTypes.number
};

export default TicTacToeContainer;