import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import Controls from "../../controls/Controls";
import Icon from "@material-ui/core/Icon";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FolderIcon from '@material-ui/icons/Folder';
import InputIcon from '@material-ui/icons/Input';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import { Form } from '../../components/shared/useForm';
import auth from "./../../auth/auth-helper";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "./../../lookupOptions/CriteriaOptions"
  import {
    useConstructSegments,
    useConstructSegmentsDispatch,
  } from "./../../contexts/ConstructSegmentsContext";
  import { useCriteria, useCriteriaDispatch } from "./../../contexts/CriteriaContext";
  import { useAccess, useAccessDispatch } from "./../../contexts/AccessContext";
  import Notification from "../../components/shared/Notification";
  import { create, update, load } from "./api-constructSegment.js";


  const useStyles = makeStyles((theme) => ({
    root: {
      height: "40px",
      width: "120px"
    },
    card: {
      maxWidth: 1000,
      margin: "auto",
      textAlign: "justify",
      marginTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    error: {
      verticalAlign: "middle",
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    longTextField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 800,
    },
    submit: {
      margin: "auto",
      marginBottom: theme.spacing(2),
    },
    input: {
      display: "none",
      padding: "10px 14px",
    },
    filename: {
      marginLeft: "10px",
    },
  }));

export default function ConstructSegmentImport(props) {
const classes = useStyles();
const {setOpenPopup} = props;
const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

const jwt = auth.isAuthenticated();
const userId = jwt.user._id;
const currentCriteria = useCriteria();
const criteriaDispatch = useCriteriaDispatch();
const currentAccess = useAccess();
const accessDispatch = useAccessDispatch();
const constructSegments = useConstructSegments();
const constructSegmentsDispatch = useConstructSegmentsDispatch();

console.log("ConstructSegmentImport" );

const [sourceFile, setSourceFile] = useState();
const [importValues, setImportValues] = useState({
    title:  "",
    description:    "",
    topic:   "",
    myClass:  currentCriteria.myClass,
    category:  currentCriteria.category,
    subject:  currentCriteria.subject,
    type:  "Component",
    subType:  "Segment",
    difficultyLevel:  currentCriteria.difficultyLevel,
    ageRange:  currentCriteria.ageRange,
    image:  "",
    owner_id:  userId,
    //groupsWithAccess: currentConstructSegment.groupsWithAccess,
    allowFriendsReadAccess:  currentAccess.allowFriendsReadAccess,
    allowPublicReadAccess:  currentAccess.allowPublicReadAccess,
    approvedPublicReadAccess: currentAccess.approvedPublicReadAccess,
    constructSegment: "",
    markDeleted:  false,
    createDate:  Date.now(),
    updatedBy:  userId,
    updateDate:  Date.now(),
    _v:  "0",
    _id:  uuidv4(),
    isError: false,
    errorMessage: "",
  });
  
console.log("ConstructSegmentImport - after setImportValues = ",importValues );

const [errors, setErrors] = useState({});
const [validateOnChange, setValidateOnChange] = useState(false);

const handleInputChange = e => {
    const name = e.target.name;
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setImportValues({
        ...importValues,
        [name]: value
    })
    if (validateOnChange)
        validate({ [e.target.name]: value })
}

const handleImportFileChange = e => {
  setSourceFile(e.target.value);
}

const NewEntry = () => {
    console.log("ConstructSegmentImport Beginning of NewEntry !!");
    setImportValues({
      ...importValues,
      description: "",
      constructSegment: "",
      image: "",
      owner_id: userId,
      markDeleted: false,
      createDate: Date.now(),
      updatedBy: userId,
      updateDate: Date.now(),
      _v: 0,
      _id: uuidv4(),
      isError: false,
      errorMessage: "",
    });
    console.log("ConstructSegmentImport - NewEntry started importValues = ",importValues );
  };

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("ConstructSegmentImport - search_id = ", search_id);
    
    for (var i = 0; i < constructSegments.length; i++) {
      console.log(
        "ConstructSegmentListing - constructSegments[i]._id = ",
        constructSegments[i]._id
      );
      
      if (constructSegments[i]._id == search_id) {
        index = i;
        console.log("ConstructSegmentImport - MATCH FOUND!!!  Search Id = ", search_id);
        
        break;
      }
    }
    return index;
  };

  const createNewConstructSegment = (userId, constructSegmentData,addNew) => {
    console.log("ConstructSegmentImport - createNewConstructSegment = ");
    const newDate = Date.now();
    constructSegmentData.append("updatedDate", newDate);
    constructSegmentData.append("updatedDate", newDate);
    console.log(
      "ConstructSegmentImport - just before call to create segment constructSegmentData = ",
      constructSegmentData
    );
    create(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      constructSegmentData
    ).then((data) => {
      if (!data) {
        console.log(
          "ConstructSegmentImport - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "ConstructSegmentImport - error returned = " + data.error
          );
          // Call constructSegmentDispatch
          //setImportValues({ ...importValues, error: data.error });
        } else {
          console.log("ConstructSegmentImport - data =  " + data);
          constructSegmentsDispatch({
            type: "ADD_TOCONSTRUCTSEGMENTS",
            newConstructSegment: data,
          });

          if (addNew)
          {
            NewEntry();
            setAddNew(false);
          }else
          {
            setImportValues( {
              ...importValues,
              createDate: data.createDate,
              updateDate: data.updateDate,
              _v: data._v ,
              _id: data._id ,
              isError: false,
              errorMessage: "",
            })
            setSelected([]);
            checkCurrentCiteria();
            checkCurrentAccess();
          }
          setNotify({
            isOpen: true,
            message: "Segment Created",
            type: "success",
          });
        }
      }
    }); // End of Create function
  };

  const updateExistingConstructSegment = (
    userId,
    constructSegmentData,
    matchingIndex,
    addNew
  ) => {
    
    update(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      constructSegmentData
    ).then((data) => {
      if (!data) {
        console.log(
          "ConstructSegmentImport - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "ConstructSegmentImport - error returned = " + data.error
          );
        } else {       
      
          constructSegmentsDispatch({
            type: "UPDATE_EXISTINGCONSTRUCTSEGMENT",
            updatedConstructSegment: importValues,
            matchingIndex: matchingIndex,
          });

          if (addNew)
          {
            NewEntry();
            setAddNew(false);
          }else
          {
            setImportValues( {
              ...importValues,
              createDate: data.createDate,
              updateDate: data.updateDate,
                isError: false,
              errorMessage: "",
            })
            checkCurrentCiteria();
            checkCurrentAccess();
          }

          setNotify({
            isOpen: true,
            message: "Segment Updated",
            type: "success",
          });
        }
      }
    }); // End of Create function
  };

  const SaveEntries = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log(
      "ConstructSegmentImport - SaveEntries clicked before update see importValues = ",
      importValues
    );

    if (
      importValues.title.length == 0 ||
      importValues.topic.length == 0 ||
      importValues.description.length == 0 ||
      importValues.constructSegment.length == 0
    ) {
      setImportValues({
        ...importValues,
        isError: true,
        errorMessage:
          "Error alert!!! You must have an entry for title, topic, description and segment before saving!",
      });
      return;
    }

    
    if (
      importValues.myClass == null ||
      importValues.category == null ||
      importValues.subject == null ||
      importValues.difficultyLevel == null ||
      importValues.ageRange == null ||
      importValues.myClass.length == 0 ||
      importValues.category.length == 0 ||
      importValues.subject.length == 0 ||
      importValues.difficultyLevel.length == 0 ||
      importValues.ageRange.length == 0
    ) {
      setImportValues({
        ...importValues,
        isError: true,
        errorMessage:
          "Error alert!!! You must have an entry for all criteria entries before saving!",
      });
      return;
    }
    
    setImportValues({
      ...importValues,
      isError: false,
      errorMessage: "",
    });
    let constructSegmentData = new FormData();
    importValues.title && constructSegmentData.append("title", importValues.title);
    importValues.description &&
      constructSegmentData.append("description", importValues.description);
    importValues.topic && constructSegmentData.append("topic", importValues.topic);
    importValues.myClass && constructSegmentData.append("myClass", importValues.myClass);
    importValues.category &&
      constructSegmentData.append("category", importValues.category);
    importValues.subject && constructSegmentData.append("subject", importValues.subject);
    importValues.difficultyLevel &&
      constructSegmentData.append("difficultyLevel", importValues.difficultyLevel);
    importValues.ageRange &&
      constructSegmentData.append("ageRange", importValues.ageRange);
    importValues.image ? 
    constructSegmentData.append("image", importValues.image):
    constructSegmentData.append("", importValues.image);

    

    importValues.allowFriendsReadAccess &&
      constructSegmentData.append(
        "allowFriendsReadAccess",
        importValues.allowFriendsReadAccess
      );
    importValues.allowPublicReadAccess &&
      constructSegmentData.append(
        "allowPublicReadAccess",
        importValues.allowPublicReadAccess
      );
    importValues.approvedPublicReadAccess &&
      constructSegmentData.append(
        "approvedPublicReadAccess",
        importValues.approvedPublicReadAccess
      );
    importValues.constructSegment &&
      constructSegmentData.append(
        "constructSegment",
        importValues.constructSegment
      );
  
    importValues.owner_id
      ? constructSegmentData.append("owner_id", importValues.owner_id)
      : constructSegmentData.append("owner_id", jwt.user._id);

    //importValues.groupsWithAccess 
    //  ? constructSegmentData.append("groupsWithAccess", importValues.groupsWithAccess)
    //  : constructSegmentData.append("groupsWithAccess", []);

    importValues.type
      ? constructSegmentData.append("type", importValues.type)
      : constructSegmentData.append("type", "Component");

    importValues.subType
      ? constructSegmentData.append("subType", importValues.subType)
      : constructSegmentData.append("subType", "Segment");

    importValues.markDeleted
      ? constructSegmentData.append("markDeleted", importValues.markDeleted)
      : constructSegmentData.append("markDeleted", false);

    importValues.updatedBy
      ? constructSegmentData.append("updatedBy", importValues.updatedBy)
      : constructSegmentData.append("updatedBy", jwt.user._id);

    importValues.updatedDate
      ? constructSegmentData.append("updatedDate", importValues.updatedDate)
      : constructSegmentData.append("updatedDate", Date.now());

      // Check to ensure that create date and update consistent
    importValues.createDate
      ? constructSegmentData.append("createDate", importValues.createDate)
      : constructSegmentData.append("createDate", Date.now());

    console.log("ConstructSegmentImport - search for id =  ", importValues._id);
    
    const matchingIndex = findMatchingIndex(importValues._id);
    console.log(
      "ConstructSegmentImport - after matchingIndex =  " + matchingIndex
    );

    //for (var pair of constructSegmentData.entries()) {
    //  console.log(pair[0] + ", " + JSON.stringify(pair[1]));
    //}

    if (matchingIndex < 0) {

      createNewConstructSegment(jwt.user._id, constructSegmentData, addNew);
    } else {
      //Update
      
      importValues._v && constructSegmentData.append("_v", importValues._v);
      importValues._id && constructSegmentData.append("_id", importValues._id);
      console.log("ConstructSegmentImport Before Update - search for id =  ", importValues._id);
      
      updateExistingConstructSegment(
        jwt.user._id,
        constructSegmentData,
        matchingIndex,
        addNew
      );
      
    }
    console.log("ConstructSegmentImport End of Save Entries !!");
  };

  const checkCurrentCiteria = () =>
  {
    if (
    importValues.myClass != currentCriteria.myClass ||
    importValues.category != currentCriteria.category ||
    importValues.subject != currentCriteria.subject ||
    importValues.difficultyLevel != currentCriteria.difficultyLevel ||
    importValues.ageRange != currentCriteria.ageRange 
    )
    {
      criteriaDispatch({
        type: "SET_CRITERIAFROMCURRENTITEM",
        currentSourceOfCriteria: importValues,
      });
    }
  }

  const checkCurrentAccess = () =>
  {
    if (importValues.allowPublicReadAccess != currentAccess.allowPublicReadAccess ||
        importValues.allowFriendsReadAccess != currentAccess.allowFriendsReadAccess ||
        importValues.approvedPublicReadAccess != currentAccess.approvedPublicReadAccess)
      {
      accessDispatch({
        type: "SET_ACCESSFROMCURRENTITEM",
        currentSourceOfAccess: importValues,
      });
    }
  }

  const validate = (fieldValues = importValues) => {
      let temp = { ...errors }
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

      if (fieldValues == importValues)
          return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = e => {
      e.preventDefault()
      if (validate()) {
          console.log("Hurray!  Passed Validation!!!")
      }
  }

  const handleImportSegments = e => {
      e.preventDefault()
      if (validate()) {
        loadFile(); 
      }
  }
  const handleCancelExit = e => {
      setOpenPopup(false);
  }

  const loadFile = () => {
    load(
          { userId: jwt.user._id, 
            skeletonSegment: importValues,
          },
          {
            t: jwt.token,
          }
    ).then((data) => {
      if (!data) {
        console.log(
          "ConstructSegmentImport - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "ConstructSegmentImport - load error returned = " + data.error
          );
        } else {
          console.log("ConstructSegmentImport - load data =  " + data);

          }
          setNotify({
            isOpen: true,
            message: "File Load of Segments Completed",
            type: "success",
          });
        }
      }
    )}; // End of Create function

    return (
    <>
        <Form onSubmit={handleSubmit}>
            <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.title}>
                Each new segment record will include entries as you have assigned them on this form.
                You can enter or leave blank entries for topic, tittle and/or description.
                Imput file must be comma delimited.  
                Input file must contain the segment.  The file may also contain; topic, title and description.
                Order of entries on input file matter!
                If topic is left blank on the form it must be the first entry in the file.
                If title is left blank on form it must be the second column unless topic is from form in which case it will be first.
                Description would be the next column on the file.
                Segment must always be included.  It can be the only file entry if other data is on the form.
              </Typography>
            </Grid>

            <Grid item xs={6}>
                   <Controls.Button
                    text="Import Segments from Segment File"
                    variant="contained"
                    color = "primary"
                    //margin="dense"
                    endIcon={<ImportExportIcon/>}
                    onClick={handleImportSegments}
                />
            </Grid> 
            <Grid item xs={6}>
                <Controls.Button
                    text=" Exit"
                    variant="contained"
                    color = "default"
                    //margin="dense"
                    endIcon={<ExitToAppIcon />}
                    onClick={handleCancelExit}
                />
            </Grid> 
            {importValues.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {importValues.error}
              </Typography>
            )}
            <br />
            <Grid item xs={6}>
                <Controls.Input
                    name="topic"
                    label="Topic"
                    value={importValues.topic}
                    //margin="dense"
                    onChange={handleInputChange}
                    error={errors.topic}
                />
            </Grid>
            <Grid item xs={6}>
                    <Controls.Input
                        name="title"
                        label="Title"
                        value={importValues.title}
                        //margin="dense"
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                        name="description"
                        label="Description"
                        value={importValues.description}
                        //margin="dense"
                        onChange={handleInputChange}
                        error={errors.description}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>

                        Access to be applied to imported segments

                    </div>
                    <Controls.Checkbox
                        name="allowFriendsReadAccess"
                        label="Allow Friends Read Access"
                        value={importValues.allowFriendsReadAccess}
                        //margin="dense"
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="allowPublicReadAccess"
                        label="Allow Public Read Access"
                        value={importValues.allowPublicReadAccess}
                        //margin="dense"
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="approvedPublicReadAccess"
                        label="Approved For Public Read Access"
                        value={importValues.approvedPublicReadAccess}
                        disabled = "true"
                        //margin="dense"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="groupAccess"
                        label="Group Access"
                        value={importValues.constructSegment}
                        //margin="dense"
                        onChange={handleInputChange}
                        error={errors.constructSegment}
                    />
                </Grid>
                <br />
                <Grid item xs={6}>
                <div>

                Criteria/Tags to be applied to imported segments

                </div>
                <Controls.Select
                        name="myClass"
                        label="Class"
                        classes={classes}
                        value={importValues.myClass}
                        onChange={handleInputChange}
                        options={myClassOptions}
                        error={errors.myClass}
                    />
                    <Controls.Select
                        name="category"
                        label="Category"
                        value={importValues.category}
                        onChange={handleInputChange}
                        options={categoryOptions}
                        error={errors.category}
                    />
                    <Controls.Select
                        name="subject"
                        label="Subject"
                        value={importValues.subject}
                        onChange={handleInputChange}
                        options={subjectOptions}
                        error={errors.subject}
                    />
                    <Controls.Select
                        name="difficultyLevel"
                        label="Difficulty Level"
                        value={importValues.difficultyLevel}
                         onChange={handleInputChange}
                        options={difficultyLevelOptions}
                        error={errors.difficultyLevel}
                    />
                    <Controls.Select
                        name="ageRange"
                        label="Age Range"
                        value={importValues.ageRange}
                        onChange={handleInputChange}
                        options={ageRangeOptions}
                        error={errors.ageRange}
                    />
                </Grid>

   
                </Grid>
        </Form>
        <Notification notify={notify} setNotify={setNotify} />
    </>
    )
}
