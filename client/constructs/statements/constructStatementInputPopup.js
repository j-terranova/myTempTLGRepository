import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import auth from "./../../auth/auth-helper";
import { v4 as uuidv4 } from "uuid";
import { create, update } from "./api-constructStatement.js";
import ConstructStatementForm from "./constructStatementForm";
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

export default function ConstructStatementInputPopup(props) {
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
    "constructStatementContainer - right after initiation of formValues = ",
    formValues
  );

    console.log(
    "constructStatementContainer - right after start of currentCriteria = ",
    currentCriteria
  );
  console.log(
    "constructStatementContainer - right after start of currentAccess = ",
    currentAccess
  );

const addNewConstruct = () =>
{
  console.log("constructLineItemListing - addNewConstruct Beginning !!");
  setFormValues({
    ...formValues,
    constructStatement: "",
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
        constructDetail: newConstructLineItem.constructStatement,
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
        constructDetail: newConstructLineItem.constructStatement,
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
        constructDetail: updatedConstructLineItem.constructStatement,
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
        constructDetail: updatedConstructLineItem.constructStatement,
        markDeleted: updatedConstructLineItem.markDeleted,
        _id: updatedConstructLineItem._id,
      },
      ...constructLineItems.slice(index + 1), // everything after current post
    ]
  )
}

const createNewConstructStatement = () => {
  console.log("ConstructStatementInputPopup - createNewConstructStatement = ");
  const newDate = Date.now();
  console.log(
    "ConstructStatementInputPopup - just before call to create statement formValues = ",
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
      constructStatement: formValues.constructStatement ,
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
        "ConstructStatementInputPopup - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "Statement not created! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "ConstructStatementInputPopup - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "Statement not created! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        console.log("ConstructStatementInputPopup - after create - data = ", data );
        console.log("ConstructStatementInputPopup - after create - data = ", data._id );
        setFormValues({ ...formValues, 
                        _id: data._id, 
                        modified: false, 
                        isError: false,
                        errorMessage: "", });
        addLineItems(data)
        setSelected([]);
        checkCurrentCriteria(data);
        checkCurrentAccess(data);
        console.log("ConstructStatementInputPopup - after create - formValues = ", formValues );
        setNotify({
          isOpen: true,
          message: "Statement Created",
          type: "success",
        });
      }
    }
  }); // End of Create function
};

const updateExistingConstructStatement = (matchingIndex) => {
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
    constructStatement: formValues.constructStatement ,
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
        "ConstructStatementInputPopup - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "Statement not update! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "ConstructStatementInputPopup - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "Statement not update! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {

        console.log("ConstructStatementInputPopup - after create - preparingFormValues with data = ", data );
        console.log("ConstructStatementInputPopup - after create - preparingFormValues with data = ", data._id );
   
        updateLineItem(formValues,matchingIndex)
        checkCurrentCriteria(formValues);
        checkCurrentAccess(formValues);
        setNotify({
          isOpen: true,
          message: "Statement Updated",
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
    "ConstructStatementInputPopup - SaveEntries clicked before create/update formValues = ",
    formValues
  );
  if (
    formValues.topic.length == 0 ||
    formValues.description.length == 0 ||
    formValues.constructStatement.length == 0
  ) {
    setFormValues({
      ...formValues,
      modified: true,
      isError: true,
      errorMessage:
        "Error alert!!! You must have an entry for topic, description and statement before saving!",
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
  console.log("ConstructStatementInputPopup - search for id =  ", formValues._id); 
  const matchingIndex = findMatchingIndex(formValues._id);
  console.log(
    "ConstructStatementInputPopup - after matchingIndex =  " + matchingIndex
  );
  if (matchingIndex >= 0) {
    updateExistingConstructStatement(matchingIndex);
  } else {
    createNewConstructStatement();
  }
  console.log("ConstructStatementInputPopup End of Save Entries !!");
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
    if ('constructStatement' in fieldValues)
        temp.constructStatement = fieldValues.constructStatement ? "" : "This field is required."
    
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
                <ConstructStatementForm 
                      formValues = {formValues}
                      setFormValues = {setFormValues}
                      validate={validate}
                      errors={errors}
                      groupsUserOwns = {groupsUserOwns}
                      addNewConstruct={addNewConstruct}
                      SaveEntries = {SaveEntries}
                      setOpenPopup={setOpenPopup}
                      okToUpdate = {okToUpdate}
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
