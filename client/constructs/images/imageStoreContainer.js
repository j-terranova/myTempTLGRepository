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
import { listByCriteria, update, readById } from "./api-imageStore.js";
import ConstructCriteria from "./../shared/constructCriteria";
import ConstructAccess from "./../shared/constructAccess";
import ConstructLineItemListing from "../shared/constructLineItemListing";

import { getCurrentImageByMaxUpdateDateAndUserId } from "./api-imageStore";
import { useCriteria, useCriteriaDispatch } from "./../../contexts/CriteriaContext";
import { useAccess, useAccessDispatch } from "./../../contexts/AccessContext";
import { useConstructPreferences } from "./../../contexts/ConstructPreferencesContext";
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

export default function ImageStoreContainer() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [ okToUpdate, setOkToUpdate ] = useState(true);
  const constructPreferences = useConstructPreferences();
  const userData = useUserData();
  const currentCriteria = useCriteria();
  const criteriaDispatch = useCriteriaDispatch();
  const currentAccess = useAccess();
  const accessDispatch = useAccessDispatch();
  const [page, setPage] = useState(0);
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const formTitle = "ImageStore Entry and Update Form";
  const listingTitle = "ImageStore Listing";
   const [listAllWithoutCriteria, setListAllWithoutCriteria] = useState(false);
   const [groupsUserOwns, setGroupsUserOwns] = useState ([]);
   const [
    imageStores,
    setImageStores,
  ] = useState([]); 
   const [
    imageStoresPreFilter,
    setImageStoresPreFilter,
  ] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  
  const [formValues, setFormValues] = useState({
    fileNameInternal: "",
    fileNameExternal: "",
    topic:  constructPreferences.topic,
    description:   "",
    myClass:  constructPreferences.myClass,
    category:  constructPreferences.category,
    subject:  constructPreferences.subject,
    type:  "Component",
    subType:  "ImageStore",
    difficultyLevel:  constructPreferences.difficultyLevel,
    ageRange:  constructPreferences.ageRange,
    imageBase64:  "",
    imageBinary:  "",
    image: "",
    imageType: "",
    imageStr: "",
    owner_id: userId,
    group_id:  constructPreferences.group_id ? constructPreferences.group_id : "",
    keepPrivate:  constructPreferences.keepPrivate ? constructPreferences.keepPrivate : true,
    approvedForPublicUse: false,
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
    "imageStoreContainer - right after initiation of formValues = ",
    formValues
  );

   console.log(
    "imageStoreContainer - right after start of currentCriteria = ",
    currentCriteria
  );
  console.log(
    "imageStoreContainer - right after start of currentAccess = ",
    currentAccess
  );

  const checkCurrentCriteria = (valuesToCheck) =>
  {
    console.log(
      "imageStoreContainer - checkCurrentCriteria = ",
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
          "imageStoreContainer - checkCurrentCriteria - Criteria found to have changed, valuesToCheck = ",
          valuesToCheck
        );
        criteriaDispatch({
          type: "SET_CRITERIAFROMCURRENTITEM",
          currentSourceOfCriteria: valuesToCheck,
        });
      }
      else{
        console.log(
          "imageStoreContainer - checkCurrentCriteria - Criteria did not change" );
      }
    }      else{
      console.log(
        "imageStoreContainer - checkCurrentCriteria - Criteria did not change" );
    }
  }
  const checkCurrentAccess = (valuesToCheck) =>
{
  console.log(
    "imageStoreContainer - checkCurrentAccess = ",
    currentAccess
  );
  if (valuesToCheck != undefined && valuesToCheck != null)
  {
    if (valuesToCheck.keepPrivate != currentAccess.keepPrivate ||
        valuesToCheck.group_id != currentAccess.group_id ||
        valuesToCheck.approvedForPublicUse != currentAccess.approvedForPublicUse)
      {
        console.log(
          "imageStoreContainer - checkCurrentAccess - Access found to have changed, valuesToCheck = ",
          valuesToCheck
        );
      accessDispatch({
        type: "SET_ACCESSFROMCURRENTITEM",
        currentSourceOfAccess: valuesToCheck,
      });
    }else{
      console.log(
        "imageStoreContainer - checkCurrentAccess - Access did not change" );
    }
  }  else{
    console.log(
      "imageStoreContainer - checkCurrentAccess - Access did not change" );
  }
}
  const markItemDeleted = (indexToDelete, markDeleted)=>{
    setImageStores(
    [
      ...imageStores.slice(0, indexToDelete), // everything before current post
      {
        ...imageStores[indexToDelete],
        markDeleted: markDeleted,
      },
      ...imageStores.slice(indexToDelete + 1), // everything after current post
    ]);
    setImageStoresPreFilter(
      [
        ...imageStores.slice(0, indexToDelete), // everything before current post
        {
          ...imageStores[indexToDelete],
          markDeleted: markDeleted,
        },
        ...imageStores.slice(indexToDelete + 1), // everything after current post
      ]);
  }

  const readSingleImage = (idToRead) => {
    console.log(
      "imageStoreContainer - readSingleImage ImageStore #idToRead = ", idToRead );
    const markDeleted = toggleDelete? (!imageStores[indexToUpdate].markDeleted):imageStores[indexToUpdate].markDeleted;
    const abortController = new AbortController();
    const signal = abortController.signal;
    readById(
      { userId: userId, },
      { id: idToRead },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "imageStore Container - readSingleImage -readById - No Data Found!!!!"
        );
        recordToUpdate = null;
      } else {
        if (data.error) {
          console.log(
            "imageStore Container - readSingleImage - Error!!!!", data.error
          );
          recordToUpdate = null;
        } else {
          console.log(
            "imageStore Container - readSingleImage =  ",
            data
          );
          prepareFormValues(data);
        }
      }
    });    
  }

  const updateImageStoreLineItem = (indexToUpdate, toggleDelete, lastIndexToUpdate, newCriteria, newAccess) => {
    console.log(
      "imageStoreContainer - updateImageStoreLineItem ImageStore #indexToUpdate = ", indexToUpdate );
    const markDeleted = toggleDelete? (!imageStores[indexToUpdate].markDeleted):imageStores[indexToUpdate].markDeleted;
    console.log("imageStoreContainer - updateImageStoreLineItem imageStores[indexToUpdate] = ", imageStores[indexToUpdate] );
    let recordToUpdate = {};
    const id = imageStores[indexToUpdate]._id
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
          "imageStore Container - updateImageStoreLineItem -readById - No Data Found!!!!"
        );
        recordToUpdate = null;
      } else {
        if (data.error) {
          console.log(
            "imageStore Container - updateImageStoreLineItem - Error!!!!", data.error
          );
          recordToUpdate = null;
        } else {
          console.log(
            "imageStore Container - updateImageStoreLineItem =  ",
            data
          );
          recordToUpdate = data;
          recordToUpdate.markDeleted = markDeleted
          updateImageStore (recordToUpdate,indexToUpdate, lastIndexToUpdate, toggleDelete, newCriteria, newAccess)
        }
      }
    });    
  }

