import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import Popup from "../../components/shared/Popup";
import auth from "../../auth/auth-helper";
import LearnerCriteria from "../shared/learnerCriteria";
import LearnerLineItemListing from "../shared/learnerLineItemListing";

import { listEnrolledCoursesInProgress } from "../../enrollment/api-enrollment";
import { listRecentlyViewed } from "../../frameworks/recentlyViewed/api-frameworkRecentlyViewed";
import { listByCriteria  } from "./api-learnerLesson";
import { readById as readLessonById } from "./api-learnerLesson";
import { readRecentlyViewedBySubType } from "../../frameworks/recentlyViewed/api-frameworkRecentlyViewed";

import DisplayPreparerContainer from "../../display/displayPreparerContainer";

import { useCriteria, useCriteriaDispatch } from "../../contexts/CriteriaContext";

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


export default function LearnerLessonContainer() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const currentCriteria = useCriteria();
  const criteriaDispatch = useCriteriaDispatch();
  const [page, setPage] = useState(0);
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const listingTitle = "Lesson Listing";
  const [openDisplayContainerPopup,setOpenDisplayContainerPopup] = useState(false);
  const [displayFramework, setDisplayFramework] = useState({});

  const [
    learnerLineItems,
    setLearnerLineItems,
  ] = useState([]); 
   const [
    learnerLineItemsPreFilter,
    setLearnerLineItemsPreFilter,
  ] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const getEnrolledCourseListing = () => {
    console.log( "learnerLessonContainer - getEnrolledCourseListing" );
    const abortController = new AbortController();
    const signal = abortController.signal;
    listEnrolledCoursesInProgress(  
        { userId: userId, },  
        { student: userId, 
          courseStatus: "InProgress",},
        { t: jwt.token, },
        signal,
      ).then((data) => {
      if (!data) {
        console.log(
          "learnerLessonContainer -getEnrolledCourseListing- No Data so dispatch, Check RecentlyViewed - !data", data
        );
        setLearnerLineItems([]);
        setLearnerLineItemsPreFilter([]);
      } else {
        if (data.error) {
          console.log(
            "learnerLessonContainer -getEnrolledCourseListing- error returned -data.error = " + data.error
          );
          setLearnerLineItems([]);
          setLearnerLineItemsPreFilter([]);
        } else if (data.length > 0) {
          console.log(
            "learnerLessonContainer -getEnrolledCourseListing- data.length > 0 = " + data
          );
          const resultArray = data.map(lineItem => ({  
            topic: lineItem.topic,
            description: lineItem.description,
            role: "Student",
            subType: lineItem.subType,
            lastViewed: "",
            difficultyLevel: "",
            owner_id: lineItem.student,
            group_id: "",
            markDeleted: lineItem.markDeleted,
            frameworkId: lineItem.course,
            recentlyViewedId: "", 
            enrolledId: lineItem._id}));
          setLearnerLineItems(resultArray);
          setLearnerLineItemsPreFilter(resultArray);
        } else {
          console.log(
            "learnerLessonContainer -getEnrolledCourseListing- no error but no data so set to one blank record - dadta = ", data
          );
          setLearnerLineItems([]);
          setLearnerLineItemsPreFilter([]);
        }
      }
    })      
  }

  const handleRequestEnrolled = () => {
    getEnrolledCourseListing();
  }

  const getRecentlyViewedListing = () => {
    console.log( "learnerLessonContainer -getRecentlyViewedListing- Inside handleApplyRecentlyViewed " );
    console.log( "learnerLessonContainer -getRecentlyViewedListing- just before - listFrameworkByRecentlyViewed " );  
    const abortController = new AbortController();
    const signal = abortController.signal;
    listRecentlyViewed(  
        { userId: userId, },  
        { userId: userId,
          subType: "Lesson",
          frameworkStatus: "InProgress", },
        { t: jwt.token, },
        signal,
      ).then((data) => {
      if (!data) {
        console.log(
          "learnerLessonContainer -getRecentlyViewedListing- No Data so dispatch, Check RecentlyViewed - !data", data
        );
        console.log(
          "learnerLessonContainer -getRecentlyViewedListing- no error but no data so set to one blank record - dadta = ", data
        );
        setLearnerLineItems([]);
        setLearnerLineItemsPreFilter([]);
      } else {
        if (data.error) {
          console.log(
            "learnerLessonContainer -getRecentlyViewedListing- error returned -data.error = " + data.error
          );
          console.log(
            "learnerLessonContainer -getRecentlyViewedListing- no error but no data so set to one blank record - dada = ", data
          );
          setLearnerLineItems([]);
          setLearnerLineItemsPreFilter([]);
        } else if (data.length > 0) {
          console.log(
            "learnerLessonContainer -getRecentlyViewedListing- data.length > 0 = " + data
          );
          const resultArray = data.map(lineItem => ({  
            topic: lineItem.topic,
            description: lineItem.description,
            role: "Student",
            subType: lineItem.subType,
            lastViewed: lineItem.lastViewed,
            difficultyLevel: lineItem.difficultyLevel,
            owner_id: lineItem.user_id,
            group_id: lineItem.group_id,
            markDeleted: lineItem.markDeleted,
            frameworkId: lineItem.framework_id,
            recentlyViewedId: lineItem._id, 
            enrolledId: ""}));
          setLearnerLineItems(resultArray);
          setLearnerLineItemsPreFilter(resultArray);
        } else {
          console.log(
            "learnerLessonContainer -getRecentlyViewedListing- no error but no data so set to one blank record - dadta = ", data
          );
          setLearnerLineItems([]);
          setLearnerLineItemsPreFilter([]);
        }
      }
    })      
  }

  const handleRequestRecentlyViewed = () => {
    getRecentlyViewedListing();
  }

  const getListByCriteria = (values) => {   
    console.log(
      "learnerLessonContainer - Update Listing whenever the critiera changes, currentCriteria = ",
      values
    );
    checkCurrentCriteria(values);
    if (values != undefined && values != null )
    {
      if (
        ((values.myClass != null &&
          values.category != null &&
          values.subject != null &&
          values.difficultyLevel != null &&
          values.ageRange != null &&
          values.topic != null) 
        &&
        (
          values.myClass.length != 0 ||
          values.category.length != 0 ||
          values.subject.length != 0 ||
          values.difficultyLevel.length != 0 ||
          values.ageRange.length != 0 ||
          values.topic.length != 0))
        ) {
        const myClassVar = values.myClass;
        const categoryVar = values.category;
        const subjectVar = values.subject;
        const difficultyLevelVar = values.difficultyLevel;
        const ageRangeVar = values.ageRange;
        const topicVar = values.topic;

        const abortController = new AbortController();
        const signal = abortController.signal;

        listByCriteria(
          { userId: userId, },
          {
            myClass: myClassVar,
            category: categoryVar,
            subject: subjectVar,
            difficultyLevel: difficultyLevelVar,
            ageRange: ageRangeVar,
            topic: topicVar,
          },
          {t: jwt.token,
          signal,
        }
        ).then((data) => {
          if (!data) {
            console.log(
              "learnerLessonContainer - getLessonsByCriteriaListing- No Data so dispatch, Check Criteria - !data", data
            );
            console.log(
              "learnerLessonContainer - getLessonsByCriteriaListing- no error but no data so set to one blank record - dadta = ", data
            );
            setLearnerLineItems([]);
            setLearnerLineItemsPreFilter([]);
          } else {
            if (data.error) {
              console.log(
                "learnerLessonContainer - getLessonsByCriteriaListing- error returned -data.error = " + data.error
              );
              console.log(
                "learnerLessonContainer - getLessonsByCriteriaListing- no error but no data so set to one blank record - dadta = ", data
              );
              setLearnerLineItems([]);
              setLearnerLineItemsPreFilter([]);
            } else if (data.length > 0) {
              console.log(
                "learnerLessonContainer - getLessonsByCriteriaListing- error returned -data.length > 0 = " + data
              );
              const resultArray = data.map(lineItem => ({  
                topic: lineItem.topic,
                description: lineItem.description,
                role: "Student",
                subType: lineItem.subType,
                lastViewed: "",
                difficultyLevel: lineItem.difficultyLevel,
                owner_id: lineItem.owner_id,
                group_id: lineItem.group_id,
                markDeleted: lineItem.markDeleted,
                frameworkId: lineItem._id,
                recentlyViewedId: "", 
                enrolledId: ""}));
              setLearnerLineItems(resultArray);
              setLearnerLineItemsPreFilter(resultArray);    
            } else {
              console.log(
                "learnerLessonContainer - getLessonsByCriteriaListing- no error but no data so set to one blank record - dadta = ", data
              );
              setLearnerLineItems([]);
              setLearnerLineItemsPreFilter([]);
            }
          }
        })
      } else{
        setLearnerLineItems([]);
        setLearnerLineItemsPreFilter([]);
      }
    } else {
      setLearnerLineItems([]);
      setLearnerLineItemsPreFilter([]);
    }
  }

  const handleApplyCriteria = (values) => {
    getListByCriteria(values);
    }

  
