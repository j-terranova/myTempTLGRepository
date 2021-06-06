import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import auth from "./../../auth/auth-helper";
import { listByCriteria, readById } from "./api-imageStore";

import { useCriteria } from "./../../contexts/CriteriaContext";
import { useAccess } from "./../../contexts/AccessContext";
import ImageSelectionCriteria from "./imageSelectionCriteria"
import ImageSelectionListing from "./imageSelectionListing"
import ImageDisplayCurrent from "./imageDisplayCurrent"

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

export default function ImageSelectionContainer(props) {
  const { setOpenImageSelectionPopup } = props;
  const {formValues} = props;
  const {setFormValues} = props;

  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const currentCriteria = useCriteria();
  const currentAccess = useAccess();
  const [page, setPage] = useState(0);
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const listingTitle = "ImageSelection Listing";
  const [listAllWithoutCriteria, setListAllWithoutCriteria] = useState(false);
   const [
    imageSelectionListing,
    setImageSelectionListing,
  ] = useState([]); 
   const [
    imageSelectionListingPreFilter,
    setImageSelectionListingPreFilter,
  ] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [criteriaValues, setCriteriaValues] = useState({
    myClass: currentCriteria.myClass,
    category: currentCriteria.category,
    subject: currentCriteria.subject,
    difficultyLevel: currentCriteria.difficultyLevel,
    ageRange :currentCriteria.ageRange,
    topic: currentCriteria.topic,
  })

  
  console.log(
    "imageSelectionContainer - right after initiation of formValues = ",
    formValues
  );

   console.log(
    "imageSelectionContainer - right after start of currentCriteria = ",
    currentCriteria
  );
  console.log(
    "imageSelectionContainer - right after start of currentAccess = ",
    currentAccess
  );

  const readSingleImage = (idToRead) => {
    console.log(
      "imageSelectionContainer - readSingleImage ImageSelection #idToRead = ", idToRead );
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
          "imageSelection Container - readSingleImage -readById - No Data Found!!!!"
        );
        recordToUpdate = null;
      } else {
        if (data.status == "error") {
          console.log(
            "imageSelection Container - readSingleImage - Error!!!!", data.error
          );
          recordToUpdate = null;
        } else {
          console.log(
            "imageSelection Container - readSingleImage =  ",
            data
          );
          setFormValues({ ...formValues,
                          imageBase64:  (data != null && data.imageBase64)  ? data.imageBase64 : "",
                          imageBinary:  (data != null && data.imageBase64)  ?  Buffer(data.imageBase64, 'base64') : "",
                          image: (data != null && data.image)  ? data.image : "",
                          imageType: (data != null && data.imageType)  ? data.imageType : "",
                          imageStr: (data != null && data.imageType  && data.imageBase64)  ? ("data:" + data.imageType + ";base64," + data.imageBase64): "",               
                          });
        }
      }
    });    
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    console.log (" constructAssociationContainer - useEffect - to populate the image for currently selected item selected = ",selected)
    readSingleImage(formValues.image_id);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
      console.log(
        "imageSelectionContainer - Update Listing whenever the critiera changes, currentCriteria = ",
        currentCriteria
      );
      if (criteriaValues != undefined && criteriaValues != null )
      {
        if (
          ((criteriaValues.myClass != null &&
            criteriaValues.category != null &&
            criteriaValues.subject != null &&
            criteriaValues.difficultyLevel != null &&
            criteriaValues.ageRange != null &&
            criteriaValues.topic != null) 
          &&
          (
            criteriaValues.myClass.length != 0 ||
            criteriaValues.category.length != 0 ||
            criteriaValues.subject.length != 0 ||
            criteriaValues.difficultyLevel.length != 0 ||
            criteriaValues.ageRange.length != 0 ||
            criteriaValues.topic.length != 0))
          ||
          (listAllWithoutCriteria)
        ) {
          // This prevents an initial query of all records
          // but allows for subsequent requests for all if specifically requested by the user
          setListAllWithoutCriteria(true);
          const myClassVar = criteriaValues.myClass;
          const categoryVar = criteriaValues.category;
          const subjectVar = criteriaValues.subject;
          const difficultyLevelVar = criteriaValues.difficultyLevel;
          const ageRangeVar = criteriaValues.ageRange;
          const topicVar = criteriaValues.topic;

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
                "ImageSelectionImport - No Data so dispatch, Check Criteria"
              );
              setImageSelectionListing([]);
              setImageSelectionListingPreFilter([]);
            } else {
              if (data.error) {
                console.log(
                  "imageSelectionContainer - error returned = " + data.error
                );
                setImageSelectionListing([]);
                setImageSelectionListingPreFilter([]);
              } else if (data.length > 0) {
                console.log(
                  "imageSelectionContainer - Update listing by ListByCriteria =  ",
                  data
                );
                const resultArray = data.map(imageSelection => ({   topic: imageSelection.topic,
                                                                description: imageSelection.description,
                                                                owner_id: imageSelection.owner_id,
                                                                group_id: imageSelection.group_id,
                                                                markDeleted: imageSelection.markDeleted,
                                                                _id:imageSelection._id,}));
                setImageSelectionListing(resultArray);
                setImageSelectionListingPreFilter(resultArray);

              } else {
                setImageSelectionListing([]);
                setImageSelectionListingPreFilter([]);
              }
            }
          });
          setPage(0);
        }
      }
    return function cleanup() {
      abortController.abort();
    };
  }, [criteriaValues]);

  return (
    <>
    <div className={classes.root}>
    <Grid container spacing={0} justify="center" className={classes.container} > 
    <ImageDisplayCurrent
      formValues= {formValues}
      />
    <Paper className={classes.paper}>
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
            <Grid item xs={9} >             
                <ImageSelectionListing 
                selected = {selected}
                setSelected = {setSelected}
                imageSelectionListing = {imageSelectionListing}
                setImageSelectionListing = {setImageSelectionListing}
                imageSelectionListingPreFilter ={imageSelectionListingPreFilter}
                readById={ readById }
                page = { page}
                setPage = { setPage}
                listingTitle={listingTitle}
                setOpenImageSelectionPopup={setOpenImageSelectionPopup}
                formValues={formValues}
                setFormValues={setFormValues}
                 />
            </Grid>
            <Grid item xs={3} >
              {" "}
              <Paper className={classes.paper}>
                {" "}
                <ImageSelectionCriteria 
                  criteriaValues = {criteriaValues}
                  setCriteriaValues = {setCriteriaValues}
                  />
                </Paper>
             </Grid>
             </Grid>
     </Paper>
     </Grid>
    </div>
    
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
