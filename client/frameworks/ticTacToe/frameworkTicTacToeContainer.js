import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import auth from "./../../auth/auth-helper";
import { v4 as uuidv4 } from "uuid";
import { listByCriteria, update, readById } from "./api-frameworkTicTacToe.js";
import FrameworkCriteria from "./../shared/frameworkCriteria";
import FrameworkAccess from "./../shared/frameworkAccess";
import FrameworkLineItemListing from "../shared/frameworkLineItemListing";

import { getCurrentFrameworkByMaxUpdateDateAndUserId } from "./api-frameworkTicTacToe";
import { useCriteria, useCriteriaDispatch } from "./../../contexts/CriteriaContext";
import { useAccess, useAccessDispatch } from "./../../contexts/AccessContext";
import { useGamerPreferences } from "../../contexts/GamerPreferencesContext";
import { useUserData } from "./../../contexts/UserDataContext";

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

export default function FrameworkTicTacToeContainer() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [ okToUpdate, setOkToUpdate ] = useState(true);
  const currentCriteria = useCriteria();
  const gamerPreferences = useGamerPreferences();
  const userData = useUserData();
  const criteriaDispatch = useCriteriaDispatch();
  const currentAccess = useAccess();
  const accessDispatch = useAccessDispatch();
  const [page, setPage] = useState(0);
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const formTitle = "TicTacToe Entry and Update Form";
  const listingTitle = "TicTacToe Listing";
  
  const [listAllWithoutCriteria, setListAllWithoutCriteria] = useState(false);
  const [groupsUserOwns, setGroupsUserOwns] = useState ([]);
  const [
    frameworkTicTacToes,
    setFrameworkTicTacToes,
  ] = useState([]); 
   const [
    frameworkTicTacToesPreFilter,
    setFrameworkTicTacToesPreFilter,
  ] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [formValues, setFormValues] = useState({
    topic:  gamerPreferences.topic,
    description:   "",
    myClass:  gamerPreferences.myClass,
    category:  gamerPreferences.category,
    subject:  gamerPreferences.subject,
    type:  "Framework",
    subType:  "TicTacToe",
    difficultyLevel:  gamerPreferences.difficultyLevel,
    ageRange:  gamerPreferences.ageRange,
    image_id:  "",
    imageFileName:  "",
    imageBase64:  "",
    imageBinary:  "",
    image: "",
    imageType: "",
    imageStr: "",
    owner_id: userId,
    group_id:  gamerPreferences.group_id ? gamerPreferences.group_id : "",
    keepPrivate:  gamerPreferences.keepPrivate ? gamerPreferences.keepPrivate : false,
    approvedForPublicUse: true,
    frameworkLayoutFormat: "TicTacToe",
    frameworkResponseFormat: "Matching",
    frameworkPresentationMethod:  "Fixed",
    frameworkSolutionMethod:  "ImmediateRightWrong",
    frameworkIncludeSpeech:  true,
    frameworkIncludeTimer:  true,
    frameworkIncludeScoring:  true,
    frameworkColor:  "Default",
    includeConstructs: [{
      sequenceNo: 0,
      constructDetail: "",
      type: "Component",
      subType: "",
      constructPrimaryColumn: "KeyWordOrQuestion",
      constructOptionsSource: "SecondaryColumns",
      constructNumberOfOptions: 1,
      constructResponseFormat: "Matching",
      constructColor: "Default",
      constructId: "",
    }],  
    markDeleted:  false,
    createDate:  Date.now(),
    updatedBy:  userId,
    updateDate: Date.now(),
    _v:  "0",
    _id:  uuidv4(),
    modified: false,
    isError: false,
    errorMessage: "",
  });

  console.log(
    "frameworkTicTacToeContainer - right after initiation of formValues = ",
    formValues
  );

  console.log(
    "frameworkTicTacToeContainer - right after start of currentCriteria = ",
    currentCriteria
  );
  console.log(
    "frameworkTicTacToeContainer - right after start of currentAccess = ",
    currentAccess
  );

  const checkCurrentCriteria = (valuesToCheck) =>
  {
    console.log(
      "frameworkTicTacToeContainer - checkCurrentCriteria = ",
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
          "frameworkTicTacToeContainer - checkCurrentCriteria - Criteria found to have changed, valuesToCheck = ",
          valuesToCheck
        );
        criteriaDispatch({
          type: "SET_CRITERIAFROMCURRENTITEM",
          currentSourceOfCriteria: valuesToCheck,
        });
      }
      else{
        console.log(
          "frameworkTicTacToeContainer - checkCurrentCriteria - Criteria did not change" );
      }
    }      else{
      console.log(
        "frameworkTicTacToeContainer - checkCurrentCriteria - Criteria did not change" );
    }
  }
