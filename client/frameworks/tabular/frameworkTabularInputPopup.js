import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Notification from "../../components/shared/Notification";
import auth from "./../../auth/auth-helper";
import { v4 as uuidv4 } from "uuid";
import { create, update } from "./api-frameworkTabular.js";
import FrameworkTabularForm from "./frameworkTabularForm";
import FrameworkComponentContainer from "./../shared/frameworkComponentContainer";
import { useCriteria } from "./../../contexts/CriteriaContext";
import { useAccess } from "./../../contexts/AccessContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
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
    elevation: "3",
    margin: theme.spacing(0),
  },
}));

export default function FrameworkTabularInputPopup(props) {
  const { formValues,
          setFormValues,
          prepareFormValues,
          setOpenPopup,
          setSelected,
          findMatchingIndex,
          frameworkLineItems,
          setFrameworkLineItems,
          setFrameworkLineItemsPreFilter,
          checkCurrentCriteria,
          checkCurrentAccess,
          groupsUserOwns, 
          okToUpdate,} = props;
    
  const classes = useStyles();
  const currentCriteria = useCriteria();
  const currentAccess = useAccess();
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const [errors, setErrors] = useState({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  console.log(
    "frameworkTabularContainer - right after initiation of formValues = ",
    formValues
  );

    console.log(
    "frameworkTabularContainer - right after start of currentCriteria = ",
    currentCriteria
  );
  console.log(
    "frameworkTabularContainer - right after start of currentAccess = ",
    currentAccess
  );

  const addNewFramework = () =>
  {
    console.log("frameworkLineItemListing - getNewFramework Beginning of addNewFramework !!");
    setFormValues({
      ...formValues,
      includeConstructs: [{
        sequenceNo: 0,
        constructDetail: "",
        type: "Component",
        subType: "",

        constructPrimaryColumn: "KeyWordOrQuestion",
        constructOptionsSource: "SecondaryColumn",
        constructNumberOfOptions: 1,
        constructResponseFormat: "Matching",
        constructColor: "Default",
        constructId: "",

      }],  
      owner_id: userId,
      markDeleted: false,
      createDate: Date.now(),
      updatedBy: userId,
      updateDate: Date.now(),
      _v: 0,
      _id: uuidv4(),
      modified: false,
      isError: false,
      errorMessage: "",
    });    
  }

  const addLineItems = (newFrameworkLineItem) =>
  {
    setFrameworkLineItems(
      [
        ...frameworkLineItems,
        {
          topic: newFrameworkLineItem.topic,
          description: newFrameworkLineItem.description,
          owner_id: newFrameworkLineItem.owner_id,
          group_id: newFrameworkLineItem.group_id,
          frameworkLayoutFormat: newFrameworkLineItem.frameworkLayoutFormat,
          frameworkResponseFormat: newFrameworkLineItem.frameworkResponseFormat,
          frameworkPresentationMethod: newFrameworkLineItem.frameworkPresentationMethod,
          markDeleted: newFrameworkLineItem.markDeleted,
          _id: newFrameworkLineItem._id,
        },
      ]
    )
    
    setFrameworkLineItemsPreFilter (
      [
        ...frameworkLineItems,
        {
          topic: newFrameworkLineItem.topic,
          description: newFrameworkLineItem.description,
          owner_id: newFrameworkLineItem.owner_id,
          group_id: newFrameworkLineItem.group_id,
          frameworkLayoutFormat: newFrameworkLineItem.frameworkLayoutFormat,
          frameworkResponseFormat: newFrameworkLineItem.frameworkResponseFormat,
          frameworkPresentationMethod: newFrameworkLineItem.frameworkPresentationMethod,
          markDeleted: newFrameworkLineItem.markDeleted,
          _id: newFrameworkLineItem._id,
        },
      ]
    )
  }
  
  const updateLineItem = (updatedFrameworkLineItem,index) =>
  {
    setFrameworkLineItems(
      [
        ...frameworkLineItems.slice(0, index), // everything before current post
        {
          ...frameworkLineItems[index],
          topic: updatedFrameworkLineItem.topic,
          description: updatedFrameworkLineItem.description,
          owner_id: updatedFrameworkLineItem.owner_id,
          group_id: updatedFrameworkLineItem.group_id,
          frameworkLayoutFormat: updatedFrameworkLineItem.frameworkLayoutFormat,
          frameworkResponseFormat: updatedFrameworkLineItem.frameworkResponseFormat,
          frameworkPresentationMethod: updatedFrameworkLineItem.frameworkPresentationMethod,
          markDeleted: updatedFrameworkLineItem.markDeleted,
          _id: updatedFrameworkLineItem._id,
        },
        ...frameworkLineItems.slice(index + 1), // everything after current post
      ]
    )
  
    setFrameworkLineItemsPreFilter(
      [
        ...frameworkLineItems.slice(0, index), // everything before current post
        {
          ...frameworkLineItems[index],
          topic: updatedFrameworkLineItem.topic,
          description: updatedFrameworkLineItem.description,
          owner_id: updatedFrameworkLineItem.owner_id,
          group_id: updatedFrameworkLineItem.group_id,
          frameworkLayoutFormat: updatedFrameworkLineItem.frameworkLayoutFormat,
          frameworkResponseFormat: updatedFrameworkLineItem.frameworkResponseFormat,
          frameworkPresentationMethod: updatedFrameworkLineItem.frameworkPresentationMethod,
          markDeleted: updatedFrameworkLineItem.markDeleted,
          _id: updatedFrameworkLineItem._id,
        },
        ...frameworkLineItems.slice(index + 1), // everything after current post
      ]
    )
  }
  
  const cloneCurrentFrameworkTabular = () => {
    console.log("FrameworkTabularForm - cloneCurrentFrameworkTabular = ");
    console.log(
      "FrameworkTabularForm - cloneCurrentFrameworkTabular - just before call to clone tabular formValues = ",
      formValues
    );
    let newTopic = formValues.topic + "-Cloned";
    let clonedFramework =  {
        topic: newTopic,
        description:  formValues.description ,
        myClass: formValues.myClass ,
        category:formValues.category ,
        subject: formValues.subject ,
        type: formValues.type ,
        subType: formValues.subType ,
        difficultyLevel: formValues.difficultyLevel ,
        ageRange: formValues.ageRange ,
        image_id: formValues.image_id ,
        imageFileName: formValues.imageFileName ,
        owner_id: userId,
        group_id: (formValues.owner_id == userId) ? formValues.group_id : "" ,
        keepPrivate: formValues.keepPrivate ? formValues.keepPrivate : false ,
        approvedForPublicUse: formValues.approvedForPublicUse,
        frameworkLayoutFormat: formValues.frameworkLayoutFormat,
        frameworkResponseFormat: formValues.frameworkResponseFormat,
        frameworkPresentationMethod: formValues.frameworkPresentationMethod,
        frameworkSolutionMethod: formValues.frameworkSolutionMethod,
        frameworkIncludeSpeech: formValues.frameworkIncludeSpeech,
        frameworkIncludeTimer: formValues.frameworkIncludeTimer,
        frameworkIncludeScoring: formValues.frameworkIncludeScoring,
        frameworkColor: formValues.frameworkColor,
        includeConstructs: formValues.includeConstructs ,
        markDeleted: false ,
        createDate:  Date.now(),
        updatedBy: userId,
        updateDate:  Date.now(),
    }  
    create(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      clonedFramework
    ).then((data) => {
      if (!data) {
        console.log(
          "FrameworkTabularForm - cloneCurrentFrameworkTabular - No Data so dispatch, Check Criteria"
        );
        setNotify({
          isOpen: true,
          message: "FrameworkTabularForm - cloneCurrentFrameworkTabular - Tabular not created! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        if (data.error) {
          console.log(
            "FrameworkTabularForm - cloneCurrentFrameworkTabular - error returned = " + data.error
          );
          setNotify({
            isOpen: true,
            message: "FrameworkTabularForm - cloneCurrentFrameworkTabular - Tabular not created! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else {
          setFormValues({...formValues,topic: newTopic, _id: data._id});
          addLineItems(data)
          setSelected([]);
          console.log("FrameworkTabularForm - cloneCurrentFrameworkTabular - after create - formValues = ", formValues );
          setNotify({
            isOpen: true,
            message: "Tabular Cloned",
            type: "success",
          });
        }
      }
    }); // End of Create function
  };
  
  const createNewFrameworkTabular = () => {
    console.log("FrameworkTabularForm - createNewFrameworkTabular = ");
    const newDate = Date.now();
    console.log(
      "FrameworkTabularForm - just before call to create tabular formValues = ",
      formValues
    );
    let newFramework =  {
        topic: formValues.topic ,
        description:  formValues.description ,
        myClass: formValues.myClass ,
        category:formValues.category ,
        subject: formValues.subject ,
        type: formValues.type ,
        subType: formValues.subType ,
        difficultyLevel: formValues.difficultyLevel ,
        ageRange: formValues.ageRange ,
        image_id: formValues.image_id ,
        imageFileName: formValues.imageFileName ,
        owner_id: formValues.owner_id ,
        group_id: formValues.group_id ,
        keepPrivate: formValues.keepPrivate ? formValues.keepPrivate : false ,
        approvedForPublicUse: formValues.approvedForPublicUse,
        frameworkLayoutFormat: formValues.frameworkLayoutFormat,
        frameworkResponseFormat: formValues.frameworkResponseFormat,
        frameworkPresentationMethod: formValues.frameworkPresentationMethod,
        frameworkSolutionMethod: formValues.frameworkSolutionMethod,
        frameworkIncludeSpeech: formValues.frameworkIncludeSpeech,
        frameworkIncludeTimer: formValues.frameworkIncludeTimer,
        frameworkIncludeScoring: formValues.frameworkIncludeScoring,
        frameworkColor: formValues.frameworkColor,
        includeConstructs: formValues.includeConstructs ,
        markDeleted: formValues.markDeleted ,
        createDate:  Date.now(),
        updatedBy: formValues.updatedBy,
        updateDate:  Date.now(),
    }  
    create(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      newFramework
    ).then((data) => {
      if (!data) {
        console.log(
          "FrameworkTabularForm - No Data so dispatch, Check Criteria"
        );
        setNotify({
          isOpen: true,
          message: "Tabular not created! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        if (data.error) {
          console.log(
            "FrameworkTabularForm - error returned = " + data.error
          );
          setNotify({
            isOpen: true,
            message: "Tabular not created! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else {
          console.log("FrameworkTabularForm - after create - data = ", data );
          console.log("FrameworkTabularForm - after create - data._id = ", data._id );
          setFormValues({ ...formValues,
                          _id: data._id, 
                          modified: false, 
                          isError: false,
                          errorMessage: "",});

          addLineItems(data)
          setSelected([]);
          checkCurrentCriteria(data);
          checkCurrentAccess(data);
          console.log("FrameworkTabularForm - after create - formValues = ", formValues );
          setNotify({
            isOpen: true,
            message: "Tabular Created",
            type: "success",
          });
        }
      }
    }); // End of Create function
  };
  
  const updateExistingFrameworkTabular = (matchingIndex) => {
    let updatedFramework =  {
      topic: formValues.topic ,
      description:  formValues.description ,
      myClass: formValues.myClass ,
      category:formValues.category ,
      subject: formValues.subject ,
      type: formValues.type ,
      subType: formValues.subType ,
      difficultyLevel: formValues.difficultyLevel ,
      ageRange: formValues.ageRange ,
      image_id: formValues.image_id ,
      imageFileName: formValues.imageFileName ,
      owner_id: formValues.owner_id ,
      group_id: formValues.group_id ,
      keepPrivate: formValues.keepPrivate ,
      approvedForPublicUse: formValues.approvedForPublicUse,
      frameworkLayoutFormat: formValues.frameworkLayoutFormat,
      frameworkResponseFormat: formValues.frameworkResponseFormat,
      frameworkPresentationMethod: formValues.frameworkPresentationMethod,
      frameworkSolutionMethod: formValues.frameworkSolutionMethod,
      frameworkIncludeSpeech: formValues.frameworkIncludeSpeech,
      frameworkIncludeTimer: formValues.frameworkIncludeTimer,
      frameworkIncludeScoring: formValues.frameworkIncludeScoring,
      frameworkColor: formValues.frameworkColor,
      includeConstructs: formValues.includeConstructs ,
      markDeleted: formValues.markDeleted ,
      createDate:  formValues.createDate,
      updatedBy: formValues.updatedBy,
      updateDate:  Date.now(),
      _id: formValues._id,
  }
  update(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      updatedFramework
    ).then((data) => {
      if (!data) {
        console.log(
          "FrameworkTabularForm - No Data so dispatch, Check Criteria"
        );
        setNotify({
          isOpen: true,
          message: "Tabular not update! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        if (data.error) {
          console.log(
            "FrameworkTabularForm - error returned = " + data.error
          );
          setNotify({
            isOpen: true,
            message: "Tabular not update! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else {

          console.log("FrameworkTabularForm - after create - preparingFormValues with data = ", data );
          console.log("FrameworkTabularForm - after create - preparingFormValues with data = ", data._id );
      
          updateLineItem(formValues,matchingIndex)
          checkCurrentCriteria(formValues);
          checkCurrentAccess(formValues);
          setNotify({
            isOpen: true,
            message: "Tabular Updated",
            type: "success",
          });
          setFormValues({
            ...formValues,
            modified: false, 
            isError: false,
            errorMessage: "",
          });
        }
      }
    }); // End of Update function
  };
  
  const SaveEntries = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log(
      "FrameworkTabularForm - SaveEntries clicked before create/update formValues = ",
      formValues
    );
    if (
      formValues.topic.length == 0 ||
      formValues.description.length == 0 ||
      formValues.includeConstructs.length == 0
    ) {
      setFormValues({
        ...formValues,
        modified: true,
        isError: true,
        errorMessage:
          "Error alert!!! You must have an entry for topic, description and tabular before saving!",
      });
      return;
    }
    if (
      formValues.myClass == null ||
      formValues.category == null ||
      formValues.subject == null ||
      formValues.difficultyLevel == null ||
      formValues.ageRange == null ||
      formValues.myClass.length == 0 ||
      formValues.category.length == 0 ||
      formValues.subject.length == 0 ||
      formValues.difficultyLevel.length == 0 ||
      formValues.ageRange.length == 0
    ) {
      setFormValues({
        ...formValues,
        modified: true,
        isError: true,
        errorMessage:
          "Error alert!!! You must have an entry for all criteria entries before saving!",
      });
      return;
    } 
    console.log("FrameworkTabularForm - search for id =  ", formValues._id); 
    const matchingIndex = findMatchingIndex(formValues._id);
    
    if (matchingIndex >= 0) {
      console.log(
        "FrameworkTabularForm - index match found! matchingIndex =  " + matchingIndex
      );
      updateExistingFrameworkTabular(matchingIndex);
    } else {
      console.log(
        "FrameworkTabularForm - index match NOT found! matchingIndex =  " + matchingIndex
      );
      createNewFrameworkTabular();
    }
    console.log("FrameworkTabularForm End of Save Entries !!");
  };
  
  const validate = (fieldValues = formValues) => {
      let temp = { ...errors }
      if ('topic' in fieldValues)
          temp.topic = fieldValues.topic ? "" : "This field is required."
      if ('description' in fieldValues)
          temp.description = fieldValues.description ? "" : "This field is required."
      if ('frameworkLayoutFormat' in fieldValues)
          temp.frameworkLayoutFormat = fieldValues.frameworkLayoutFormat ? "" : "This field is required."
      if ('frameworkResponseFormat' in fieldValues)
          temp.frameworkResponseFormat = fieldValues.frameworkResponseFormat ? "" : "This field is required."
      if ('frameworkPresentationMethod' in fieldValues)
          temp.frameworkPresentationMethod = fieldValues.frameworkPresentationMethod ? "" : "This field is required."
      if ('frameworkSolutionMethod' in fieldValues)
          temp.frameworkSolutionMethod = fieldValues.frameworkSolutionMethod ? "" : "This field is required."
      //if ('frameworkIncludeSpeech' in fieldValues)
      //    temp.frameworkIncludeSpeech = fieldValues.frameworkIncludeSpeech ? "" : "This field is required."
      //if ('frameworkIncludeTimer' in fieldValues)
      //    temp.frameworkIncludeTimer = fieldValues.frameworkIncludeTimer ? "" : "This field is required."
      //if ('frameworkIncludeScoring' in fieldValues)
      //    temp.frameworkIncludeScoring = fieldValues.frameworkIncludeScoring ? "" : "This field is required."
      if ('frameworkColor' in fieldValues)
          temp.frameworkColor = fieldValues.frameworkColor ? "" : "This field is required."
      if ('myClass' in fieldValues)
          temp.myClass = fieldValues.myClass ? "" : "This field is required."
      if ('category' in fieldValues)
          temp.category = fieldValues.category ? "" : "This field is required."
      if ('subject' in fieldValues)
          temp.subject = fieldValues.subject ? "" : "This field is required."
      if ('difficultyLevel' in fieldValues)
          temp.difficultyLevel = fieldValues.difficultyLevel ? "" : "This field is required."
      if ('ageRange' in fieldValues)
          temp.ageRange = fieldValues.ageRange ? "" : "This field is required."
      setErrors({
          ...temp
      })
      if (fieldValues == formValues)
          return Object.values(temp).every(x => x == "")
  }
  
  return (
    <>
    <div className={classes.root}>
    {/*<Paper className={classes.paper}>*/}
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
          <Grid item xs={12} >
              {/*<Paper className={classes.paper}>*/}
              <FrameworkComponentContainer
                    formValues ={formValues}
                    setFormValues = {setFormValues}
                    setOpenPopup = {setOpenPopup}
                    validate={validate}
                    addNewFramework={addNewFramework}
                    prepareFormValues={prepareFormValues}
                    SaveEntries = {SaveEntries}
                    okToUpdate = {okToUpdate}
              />
                {/*</Paper>*/}
             </Grid>
            <Grid item xs={12} > 
            {/*<Paper className={classes.paper}>   */}       
                <FrameworkTabularForm 
                      formValues = {formValues}
                      setFormValues = {setFormValues}
                      cloneCurrentFrameworkTabular = {cloneCurrentFrameworkTabular}
                      validate={validate}
                      errors={errors}
                      groupsUserOwns = {groupsUserOwns}
                />
                {/*</Paper>  */}
            </Grid>
             </Grid>
     {/*</Paper>*/}
    </div>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
