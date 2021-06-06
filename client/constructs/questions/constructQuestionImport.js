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
    useConstructQuestions,
    useConstructQuestionsDispatch,
  } from "./../../contexts/ConstructQuestionsContext";
  import { useCriteria, useCriteriaDispatch } from "./../../contexts/CriteriaContext";
  import { useAccess, useAccessDispatch } from "./../../contexts/AccessContext";
  import Notification from "../../components/shared/Notification";
  import { create, update, load } from "./api-constructQuestion.js";


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

export default function ConstructQuestionImport(props) {
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
const constructQuestions = useConstructQuestions();
const constructQuestionsDispatch = useConstructQuestionsDispatch();

console.log("ConstructQuestionImport" );

const [sourceFile, setSourceFile] = useState();
const [importValues, setImportValues] = useState({
    title:  "",
    description:    "",
    topic:   "",
    myClass:  currentCriteria.myClass,
    category:  currentCriteria.category,
    subject:  currentCriteria.subject,
    type:  "Component",
    subType:  "Question",
    difficultyLevel:  currentCriteria.difficultyLevel,
    ageRange:  currentCriteria.ageRange,
    image:  "",
    owner_id:  userId,
    //groupsWithAccess: currentConstructQuestion.groupsWithAccess,
    allowFriendsReadAccess:  currentAccess.allowFriendsReadAccess,
    allowPublicReadAccess:  currentAccess.allowPublicReadAccess,
    approvedPublicReadAccess: currentAccess.approvedPublicReadAccess,
    constructQuestion: "",
    markDeleted:  false,
    createDate:  Date.now(),
    updatedBy:  userId,
    updateDate:  Date.now(),
    _v:  "0",
    _id:  uuidv4(),
    isError: false,
    errorMessage: "",
  });
  
console.log("ConstructQuestionImport - after setImportValues = ",importValues );

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
    console.log("ConstructQuestionImport Beginning of NewEntry !!");
    setImportValues({
      ...importValues,
      description: "",
      constructQuestion: "",
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
    console.log("ConstructQuestionImport - NewEntry started importValues = ",importValues );
  };

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("ConstructQuestionImport - search_id = ", search_id);
    
    for (var i = 0; i < constructQuestions.length; i++) {
      console.log(
        "ConstructQuestionListing - constructQuestions[i]._id = ",
        constructQuestions[i]._id
      );
      
      if (constructQuestions[i]._id == search_id) {
        index = i;
        console.log("ConstructQuestionImport - MATCH FOUND!!!  Search Id = ", search_id);
        
        break;
      }
    }
    return index;
  };

  const createNewConstructQuestion = (userId, constructQuestionData,addNew) => {
    console.log("ConstructQuestionImport - createNewConstructQuestion = ");
    const newDate = Date.now();
    constructQuestionData.append("updatedDate", newDate);
    constructQuestionData.append("updatedDate", newDate);
    console.log(
      "ConstructQuestionImport - just before call to create question constructQuestionData = ",
      constructQuestionData
    );
    create(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      constructQuestionData
    ).then((data) => {
      if (!data) {
        console.log(
          "ConstructQuestionImport - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "ConstructQuestionImport - error returned = " + data.error
          );
          // Call constructQuestionDispatch
          //setImportValues({ ...importValues, error: data.error });
        } else {
          console.log("ConstructQuestionImport - data =  " + data);
          constructQuestionsDispatch({
            type: "ADD_TOCONSTRUCTQUESTIONS",
            newConstructQuestion: data,
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
            message: "Question Created",
            type: "success",
          });
        }
      }
    }); // End of Create function
  };

  const updateExistingConstructQuestion = (
    userId,
    constructQuestionData,
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
      constructQuestionData
    ).then((data) => {
      if (!data) {
        console.log(
          "ConstructQuestionImport - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "ConstructQuestionImport - error returned = " + data.error
          );
        } else {       
      
          constructQuestionsDispatch({
            type: "UPDATE_EXISTINGCONSTRUCTQUESTION",
            updatedConstructQuestion: importValues,
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
            message: "Question Updated",
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
      "ConstructQuestionImport - SaveEntries clicked before update see importValues = ",
      importValues
    );

    if (
      importValues.title.length == 0 ||
      importValues.topic.length == 0 ||
      importValues.description.length == 0 ||
      importValues.constructQuestion.length == 0
    ) {
      setImportValues({
        ...importValues,
        isError: true,
        errorMessage:
          "Error alert!!! You must have an entry for title, topic, description and question before saving!",
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
    let constructQuestionData = new FormData();
    importValues.title && constructQuestionData.append("title", importValues.title);
    importValues.description &&
      constructQuestionData.append("description", importValues.description);
    importValues.topic && constructQuestionData.append("topic", importValues.topic);
    importValues.myClass && constructQuestionData.append("myClass", importValues.myClass);
    importValues.category &&
      constructQuestionData.append("category", importValues.category);
    importValues.subject && constructQuestionData.append("subject", importValues.subject);
    importValues.difficultyLevel &&
      constructQuestionData.append("difficultyLevel", importValues.difficultyLevel);
    importValues.ageRange &&
      constructQuestionData.append("ageRange", importValues.ageRange);
    importValues.image ? 
    constructQuestionData.append("image", importValues.image):
    constructQuestionData.append("", importValues.image);

    

    importValues.allowFriendsReadAccess &&
      constructQuestionData.append(
        "allowFriendsReadAccess",
        importValues.allowFriendsReadAccess
      );
    importValues.allowPublicReadAccess &&
      constructQuestionData.append(
        "allowPublicReadAccess",
        importValues.allowPublicReadAccess
      );
    importValues.approvedPublicReadAccess &&
      constructQuestionData.append(
        "approvedPublicReadAccess",
        importValues.approvedPublicReadAccess
      );
    importValues.constructQuestion.questionPosed &&
    constructQuestionData.append(
      "constructQuestion.questionPosed",
      importValues.constructQuestion.questionPosed
    );
    importValues.constructQuestion.questionType &&
    constructQuestionData.append(
      "constructQuestion.questionType",
      importValues.constructQuestion.questionType
    );
    importValues.constructQuestion.correctResponses[0] &&
    constructQuestionData.append(
      "constructQuestion.correctResponses",
      JSON.stringify(importValues.constructQuestion.correctResponses)
    );
    importValues.constructQuestion.inCorrectResponses[0] &&
    constructQuestionData.append(
      "constructQuestion.inCorrectResponses",
      JSON.stringify(importValues.constructQuestion.inCorrectResponses)
    );
  
    importValues.owner_id
      ? constructQuestionData.append("owner_id", importValues.owner_id)
      : constructQuestionData.append("owner_id", jwt.user._id);

    //importValues.groupsWithAccess 
    //  ? constructQuestionData.append("groupsWithAccess", importValues.groupsWithAccess)
    //  : constructQuestionData.append("groupsWithAccess", []);

    importValues.type
      ? constructQuestionData.append("type", importValues.type)
      : constructQuestionData.append("type", "Component");

    importValues.subType
      ? constructQuestionData.append("subType", importValues.subType)
      : constructQuestionData.append("subType", "Question");

    importValues.markDeleted
      ? constructQuestionData.append("markDeleted", importValues.markDeleted)
      : constructQuestionData.append("markDeleted", false);

    importValues.updatedBy
      ? constructQuestionData.append("updatedBy", importValues.updatedBy)
      : constructQuestionData.append("updatedBy", jwt.user._id);

    importValues.updatedDate
      ? constructQuestionData.append("updatedDate", importValues.updatedDate)
      : constructQuestionData.append("updatedDate", Date.now());

      // Check to ensure that create date and update consistent
    importValues.createDate
      ? constructQuestionData.append("createDate", importValues.createDate)
      : constructQuestionData.append("createDate", Date.now());

    console.log("ConstructQuestionImport - search for id =  ", importValues._id);
    
    const matchingIndex = findMatchingIndex(importValues._id);
    console.log(
      "ConstructQuestionImport - after matchingIndex =  " + matchingIndex
    );

    //for (var pair of constructQuestionData.entries()) {
    //  console.log(pair[0] + ", " + JSON.stringify(pair[1]));
    //}

    if (matchingIndex < 0) {

      createNewConstructQuestion(jwt.user._id, constructQuestionData, addNew);
    } else {
      //Update
      
      importValues._v && constructQuestionData.append("_v", importValues._v);
      importValues._id && constructQuestionData.append("_id", importValues._id);
      console.log("ConstructQuestionImport Before Update - search for id =  ", importValues._id);
      
      updateExistingConstructQuestion(
        jwt.user._id,
        constructQuestionData,
        matchingIndex,
        addNew
      );
      
    }
    console.log("ConstructQuestionImport End of Save Entries !!");
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

  const handleImportQuestions = e => {
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
            skeletonQuestion: importValues,
          },
          {
            t: jwt.token,
          }
    ).then((data) => {
      if (!data) {
        console.log(
          "ConstructQuestionImport - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "ConstructQuestionImport - load error returned = " + data.error
          );
        } else {
          console.log("ConstructQuestionImport - load data =  " + data);

          }
          setNotify({
            isOpen: true,
            message: "File Load of Questions Completed",
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
                Each new question record will include entries as you have assigned them on this form.
                You can enter or leave blank entries for topic, tittle and/or description.
                Imput file must be comma delimited.  
                Input file must contain the question.  The file may also contain; topic, title and description.
                Order of entries on input file matter!
                If topic is left blank on the form it must be the first entry in the file.
                If title is left blank on form it must be the second column unless topic is from form in which case it will be first.
                Description would be the next column on the file.
                Question must always be included.  It can be the only file entry if other data is on the form.
              </Typography>
            </Grid>

            <Grid item xs={6}>
                   <Controls.Button
                    text="Import Questions from Question File"
                    variant="contained"
                    color = "primary"
                    //margin="dense"
                    endIcon={<ImportExportIcon/>}
                    onClick={handleImportQuestions}
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

                        Access to be applied to imported questions

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
                        value={importValues.constructQuestion}
                        //margin="dense"
                        onChange={handleInputChange}
                        error={errors.constructQuestion}
                    />
                </Grid>
                <br />
                <Grid item xs={6}>
                <div>

                Criteria/Tags to be applied to imported questions

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