const checkCurrentAccess = (valuesToCheck) =>
{
  console.log(
    "frameworkTicTacToeContainer - checkCurrentAccess = ",
    currentAccess
  );
  if (valuesToCheck != undefined && valuesToCheck != null)
  {
    if (valuesToCheck.keepPrivate != currentAccess.keepPrivate ||
        valuesToCheck.group_id != currentAccess.group_id ||
        valuesToCheck.approvedForPublicUse != currentAccess.approvedForPublicUse)
      {
        console.log(
          "frameworkTicTacToeContainer - checkCurrentAccess - Access found to have changed, valuesToCheck = ",
          valuesToCheck
        );
      accessDispatch({
        type: "SET_ACCESSFROMCURRENTITEM",
        currentSourceOfAccess: valuesToCheck,
      });
    }else{
      console.log(
        "frameworkTicTacToeContainer - checkCurrentAccess - Access did not change" );
    }
  }  else{
    console.log(
      "frameworkTicTacToeContainer - checkCurrentAccess - Access did not change" );
  }
}
  const markItemDeleted = (indexToDelete, markDeleted)=>{
    setFrameworkTicTacToes(
    [
      ...frameworkTicTacToes.slice(0, indexToDelete), // everything before current post
      {
        ...frameworkTicTacToes[indexToDelete],
        markDeleted: markDeleted,
      },
      ...frameworkTicTacToes.slice(indexToDelete + 1), // everything after current post
    ]);
    setFrameworkTicTacToesPreFilter(
      [
        ...frameworkTicTacToes.slice(0, indexToDelete), // everything before current post
        {
          ...frameworkTicTacToes[indexToDelete],
          markDeleted: markDeleted,
        },
        ...frameworkTicTacToes.slice(indexToDelete + 1), // everything after current post
      ]);
  }

  const updateFrameworkLineItem = (indexToUpdate, toggleDelete, lastIndexToUpdate, newCriteria, newAccess) => {
    console.log(
      "frameworkTicTacToeContainer - updateFrameworkLineItem TicTacToe #indexToUpdate = ", indexToUpdate );
    const markDeleted = toggleDelete? (!frameworkTicTacToes[indexToUpdate].markDeleted):frameworkTicTacToes[indexToUpdate].markDeleted;
    console.log("frameworkTicTacToeContainer - updateFrameworkLineItem frameworkTicTacToes[indexToUpdate] = ", frameworkTicTacToes[indexToUpdate] );
    let recordToUpdate = {};
    const id = frameworkTicTacToes[indexToUpdate]._id
    const abortController = new AbortController();
    const signal = abortController.signal;
    readById(
      { userId: userId, },
      { id: id },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "frameworkTicTacToe Container - updateFrameworkLineItem -readById - No Data Found!!!!"
        );
        recordToUpdate = null;
      } else {
        if (data.error) {
          console.log(
            "frameworkTicTacToe Container - updateFrameworkLineItem - Error!!!!", data.error
          );
          recordToUpdate = null;
        } else {
          console.log(
            "frameworkTicTacToe Container - updateFrameworkLineItem =  ",
            data
          );
          recordToUpdate = data;
          recordToUpdate.markDeleted = markDeleted
          updateFrameworkTicTacToe (recordToUpdate,indexToUpdate, lastIndexToUpdate, toggleDelete, newCriteria, newAccess)
        }
      }
    });    
  }