const updateImageStore = (recordToUpdate, indexToUpdate, lastIndexToUpdate, toggleDelete, newCriteria, newAccess) =>
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
          "imageStoreContainer - updateImageStore - No Data so dispatch, Check Criteria"
        );
        setNotify({
          isOpen: true,
          message: "ImageStore update failed! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        if (data.error) {
          console.log(
            "imageStoreContainer - updateImageStore - error returned = " + data.error
          );
          setNotify({
            isOpen: true,
            message: "ImageStore update failed! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else {
          console.log("imageStoreContainer -updateImageStore -  Update Successful!!! data =  " + data); 
          if (toggleDelete)
          {
            console.log("imageStoreContainer - updates notComplete current index = ", indexToUpdate  )
            markItemDeleted(indexToUpdate,recordToUpdate.markDeleted)          
            setNotify({
              isOpen: true,
              message: "ImageStore Toggle Deleted/Undeleted",
              type: "success",
            });
          }
          if (indexToUpdate == lastIndexToUpdate)
          {
            checkCurrentCriteria(newCriteria);
            checkCurrentAccess(newAccess);
            setNotify({
              isOpen: true,
              message: "ImageStore record(s) updated!",
              type: "success",
            });
          }
        }
      };
    });
  }

 const prepareFormValues = (newFormValues) =>
  {
    console.log("ImageStoreConatiner - preparingFormValues with newFormValues = ", newFormValues );
    setFormValues({
      fileNameInternal:  (newFormValues != null && (newFormValues.fileNameInternal != undefined && newFormValues.fileNameInternal != null))  ? newFormValues.fileNameInternal : "",
      fileNameExternal: (newFormValues != null && (newFormValues.fileNameExternal != undefined && newFormValues.fileNameExternal != null))  ? newFormValues.fileNameExternal : "",
      topic: (newFormValues != null && newFormValues.topic)  ? 
              newFormValues.topic : currentCriteria.topic ? currentCriteria.topic : constructPreferences.topic,
      description:  (newFormValues != null && newFormValues.description)  ? newFormValues.description : "",
      myClass: (newFormValues != null && newFormValues.myClass)  ? 
              newFormValues.myClass : currentCriteria.myClass ? currentCriteria.myClass : constructPreferences.myClass,
      category: (newFormValues != null && newFormValues.category)  ? 
              newFormValues.category : currentCriteria.category ? currentCriteria.category : constructPreferences.category,
      subject: (newFormValues != null && newFormValues.subject)  ?  
              newFormValues.subject : currentCriteria.subject ?  currentCriteria.subject : constructPreferences.subject,
      type: (newFormValues != null && newFormValues.type)  ? newFormValues.type : "Component",
      subType: (newFormValues != null && newFormValues.subType)  ? newFormValues.subType : "ImageStore",
      difficultyLevel: (newFormValues != null && newFormValues.difficultyLevel)  ? 
              newFormValues.difficultyLevel : currentCriteria.difficultyLevel ? currentCriteria.difficultyLevel : constructPreferences.difficultyLevel,
      ageRange: (newFormValues != null && newFormValues.ageRange)  ? 
              newFormValues.ageRange : currentCriteria.ageRange ? currentCriteria.ageRange : constructPreferences.ageRange,
      imageBase64:  (newFormValues != null && newFormValues.imageBase64)  ? newFormValues.imageBase64 : "",
      imageBinary:  (newFormValues != null && newFormValues.imageBase64)  ?  Buffer(newFormValues.imageBase64, 'base64') : "",
      image: (newFormValues != null && newFormValues.image)  ? newFormValues.image : "",
      imageType: (newFormValues != null && newFormValues.imageType)  ? newFormValues.imageType : "",
      imageStr: (newFormValues != null && newFormValues.imageType  && newFormValues.imageBase64)  ? ("data:" + newFormValues.imageType + ";base64," + newFormValues.imageBase64): "",
      //let buff = new Buffer(data, 'base64');
      //fs.writeFileSync('stack-abuse-logo-out.png', buff);
      owner_id: (newFormValues != null && newFormValues.owner_id)  ? newFormValues.owner_id : userId,
      group_id: (newFormValues != null && newFormValues.group_id)  ? 
                newFormValues.group_id : currentAccess.group_id ? currentAccess.group_id : constructPreferences.group_id,
      keepPrivate: (newFormValues != null && (newFormValues.keepPrivate != undefined && newFormValues.keepPrivate != null))  ? 
                newFormValues.keepPrivate : currentAccess.keepPrivate ? currentAccess.keepPrivate : constructPreferences.keepPrivate,
      approvedForPublicUse: (newFormValues != null && (newFormValues.approvedForPublicUse != undefined && newFormValues.approvedForPublicUse != null))  ? 
                newFormValues.approvedForPublicUse : currentAccess.approvedForPublicUse ? currentAccess.approvedForPublicUse : false,
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

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    console.log (" imageStoreContainer - useEffect - to populate the groupsUserOwns = ",userData.groupsUserOwns)
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
    console.log("ConstructAssociationContainer - inside useEffect()  ");
    getCurrentImageByMaxUpdateDateAndUserId(
      {
        userId: userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "ConstructAssociationContainer - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "ConstructAssociationContainer - No Data so error is returned data =: ",
            data
          );
          console.log(
            "ConstructAssociationContainer - No Data so error is returned data.error =: ",
            data.error
          );
          setRedirectToSignin(true);
        } else {
          console.log(
            "ConstructAssociationContainer - Right after data is returned data =: ",
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
        "imageStoreContainer - Update Listing whenever the critiera changes, currentCriteria = ",
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
              owner_id: userId,
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
                "ImageStoreImport - No Data so dispatch, Check Criteria"
              );
              setImageStores([]);
              setImageStoresPreFilter([]);
            } else {
              if (data.error) {
                console.log(
                  "imageStoreContainer - error returned = " + data.error
                );
                setImageStores([]);
                setImageStoresPreFilter([]);
              } else if (data.length > 0) {
                console.log(
                  "imageStoreContainer - Update listing by ListByCriteria =  ",
                  data
                );
                const resultArray = data.map(imageStore => ({   topic: imageStore.topic,
                                                                description: imageStore.description,
                                                                owner_id: imageStore.owner_id,
                                                                group_id: imageStore.group_id,
                                                                markDeleted: imageStore.markDeleted,
                                                                _id:imageStore._id,}));
                setImageStores(resultArray);
                setImageStoresPreFilter(resultArray);

              } else {
                setImageStores([]);
                setImageStoresPreFilter([]);
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
                <ConstructLineItemListing 
                selected = {selected}
                setSelected = {setSelected}
                constructLineItems = {imageStores}
                setConstructLineItems = {setImageStores}
                constructLineItemsPreFilter ={imageStoresPreFilter}
                setConstructLineItemsPreFilter ={setImageStoresPreFilter}
                updateConstructLineItem={updateImageStoreLineItem}
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
                okToUpdate={okToUpdate}
                />
            </Grid>
            <Grid item xs={3} >
              {" "}
              <Paper className={classes.paper}>
                {" "}
                <ConstructCriteria 
                  selected = {selected}
                  setSelected = {setSelected}
                  updateConstructLineItem ={updateImageStoreLineItem}
                  constructLineItems = {imageStores}
                  checkCurrentCriteria = {checkCurrentCriteria}
                  okToUpdate={okToUpdate}
                  />
                </Paper>
             </Grid>
             </Grid>
             <Divider/>
             <Grid item xs={12} >
             <Paper className={classes.paper}>
                <ConstructAccess
                  selected = {selected}
                  setSelected = {setSelected}
                  updateConstructLineItem ={updateImageStoreLineItem}
                  constructLineItems = {imageStores}
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
