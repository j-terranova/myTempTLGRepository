import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Controls from "./../controls/Controls";
import { Grid } from '@material-ui/core';
import { Form } from '../components/shared/useForm';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import Notification from "../components/shared/Notification";

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

const UserProfile = (props) => {
  const {
    values,
    setValues,
    clickSubmit,
    profileTitle,
  } = props;

  const classes = useStyles()
  const jwt = auth.isAuthenticated()
  const userId = jwt.user._id;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const yNOptions = ( [
    {id: "Yes" , title: "Yes"},
    {id: "No" , title: "No"},
  ])

   const handleInputChange = event => {
    const name = event.target.name;
    console.log("EditProfile - handleInputChange name = ", name)
    console.log("EditProfile - handleInputChange event.target.value = ", event.target.value)
    setValues({...values, [name]: event.target.value})
  }
  
  const showGroupsUserOwns = (event, checked) => {

  }

  const showGroupsUserMembership = (event, checked) => {

  }

  const clickExit = () => {
    console.log("EditProfile - clickExit  <Redirect to= Home /> ")
    setValues({ ...values, error: "", redirectToProfile: true });
  }


  const handleCheck = (event, checked) => {
    setValues({...values, educator: checked})
  }

    if (values.redirectToProfile) {
      return (<Redirect to={'/user/' + values._id}/>)
    }
    return (
      <>
        <Form onSubmit={clickSubmit}>
        <br/>
        <Typography variant="h6" className={classes.title}>
          {profileTitle}
        </Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button color="primary" variant="contained" onClick={clickExit} className={classes.submit}>Exit</Button>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                  <Controls.Input
                      name="name"
                      label="Name"
                      value={values.name}
                      onChange={handleInputChange}
                  />
              </Grid>
              <Grid item xs={3}>
                  <Controls.Input
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={handleInputChange}
                  />
             </Grid>
             <Grid item xs={3}>
                   <Controls.Input
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleInputChange}
                  />
              </Grid>
             
             <Grid item xs={3}>
                <Typography variant="subtitle1" className={classes.subheading}>
                  I am an Educator
                </Typography>
                <FormControlLabel
                  control={
                    <Switch classes={{
                                      checked: classes.checked,
                                      bar: classes.bar,
                                    }}
                            checked={values.educator}
                            onChange={handleCheck}
                    />}
                  label={values.educator? 'Yes' : 'No'}
                />
              </Grid>
              <Grid item xs={12}> 
              {values.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {values.error}
                </Typography>
              )}
              <br/>
                <Divider/> {/*orientation="horizontal" */}
                <br/>
                The Information in this section may be required for proper identification.  Feel free to change questions.
                <br/><br/>
              </Grid>
              <Grid item xs={4}>
                  <Controls.Input
                      name="verificationQuestion1"
                      label="Verification Question 1"
                      value={values.verificationQuestion1}
                      onChange={handleInputChange}
                  />
                    <Controls.Input
                      name="verificationAnswer1"
                      label="Verification Answer 1"
                      value={values.verificationAnswer1}
                      onChange={handleInputChange}
                  />
              </Grid>
              <Grid item xs={4}>
                  <Controls.Input
                      name="verificationQuestion2"
                      label="Verification Question 2"
                      value={values.verificationQuestion2}
                      onChange={handleInputChange}
                  />
                    <Controls.Input
                      name="verificationAnswer2"
                      label="Verification Answer 2"
                      value={values.verificationAnswer2}
                      onChange={handleInputChange}
                  />
             </Grid>
             <Grid item xs={4}>
                   <Controls.Input
                      name="verificationQuestion3"
                      label="Verification Question 3"
                      value={values.verificationQuestion3}
                      onChange={handleInputChange}
                  />
                    <Controls.Input
                      name="verificationAnswer3"
                      label="Verification Answer 3"
                      value={values.verificationAnswer3}
                      onChange={handleInputChange}

                  />
              </Grid>
              <Grid item xs={12}> 
                <br/>
                <Divider/> {/*orientation="horizontal" */}
                <br/>
                We will only use your email within this application or as you indicate below.
                <br/><br/>
              </Grid>
              <Grid item xs={3}>
                <Controls.Select
                        name="okToSendEmailPromos"
                        label="OK To Send email Promos"
                        classes={classes}
                        value={values.okToSendEmailPromos}
                        onChange={handleInputChange}
                        options={yNOptions}
                    />
              </Grid>
              <Grid item xs={3}>
                <Controls.Select
                        name="okToSendEmailSystemAlerts"
                        label="OK To Send email System Alerts"
                        classes={classes}
                        value={values.okToSendEmailSystemAlerts}
                        onChange={handleInputChange}
                        options={yNOptions}
                    />  
             </Grid>
             <Grid item xs={3}>
             <Controls.Button
                            text="Groups Owwned"
                            variant="contained"
                            color = "primary"
                            onClick={showGroupsUserOwns}
                        />

              </Grid>
  
             <Grid item xs={3}>
             <Controls.Button
                            text="Group Memberships"
                            variant="contained"
                            color = "primary"
                            onClick={showGroupsUserMembership}
                        />


              </Grid>
              <Grid item xs={12}> 
                <br/>
                <Divider/> {/*orientation="horizontal" */}
                <br/>
                The information below is NOT required but will assist us in better serving you.  
                Leave the information you do not want to provide blank and it will NOT impact your ability to use this application.
                <br/><br/>
              </Grid>

              <Grid item xs={3}>
                  <Controls.Input
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      onChange={handleInputChange}
                  />
              </Grid>
              <Grid item xs={3}>
                  <Controls.Input
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleInputChange}
                  />
             </Grid>
             <Grid item xs={3}>
                   <Controls.Input
                      name="cellPhonenumber"
                      label="Cell Phone number"
                      value={values.cellPhonenumber}
                      onChange={handleInputChange}
                  />
              </Grid>
             
             <Grid item xs={3}>
             <Controls.Input
                      name="homePhoneNumber"
                      label="Home Phone Number"
                      value={values.homePhoneNumber}
                      onChange={handleInputChange}
                  />
              </Grid>

              <Grid item xs={3}>
                  <Controls.Input
                      name="city"
                      label="City"
                      value={values.city}
                      onChange={handleInputChange}
                  />
              </Grid>
              <Grid item xs={3}>
                  <Controls.Input
                      name="state"
                      label="State"
                      value={values.state}
                      onChange={handleInputChange}
                  />
             </Grid>
             <Grid item xs={3}>
                   <Controls.Input
                      name="province"
                      label="Province"
                      value={values.province}
                      onChange={handleInputChange}
                  />
              </Grid>
             
             <Grid item xs={3}>
             <Controls.Input
                      name="zip"
                      label="Zip"
                      value={values.zip}
                      onChange={handleInputChange}
                  />
              </Grid>

              <Grid item xs={3}>
                  <Controls.Input
                      name="monthOfBirth"
                      label="Month Of Birth"
                      value={values.monthOfBirth}
                      onChange={handleInputChange}
                  />
              </Grid>
              <Grid item xs={3}>
                  <Controls.Input
                      name="yearOfBirth"
                      label="Year Of Birth"
                      value={values.yearOfBirth}
                      onChange={handleInputChange}
                  />
             </Grid>
             <Grid item xs={3}>
                  <Controls.Select
                        name="highSchoolDiploma"
                        label="High School Diploma"
                        classes={classes}
                        value={values.highSchoolDiploma}
                        onChange={handleInputChange}
                        options={yNOptions}
                    />  
              </Grid>

              <Grid item xs={3}>
                  <Controls.Input
                      name="highSchoolDiploma"
                      label="High SchoolDiploma"
                      value={values.highSchoolDiploma}
                      onChange={handleInputChange}
                  />
              </Grid>
              <Grid item xs={3}>
                  <Controls.Input
                      name="collegeDegree1"
                      label="College Degree 1"
                      value={values.collegeDegree1}
                      onChange={handleInputChange}
                  />
             </Grid>
             <Grid item xs={3}>
                   <Controls.Input
                      name="collegeDegree2"
                      label="College Degree 2"
                      value={values.collegeDegree2}
                      onChange={handleInputChange}
                  />
              </Grid>
             
             <Grid item xs={3}>
             <Controls.Input
                      name="collegeDegree3"
                      label="College Degree 3"
                      value={values.collegeDegree3}
                      onChange={handleInputChange}
                  />
              </Grid>


            </Grid>
          

        </Form>
        <Notification notify={notify} setNotify={setNotify} />
    </>
    )
}
export default UserProfile;

/*

    name: '',
    password: '',
    email: '',
    educator: false,

    required Fields

  verificationQuestion1:
  verificationAnswer1: 
  verificationQuestion2: 
  verificationAnswer2: 
  verificationQuestion3: 
  verificationAnswer3: 
  okToSendEmailPromos: 
  okToSendEmailSystemAlerts: 
  groupsUserOwns: [mongoose.Schema.ObjectId],
  groupsUserMembership: [mongoose.Schema.ObjectId],

Optional Fields
  lastName: 
  firstName: 
  cellPhonenumber: 
  homePhoneNumber: 
  city:  
  state:  
  province:
  zip:  
  monthOfBirth:  
  yearOfBirth:  
  highSchoolDiploma:  
  collegeDegree1: 
  collegeDegree2:  
  collegeDegree3:  
  affiliation_id: 

Grayed or system maintained fields  
  status : // "Active", Inactive
  importLimit:
  membershipLevel:  //Platinum, Gold, Silver, Bronze, Standard, Public
  markDeleted: 
  createDate: // Date.now,
  updatedBy:  mongoose.Schema.ObjectId,
  updateDate:  //Date.now,
*/