const updateFrameworkTicTacToe = (recordToUpdate, indexToUpdate, lastIndexToUpdate, toggleDelete, newCriteria, newAccess) =>
{
    if (newCriteria != undefined && newCriteria != null)
    {
      newCriteria.myClass && (recordToUpdate.myClass = newCriteria.myClass)
      newCriteria.category && (recordToUpdate.category = newCriteria.category)
      newCriteria.subject && (recordToUpdate.subject = newCriteria.subject)
      newCriteria.difficultyLevel && (recordToUpdate.difficultyLevel = newCriteria.difficultyLevel)
      newCriteria.ageRange && (recordToUpdate.ageRange = newCriteria.ageRange)
    }
    if (newAccess != undefined && newAccess != null)
    {
      if (newAccess.keepPrivate != undefined && newAccess.keepPrivate != null)
        {recordToUpdate.keepPrivate = newAccess.keepPrivate
        }
      if (newAccess.approvedForPublicUse  != undefined && newAccess.approvedForPublicUse != null) 
        {recordToUpdate.approvedForPublicUse = newAccess.approvedForPublicUse 
        }
      if (newAccess.group_id  != undefined && newAccess.group_id != null)   
        {recordToUpdate.group_id = newAccess.group_id 
        }
    }  
    update(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      recordToUpdate
    ).then((data) => {
      if (!data) {
        console.log(
          "frameworkTicTacToeContainer - updateFrameworkTicTacToe - No Data so dispatch, Check Criteria"
        );
        setNotify({
          isOpen: true,
          message: "TicTacToe update failed! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        if (data.error) {
          console.log(
            "frameworkTicTacToeContainer - updateFrameworkTicTacToe - error returned = " + data.error
          );
          setNotify({
            isOpen: true,
            message: "TicTacToe update failed! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else {
          console.log("frameworkTicTacToeContainer -updateFrameworkTicTacToe -  Update Successful!!! data =  " + data); 
          if (toggleDelete)
          {
            console.log("frameworkTicTacToeContainer - updates notComplete current index = ", indexToUpdate  )
            markItemDeleted(indexToUpdate,recordToUpdate.markDeleted)          
            setNotify({
              isOpen: true,
              message: "TicTacToe Toggle Deleted/Undeleted",
              type: "error",
            });
          }
          if (indexToUpdate == lastIndexToUpdate)
          {
            checkCurrentCriteria(newCriteria);
            checkCurrentAccess(newAccess);
            setNotify({
              isOpen: true,
              message: "TicTacToe record(s) updated!",
              type: "success",
            });
          }
        }
      };
    });
  }

 const prepareFormValues = (newFormValues) =>
  {
    console.log("FrameworkTicTacToeConatiner - preparingFormValues with newFormValues = ", newFormValues );
    setFormValues({
      topic: (newFormValues != null && newFormValues.topic)  ? 
              newFormValues.topic : currentCriteria.topic ? currentCriteria.topic : gamerPreferences.topic ,
      description:  (newFormValues != null && newFormValues.description)  ? newFormValues.description : "",
      myClass: (newFormValues != null && newFormValues.myClass)  ? 
              newFormValues.myClass : currentCriteria.myClass ? currentCriteria.myClass : gamerPreferences.myClass,
      category: (newFormValues != null && newFormValues.category)  ? 
              newFormValues.category : currentCriteria.category ? currentCriteria.category : gamerPreferences.category,
      subject: (newFormValues != null && newFormValues.subject)  ?  
              newFormValues.subject : currentCriteria.subject ?  currentCriteria.subject : gamerPreferences.subject,
      type: (newFormValues != null && newFormValues.type)  ? newFormValues.type : "Framework",
      subType: (newFormValues != null && newFormValues.subType)  ? newFormValues.subType : "TicTacToe",
      difficultyLevel: (newFormValues != null && newFormValues.difficultyLevel)  ? 
              newFormValues.difficultyLevel : currentCriteria.difficultyLevel ? currentCriteria.difficultyLevel : gamerPreferences.difficultyLevel,
      ageRange: (newFormValues != null && newFormValues.ageRange)  ? 
              newFormValues.ageRange : currentCriteria.ageRange ? currentCriteria.ageRange : gamerPreferences.ageRange,
      image_id: (newFormValues != null && newFormValues.image_id)  ? newFormValues.image_id : "",
      imageFileName: (newFormValues != null && newFormValues.imageFileName)  ? newFormValues.imageFileName : "",
      imageBase64:  (newFormValues != null && newFormValues.imageBase64)  ? newFormValues.imageBase64 : "",
      imageBinary:  (newFormValues != null && newFormValues.imageBase64)  ?  Buffer(newFormValues.imageBase64, 'base64') : "",
      image: (newFormValues != null && newFormValues.image)  ? newFormValues.image : "",
      imageType: (newFormValues != null && newFormValues.imageType)  ? newFormValues.imageType : "",
      imageStr: (newFormValues != null && newFormValues.imageType  && newFormValues.imageBase64)  ? ("data:" + newFormValues.imageType + ";base64," + newFormValues.imageBase64): "",
      owner_id: (newFormValues != null && newFormValues.owner_id)  ? newFormValues.owner_id : userId,
      group_id: (newFormValues != null && newFormValues.group_id)  ? 
                newFormValues.group_id : currentAccess.group_id ? currentAccess.group_id : gamerPreferences.group_id,
      keepPrivate: (newFormValues != null && (newFormValues.keepPrivate != undefined && newFormValues.keepPrivate != null))  ? 
                newFormValues.keepPrivate : currentAccess.keepPrivate ? currentAccess.keepPrivate : gamerPreferences.keepPrivate,
      approvedForPublicUse: (newFormValues != null && (newFormValues.approvedForPublicUse != undefined && newFormValues.approvedForPublicUse != null))  ? 
              newFormValues.approvedForPublicUse : currentAccess.approvedForPublicUse ? currentAccess.approvedForPublicUse : true,
      frameworkLayoutFormat: (newFormValues != null && newFormValues.frameworkLayoutFormat)  ? newFormValues.frameworkLayoutFormat : "TicTacToe",
      frameworkResponseFormat: (newFormValues != null && newFormValues.frameworkResponseFormat)  ? newFormValues.frameworkResponseFormat : "Matching",
      frameworkPresentationMethod: (newFormValues != null && newFormValues.frameworkPresentationMethod)  ? newFormValues.frameworkPresentationMethod : "Fixed",
      frameworkSolutionMethod: (newFormValues != null && newFormValues.frameworkSolutionMethod)  ? newFormValues.frameworkSolutionMethod : "ImmediateRightWrong",     
      frameworkIncludeSpeech: (newFormValues != null && newFormValues.frameworkIncludeSpeech)  ? newFormValues.frameworkIncludeSpeech : true,     
      frameworkIncludeTimer: (newFormValues != null && newFormValues.frameworkIncludeTimer)  ? newFormValues.frameworkIncludeTimer : true,      
      frameworkIncludeScoring: (newFormValues != null && newFormValues.frameworkIncludeScoring)  ? newFormValues.frameworkIncludeScoring : true,    
      frameworkColor: (newFormValues != null && newFormValues.frameworkColor)  ? newFormValues.frameworkColor : "Default",
       includeConstructs: (newFormValues != null && newFormValues.includeConstructs)  ? newFormValues.includeConstructs : [],     
      markDeleted: (newFormValues != null && (newFormValues.markDeleted != undefined && newFormValues.markDeleted != null))  ? newFormValues.markDeleted : false,
      createDate: (newFormValues != null && newFormValues.createDate)  ? newFormValues.createDate : Date.now(),
      updatedBy: (newFormValues != null && newFormValues.updatedBy)  ? newFormValues.updatedBy : userId,
      updateDate: (newFormValues != null && newFormValues.updateDate)  ? newFormValues.updateDate : Date.now(),
      _v: (newFormValues != null && newFormValues._v)  ? newFormValues._v : "0",
      _id: (newFormValues != null && newFormValues._id)  ? newFormValues._id : uuidv4(),
      modified: false,
      isError: false,
      errorMessage: "",
    });
  };


const checkIfUserCanUpdate = (frameworkOwwnerId, frameworkGroupId) => {
let canUpdate = false;
console.log (" frameworkTicTacToeContainer - checkIfUserCanUpdate - frameworkOwwnerId = ", frameworkOwwnerId);
console.log (" frameworkTicTacToeContainer - checkIfUserCanUpdate - frameworkGroupId = ", frameworkGroupId);
console.log (" frameworkTicTacToeContainer - checkIfUserCanUpdate - userId = ", userId);
console.log (" frameworkTicTacToeContainer - checkIfUserCanUpdate - userData.groupsUserMembership = ", userData.groupsUserMembership);
  if (userId == frameworkOwwnerId)
  {
    canUpdate = true;
    console.log (" frameworkTicTacToeContainer - checkIfUserCanUpdate - MATCH! userId == frameworkOwwnerId  canUpdate = ", canUpdate);
  } else if (frameworkGroupId != undefined && frameworkGroupId != nulll &&
              userData.groupsUserMembership != undefined && userData.groupsUserMembership !=  null)
  {
    for (let i= 0; i<userData.groupsUserMembership.length; i++)
    {
      if (userData.groupsUserMembership[i] == frameworkGroupId)
      {
        canUpdate = true;
        break;
      }
    }
  }
  console.log (" frameworkTicTacToeContainer - checkIfUserCanUpdate - returned Value  canUpdate = ", canUpdate);
  setOkToUpdate(canUpdate)
  return canUpdate;
}

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    console.log (" frameworkTicTacToeContainer - useEffect - to populate the groupsUserOwns = ",userData.groupsUserOwns)
  let groupOptions = []  
    if (userData.groupsUserOwns.length > 0)
    { 
      let groupsOwned = userData.groupsUserOwns;  
      groupOptions = groupsOwned.map(data => 
        {
            return { id : data._id, title : data.groupName }
        })
    } else 
    {
      groupOptions = 
        [{id:"", title: ""}];
    }
    setGroupsUserOwns(groupOptions);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("FrameworkTicTacToeContainer - inside useEffect()  ");
    getCurrentFrameworkByMaxUpdateDateAndUserId(
      {
        userId: userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "FrameworkTicTacToeContainer - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "FrameworkTicTacToeContainer - No Data so error is returned data =: ",
            data
          );
          console.log(
            "FrameworkTicTacToeContainer - No Data so error is returned data.error =: ",
            data.error
          );
          setRedirectToSignin(true);
        } else {
          console.log(
            "FrameworkTicTacToeContainer - Right after data is returned data =: ",
            data
          );
          criteriaDispatch({
            type: "SET_CRITERIAFROMCURRENTITEM",
            currentSourceOfCriteria: data,
          });
          accessDispatch({
            type: "SET_ACCESSFROMCURRENTITEM",
            currentSourceOfAccess: data,
          });
        }
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);


  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
      console.log(
        "frameworkTicTacToeContainer - Update Listing whenever the critiera changes, currentCriteria = ",
        currentCriteria
      );
      if (currentCriteria != undefined && currentCriteria != null )
      {
        if (
          ((currentCriteria.myClass != null &&
          currentCriteria.category != null &&
          currentCriteria.subject != null &&
          currentCriteria.difficultyLevel != null &&
          currentCriteria.ageRange != null &&
          currentCriteria.topic != null) 
          &&
          (
          currentCriteria.myClass.length != 0 ||
          currentCriteria.category.length != 0 ||
          currentCriteria.subject.length != 0 ||
          currentCriteria.difficultyLevel.length != 0 ||
          currentCriteria.ageRange.length != 0 ||
          currentCriteria.topic.length != 0))
          ||
          (listAllWithoutCriteria)
        ) {
          // This prevents an initial query of all records
          // but allows for subsequent requests for all if specifically requested by the user
          setListAllWithoutCriteria(true);
          const myClassVar = currentCriteria.myClass;
          const categoryVar = currentCriteria.category;
          const subjectVar = currentCriteria.subject;
          const difficultyLevelVar = currentCriteria.difficultyLevel;
          const ageRangeVar = currentCriteria.ageRange;
          const topicVar = currentCriteria.topic;

          const abortController = new AbortController();
          const signal = abortController.signal;
          listByCriteria(
            { userId: userId, },
            {
              //owner_id: userId, // Allow all users to view but lock out users unless owner or in the designated group
              myClass: myClassVar,
              category: categoryVar,
              subject: subjectVar,
              difficultyLevel: difficultyLevelVar,
              ageRange: ageRangeVar,
              topic: topicVar,
            },
            {
              t: jwt.token,
            },
            signal
          ).then((data) => {
            if (!data) {
              console.log(
                "frameworkTicTacToeContainer - No Data so dispatch, Check Criteria"
              );
              setFrameworkTicTacToes([]);
              setFrameworkTicTacToesPreFilter([]);
            } else {
              if (data.error) {
                console.log(
                  "frameworkTicTacToeContainer - error returned = " + data.error
                );
                setFrameworkTicTacToes([]);
                setFrameworkTicTacToesPreFilter([]);
              } else if (data.length > 0) {
                console.log(
                  "frameworkTicTacToeContainer - Update listing by ListByCriteria =  ",
                  data
                );
                const resultArray = data.map(ticTacToe => ({  topic: ticTacToe.topic,
                                                              description: ticTacToe.description,
                                                              owner_id: ticTacToe.owner_id,
                                                              group_id: ticTacToe.group_id,
                                                              frameworkLayoutFormat: ticTacToe.frameworkLayoutFormat,
                                                              frameworkResponseFormat: ticTacToe.frameworkResponseFormat,
                                                              frameworkPresentationMethod: ticTacToe.frameworkPresentationMethod,
                                                              markDeleted: ticTacToe.markDeleted,
                                                              _id:ticTacToe._id,}));
                                                              
                setFrameworkTicTacToes(resultArray);
                setFrameworkTicTacToesPreFilter(resultArray);

              } else {
                setFrameworkTicTacToes([]);
                setFrameworkTicTacToesPreFilter([]);
              }
            }
          });
          setPage(0);
        }
      }
    return function cleanup() {
      abortController.abort();
    };
  }, [currentCriteria]);

  return (
    <>
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
            <Grid item xs={9} >             
                <FrameworkLineItemListing 
                selected = {selected}
                setSelected = {setSelected}
                frameworkLineItems = {frameworkTicTacToes}
                setFrameworkLineItems = {setFrameworkTicTacToes}
                frameworkLineItemsPreFilter ={frameworkTicTacToesPreFilter}
                setFrameworkLineItemsPreFilter ={setFrameworkTicTacToesPreFilter}
                updateFrameworkLineItem={updateFrameworkLineItem}
                formValues={formValues}
                setFormValues = {setFormValues}
                prepareFormValues = {prepareFormValues}
                readById={ readById }
                page = { page}
                setPage = { setPage}
                checkCurrentCriteria={checkCurrentCriteria}
                checkCurrentAccess={checkCurrentAccess}
                formTitle = {formTitle}
                listingTitle={listingTitle}
                groupsUserOwns={groupsUserOwns}
                okToUpdate = {okToUpdate} 
                setOkToUpdate = {setOkToUpdate} 
                checkIfUserCanUpdate = {checkIfUserCanUpdate} 
                />
            </Grid>
            <Grid item xs={3} >
              {" "}
              <Paper className={classes.paper}>
                {" "}
                <FrameworkCriteria 
                  selected = {selected}
                  setSelected = {setSelected}
                  updateFrameworkLineItem ={updateFrameworkLineItem}
                  frameworkLineItems = {frameworkTicTacToes}
                  checkCurrentCriteria = {checkCurrentCriteria}
                  okToUpdate={okToUpdate}
                  />
                </Paper>
             </Grid>
             </Grid>
             <Divider/>
             <Grid item xs={12} >
             <Paper className={classes.paper}>
                <FrameworkAccess
                  selected = {selected}
                  setSelected = {setSelected}
                  updateFrameworkLineItem ={updateFrameworkLineItem}
                  frameworkLineItems = {frameworkTicTacToes}
                  groupsUserOwns={groupsUserOwns}
                  setGroupsUserOwns={setGroupsUserOwns}
                    />             
              </Paper>          
          </Grid>
     </Paper>
    </div>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
