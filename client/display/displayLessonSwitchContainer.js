import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {DisplayCarouselContainer} from "./displayCarouselContainer";
import Notification from "../components/shared/Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function DisplayLessonSwitchContainer(props) {
  const { 
    setOpenDisplayContainerPopup,
    displayFramework,
    setDisplayFramework,
    finalDisplayConstructs,
    setFinalDisplayConstructs,
    numberOfConstructs,
    okToChange,
    setOkToChange,
    completed,} = props;

    const classes = useStyles();
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });


  console.log( "DisplayLessonSwitchContainer  displayFramework = ", displayFramework );

  console.log("DisplayLessonSwitchContainer - start - displayFramework = ", displayFramework );
  console.log("DisplayLessonSwitchContainer - start - finalDisplayConstructs = ", finalDisplayConstructs );


//----------------------------------------------------
  return (
    <div>
        {(displayFramework.frameworkLayoutFormat === "Carousel") && 
        ( finalDisplayConstructs.length === numberOfConstructs) && 
            <DisplayCarouselContainer
              setOpenDisplayContainerPopup={setOpenDisplayContainerPopup}
              displayFramework ={displayFramework}
              setDisplayFramework = {setDisplayFramework}
              finalDisplayConstructs = {finalDisplayConstructs}
              setFinalDisplayConstructs = {setFinalDisplayConstructs}
              numberOfConstructs  ={numberOfConstructs}
              okToChange = {okToChange}
              setOkToChange= {setOkToChange}
              completed= {completed}
              />} 
        <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
