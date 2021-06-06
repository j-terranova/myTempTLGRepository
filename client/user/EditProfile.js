import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import UserProfile from "./UserProfile";
import Notification from "./../components/shared/Notification";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  input: {
    display: "none",
    padding: "10px 14px",
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function EditProfile({ match }) {
  const classes = useStyles()
  const jwt = auth.isAuthenticated()
  const userId = jwt.user._id;
  const profileTitle = "Edit Profile"
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    educator: false,
    lastName:  '',
    firstName:  '',
    cellPhonenumber:   '',
    verificationQuestion1:   'What city/town were you born in?',
    verificationAnswer1:   '',
    verificationQuestion2:   'What is your mothers maiden name?',
    verificationAnswer2:   '',
    verificationQuestion3:   'What junior high school did you attend?',
    verificationAnswer3:   '',
    okToSendEmailPromos:  'No',
    okToSendEmailSystemAlerts:  'No',
    groupsUserOwns: [],
    groupsUserMembership: [],

    homePhoneNumber:  '',
    city:  '', 
    state:   '',
    province: '',
    zip:  '',
    monthOfBirth:  '', 
    yearOfBirth:  '', 
    highSchoolDiploma:  '', 
    collegeDegree1: '', 
    collegeDegree2:   '',
    collegeDegree3:   '',
    affiliation_id:  undefined,
  
    status :  '',// "Active", Inactive
    importLimit: 50,
    membershipLevel:  '', //Platinum, Gold, Silver, Bronze, Standard, Public
    markDeleted: false,
    createDate:  Date.now,
    updatedBy:  userId,
    updateDate:  Date.now,

    open: false,
    error: '',
    redirectToProfile: false,

  })
 

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        console.log("EditProfile - UseEffect - return data = ", data);
        setValues({...values, 
          name: data.name || "", 
          email: data.email|| "",  
          educator: data.educator|| "false", 

          lastName:  data.lastName || "", 
          firstName:  data.firstName|| "", 
          cellPhonenumber:   data.cellPhonenumber || "", 
          verificationQuestion1: data.verificationQuestion1 || 'What city/town were you born in?',
          verificationAnswer1: data.verificationAnswer1|| "", 
          verificationQuestion2: data.verificationQuestion2 || 'What is your mothers maiden name?', 
          verificationAnswer2: data.verificationAnswer2 || "", 
          verificationQuestion3: data.verificationQuestion3 || 'What junior high school did you attend?',
          verificationAnswer3: data.verificationAnswer3 || "", 
          okToSendEmailPromos:  data.okToSendEmailPromos || "", 
          okToSendEmailSystemAlerts:  data.okToSendEmailSystemAlerts || "", 
          groupsUserOwns: data.groupsUserOwns || [], 
          groupsUserMembership: data.groupsUserMembership || [], 
      
          homePhoneNumber:  data.homePhoneNumber || "", 
          city:  data.city || "",  
          state:   data.state || "", 
          province: data.province || "", 
          zip:  data.zip || "", 
          monthOfBirth:  data.monthOfBirth || "", 
          yearOfBirth:  data.yearOfBirth || "", 
          highSchoolDiploma:  data.highSchoolDiploma || "", 
          collegeDegree1: data.collegeDegree1 || "", 
          collegeDegree2:   data.collegeDegree2 || "", 
          collegeDegree3:   data.collegeDegree3 || "", 
          affiliation_id:  (data.affiliation_id === "") ? undefined : data.affiliation_id, 
        
          status :  data.status || "Active", // "Active", Inactive
          importLimit: data.importLimit  ? data.importLimit : 50,
          membershipLevel:  data.membershipLevel ? data.membershipLevel : "Standard", //Platinum, Gold, Silver, Bronze, Standard, Public
          markDeleted: data.markDeleted ? data.markDeleted  : false,
          createDate:  data.createDate ? data.createDate: Date.now,
          updatedBy:  data.updatedBy ? data.updatedBy : userId,
          updateDate:  Date.now,    
          _id:  data._id,
        })
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  
  const clickSubmit = () => {
    const user = {
      name: values.name || "",
      email: values.email || "",
      password: values.password || "",
      educator: values.educator|| "false", 

      lastName:  values.lastName || "",
      firstName:  values.firstName || "",
      cellPhonenumber:   values.cellPhonenumber || "",
      verificationQuestion1: values.verificationQuestion1 || "",
      verificationAnswer1: values.verificationAnswer1 || "",
      verificationQuestion2: values.verificationQuestion2 || "",
      verificationAnswer2: values.verificationAnswer2 || "",
      verificationQuestion3: values.verificationQuestion3 || "",
      verificationAnswer3: values.verificationAnswer3 || "",
      okToSendEmailPromos:  values.okToSendEmailPromos || "No",
      okToSendEmailSystemAlerts:  values.okToSendEmailSystemAlerts || "No",
      groupsUserOwns: values.groupsUserOwns || [],
      groupsUserMembership: values.groupsUserMembership || [],
  
      homePhoneNumber:  values.homePhoneNumber || "",
      city:  values.city || "",
      state:   values.state || "",
      province: values.province || "",
      zip:  values.zip || "",
      monthOfBirth:  values.monthOfBirth || "",
      yearOfBirth:  values.yearOfBirth || "",
      highSchoolDiploma:  values.highSchoolDiploma || "",
      collegeDegree1: values.collegeDegree1 || "",
      collegeDegree2:   values.collegeDegree2 || "",
      collegeDegree3:   values.collegeDegree3 || "",
      affiliation_id: (values.affiliation_id === "") ? undefined : values.affiliation_id,
    
      status :  values.status ? values.status : "Active",// "Active", Inactive
      importLimit: values.importLimit  ? values.importLimit : 50,
      membershipLevel:  values.membershipLevel ? values.membershipLevel : "Standard", //Platinum, Gold, Silver, Bronze, Standard, Public
      markDeleted: values.markDeleted ? values.markDeleted  : false,
      createDate:  values.createDate ? values.createDate: Date.now,
      updatedBy:  values.updatedBy ? values.updatedBy : userId,
      updateDate:  Date.now,   

    }
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
        setNotify({
          isOpen: true,
          message: "User not update! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        auth.updateUser(data, ()=>{
          setValues({...values, userId: data._id, redirectToProfile: true})
        })
        setNotify({
          isOpen: true,
          message: "User Updated",
          type: "success",
        });
      }
    })
  }

    if (values.redirectToProfile) {
      return (<Redirect to={'/' }/>)
      //return (<Redirect to={'/user/' + values.userId}/>)
    }
    return (
      <>
        <UserProfile 
          values = {values}
          setValues = {setValues}
          clickSubmit = {clickSubmit}
          profileTitle = {profileTitle}
        />
         <Notification notify={notify} setNotify={setNotify} />
      </>
    )
}