const updateDisplayFrameworkData = (baseLearnerData,updatedIncludeConstructs,recentlyViewedUpdates) =>{

  setDisplayFramework( 
    {
      userId: userId,
      framework_id: baseLearnerData._id,
      description: baseLearnerData.description,
      topic: baseLearnerData.topic,
      myClass: baseLearnerData.myClass,
      category: baseLearnerData.category,
      subject: baseLearnerData.subject,
      type: baseLearnerData.type,
      subType: (baseLearnerData.subType != undefined  && baseLearnerData.subType != null) ? baseLearnerData.subType : "Lesson",
      difficultyLevel: baseLearnerData.difficultyLevel,
      ageRange: baseLearnerData.ageRange,
      image_id: baseLearnerData.image_id,
      imageFileName: baseLearnerData.imageFileName,
      owner_id: baseLearnerData.owner_id,
      group_id:  baseLearnerData.group_id,
      keepPrivate:  baseLearnerData.keepPrivate,
      approvedForPublicUse: baseLearnerData.approvedForPublicUse,
      frameworkLayoutFormat: baseLearnerData.frameworkLayoutFormat,
      frameworkResponseFormat: baseLearnerData.frameworkResponseFormat,
      frameworkPresentationMethod: baseLearnerData.frameworkPresentationMethod,
      frameworkSolutionMethod: baseLearnerData.frameworkSolutionMethod,
      frameworkIncludeSpeech: baseLearnerData.frameworkIncludeSpeech,
      frameworkIncludeTimer: baseLearnerData.frameworkIncludeTimer,
      frameworkIncludeScoring: baseLearnerData.frameworkIncludeScoring,
      frameworkColor: baseLearnerData.frameworkColor,
      includeConstructs: (updatedIncludeConstructs != undefined && updatedIncludeConstructs != null) ? updatedIncludeConstructs : [],
      markDeleted: baseLearnerData.markDeleted,
      createDate: baseLearnerData.createDate,
      updatedBy: baseLearnerData.updatedBy,          
      frameworkStatus:(recentlyViewedUpdates != undefined && recentlyViewedUpdates != null) ?  recentlyViewedUpdates.frameworkStatus: "InProgress",
      numberCorrect: (recentlyViewedUpdates != undefined && recentlyViewedUpdates != null) ?  recentlyViewedUpdates.numberCorrect : 0,
      numberInTest: (recentlyViewedUpdates != undefined && recentlyViewedUpdates != null) ?  recentlyViewedUpdates.numberInTest : 0,
      scale: (recentlyViewedUpdates != undefined && recentlyViewedUpdates != null) ?  recentlyViewedUpdates.scale : 0,
      startDate: (recentlyViewedUpdates != undefined && recentlyViewedUpdates != null) ?  recentlyViewedUpdates.startDate : Date.now(),
      completedDate: (recentlyViewedUpdates != undefined && recentlyViewedUpdates != null) ?  recentlyViewedUpdates.completedDate : Date.now(),
      updateDate: (recentlyViewedUpdates != undefined && recentlyViewedUpdates != null) ?  recentlyViewedUpdates.updateDate : Date.now(),
      recentlyViewed_id:  (recentlyViewedUpdates != undefined && recentlyViewedUpdates != null) ?  recentlyViewedUpdates._id : "",
      modified: false,
    });

}
    
