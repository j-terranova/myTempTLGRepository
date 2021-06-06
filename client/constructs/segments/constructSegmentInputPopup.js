import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import auth from "./../../auth/auth-helper";
import { v4 as uuidv4 } from "uuid";
import { create, update } from "./api-constructSegment.js";
import ConstructSegmentForm from "./constructSegmentForm";
import ConstructSegmentEditor from "./constructSegmentEditor";
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

export default function ConstructSegmentInputPopup(props) {
  const { formValues,
    setFormValues,
    setOpenPopup,
    setSelected,
    findMatchingIndex,
    constructLineItems,
    setConstructLineItems,
    setConstructLineItemsPreFilter,
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
    "constructSegmentInputPopup - right after initiation of formValues = ",
    formValues
  );

    console.log(
    "constructSegmentInputPopup - right after start of currentCriteria = ",
    currentCriteria
  );
  console.log(
    "constructSegmentInputPopup - right after start of currentAccess = ",
    currentAccess
  );

const addNewConstruct = () =>
{
  console.log("constructLineItemListing - addNewConstruct Beginning !!");
  setFormValues({
    ...formValues,
    constructSegment: "",
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

const addLineItems = (newConstructLineItem) =>
{
  setConstructLineItems(
    [
      ...constructLineItems,
      {
        topic: newConstructLineItem.topic,
        description: newConstructLineItem.description,
        owner_id: newConstructLineItem.owner_id,
        group_id: newConstructLineItem.group_id,
        constructDetail: "Enhanced Segment",
        markDeleted: newConstructLineItem.markDeleted,
        _id: newConstructLineItem._id,
      },
    ]
  )

  setConstructLineItemsPreFilter (
    [
      ...constructLineItems,
      {
        topic: newConstructLineItem.topic,
        description: newConstructLineItem.description,
        owner_id: newConstructLineItem.owner_id,
        group_id: newConstructLineItem.group_id,
        constructDetail: "Enhanced Segment",
        markDeleted: newConstructLineItem.markDeleted,
        _id: newConstructLineItem._id,
      },
    ]
  )
}

const updateLineItem = (updatedConstructLineItem,index) =>
{
  setConstructLineItems(
    [
      ...constructLineItems.slice(0, index), // everything before current post
      {
        ...constructLineItems[index],
        topic: updatedConstructLineItem.topic,
        description: updatedConstructLineItem.description,
        owner_id: updatedConstructLineItem.owner_id,
        group_id: updatedConstructLineItem.group_id,
        constructDetail: "Enhanced Segment",
        markDeleted: updatedConstructLineItem.markDeleted,
        _id: updatedConstructLineItem._id,
      },
      ...constructLineItems.slice(index + 1), // everything after current post
    ]
  )

  setConstructLineItemsPreFilter(
    [
      ...constructLineItems.slice(0, index), // everything before current post
      {
        ...constructLineItems[index],
        topic: updatedConstructLineItem.topic,
        description: updatedConstructLineItem.description,
        owner_id: updatedConstructLineItem.owner_id,
        group_id: updatedConstructLineItem.group_id,
        constructDetail: "Enhanced Segment",
        markDeleted: updatedConstructLineItem.markDeleted,
        _id: updatedConstructLineItem._id,
      },
      ...constructLineItems.slice(index + 1), // everything after current post
    ]
  )
}

const createNewConstructSegment = () => {
  console.log("ConstructSegmentInputPopup - createNewConstructSegment = ");
  const newDate = Date.now();
  console.log(
    "ConstructSegmentInputPopup - just before call to create association formValues = ",
    formValues
  );
  let newConstruct =  {
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
      approvedForPublicUse: formValues.approvedForPublicUse ,
      constructSegment: formValues.constructSegment ,
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
    newConstruct
  ).then((data) => {
    if (!data) {
      console.log(
        "ConstructSegmentInputPopup - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "Association not created! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "ConstructSegmentInputPopup - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "Association not created! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        console.log("ConstructSegmentInputPopup - after create - Edit, data = ", data );
        console.log("ConstructSegmentInputPopup - after create - Edit, data = ", data._id );
        setFormValues({ ...formValues, 
                        _id: data._id, 
                        modified: false, 
                        isError: false,
                        errorMessage: "", });
        addLineItems(data)
        setSelected([]);
        checkCurrentCriteria(data);
        checkCurrentAccess(data);
        console.log("ConstructSegmentInputPopup - after create - formValues = ", formValues );
        setNotify({
          isOpen: true,
          message: "Association Created",
          type: "success",
        });
      }
    }
  }); // End of Create function
};

const updateExistingConstructSegment = (matchingIndex) => {
  let updatedConstruct =  {
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
    approvedForPublicUse: formValues.approvedForPublicUse ,
    constructSegment: formValues.constructSegment ,
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
    updatedConstruct
  ).then((data) => {
    if (!data) {
      console.log(
        "ConstructSegmentInputPopup - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "Association not update! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "ConstructSegmentInputPopup - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "Association not update! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {

        console.log("ConstructSegmentInputPopup - after create - preparingFormValues with data = ", data );
        console.log("ConstructSegmentInputPopup - after create - preparingFormValues with data = ", data._id );
    
        updateLineItem(formValues,matchingIndex)
        checkCurrentCriteria(formValues);
        checkCurrentAccess(formValues);
        setNotify({
          isOpen: true,
          message: "Association Updated",
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
    "ConstructSegmentInputPopup - SaveEntries clicked before create/update formValues = ",
    formValues
  );
  if (
    formValues.topic.length == 0 ||
    formValues.description.length == 0 ||
    formValues.constructSegment.length == 0
  ) {
    setFormValues({
      ...formValues,
      modified: true,
      isError: true,
      errorMessage:
        "Error alert!!! You must have an entry for topic, description and association before saving!",
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
  console.log("ConstructSegmentInputPopup - search for id =  ", formValues._id); 
  const matchingIndex = findMatchingIndex(formValues._id);
  console.log(
    "ConstructSegmentInputPopup - after matchingIndex =  " + matchingIndex
  );
  if (matchingIndex >= 0) {
    updateExistingConstructSegment(matchingIndex);
  } else {
    createNewConstructSegment();
  }
  console.log("ConstructSegmentInputPopup End of Save Entries !!");
};

const validate = (fieldValues = formValues) => {
    let temp = { ...errors }
    if ('topic' in fieldValues)
        temp.topic = fieldValues.topic ? "" : "This field is required."
    if ('description' in fieldValues)
        temp.description = fieldValues.description ? "" : "This field is required."
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
    <Paper className={classes.paper}>
      <CssBaseline />
          <Grid container spacing={0} justify="center" className={classes.container} >         
          <Grid item xs={12} >
              <Paper className={classes.paper}>
                <ConstructSegmentEditor
                    formValues ={formValues}
                    setFormValues = {setFormValues}
                    validate = {validate}
                    addNewConstruct={addNewConstruct}
                    SaveEntries = {SaveEntries}
                    setOpenPopup={setOpenPopup}
                    okToUpdate = {okToUpdate}
                />
                </Paper>
             </Grid>
            <Grid item xs={12} > 
            <Paper className={classes.paper}>          
                <ConstructSegmentForm 
                      formValues = {formValues}
                      setFormValues = {setFormValues}
                      validate={validate}
                      errors={errors}
                      groupsUserOwns = {groupsUserOwns}
                />
                </Paper>  
            </Grid>
             </Grid>
     </Paper>
    </div>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
