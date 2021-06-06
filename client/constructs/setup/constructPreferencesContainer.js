import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import auth from "./../../auth/auth-helper";

import { useCriteria, useCriteriaDispatch } from "./../../contexts/CriteriaContext";
import { useAccess, useAccessDispatch } from "./../../contexts/AccessContext";
import { useConstructPreferences, useConstructPreferencesDispatch } from "./../../contexts/ConstructPreferencesContext";

import ConstructPreferencesForm from "./constructPreferencesForm";

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

export default function ConstructPreferenceContainer() {
  const classes = useStyles();

  const constructPreferences = useConstructPreferences();
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
    user_id:  constructPreferences.user_id?constructPreferences.user_id:userId,
    topic:  constructPreferences.topic?constructPreferences.topic:"",
    myClass:   constructPreferences.myClass?constructPreferences.myClass:"",
    category:   constructPreferences.category?constructPreferences.category:"",
    subject:   constructPreferences.subject?constructPreferences.subject:"",
    type:   constructPreferences.type?constructPreferences.type:"",
    subType:   constructPreferences.subType?constructPreferences.subType:"",
    difficultyLevel:   constructPreferences.difficultyLevel?constructPreferences.difficultyLevel: 27,
    ageRange:   constructPreferences.ageRange?constructPreferences.ageRange: 6,
    image_id:   constructPreferences.image_id?constructPreferences.image_id:"",
    group_id:   constructPreferences.group_id?constructPreferences.group_id:"",
    keepPrivate:   constructPreferences.keepPrivate?constructPreferences.keepPrivate: true,
    rowsPerPage:  constructPreferences.rowsPerPage?constructPreferences.rowsPerPage: 10,
    themeBrightness:  constructPreferences.themeBrightness?constructPreferences.themeBrightness: "main",
    primaryButtonColor:  constructPreferences.primaryButtonColor?constructPreferences.primaryButtonColor:"blue",
    primaryBackgroundColor:  constructPreferences.primaryBackgroundColor?constructPreferences.primaryBackgroundColor: "white",
    createDate:   constructPreferences.createDate?constructPreferences.createDate:Date.now(),
    updatedBy:   constructPreferences.updatedBy?constructPreferences.updatedBy:"",
    updateDate:  constructPreferences.updateDate?constructPreferences.updateDate: Date.now(),
    _v:  "0",
    _id:  constructPreferences._id?constructPreferences._id:"" ,
    isError: false,
    errorMessage: "",
  });

  console.log(
    "constructPreferenceContainer - right after initiation of formValues = ",
    formValues
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log ("Signin - useEffect - constructPreferences = ", constructPreferences);
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
      "constructPreferenceContainer - checkCurrentCriteria = ",
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
          "constructPreferenceContainer - checkCurrentCriteria - Criteria found to have changed, valuesToCheck = ",
          valuesToCheck
        );
        criteriaDispatch({
          type: "SET_CRITERIAFROMCURRENTITEM",
          currentSourceOfCriteria: valuesToCheck,
        });
      }
      else{
        console.log(
          "constructPreferenceContainer - checkCurrentCriteria - Criteria did not change" );
      }
    }      else{
      console.log(
        "constructPreferenceContainer - checkCurrentCriteria - Criteria did not change" );
    }
  }
  const checkCurrentAccess = (valuesToCheck) =>
{
  console.log(
    "constructPreferenceContainer - checkCurrentAccess = ",
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
          "constructPreferenceContainer - checkCurrentAccess - Access found to have changed, valuesToCheck = ",
          valuesToCheck
        );
      accessDispatch({
        type: "SET_ACCESSFROMCURRENTITEM",
        currentSourceOfAccess: valuesToCheck,
      });
    }else{
      console.log(
        "constructPreferenceContainer - checkCurrentAccess - Access did not change" );
    }
  }  else{
    console.log(
      "constructPreferenceContainer - checkCurrentAccess - Access did not change" );
  }
}

   return (
    <>
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
            <Grid item xs={9} >             
                <ConstructPreferencesForm 
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