const getMatchingRecentlyViewed = (frameworkId, lessonData) => {
  console.log("learnerLessonContainer - getMatchingRecentlyViewed - Start, just before getRecentlyViewedLearning " );

  console.log("learnerLessonContainer - getMatchingRecentlyViewed - frameworkId ",frameworkId );
  console.log("learnerLessonContainer - getMatchingRecentlyViewed - lessonData ",lessonData );
  const abortController = new AbortController();
  const signal = abortController.signal;
  readRecentlyViewedBySubType(
    { userId: userId, },
    { userId: userId, 
      framework_id: frameworkId,
      subType: "Lesson",
      frameworkStatus: "InProgress"},
    { t: jwt.token,},
    signal,
    ).then((data) => {
      if (data != null && data.error) {
        console.log(
          "learnerLessonContainer - getMatchingRecentlyViewed - error returned -data.error = " + data.error
        );
      } else if (data) {
        console.log(
          "learnerLessonContainer - getMatchingRecentlyViewed -data.length > 0 = " + data
        );       
        let newIncludeConstructs = [];
        const learnerRecentlyViewedFramework = data;
        console.log("learnerLessonContainer - getMatchingRecentlyViewed - learnerRecentlyViewedFramework ",learnerRecentlyViewedFramework );
        console.log("learnerLessonContainer - getMatchingRecentlyViewed - learnerRecentlyViewedFramework.includeConstructs ",learnerRecentlyViewedFramework.includeConstructs );
        console.log("learnerLessonContainer - getMatchingRecentlyViewed - data ",lessonData );
        console.log("learnerLessonContainer - getMatchingRecentlyViewed.includeConstructs - data ",lessonData.includeConstructs );

        if (lessonData.includeConstructs.length === learnerRecentlyViewedFramework.includeConstructs.length)
        {
          for (let i = 0; i<learnerRecentlyViewedFramework.includeConstructs.length; i++)
          {
            console.log("learnerLessonContainer - Inside For loop to add learnerRecentlyViewedFramework.includeConstructs! ");
            let newComponent = {}
            if ((lessonData.includeConstructs[i].sequenceNo === learnerRecentlyViewedFramework.includeConstructs[i].sequenceNo) && 
            ( lessonData.includeConstructs[i].constructId === learnerRecentlyViewedFramework.includeConstructs[i].constructId))
            {
              console.log("learnerLessonContainer -getMatchingRecentlyViewed- Sequence No and Construct Ids match! ",learnerRecentlyViewedFramework.includeConstructs[i].sequenceNo);
              newComponent = 
              { sequenceNo: learnerRecentlyViewedFramework.includeConstructs[i].sequenceNo,
                constructDetail: lessonData.includeConstructs[i].constructDetail,
                type: learnerRecentlyViewedFramework.includeConstructs[i].type,
                subType: learnerRecentlyViewedFramework.includeConstructs[i].subType,               
                constructPrimaryColumn: learnerRecentlyViewedFramework.includeConstructs[i].constructPrimaryColumn,
                constructOptionsSource: learnerRecentlyViewedFramework.includeConstructs[i].constructOptionsSource,
                constructNumberOfOptions: learnerRecentlyViewedFramework.includeConstructs[i].constructNumberOfOptions,
                constructResponseFormat: learnerRecentlyViewedFramework.includeConstructs[i].constructResponseFormat,
                constructColor: learnerRecentlyViewedFramework.includeConstructs[i].constructColor,
                optionChoices: [],
                correctResponses:learnerRecentlyViewedFramework.includeConstructs[i].correctResponses,
                selectedValues: learnerRecentlyViewedFramework.includeConstructs[i].selectedValues,
                responseStatus: learnerRecentlyViewedFramework.includeConstructs[i].responseStatus,
                constructId: learnerRecentlyViewedFramework.includeConstructs[i].constructId,
                };
             
            } else
            {
              console.log("learnerLessonContainer -getMatchingRecentlyViewed- Sequence No and Construct Ids DO NOT MATCH! ",learnerRecentlyViewedFramework.includeConstructs[i].sequenceNo);
              newComponent = 
              { sequenceNo: learnerRecentlyViewedFramework.includeConstructs[i].sequenceNo,
                constructDetail: "",
                type: learnerRecentlyViewedFramework.includeConstructs[i].type,
                subType: learnerRecentlyViewedFramework.includeConstructs[i].subType,               
                constructPrimaryColumn: learnerRecentlyViewedFramework.includeConstructs[i].constructPrimaryColumn,
                constructOptionsSource: learnerRecentlyViewedFramework.includeConstructs[i].constructOptionsSource,
                constructNumberOfOptions: learnerRecentlyViewedFramework.includeConstructs[i].constructNumberOfOptions,
                constructResponseFormat: learnerRecentlyViewedFramework.includeConstructs[i].constructResponseFormat,
                constructColor: learnerRecentlyViewedFramework.includeConstructs[i].constructColor,
                optionChoices: [],
                correctResponses:learnerRecentlyViewedFramework.includeConstructs[i].correctResponses,
                selectedValues: learnerRecentlyViewedFramework.includeConstructs[i].selectedValues,
                responseStatus: learnerRecentlyViewedFramework.includeConstructs[i].responseStatus,
                constructId: learnerRecentlyViewedFramework.includeConstructs[i].constructId,               
              };
            }
            newIncludeConstructs.push(newComponent);
          }
          updateDisplayFrameworkData(lessonData,newIncludeConstructs,learnerRecentlyViewedFramework)
        } else
        {
        console.log("learnerLessonContainer -getMatchingRecentlyViewed- lengths DO NOT MATCH! ",learnerRecentlyViewedFramework.includeConstructs.length );
        for (let i = 0; i<lessonData.includeConstructs.length; i++)
        {
            newComponent = 
            { sequenceNo: lessonData.includeConstructs[i].sequenceNo,
              constructDetail: lessonData.includeConstructs[i].constructDetail,
              type: lessonData.includeConstructs[i].type,
              subType: lessonData.includeConstructs[i].subType,
              constructPrimaryColumn: lessonData.includeConstructs[i].constructPrimaryColumn,
              constructOptionsSource: lessonData.includeConstructs[i].constructOptionsSource,
              constructNumberOfOptions: lessonData.includeConstructs[i].constructNumberOfOptions,
              constructResponseFormat: lessonData.includeConstructs[i].constructResponseFormat,
              constructColor: lessonData.includeConstructs[i].constructColor,
              optionChoices: [],
              correctResponses: "",
              selectedValues:  "",
              responseStatus: "",
              constructId: lessonData.includeConstructs[i].constructId,
              };
              newIncludeConstructs.push(newComponent);
        }  
      }

      updateDisplayFrameworkData(lessonData,newIncludeConstructs,learnerRecentlyViewedFramework)              
      } else {
        console.log(
          "learnerLessonContainer - getMatchingRecentlyViewed - no error but no data so set to one blank record - data = ", data
        );
        let newIncludeConstructs = [];
        let newComponent = {};
        for (let i = 0; i<lessonData.includeConstructs.length; i++)
        {
            newComponent = 
            { sequenceNo: lessonData.includeConstructs[i].sequenceNo,
              constructDetail: lessonData.includeConstructs[i].constructDetail,
              type: lessonData.includeConstructs[i].type,
              subType: lessonData.includeConstructs[i].subType,
              constructPrimaryColumn: lessonData.includeConstructs[i].constructPrimaryColumn,
              constructOptionsSource: lessonData.includeConstructs[i].constructOptionsSource,
              constructNumberOfOptions: lessonData.includeConstructs[i].constructNumberOfOptions,
              constructResponseFormat: lessonData.includeConstructs[i].constructResponseFormat,
              constructColor: lessonData.includeConstructs[i].constructColor,
              optionChoices: [],
              correctResponses: "",
              selectedValues:  "",
              responseStatus: "",
              constructId: lessonData.includeConstructs[i].constructId,
              };
              newIncludeConstructs.push(newComponent);
        } 
        updateDisplayFrameworkData(lessonData,newIncludeConstructs,null)  
      }
  })
}
const getSelectedLearning = (frameworkId) =>
{
  const abortController = new AbortController();
  const signal = abortController.signal;
  readLessonById(
      { userId: userId, },
      { id: frameworkId},  //frameworkId = selected[0]
      {
        t: jwt.token,
      },
      signal,
    ).then((data) => {
        if (!data) {
          console.log(
            "learnerCriteriaFrameworkContainer - getSelectedLearning - no error but no data so set to one blank record - data = ", data
          );
          setNotify({
            isOpen: true,
            message: "Record NOT available! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else {
          if (data.error) {
            console.log(
              "learnerCriteriaFrameworkContainer - getSelectedLearning - error returned -data.error = " + data.error
            );
            setNotify({
              isOpen: true,
              message: "Record NOT available! Please try again.. Notify Administrator if problem persists.",
              type: "error",
            });
          } else if (data) {
            console.log(
              "learnerCriteriaFrameworkContainer - getSelectedLearning -data.length > 0 = " + data
            );
            getMatchingRecentlyViewed(frameworkId, data);
              
          } else {
            console.log(
              "learnerCriteriaFrameworkContainer - getSelectedLearning - no error but no data so set to one blank record - dadta = ", data
            );
          }
        }
      })
}

  const handleSelectedLearning = () => {
    console.log("learnerLessonContainer - handleSelectedLearning - Start, just before getSelectedLearning - selected[0] =", selected[0] );
    getSelectedLearning(selected[0]);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listRecentlyViewed(
      { userId: userId, },
      { userId: userId,
        subType: "Lesson",
        frameworkStatus: "InProgress", },
      {t: jwt.token,},
      signal,
      ).then((data) => {
          if (!data) {
            console.log(
              "LearnerLessonContainer-useEffect-listRecentlyViewed - No Data "
            );
            getEnrolledCourseListing();
          } else {
            if (data.error) {
              console.log(
                "LearnerLessonContainer-useEffect-listRecentlyViewed  - error returned = " + data.error
              );
              getEnrolledCourseListing();
            } else if (data.length > 0) {
              console.log(
                "LearnerLessonContainer-useEffect-listRecentlyViewed  - data =  ",
                data
              );
              const resultArray = data.map(lineItem => ({  
                topic: lineItem.topic,
                description: lineItem.description,
                role: "Student",
                subType: lineItem.subType,
                lastViewed: lineItem.lastViewed,
                difficultyLevel: lineItem.difficultyLevel,
                owner_id: lineItem.user_id,
                group_id: lineItem.group_id,
                markDeleted: lineItem.markDeleted,
                frameworkId: lineItem.framework_id,
                recentlyViewedId: lineItem._id, 
                enrolledId: ""}));
                setLearnerLineItems(resultArray);
                setLearnerLineItemsPreFilter(resultArray);
            }
          }
      })
      setPage(0);
      return function cleanup() {
      abortController.abort();
    };
  },[]);


  useEffect(() => {
    console.log(
      "LearnerContainer - change to displayFramework = ", displayFramework );     
      if (displayFramework != null && displayFramework.includeConstructs != undefined )
      {
        console.log(
          "LearnerContainer - right before running of checkForFrameworkWithUserRunStatus "); 
        setOpenDisplayContainerPopup(true) 
      } else
      {
        console.log(
          "LearnerContainer - skips running of checkForFrameworkWithUserRunStatus displayFramework.includeConstructs = ",displayFramework.includeConstructs); 
      }        
  }, [displayFramework]);

  console.log(
    "learnerLessonContainer - right after start of currentCriteria = ",
    currentCriteria
  );

  const checkCurrentCriteria = (valuesToCheck) =>
  {
    console.log(
      "learnerLessonContainer - checkCurrentCriteria = ",
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
          "learnerLessonContainer - checkCurrentCriteria - Criteria found to have changed, valuesToCheck = ",
          valuesToCheck
        );
        criteriaDispatch({
          type: "SET_CRITERIAFROMCURRENTITEM",
          currentSourceOfCriteria: valuesToCheck,
        });
      }
      else{
        console.log(
          "learnerLessonContainer - checkCurrentCriteria - Criteria did not change" );
      }
    }      else{
      console.log(
        "learnerLessonContainer - checkCurrentCriteria - Criteria did not change" );
    }
  }
 
  return (
    <>
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
            <Grid item xs={9} >             
                <LearnerLineItemListing 
                selected = {selected}
                setSelected = {setSelected}
                learnerLineItems = {learnerLineItems}
                setLearnerLineItems = {setLearnerLineItems}
                learnerLineItemsPreFilter ={learnerLineItemsPreFilter}
                handleRequestEnrolled ={handleRequestEnrolled}
                handleRequestRecentlyViewed ={handleRequestRecentlyViewed}
                handleSelectedLearning = {handleSelectedLearning}
                page = { page}
                setPage = { setPage}
                listingTitle={listingTitle}
                />
            </Grid>
            <Grid item xs={3} >
              {" "}
              <Paper className={classes.paper}>
                {" "}
                <LearnerCriteria 
                  handleApplyCriteria={handleApplyCriteria}
                  />
                </Paper>
             </Grid>
             </Grid>
     </Paper>
    </div>
    <Popup
          title="Learner Lesson"
          openPopup={openDisplayContainerPopup}
          setOpenPopup={setOpenDisplayContainerPopup}
          formValues = {displayFramework}
          setFormValues = {setDisplayFramework}
      >
          <DisplayPreparerContainer
              setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
              displayFramework = {displayFramework}
              setDisplayFramework={setDisplayFramework}
          />
      </Popup>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

