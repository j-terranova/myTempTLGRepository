import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Notification from "../../components/shared/Notification";
import auth from "./../../auth/auth-helper";
import { v4 as uuidv4 } from "uuid";
import { create, update } from "./api-imageStore.js";
import ImageStoreForm from "./imageStoreForm";
import ImageStoreEditor from "./imageStoreEditor";
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

export default function ImageStoreInputPopup(props) {
  const { formValues,
    setFormValues,
    setOpenPopup,
    setSelected,
    findMatchingIndex,
    constructLineItems,
    setConstructLineItems,
    setConstructLineItemsPreFilter,
    prepareFormValues,
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

const addNewImageStore = () =>
{
  console.log("imageStoreLineItemListing - addNewImageStore Beginning !!");
  setFormValues({
    ...formValues,
    fileNameInternal: "",
    fileNameExternal: "",
    owner_id: userId,
    imageBase64:  "",
    imageBinary:  "",
    image: "",
    imageType: "",
    imageStr: "",
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

const addLineItems = (newImageStoreLineItem) =>
{
  setConstructLineItems(
    [
      ...constructLineItems,
      {
        topic: newImageStoreLineItem.topic,
        description: newImageStoreLineItem.description,
        owner_id: newImageStoreLineItem.owner_id,
        group_id: newImageStoreLineItem.group_id,
        markDeleted: newImageStoreLineItem.markDeleted,
        _id: newImageStoreLineItem._id,
      },
    ]
  )

  setConstructLineItemsPreFilter (
    [
      ...constructLineItems,
      {
        topic: newImageStoreLineItem.topic,
        description: newImageStoreLineItem.description,
        owner_id: newImageStoreLineItem.owner_id,
        group_id: newImageStoreLineItem.group_id,
        markDeleted: newImageStoreLineItem.markDeleted,
        _id: newImageStoreLineItem._id,
      },
    ]
  )
}

const updateLineItem = (updatedImageStoreLineItem,index) =>
{
  setConstructLineItems(
    [
      ...constructLineItems.slice(0, index), // everything before current post
      {
        ...constructLineItems[index],
        topic: updatedImageStoreLineItem.topic,
        description: updatedImageStoreLineItem.description,
        owner_id: updatedImageStoreLineItem.owner_id,
        group_id: updatedImageStoreLineItem.group_id,
        markDeleted: updatedImageStoreLineItem.markDeleted,
        _id: updatedImageStoreLineItem._id,
      },
      ...constructLineItems.slice(index + 1), // everything after current post
    ]
  )

  setConstructLineItemsPreFilter(
    [
      ...constructLineItems.slice(0, index), // everything before current post
      {
        ...constructLineItems[index],
        topic: updatedImageStoreLineItem.topic,
        description: updatedImageStoreLineItem.description,
        owner_id: updatedImageStoreLineItem.owner_id,
        group_id: updatedImageStoreLineItem.group_id,
        markDeleted: updatedImageStoreLineItem.markDeleted,
        _id: updatedImageStoreLineItem._id,
      },
      ...constructLineItems.slice(index + 1), // everything after current post
    ]
  )
}

const createNewImageStore = (imageStoreData) => {
  console.log("ImageStoreInputPopup - createNewImageStore = ");
  console.log(
    "ImageStoreInputPopup - just before call to create imageStore formValues = ",
    formValues
  );

   create(
    {
      userId: userId,
    },
    {
      t: jwt.token,
    },
    imageStoreData
  ).then((data) => {
    if (!data) {
      console.log(
        "ImageStoreInputPopup - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "ImageStore not created! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "ImageStoreInputPopup - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "ImageStore not created! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        console.log("ImageStoreInputPopup - after create Edit, data = ", data );
        console.log("ImageStoreInputPopup - after create Edit, data._id = ", data._id );
        //setFormValues({ ...formValues, 
        //                _id: data._id,
        //                modified: false, 
        //                isError: false,
        //                errorMessage: "", });
        if (!data.group_id)
        {
          formValues.group_id ? data.group_id = formValues.group_id : data.group_id = "";
        }
        prepareFormValues(data);
        addLineItems(data)
        setSelected([]);
        checkCurrentCriteria(data);
        checkCurrentAccess(data);
        console.log("ImageStoreInputPopup - after create - formValues = ", formValues );
        setNotify({
          isOpen: true,
          message: "ImageStore Created",
          type: "success",
        });
      }
    }
  }); // End of Create function
};

const updateExistingImageStore = (matchingIndex,imageStoreData) => {

update(
    {
      userId: userId,
    },
    {
      t: jwt.token,
    },
    imageStoreData
  ).then((data) => {
    if (!data) {
      console.log(
        "ImageStoreInputPopup - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "ImageStore not update! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "ImageStoreInputPopup - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "ImageStore not update! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {

        console.log("ImageStoreInputPopup - after create - preparingFormValues with data = ", data );
        console.log("ImageStoreInputPopup - after create - preparingFormValues with data = ", data._id );
    
        updateLineItem(formValues,matchingIndex)
        checkCurrentCriteria(formValues);
        checkCurrentAccess(formValues);
        setNotify({
          isOpen: true,
          message: "ImageStore Updated",
          type: "success",
        });
        prepareFormValues(data);
        //setFormValues({
        //  ...formValues,
        //  modified: false, 
        //  isError: false,
        //  errorMessage: "",
        //});
    
      }
    }
  }); // End of Update function
};

const SaveEntries = () => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log(
    "ImageStoreInputPopup - SaveEntries clicked before create/update formValues = ",
    formValues
  );
  if (
    formValues.topic.length == 0 ||
    formValues.description.length == 0 

  ) {
    setFormValues({
      ...formValues,
      modified: true,
      isError: true,
      errorMessage:
        "Error alert!!! You must have an entry for topic, description and imageStore before saving!",
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

  setFormValues({
    ...formValues,
    isError: false,
    errorMessage: "",
  });
  let imageStoreData = new FormData();

  formValues.fileNameInternal && imageStoreData.append("fileNameInternal", formValues.fileNameInternal);
  formValues.fileNameExternal && imageStoreData.append("fileNameExternal", formValues.fileNameExternal);
  formValues.topic && imageStoreData.append("topic", formValues.topic);
  formValues.description &&
    imageStoreData.append("description", formValues.description);
    formValues.myClass && imageStoreData.append("myClass", formValues.myClass);
  formValues.category &&
    imageStoreData.append("category", formValues.category);
  formValues.subject && imageStoreData.append("subject", formValues.subject);
  formValues.type
  ? imageStoreData.append("type", formValues.type)
  : imageStoreData.append("type", "Component");
formValues.subType
  ? imageStoreData.append("subType", formValues.subType)
  : imageStoreData.append("subType", "ImageStore");
  formValues.difficultyLevel &&
    imageStoreData.append("difficultyLevel", formValues.difficultyLevel);
  formValues.ageRange &&
    imageStoreData.append("ageRange", formValues.ageRange);
  //formValues.imageBase64 ? 
  //imageStoreData.append("image", formValues.imageBase64):
  //imageStoreData.append("", formValues.imageBase64);
  formValues.imageBinary ? 
  imageStoreData.append("image", formValues.imageBinary):
  imageStoreData.append("", formValues.imageBinary);
  formValues.image ? 
  imageStoreData.append("image", formValues.image):
  imageStoreData.append("", formValues.image);
  formValues.imageType ? 
  imageStoreData.append("image", formValues.imageType):
  imageStoreData.append("", formValues.imageType);
  formValues.owner_id
    ? imageStoreData.append("owner_id", formValues.owner_id)
    : imageStoreData.append("owner_id", jwt.user._id);
  formValues.group_id 
    ? imageStoreData.append("group_id", formValues.group_id)
    : imageStoreData.append("group_id", "");
  formValues.keepPrivate &&
    imageStoreData.append(
      "keepPrivate",
      formValues.keepPrivate
    );
  formValues.approvedForPublicUse &&
    imageStoreData.append(
      "approvedForPublicUse",
      formValues.approvedForPublicUse
    );
  formValues.markDeleted
    ? imageStoreData.append("markDeleted", formValues.markDeleted)
    : imageStoreData.append("markDeleted", false);
    // Check to ensure that create date and update consistent
  const todayDate = Date.now();
  formValues.createDate && imageStoreData.append("createDate", todayDate);
  formValues.updatedBy
    ? imageStoreData.append("updatedBy", formValues.updatedBy)
    : imageStoreData.append("updatedBy", jwt.user._id);

  formValues.updatedDate && imageStoreData.append("updatedDate", todayDate);

  console.log("ImageStoreInputPopup - search for id =  ", formValues._id); 
  const matchingIndex = findMatchingIndex(formValues._id);
  console.log(
    "ImageStoreInputPopup - after matchingIndex =  " + matchingIndex
  );
  if (matchingIndex >= 0) {
        // Check to ensure that create date and update consistent
    formValues.createDate
    ? imageStoreData.append("createDate", formValues.createDate)
    : imageStoreData.append("createDate", todayDate);
    formValues._v && imageStoreData.append("_v", formValues._v);
    formValues._id && imageStoreData.append("_id", formValues._id);
    updateExistingImageStore(matchingIndex,imageStoreData);
  } else {
    createNewImageStore(imageStoreData);
  }
  console.log("ImageStoreInputPopup End of Save Entries !!");
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
                <ImageStoreEditor
                    formValues ={formValues}
                    setFormValues = {setFormValues}
                    validate={validate}
                    addNewImageStore={addNewImageStore}
                    SaveEntries = {SaveEntries}
                    setOpenPopup={setOpenPopup}
                    okToUpdate = {okToUpdate}
                />
                </Paper>
             </Grid>
            <Grid item xs={12} > 
            <Paper className={classes.paper}>          
                <ImageStoreForm 
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
