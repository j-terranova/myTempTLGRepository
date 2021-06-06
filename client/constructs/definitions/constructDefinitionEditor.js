import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import Divider from "@material-ui/core/Divider";
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


const useStyles = makeStyles((theme) => ({
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
}));


export default function ConstructDefinitionEditor(props) {
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
  
const [wordTypeOptions, setWordTypeOptions] = useState(
  [ {id: "Noun",title: "Noun"},
    {id: "Pronoun", title: "Pronoun"},
    {id: "Verb", title: "Verb"},
    {id: "Adjective", title: "Adjective"},
    {id: "Adverb", title: "Adverb"},
    {id: "Preposition",title: "Preposition"},
    {id: "Conjunction",title: "Conjunction"},
    {id: "Interjection", title: "Interjection"}]
)  
  //const [wordToDefine, setWordToDefine] = useState({
  //  wordToDefine: "",
  //  soundOut: "",
  //  partOfSpeech:  "",
  //  etymology: "",
  //  classification:  "",
  //  pluralForm: "",
  //  wordUseExample: "",
  //  wordDefinitions: ""
  //})

  const [constructDef, setconstructDef] = useState(
    {
      wordToDefine: formValues.constructDefinition.wordToDefine,
      soundOut: formValues.constructDefinition.soundOut?formValues.constructDefinition.soundOut:"",
      partOfSpeech:  formValues.constructDefinition.partOfSpeech?formValues.constructDefinition.partOfSpeech:"",
      etymology: formValues.constructDefinition.etymology?formValues.constructDefinition.etymology:"",
      classification:  formValues.constructDefinition.classification?formValues.constructDefinition.classification:"",
      pluralForm: formValues.constructDefinition.pluralForm,
      wordUseExample: formValues.constructDefinition.wordUseExample,
      wordDefinitions: formValues.constructDefinition.wordDefinitions.length>0?formValues.constructDefinition.wordDefinitions:[""]
    }
  );

  const handleAddFields = () => {
    const values = constructDef.wordDefinitions;
    values.push( '');
    setconstructDef({...constructDef, wordDefinitions: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleRemoveFields = index => {
    const values = constructDef.wordDefinitions;
    values.splice(index, 1);
    setconstructDef({...constructDef, wordDefinitions: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const validate = (fieldValues = constructDef) => {
    let temp = { ...errors }
    if ('wordToDefine' in fieldValues)
        temp.wordToDefine = fieldValues.wordToDefine ? "" : "This field is required."    
    if ('soundOut' in fieldValues)
        temp.soundOut = fieldValues.soundOut ? "" : "This field is required."
    if ('partOfSpeech' in fieldValues)
        temp.partOfSpeech = fieldValues.partOfSpeech ? "" : "This field is required."
    if ('etymology' in fieldValues)
        temp.etymology = fieldValues.etymology ? "" : "This field is required."
    if ('classification' in fieldValues)
        temp.classification = fieldValues.classification ? "" : "This field is required."
    if ('pluralForm' in fieldValues)
        temp.pluralForm = fieldValues.pluralForm ? "" : "This field is required."
    if ('wordUseExample' in fieldValues)
        temp.wordUseExample = fieldValues.wordUseExample ? "" : "This field is required."
        //if ('wordDefinitions' in fieldValues)
    //    temp.wordDefinitions = fieldValues.wordDefinitions ? [""] : "This field is required."
    setErrors({
        ...temp
    })
    if (fieldValues == constructDef)
        return Object.values(temp).every(x => x == "")
}

  const handleSubmit = e => {
  };

  const handleSave = e => {
    e.preventDefault()
    console.log("ConstructDefinitionEditor - handleSave - start");
    console.log("ConstructDefinitionEditor - handleSave - start - constructDef.wordDefinitions", constructDef.wordDefinitions);
    if (constructDef.wordDefinitions == undefined || constructDef.wordDefinitions == null)
    {
      console.log("ConstructDefinitionEditor - handleSave - Should show error that no definition");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the definition!",
      });
    } else if ((constructDef.wordDefinitions.length == 0) || (constructDef.wordDefinitions[0] ==""))
    {
      console.log("ConstructDefinitionEditor - handleSave - Should show error that no definition");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the definition!",
      });
  
      setNotify({
        isOpen: true,
        message: "Definition required.  Please enter and save again.",
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
    console.log("ConstructDefinitionForm - handleAddNew - Start")
    console.log("ConstructDefinitionForm - handleAddNew - formValues.modified = ", formValues.modified)
    if (formValues.modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
        onConfirm: () => {
          console.log("ConstructDefinitionForm - right before validate")
          if (validate()) {
            console.log("ConstructDefinitionForm - After validate right before save")
            addNewConstruct(); 
          }
        }
      }); 
    } else
    {
      console.log("ConstructDefinitionForm - in else when modified not true")
      addNewConstruct();
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setconstructDef({...constructDef, [name] : value});
    console.log("ConstructDefinitionEditor - handleInputChange - constructDef = ", constructDef);
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleDefinitionChange = (index, event) => {
    const values = constructDef.wordDefinitions;
    values[index] = event.target.value;
    setconstructDef({...constructDef, wordDefinitions: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  useEffect(() => {
    console.log(
      "ConstructDefinitionEditor - Inside handleClick UseEffect constructDef = ",
      constructDef)
      setFormValues({...formValues, constructDefinition : constructDef, isError: false,
        errorMessage:""});
  }, [constructDef]);

  const handleExit = () => {
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
          <Grid item xs={4}>
            <Controls.Input
                name="wordToDefine"
                label="Word to define"
                value={constructDef.wordToDefine}
                onChange={event => handleInputChange(event)}
                error = {errors.wordToDefine}
            />
            </Grid>
            <Grid item xs={4}>
             <Controls.Select
                name="partOfSpeech"
                label="Part of Speech"
                value={constructDef.partOfSpeech}
                onChange={event => handleInputChange(event)}
                options={wordTypeOptions}
                error = {errors.partOfSpeech}
            />
            </Grid>
            
            <Grid item xs={4}>
             <Controls.Input
                name="pluralForm"
                label="Plural Form"
                value={constructDef.pluralForm}
                onChange={event => handleInputChange(event)}
                error = {errors.pluralForm}
            />
            </Grid>

            <Grid item xs={4}>
            <Controls.Input
                name="soundOut"
                label="Sound Out"
                value={constructDef.soundOut}
                onChange={event => handleInputChange(event)}
                error = {errors.soundOut}
            />
            </Grid>
            <Grid item xs={4}>
            <Controls.Input
                name="etymology"
                label="Etymology"
                value={constructDef.etymology}
                onChange={event => handleInputChange(event)}
                error = {errors.etymology}
            />
            </Grid>
            
            <Grid item xs={4}>
             <Controls.Input
                name="classification"
                label="Classification"
                value={constructDef.classification}
                onChange={event => handleInputChange(event)}
                error = {errors.classification}
            />
            </Grid>

          <Grid item xs={12}>
            <Controls.Input
                name="wordUseExample"
                label="Usage Example"
                value={constructDef.wordUseExample}
                onChange={event => handleInputChange(event)}
                error = {errors.wordUseExample}
            />
           </Grid>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Typography>
                Definitions (add one or more in a hierarchical manner)
              </Typography>
            </div>
            </Grid>
          {constructDef.wordDefinitions.map((wordDefinition, index) => (
            <Fragment key={`${index}`}>
              <Grid container alignItems="center">
              <Grid item xs={7}>  
              <Controls.Input
                    name="wordDefinition"
                    label={index+1}
                    value={wordDefinition}
                    multiline
                    onChange={event => handleDefinitionChange(index, event)}
                    rror = {errors.wordDefinitions}
                />
              </Grid>
              <Grid item xs={5}>  
                <Controls.Button
                    text="Add Definition"
                    startIcon={<AddIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleAddFields()}
                />
                <Controls.Button
                    text="Remove"
                    startIcon={<RemoveIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleRemoveFields(index)}
                />
              </Grid>
              </Grid>
            </Fragment>
          ))}
        
        <Divider/>
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
            text="Add Definition"  
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
        <Divider/>
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
