import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../../controls/Controls";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Form } from '../../components/shared/useForm';
import Icon from "@material-ui/core/Icon";
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CancelIcon from '@material-ui/icons/Cancel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import Notification from "../../components/shared/Notification";
import DisplayConstructOptions  from "../../lookupOptions/DisplayConstructOptions";

const useStyles = makeStyles((theme) => ({
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
}));

export default function ConstructQuestionEditor(props) {
  const{  formValues, 
    setFormValues,
    addNewConstruct,
    SaveEntries,
    setOpenPopup,
    okToUpdate, } = props;

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
const [errors, setErrors] = useState({});

//const [questionTypeOptions, setQuestionTypeOptions] = useState(
//  [ {id: "Standard",title: "Standard"},
//    {id: "MultipleChoice",title: "Multiple Choice"},
//    {id: "FillInBlank", title: "Fill In Blank"},
//    {id: "Matching", title: "Matching"},
//    {id: "TrueFalse", title: "True or False"},
//    {id: "YesNo", title: "Yes or No"}]
//)
const displayConstructOptions = DisplayConstructOptions();
const questionTypeOptions = displayConstructOptions.constructResponseFormatOptions;
/*
  constructQuestion:{
		questionPosed: {
      type: String,
      trim: true,
      required: "Question Posed is required"
    },
    questionTpye: {   //MultipleChoice, FillInBlank, TrueFalse, Other
      type: String,
      default: "Standard",
    },
    correctResponses: [   
      {
        response:
        { type: String,
          default: "",
        },
        choiceType:   //ChoiceTypes: Correct, Accepted
        { type: String,
          default: "Correct",
        },
        choiceOrder:   //ChoiceOrder: 1, 2, 3, etc... 
        { type: number,
          default: 1,
        },
      }
    ],
    inCorrectResponses: [   
      {
        response:
        { type: String,
          default: "",
        },
        choiceType:   //ChoiceTypes: Wrong, Other
        { type: String,
          default: "Correct",
        },
        choiceOrder:   //ChoiceOrder: 1, 2, 3, etc... 
        { type: number,
          default: 1,
        },
      }
    ],
  },
  */

  const [constructQues, setconstructQues] = useState(
    {
      questionPosed: formValues.constructQuestion.questionPosed,
      questionType: formValues.constructQuestion.questionType?formValues.constructQuestion.questionType:"Default",
      correctResponses: formValues.constructQuestion.correctResponses.length>0?formValues.constructQuestion.correctResponses:[""],
      inCorrectResponses: formValues.constructQuestion.inCorrectResponses.length>0?formValues.constructQuestion.inCorrectResponses:[""],
    }
  );

  const handleAddCorrectResponseFields = () => {
    const values = constructQues.correctResponses;
    values.push( '');
    setconstructQues({...constructQues, correctResponses: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleAddInCorrectResponseFields = () => {
    const values = constructQues.inCorrectResponses;
    values.push( '');
    setconstructQues({...constructQues, inCorrectResponses: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleRemoveCorrectResponseFields = index => {
    const values = constructQues.correctResponses;
    values.splice(index, 1);
    setconstructQues({...constructQues, correctResponses: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleRemoveInCorrectResponseFields = index => {
    const values = constructQues.inCorrectResponses;
    values.splice(index, 1);
    setconstructQues({...constructQues, inCorrectResponses: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleCorrectResponseChange = (index, event) => {
    const values = constructQues.correctResponses;
    values[index] =  event.target.value;
    setconstructQues({...constructQues, correctResponses: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };
 
  
  const handleInCorrectResponseChange = (index, event) => {
    const values = constructQues.inCorrectResponses;
    values[index] =  event.target.value;
    setconstructQues({...constructQues, inCorrectResponses: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const validate = (fieldValues = constructQues) => {
  let temp = { ...errors }
  if ('questionPosed' in fieldValues)
      temp.questionPosed = fieldValues.questionPosed ? "" : "This field is required."
  if ('questionType' in fieldValues)
      temp.questionType = fieldValues.questionType ? "" : "This field is required."
  //if ('correctResponses' in fieldValues)
  //    temp.correctResponses = fieldValues.correctResponses ? [""] : "This field is required."
  //if ('inCorrectResponses' in fieldValues)
  //    temp.inCorrectResponses = fieldValues.inCorrectResponses ? [""] : "This field is required."

  setErrors({
      ...temp
  })
  if (fieldValues == constructQues)
      return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = e => {
  }

  const handleSave = e => {
    e.preventDefault()
    console.log("ConstructQuestionEditor - handleSave - start");
    console.log("ConstructQuestionEditor - handleSave - start - constructQues.correctResponses", constructQues.correctResponses);
    if (constructQues.correctResponses == undefined || constructQues.correctResponses == null ||
      constructQues.inCorrectResponses == undefined || constructQues.inCorrectResponses == null )
    {
      console.log("ConstructQuestionEditor - handleSave - Should show error that no associated word");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must enter at least on correct and one incorrect response!",
      });
    } else if ((constructQues.correctResponses.length == 0) || (constructQues.correctResponses[0] =="") || 
               (constructQues.inCorrectResponses.length == 0) || (constructQues.inCorrectResponses[0] ==""))
    {
      console.log("ConstructQuestionEditor - handleSave - Should show error that no associated word");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must enter at least on correct and one incorrect response!",
      }); 
      setNotify({
        isOpen: true,
        message: "At least one correct and one incorrect response required.",
        type: "error",
      });
    } else 
    {
     if (formValues.modified)
        {
          if (validate()) {
            SaveEntries()
          }  
        } else
        {
          setNotify({
            isOpen: true,
            message: "No changes to save!",
            type: "warning",
          });
        }
      } 
  }

  const handleAddNew = () => {
    console.log("ConstructAssociationForm - handleAddNew - Start")
    console.log("ConstructAssociationForm - handleAddNew - formValues.modified = ", formValues.modified)
    if (formValues.modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
        onConfirm: () => {
          console.log("ConstructAssociationForm - right before validate")
          if (validate()) {
            console.log("ConstructAssociationForm - After validate right before save")
            addNewConstruct(); 
          }
        }
      }); 
    } else
    {
      console.log("ConstructAssociationForm - in else when modified not true")
      addNewConstruct();
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setconstructQues({...constructQues, [name] : value});
    console.log("ConstrucQuestionEditor - handleInputChange - constructQues = ", constructQues);
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log(
      "ConstructAssociationEditor - Inside handleClick UseEffect constructQues = ",
      constructQues)
    setFormValues({...formValues, constructQuestion : constructQues, isError: false,
       errorMessage:""});
    return function cleanup() {
      abortController.abort();
    };
  }, [constructQues]);

  const handleExit = (e) => {
    if (formValues.modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before exiting",
        onConfirm: () => {
          setOpenPopup(false);
          setFormValues({ ...formValues, 
            modified: false,
            isError: false, 
            errorMessage:""});
        },
      });
    } else
    {
      setOpenPopup(false);
    }
  }

  return (
    <>      
      <Form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
            <Grid item xs={9}>
              <Controls.Input
                name="questionPosed"
                label="Question"
                multiline
                value={constructQues.questionPosed}
                onChange={event => handleInputChange(event)}
                error = {errors.questionPosed}
              />
            </Grid>
            <Grid item xs={3}>
             <Controls.Select
                name="questionType"
                label="Type"
                value={constructQues.questionType}
                onChange={event => handleInputChange(event)}
                options={questionTypeOptions}
                error = {errors.questionType}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Typography>
                Correct Response(s) - add one or more correct responses - list in order of preference
              </Typography>
            </div>
          </Grid>
          {constructQues.correctResponses.map((correctResponse, index) => (
            <Fragment key={`${index}`}>
            <Grid container alignItems="center">
              <Grid item xs={5}>  
                <Controls.Input
                    name="correctResponse"
                    label="Correct Response"
                    value={correctResponse}
                    multiline
                    onChange={event => handleCorrectResponseChange(index, event)}
                    error = {errors.correctResponses}
                />
              </Grid>
              <Grid item xs={3}>  
                <Controls.Button
                    text="Add"
                    startIcon={<AddIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleAddCorrectResponseFields()}
                />
                <Controls.Button
                    text="Remove"
                    startIcon={<RemoveIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleRemoveCorrectResponseFields(index)}
                />
              </Grid>
            </Grid>
            </Fragment>
          ))}

          <Grid item xs={12}>
            <div>
              <Typography>
                InCorrect Response(s) - add one or more incorrect responses to be used for multiple choice, etc - list in order of preference
              </Typography>
            </div>
          </Grid>
          {constructQues.inCorrectResponses.map((inCorrectResponse, incIndex) => (
            <Fragment key={`${incIndex}`}>
            <Grid container alignItems="center">
              <Grid item xs={6}>  
                <Controls.Input
                    name="inCorrectResponse"
                    label="Incorrect Response"
                    value={inCorrectResponse}
                    multiline
                    onChange={event => handleInCorrectResponseChange(incIndex, event)}
                    error = {errors.inCorrectResponses}
                />
              </Grid>

              <Grid item xs={6}>  
              <Controls.Button
                    text="Add"
                    startIcon={<AddIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleAddInCorrectResponseFields()}
                />
                <Controls.Button
                    text="Remove"
                    startIcon={<RemoveIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleRemoveInCorrectResponseFields(incIndex)}
                />
              </Grid>
            </Grid>
            </Fragment>
          ))}

      {formValues.isError && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {formValues.errorMessage}
          </Typography>
        )}
      <Grid container alignItems="center">
        <Grid item xs={2}>
            <Controls.Button
                text="Save"
                startIcon={<SaveIcon />}
                variant="contained"
                color = "primary"
                endIcon={<ExitToAppIcon />}
                onClick={handleSave}
                disabled = {okToUpdate?false:true} 
            />
        </Grid>

        <Grid item xs={3}> 
        <Controls.Button
            text="Add Question"  
            startIcon={<AddIcon />}   
            variant="contained"
            color = "primary"
            onClick={() => { 
              handleAddNew()
            }}                                                                
            disabled = {okToUpdate?false:true}                    
        />
      </Grid>

        <Grid item xs={2}>
            <Controls.Button
                text="Exit"
                startIcon={<CancelIcon/>}
                variant="contained"
                color = "primary"
                endIcon={<ExitToAppIcon />}
                onClick={handleExit}
            />
        </Grid>
        </Grid>
        <br/>
      </Form>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
