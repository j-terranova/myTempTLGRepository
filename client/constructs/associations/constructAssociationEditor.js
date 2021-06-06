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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import Notification from "../../components/shared/Notification";

const useStyles = makeStyles((theme) => ({
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle,
  },
}));

export default function ConstructAssociationEditor(props) {
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

const [associationTypeOptions, setAssociationTypeOptions] = useState(
  [ {id: "Antonym",title: "Antonym"},
    {id: "Synonym",title: "Synonym"},
  ]
)

/*
wordToAssociate: 
associationType: 
associatedWords:
*/
  const [constructAssoc, setconstructAssoc] = useState(
    {
      wordToAssociate: formValues.constructAssociation.wordToAssociate,
      associationType: formValues.constructAssociation.associationType?formValues.constructAssociation.associationType:"Antonym",
      associatedWords: formValues.constructAssociation.associatedWords.length>0?formValues.constructAssociation.associatedWords:[""],
    }
  );

  const handleAddFields = () => {
    const values = constructAssoc.associatedWords;
    values.push( '');
    setconstructAssoc({...constructAssoc, associatedWords: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleRemoveFields = index => {
    const values = constructAssoc.associatedWords;
    values.splice(index, 1);
    setconstructAssoc({...constructAssoc, associatedWords: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const validate = (fieldValues = constructAssoc) => {
    let temp = { ...errors }
    if ('wordToAssociate' in fieldValues)
        temp.wordToAssociate = fieldValues.wordToAssociate ? "" : "This field is required."
    if ('associationType' in fieldValues)
        temp.associationType = fieldValues.associationType ? "" : "This field is required."
    //if ('associatedWords' in fieldValues)
    //    temp.associatedWords = fieldValues.associatedWords ? [""] : "This field is required."
    setErrors({
        ...temp
    })
    if (fieldValues == constructAssoc)
        return Object.values(temp).every(x => x == "")
}

  const handleSubmit = e => {
  }

  const handleSave = (e) => {
    e.preventDefault()
    console.log("ConstructAssociationEditor - handleSave - start");
    console.log("ConstructAssociationEditor - handleSave - start - constructAssoc.associatedWords", constructAssoc.associatedWords);
    if (constructAssoc.associatedWords == undefined || constructAssoc.associatedWords == null)
    {
      console.log("ConstructAssociationEditor - handleSave - Should show error that no associated word");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the associated word!",
      });
    } else if ((constructAssoc.associatedWords.length == 0) || (constructAssoc.associatedWords[0] ==""))
    {
      console.log("ConstructAssociationEditor - handleSave - Should show error that no associated word");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the associated word!",
      }); 
      setNotify({
        isOpen: true,
        message: "Associated word required.  Please enter and save again.",
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
  console.log("ConstructAssociationEditor - handleAddNew - Start")
  console.log("ConstructAssociationEditor - handleAddNew - formValues.modified = ", formValues.modified)
  if (formValues.modified)
  {
    setConfirmDialog({
      isOpen: true,
      title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
      subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
      onConfirm: () => {
        console.log("ConstructAssociationEditor - right before validate")
        if (validate()) {
          console.log("ConstructAssociationEditor - After validate right before save")
          addNewConstruct(); 
        }
      }
    }); 
  } else
  {
    console.log("ConstructAssociationEditor - in else when modified not true")
    addNewConstruct();
  }
}

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setconstructAssoc({...constructAssoc, [name] : value});
    console.log("ConstructAssociationEditor - handleInputChange - constructAssoc = ", constructAssoc);
    setFormValues({
      ...formValues,
      modified: true
    })
};

const handleAssociatedWordChange = (index, event) => {
  const values = constructAssoc.associatedWords;
  values[index] =  event.target.value;
  setconstructAssoc({...constructAssoc, associatedWords: values});
  setFormValues({
    ...formValues,
    modified: true
  })
};


  useEffect(() => {
    console.log(
      "ConstructAssociationEditor - Inside handleClick UseEffect constructAssoc = ",
      constructAssoc)
      setFormValues({...formValues, constructAssociation : constructAssoc, isError: false,
        errorMessage:""});
  }, [constructAssoc]);

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
                name="wordToAssociate"
                label="Word To Associate"
                multiline
                value={constructAssoc.wordToAssociate}
                onChange={event => handleInputChange(event)}
                error = {errors.wordToAssociate}
              />
            </Grid>
            <Grid item xs={3}>
             <Controls.Select
                name="associationType"
                label="Type"
                value={constructAssoc.associationType}
                onChange={event => handleInputChange(event)}
                options={associationTypeOptions}
                error = {errors.associationType}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Typography>
                Associated Words(s) - add one or more associations - list in order of preference
              </Typography>
            </div>
          </Grid>
          {constructAssoc.associatedWords.map((associatedWord, index) => (
            <Fragment key={`${index}`}>
            <Grid container alignItems="center">
              <Grid item xs={8}>  
                <Controls.Input
                    name="associatedWord"
                    label="Associated Word"
                    value={associatedWord}
                    multiline
                    onChange={event => handleAssociatedWordChange(index, event)}
                    error = {errors.associatedWords}
                />
              </Grid>
              <Grid item xs={4}>  
                <Controls.Button
                    text="Add Matching Word"
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
                text="Save "
                startIcon={<SaveIcon />}
                variant="contained"
                color = "primary"
                onClick={handleSave}
                disabled = {okToUpdate?false:true} 
            />
        </Grid>
        <Grid item xs={3}> 
        <Controls.Button
            text="Add Association"  
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
