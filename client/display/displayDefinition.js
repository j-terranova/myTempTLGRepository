import React, { useState, useEffect } from "react";
import { RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Definition(props) {
    const {displayConstruct} = props;
    const classes = useStyles();

   const sequenceNo = displayConstruct.sequenceNo;
   //const image_id = displayConstruct.image_id;
   const type = displayConstruct.type;
   const subType = displayConstruct.subType;
   const constructPrimaryColumn = displayConstruct.constructPrimaryColumn;
   const constructOptionsSource = displayConstruct.constructOptionsSource;
   const constructNumberOfOptions = displayConstruct.constructNumberOfOptions;
   const constructResponseFormat = displayConstruct.constructResponseFormat;
   const constructColor = displayConstruct.constructColor;
   const constructId = displayConstruct.constructId;

  const wordToDefine = displayConstruct.constructDetail.wordToDefine;
  const wordType = displayConstruct.constructDetail.wordType;
  const pluralForm = displayConstruct.constructDetail.pluralForm;
  const wordUseExample = displayConstruct.constructDetail.wordUseExample;
  const wordDefinitions = displayConstruct.constructDetail.wordDefinitions;

  const [definitionSelection, setDefinitionSelection] = useState("");

  console.log("DisplayDefinition - wordToDefine = ", wordToDefine );
  console.log("DisplayDefinition - wordDefinitions = ", wordDefinitions );


  useEffect(() => {
    console.log("DisplayDefinition - in useEffect - wordToDefine = ", wordToDefine );

  }, [wordToDefine]);


  const handleSelectionChange = e => {
    const value = e.target.value;
    setDefinitionSelection(value);
  }
    return (
        <>
        <Paper className={classes.paper} elevation={3}>
        <label>
            Word to Define:  {wordToDefine}
        </label>
        <label>
            Definition:  {wordDefinitions[0]}
        </label>
        </Paper>
        </>
    )
}
