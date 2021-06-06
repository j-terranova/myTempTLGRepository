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

export default function ConstructFactEditor(props) {
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

const displayConstructOptions = DisplayConstructOptions();
const typeOptions = displayConstructOptions.constructLayoutOptions;

const [constructFac, setconstructFac] = useState(
    {
      fact: formValues.constructFact.fact,
      source: formValues.constructFact.source?formValues.constructFact.source:"",
      type: formValues.constructFact.type?formValues.constructFact.type:"",
      proof: formValues.constructFact.proof.length>0?formValues.constructFact.proof:[""],
      contraryStatements: formValues.constructFact.contraryStatements.length>0?formValues.constructFact.contraryStatements:[""],
    }
  );

  const handleAddProofFields = () => {
    const values = constructFac.proof;
    values.push( '');
    setconstructFac({...constructFac, proof: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleAddContraryStatementFields = () => {
    const values = constructFac.contraryStatements;
    values.push( '');
    setconstructFac({...constructFac, contraryStatements: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleRemoveProofFields = index => {
    const values = constructFac.proof;
    values.splice(index, 1);
    setconstructFac({...constructFac, proof: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleRemoveContraryStatementFields = index => {
    const values = constructFac.contraryStatements;
    values.splice(index, 1);
    setconstructFac({...constructFac, contraryStatements: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleProofChange = (index, event) => {
    const values = constructFac.proof;
    values[index] =  event.target.value;
    setconstructFac({...constructFac, proof: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };
 
  
  const handleContraryStatementChange = (index, event) => {
    const values = constructFac.contraryStatements;
    values[index] =  event.target.value;
    setconstructFac({...constructFac, contraryStatements: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const validate = (fieldValues = constructFac) => {
  let temp = { ...errors }
  if ('fact' in fieldValues)
      temp.fact = fieldValues.fact ? "" : "This field is required."
  if ('type' in fieldValues)
      temp.type = fieldValues.type ? "" : "This field is required."
  //if ('proof' in fieldValues)
  //    temp.proof = fieldValues.proof ? [""] : "This field is required."
  //if ('contraryStatements' in fieldValues)
  //    temp.contraryStatements = fieldValues.contraryStatements ? [""] : "This field is required."

  setErrors({
      ...temp
  })
  if (fieldValues == constructFac)
      return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = e => {
  }

  const handleSave = e => {
    e.preventDefault()
    console.log("ConstructFactEditor - handleSave - start");
    console.log("ConstructFactEditor - handleSave - start - constructFac.proof", constructFac.proof);
    if (constructFac.proof == undefined || constructFac.proof == null ||
      constructFac.contraryStatements == undefined || constructFac.contraryStatements == null )
    {
      console.log("ConstructFactEditor - handleSave - Should show error that no fact stated");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must enter at least one proof and one contrary statement!",
      });
    } else if ((constructFac.proof.length == 0) || (constructFac.proof[0] =="") || 
               (constructFac.contraryStatements.length == 0) || (constructFac.contraryStatements[0] ==""))
    {
      console.log("ConstructFactEditor - handleSave - Should show error that no fact");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must enter at least on correct and one contrary statement!",
      }); 
      setNotify({
        isOpen: true,
        message: "At least one correct and one contrary statement required.",
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
    console.log("ConstructFactForm - handleAddNew - Start")
    console.log("ConstructFactForm - handleAddNew - formValues.modified = ", formValues.modified)
    if (formValues.modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
        onConfirm: () => {
          console.log("ConstructFactForm - right before validate")
          if (validate()) {
            console.log("ConstructFactForm - After validate right before save")
            addNewConstruct(); 
          }
        }
      }); 
    } else
    {
      console.log("ConstructFactForm - in else when modified not true")
      addNewConstruct();
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setconstructFac({...constructFac, [name] : value});
    console.log("ConstrucFactEditor - handleInputChange - constructFac = ", constructFac);
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log(
      "ConstructFactEditor - Inside handleClick UseEffect constructFac = ",
      constructFac)
    setFormValues({...formValues, constructFact : constructFac, isError: false,
       errorMessage:""});
    return function cleanup() {
      abortController.abort();
    };
  }, [constructFac]);

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
            <Grid item xs={7}>
              <Controls.Input
                name="fact"
                label="Fact"
                multiline
                value={constructFac.fact}
                onChange={event => handleInputChange(event)}
                error = {errors.fact}
              />
            </Grid>
            <Grid item xs={3}>
            <Controls.Input
                name="source"
                label="Source"
                multiline
                value={constructFac.source}
                onChange={event => handleInputChange(event)}
                error = {errors.source}
              />
            </Grid>
            <Grid item xs={2}>
             <Controls.Select
                name="type"
                label="Type"
                value={constructFac.type}
                onChange={event => handleInputChange(event)}
                options={typeOptions}
                error = {errors.type}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Typography>
                Proof(s) - add one or more statements that prove the fact - list in order of preference
              </Typography>
            </div>
          </Grid>
          {constructFac.proof.map((proof, index) => (
            <Fragment key={`${index}`}>
            <Grid container alignItems="center">
              <Grid item xs={8}>  
                <Controls.Input
                    name="proof"
                    label="Proof"
                    value={proof}
                    multiline
                    onChange={event => handleProofChange(index, event)}
                    error = {errors.proof}
                />
              </Grid>
              <Grid item xs={4}>  
                <Controls.Button
                    text="Add"
                    startIcon={<AddIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleAddProofFields()}
                />
                <Controls.Button
                    text="Remove"
                    startIcon={<RemoveIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleRemoveProofFields(index)}
                />
              </Grid>
            </Grid>
            </Fragment>
          ))}

          <Grid item xs={12}>
            <div>
              <Typography>
                Contrary Statement(s) - add one or more statements considered contrary to stated fact, etc - list in order of preference
              </Typography>
            </div>
          </Grid>
          {constructFac.contraryStatements.map((contraryStatement, incIndex) => (
            <Fragment key={`${incIndex}`}>
            <Grid container alignItems="center">
              <Grid item xs={8}>  
                <Controls.Input
                    name="contraryStatement"
                    label="Contrary Statements"
                    value={contraryStatement}
                    multiline
                    onChange={event => handleContraryStatementChange(incIndex, event)}
                    error = {errors.contraryStatements}
                />
              </Grid>

              <Grid item xs={4}>  
              <Controls.Button
                    text="Add"
                    startIcon={<AddIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleAddContraryStatementFields()}
                />
                <Controls.Button
                    text="Remove"
                    startIcon={<RemoveIcon />}
                    variant="contained"
                    color = "secondary"
                    component="span"
                    onClick={() => handleRemoveContraryStatementFields(incIndex)}
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
            text="Add Fact"  
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
