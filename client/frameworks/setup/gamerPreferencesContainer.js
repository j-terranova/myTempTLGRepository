import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import auth from "../../auth/auth-helper";

import { useCriteria, useCriteriaDispatch } from "../../contexts/CriteriaContext";
import { useAccess, useAccessDispatch } from "../../contexts/AccessContext";
import { useGamerPreferences, useGamerPreferencesDispatch } from "../../contexts/GamerPreferencesContext";

import GamerPreferencesForm from "./educationPreferencesForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    outerColumn: {
      borderRight: "1px solid grey",
      borderBottom: "1px solid grey",
      borderLeft: "1px solid grey"
    },
    centerColumn: {
      borderBottom: "1px solid grey"
    }
  },
  paper: {
    padding: theme.spacing(0),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function GamerPreferenceContainer() {
  const classes = useStyles();

  const gamerPreferences = useGamerPreferences();
  const currentCriteria = useCriteria();
  const criteriaDispatch = useCriteriaDispatch();
  const currentAccess = useAccess();
  const accessDispatch = useAccessDispatch();
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const formTitle = "Preference Entry and Update Form";
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [formValues, setFormValues] = useState({
    user_id:  gamerPreferences.user_id?gamerPreferences.user_id:userId,
    topic:  gamerPreferences.topic?gamerPreferences.topic:"",
    myClass:   gamerPreferences.myClass?gamerPreferences.myClass:"",
    category:   gamerPreferences.category?gamerPreferences.category:"",
    subject:   gamerPreferences.subject?gamerPreferences.subject:"",
    type:   gamerPreferences.type?gamerPreferences.type:"",
    subType:   gamerPreferences.subType?gamerPreferences.subType:"",
    difficultyLevel:   gamerPreferences.difficultyLevel?gamerPreferences.difficultyLevel: 27,
    ageRange:   gamerPreferences.ageRange?gamerPreferences.ageRange: 6,
    image_id:   gamerPreferences.image_id?gamerPreferences.image_id:"",
    group_id:   gamerPreferences.group_id?gamerPreferences.group_id:"",
    keepPrivate:   gamerPreferences.keepPrivate?gamerPreferences.keepPrivate: true,
    rowsPerPage:  gamerPreferences.rowsPerPage?gamerPreferences.rowsPerPage: 10,
    themeBrightness:  gamerPreferences.themeBrightness?gamerPreferences.themeBrightness: "main",
    primaryButtonColor:  gamerPreferences.primaryButtonColor?gamerPreferences.primaryButtonColor:"blue",
    primaryBackgroundColor:  gamerPreferences.primaryBackgroundColor?gamerPreferences.primaryBackgroundColor: "white",
    createDate:   gamerPreferences.createDate?gamerPreferences.createDate:Date.now(),
    updatedBy:   gamerPreferences.updatedBy?gamerPreferences.updatedBy:"",
    updateDate:  gamerPreferences.updateDate?gamerPreferences.updateDate: Date.now(),
    _v:  "0",
    _id:  gamerPreferences._id?gamerPreferences._id:"" ,
    isError: false,
    errorMessage: "",
  });

  console.log(
    "gamerPreferenceContainer - right after initiation of formValues = ",
    formValues
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log ("Signin - useEffect - gamerPreferences = ", gamerPreferences);
  return function cleanup() {
    abortController.abort();
    };
  }, [formValues]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

   const checkCurrentCriteria = (valuesToCheck) =>
  {
    console.log(
      "gamerPreferenceContainer - checkCurrentCriteria = ",
      currentCriteria
    );
    if (valuesToCheck != undefined && valuesToCheck != null)
    {
      if (
        valuesToCheck.myClass != currentCriteria.myClass ||
        valuesToCheck.category != currentCriteria.category ||
        valuesToCheck.subject != currentCriteria.subject ||
        valuesToCheck.difficultyLevel != currentCriteria.difficultyLevel ||
        valuesToCheck.ageRange != currentCriteria.ageRange ||
        valuesToCheck.topic != currentCriteria.topic 
      )
      {
        console.log(
          "gamerPreferenceContainer - checkCurrentCriteria - Criteria found to have changed, valuesToCheck = ",
          valuesToCheck
        );
        criteriaDispatch({
          type: "SET_CRITERIAFROMCURRENTITEM",
          currentSourceOfCriteria: valuesToCheck,
        });
      }
      else{
        console.log(
          "gamerPreferenceContainer - checkCurrentCriteria - Criteria did not change" );
      }
    }      else{
      console.log(
        "gamerPreferenceContainer - checkCurrentCriteria - Criteria did not change" );
    }
  }
  const checkCurrentAccess = (valuesToCheck) =>
{
  console.log(
    "gamerPreferenceContainer - checkCurrentAccess = ",
    currentAccess
  );
  if (valuesToCheck != undefined && valuesToCheck != null)
  {
    if (valuesToCheck.keepPrivate != currentAccess.keepPrivate ||
        valuesToCheck.group_id != currentAccess.group_id ||
        valuesToCheck.groupName != currentAccess.groupName ||
        valuesToCheck.approvedForPublicUse != currentAccess.approvedForPublicUse)
      {
        console.log(
          "gamerPreferenceContainer - checkCurrentAccess - Access found to have changed, valuesToCheck = ",
          valuesToCheck
        );
      accessDispatch({
        type: "SET_ACCESSFROMCURRENTITEM",
        currentSourceOfAccess: valuesToCheck,
      });
    }else{
      console.log(
        "gamerPreferenceContainer - checkCurrentAccess - Access did not change" );
    }
  }  else{
    console.log(
      "gamerPreferenceContainer - checkCurrentAccess - Access did not change" );
  }
}

   return (
    <>
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
            <Grid item xs={9} >             
                <GamerPreferencesForm 
                  formValues = {formValues}
                  setFormValues = {setFormValues}
                  checkCurrentCriteria = {checkCurrentCriteria}
                  checkCurrentAccess = {checkCurrentAccess}
                  formTitle = {formTitle}
                />
            </Grid>    
          </Grid>
     </Paper>
    </div>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
