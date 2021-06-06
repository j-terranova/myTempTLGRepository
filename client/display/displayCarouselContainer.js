import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {DisplayConstructSwitch} from "./displayConstructSwitch";
import {create, update} from "../frameworks/recentlyViewed/api-frameworkRecentlyViewed"
import {Redirect} from 'react-router-dom'

import auth from "../auth/auth-helper";
import ConfirmDialog from "./../components/shared/ConfirmDialog";
import Notification from "../components/shared/Notification";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: theme.spacing(3),
    width: "100%",
    height: "100%",
 
    margin: "0 auto"
  }),
  questionMeta:{
    marginLeft: 10,
    display: "inline"
  },
  footer:{
    marginTop: "40px",
    marginBottom: "40px",
  }
}));

export const DisplayCarouselContainer = (props) => {
    const { setOpenDisplayContainerPopup,
            displayFramework,
            setDisplayFramework,
            finalDisplayConstructs,
            setFinalDisplayConstructs,
            numberOfConstructs,
            okToChange,
            setOkToChange,
            completed, } = props;

const classes = useStyles();
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
    });

    const [current, setCurrent] = useState(0);
    const [moveRight, setMoveRight] = useState(true);
    const [moveLeft, setMoveLeft] = useState(false);
    
    const jwt = auth.isAuthenticated();
    const userId = jwt.user._id;

    console.log("DisplayCarouselContainer - start - displayFramework = ", displayFramework );
    console.log("DisplayCarouselContainer - start - finalDisplayConstructs = ", finalDisplayConstructs );
    console.log("DisplayCarouselContainer - start - current = ", current );
    console.log("DisplayCarouselContainer - start - finalDisplayConstructs[current] = ", finalDisplayConstructs[current] );
    console.log("DisplayCarouselContainer - start - moveRight = ", moveRight );
    console.log("DisplayCarouselContainer - start - moveLeft = ", moveLeft );

    const saveResults = (isCompleted) => {
      console.log("DisplayFinalPrepContainer - Add Save Results here " );
      let listOfconstructs = [];
      let cntTotal = 0;
      let cntCorrect = 0;
      let respStatus = "";
      let frameworkStatus = "InProgress";
      let checkCompletedStatus = isCompleted;
  
      if (isCompleted === null)
      {
        checkCompletedStatus = checkIfCompleted();
      }
  
      if (checkCompletedStatus)
      {
        frameworkStatus = "Completed";
      }
      setCompleted(checkCompletedStatus);
  
        for (let i = 0; i < finalDisplayConstructs.length; i++)
        {
  
          console.log("DisplayFinalPrepContainer - start - displayFramework = ", displayFramework );
          console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where index finalDisplayConstructs ", finalDisplayConstructs );
          console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where index finalDisplayConstructs[i] ", finalDisplayConstructs[i] );
          console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where index finalDisplayConstructs[i].correctResponses ", finalDisplayConstructs[i].correctResponses );
  
          console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where index i ", finalDisplayConstructs[i].selectedValues );
          console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where index i ", finalDisplayConstructs[i].selectedValues[0] );
          console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where index finalDisplayConstructs[i].correctResponses[0] ", finalDisplayConstructs[i].correctResponses[0] );
  
          if  (finalDisplayConstructs[i].correctResponses[0] === finalDisplayConstructs[i].selectedValues[0])
          { 
            console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where respStatus= ", respStatus );
            console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where cntCorrect= ", cntCorrect );
            respStatus = "Correct";
            cntCorrect = cntCorrect + 1;
          }
            else
          { 
            if (finalDisplayConstructs[i].selectedValues[0] != undefined &&
              finalDisplayConstructs[i].selectedValues[0] != null &&
              finalDisplayConstructs[i].selectedValues[0] != "")
            {
              respStatus = "InCorrect"
              console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where respStatus= ", respStatus );
            }else 
            {
              respStatus = "InCorrect"
              console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where respStatus= ", respStatus );
            }
          }
          console.log("DisplayFinalPrepContainer - looping through  finalDisplayConstructs where frameworkStatus= ", frameworkStatus );
  
          let nextConstruct = {
            sequenceNo: finalDisplayConstructs[i].sequenceNo,
            constructDetail: finalDisplayConstructs[i].constructDetail,
            type: finalDisplayConstructs[i].type,
            subType: finalDisplayConstructs[i].subType,
            constructPrimaryColumn: finalDisplayConstructs[i].constructPrimaryColumn,
            constructOptionsSource: finalDisplayConstructs[i].constructOptionsSource,
            constructNumberOfOptions: finalDisplayConstructs[i].constructNumberOfOptions,
            constructResponseFormat: finalDisplayConstructs[i].constructResponseFormat,
            constructColor: finalDisplayConstructs[i].constructColor,
            correctResponses:finalDisplayConstructs[i].correctResponses,
            selectedValues: finalDisplayConstructs[i].selectedValues,
            responseStatus: respStatus,
            constructId: finalDisplayConstructs[i].constructId,
          }
          cntTotal = cntTotal + 1;
          listOfconstructs.push(nextConstruct);
        }
  
        let frameworkRecentlyViewed = {
          userId: userId,
          framework_id: displayFramework.framework_id,
          description: displayFramework.description,
          topic: displayFramework.topic,
          myClass: displayFramework.myClass,
          category:displayFramework.category,
          subject: displayFramework.subject,
          type: displayFramework.type,
          subType: displayFramework.subtype,
          includeConstructs: listOfconstructs,
          frameworkStatus: frameworkStatus,
          numberCorrect: cntCorrect,
          numberInTest: cntTotal,
          scale: displayFramework.scale,
          startDate:displayFramework.startDate,
          completedDate: frameworkStatus==="Completed" ? (displayFramework.completedDate?displayFramework.completedDate:Date.now()):"",
          updateDate: Date.now(),
          
        };
  
        if (  displayFramework.recentlyViewed_id === undefined ||
              displayFramework.recentlyViewed_id === null ||
              displayFramework.recentlyViewed_id === "")
        {
          insertFrameworkRecentlyViewed(frameworkRecentlyViewed);
        } else
        {
          frameworkRecentlyViewed._id =  displayFramework.recentlyViewed_id,
          updateFrameworkRecentlyViewed(frameworkRecentlyViewed);
          setDisplayFramework({...displayFramework, modified: false});
        }
        
      }
  
      const updateFrameworkRecentlyViewed = (frameworkRecentlyViewed) =>
      {
        console.log(
          "DisplayFinalPrepContainer -  updateFrameworkRecentlyViewed just before update - frameworkRecentlyViewed = ", frameworkRecentlyViewed
        );
        update(
          {
            userId: userId,
          },
          {
            t: jwt.token,
          },
          frameworkRecentlyViewed
        ).then((data) => {
          if (!data) {
            console.log(
              "DisplayFinalPrepContainer - No data returned from the FrameworkRecentlyViewed update"
            );
          } else {
            if (data.error) {
              console.log(
                "DisplayFinalPrepContainer - update failed, error returned from the FrameworkRecentlyViewed update = " + data.error
              );
            } else {       
              console.log(
                "DisplayFinalPrepContainer - FrameworkRecentlyViewed update Successful!!!"
              );
     
              setNotify({
                isOpen: true,
                message: "Changes Saved!",
                type: "success",
              });
            }
          }
        }); // End of Update function
      }
  
      const insertFrameworkRecentlyViewed = (frameworkRecentlyViewed) =>
      {
        create(
          {
            userId: userId,
          },
          {
            t: jwt.token,
          },
          frameworkRecentlyViewed
        ).then((data) => {
          if (!data) {
            console.log(
              "DisplayFinalPrepContainer - No data returned from the FrameworkRecentlyViewed create "
            );
          } else {
            if (data.error) {
              console.log(
                "DisplayFinalPrepContainer - DisplayFinalPrepContainer - create failed, error returned from the FrameworkRecentlyViewed create = " + data.error
              );
            } else {
              console.log(
                "DisplayFinalPrepContainer - FrameworkRecentlyViewed Create Successful!!!"
              );
              setDisplayFramework({ ...displayFramework, 
                                    recentlyViewed_id: data._id,
                                    modified: false });
              setNotify({
                isOpen: true,
                message: "Changes Saved!",
                type: "success",
              });
            }
          }
        }); // End of Create function
  
      }
  
      const checkIfCompleted = () => {
        let completed = true;
        for (let i = 0; i < finalDisplayConstructs.length; i++)
        {
          console.log("DisplayFinalPrepContainer - finalDisplayConstructs[i] = ", finalDisplayConstructs[i] );
          console.log("DisplayFinalPrepContainer - finalDisplayConstructs[i].selectedValues = ", finalDisplayConstructs[i].selectedValues );
          console.log("DisplayFinalPrepContainer - finalDisplayConstructs[i].selectedValues[0] = ", finalDisplayConstructs[i].selectedValues[0] );
          if (finalDisplayConstructs[i].selectedValues === "undefined" )
          {
            completed = false;
            break;
          } else if (finalDisplayConstructs[i].selectedValues.length === 0 )
          {
            completed = false;
            break;
          }
        }
        if (completed && displayFramework.frameworkSolutionMethod === "CorrectableEnd")
        {
          setOkToChange(true);
        }
        return completed;
      }

    const goFirst = () => {
      //clearBacks();
      setCurrent(0);
  }
  
  const goLast = () => {
    //clearBacks();
    setCurrent(finalDisplayConstructs.length-1);
  }

    const moveNext = () => {
        //clearBacks();
        setCurrent(current+1);
    }

    const movePrevious = () => {
        //clearBacks();
        setCurrent(current-1);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let active = true;
    
        if (finalDisplayConstructs.length === numberOfConstructs )
        {
            setMoveRight(current+1 < finalDisplayConstructs.length);
            setMoveLeft(current != 0);
        }

        console.log("DisplayCarouselContainer - start - moveRight = ", moveRight );
        console.log("DisplayCarouselContainer - start - moveLeft = ", moveLeft );

        return () => {
          active = false;
          abortController.abort();
        };
    
      }, [current]);

      const markComplete = () => {
        saveResults(true);
      }

    const exit = () => {
      if (!displayFramework.modified)
        {
          setOpenDisplayContainerPopup(false);
        }
      else
        {
          setConfirmDialog({
            isOpen: true,
            title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
            subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
            onConfirm: () => {
              setOpenDisplayContainerPopup(false);
              }
          }); 
        }
      //return (<Redirect to="/learners/Lessons" />);
    }

    const save = () => {
      if (displayFramework.modified)
      {
        saveResults(null);
          setNotify({
            isOpen: true,
            message: "Changes Saved!",
            type: "success",
          });
      } else
      {
        setNotify({
          isOpen: true,
          message: "No changes to save!",
          type: "warning",
        });
      }
    }
 
  return (finalDisplayConstructs.length > 0 && finalDisplayConstructs.length ===numberOfConstructs && current != undefined && current != null)  && (
    <>
    <div >
    <Container maxWidth="lg" className={classes.container}>
    <Grid container spacing={1}>
        <Grid item xs={12} >
      <Paper className={classes.root} elevation={4}>
        <Typography component="p">
          <span className={classes.questionMeta}> Page # {current + 1} / {numberOfConstructs}</span>     

          <Button onClick={exit} variant="contained" color="secondary" style={{float: "right", marginLeft: "50px", marginright: "50px"}}>
              Exit
          </Button>
          <Button onClick={markComplete} variant="contained" color="secondary" style={{float: "right", marginLeft: "50px", marginRight: "50px"}}>
              Mark Complete
          </Button>

        </Typography>

        <hr style={{marginBottom: "60px"}}/>

        {displayFramework.frameworkLayoutFormat === "Trivia" && DisplayConstructSwitch(  
                            finalDisplayConstructs[current],
                            finalDisplayConstructs,
                            setFinalDisplayConstructs,
                            displayFramework,
                            setDisplayFramework,
                            okToChange,
                            setOkToChange,
                            completed,)}

        <div className={classes.footer}>

        {(moveLeft)? ( <Button onClick={movePrevious} variant="contained" color="primary" style={{float: "left", marginLeft: "50px"}}>
                Previous
            </Button>): ( <Button onClick={movePrevious} disabled variant="contained" color="primary"style={{float: "left", marginLeft: "50px"}}>
                Previous
            </Button>)}

            {(moveRight)? (<Button onClick={moveNext} variant="contained" color="primary" style={{float: "left" , marginLeft: "50px"}}>
                Next
            </Button>): (<Button onClick={moveNext} disabled variant="contained" color="primary" style={{float: "left", marginLeft: "50px"}}>
                Next
            </Button>)}        

            <Button onClick={() => {save();}} variant="contained" color="secondary" style={{float: "center", marginLeft: "50px", marginright: "50px"}}>
              Save'n Continue
            </Button> 

            

            <Button onClick={goFirst} variant="contained" color="primary" style={{float: "right",  marginLeft: "50px", marginRight: "50px"}}>
              First
            </Button>
            <Button onClick={goLast} variant="contained" color="primary" style={{float: "right", marginLeft: "50px", marginRight: "50px"}}>  
              Last
            </Button>
        </div>
      </Paper>
      </Grid>
    </Grid>
    </Container>
    </div>
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
    />
  </>
  );}


