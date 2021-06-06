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
import { useEducationPreferences, useEducationPreferencesDispatch } from "../../contexts/EducationPreferencesContext";

import EducationPreferencesForm from "./educationPreferencesForm";

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

export default function EducationPreferenceContainer() {
  const classes = useStyles();

  const educationPreferences = useEducationPreferences();
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
    user_id:  educationPreferences.user_id?educationPreferences.user_id:userId,
    topic:  educationPreferences.topic?educationPreferences.topic:"",
    myClass:   educationPreferences.myClass?educationPreferences.myClass:"",
    category:   educationPreferences.category?educationPreferences.category:"",
    subject:   educationPreferences.subject?educationPreferences.subject:"",
    type:   educationPreferences.type?educationPreferences.type:"",
    subType:   educationPreferences.subType?educationPreferences.subType:"",
    difficultyLevel:   educationPreferences.difficultyLevel?educationPreferences.difficultyLevel: 27,
    ageRange:   educationPreferences.ageRange?educationPreferences.ageRange: 6,
    image_id:   educationPreferences.image_id?educationPreferences.image_id:"",
    group_id:   educationPreferences.group_id?educationPreferences.group_id:"",
    keepPrivate:   educationPreferences.keepPrivate?educationPreferences.keepPrivate: true,
    rowsPerPage:  educationPreferences.rowsPerPage?educationPreferences.rowsPerPage: 10,
    themeBrightness:  educationPreferences.themeBrightness?educationPreferences.themeBrightness: "main",
    primaryButtonColor:  educationPreferences.primaryButtonColor?educationPreferences.primaryButtonColor:"blue",
    primaryBackgroundColor:  educationPreferences.primaryBackgroundColor?educationPreferences.primaryBackgroundColor: "white",
    createDate:   educationPreferences.createDate?educationPreferences.createDate:Date.now(),
    updatedBy:   educationPreferences.updatedBy?educationPreferences.updatedBy:"",
    updateDate:  educationPreferences.updateDate?educationPreferences.updateDate: Date.now(),
    _v:  "0",
    _id:  educationPreferences._id?educationPreferences._id:"" ,
    isError: false,
    errorMessage: "",
  });

  console.log(
    "educationPreferenceContainer - right after initiation of formValues = ",
    formValues
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log ("Signin - useEffect - educationPreferences = ", educationPreferences);
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
      "educationPreferenceContainer - checkCurrentCriteria = ",
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
          "educationPreferenceContainer - checkCurrentCriteria - Criteria found to have changed, valuesToCheck = ",
          valuesToCheck
        );
        criteriaDispatch({
          type: "SET_CRITERIAFROMCURRENTITEM",
          currentSourceOfCriteria: valuesToCheck,
        });
      }
      else{
        console.log(
          "educationPreferenceContainer - checkCurrentCriteria - Criteria did not change" );
      }
    }      else{
      console.log(
        "educationPreferenceContainer - checkCurrentCriteria - Criteria did not change" );
    }
  }
  const checkCurrentAccess = (valuesToCheck) =>
{
  console.log(
    "educationPreferenceContainer - checkCurrentAccess = ",
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
          "educationPreferenceContainer - checkCurrentAccess - Access found to have changed, valuesToCheck = ",
          valuesToCheck
        );
      accessDispatch({
        type: "SET_ACCESSFROMCURRENTITEM",
        currentSourceOfAccess: valuesToCheck,
      });
    }else{
      console.log(
        "educationPreferenceContainer - checkCurrentAccess - Access did not change" );
    }
  }  else{
    console.log(
      "educationPreferenceContainer - checkCurrentAccess - Access did not change" );
  }
}

   return (
    <>
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
            <Grid item xs={9} >             
                <EducationPreferencesForm 
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
