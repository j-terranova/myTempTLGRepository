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

export default function ConstructPrefixEditor(props) {
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

const [typeOptions, setPrefixTypeOptions] = useState(
  [ {id: "Noun",title: "Noun"},
    {id: "Verb",title: "Verb"},
    {id: "Adjective",title: "Adjective"},
  ]
)

/*
prefix: 
type: 
examples:
*/
  const [constructPre, setconstructPre] = useState(
    {
      prefix: formValues.constructPrefix.prefix,	
      meaning: formValues.constructPrefix.meaning,
      etymology: formValues.constructPrefix.etymology,
      type: formValues.constructPrefix.type,
      examples:  formValues.constructPrefix.examples.length>0?formValues.constructPrefix.examples:[""],
    }
  );

  const handleAddFields = () => {
    const values = constructPre.examples;
    values.push( '');
    setconstructPre({...constructPre, examples: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const handleRemoveFields = index => {
    const values = constructPre.examples;
    values.splice(index, 1);
    setconstructPre({...constructPre, examples: values});
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  const validate = (fieldValues = constructPre) => {
    let temp = { ...errors }
    if ('prefix' in fieldValues)
        temp.prefix = fieldValues.prefix ? "" : "This field is required."
    if ('meaning' in fieldValues)
        temp.prefix = fieldValues.meaning ? "" : "This field is required."
    if ('type' in fieldValues)
        temp.type = fieldValues.type ? "" : "This field is required."
    //if ('examples' in fieldValues)
    //    temp.examples = fieldValues.examples ? [""] : "This field is required."
    setErrors({
        ...temp
    })
    if (fieldValues == constructPre)
        return Object.values(temp).every(x => x == "")
}

  const handleSubmit = e => {
  }

  const handleSave = (e) => {
    e.preventDefault()
    console.log("ConstructPrefixEditor - handleSave - start");
    console.log("ConstructPrefixEditor - handleSave - start - constructPre.examples", constructPre.examples);
    if (constructPre.examples == undefined || constructPre.examples == null)
    {
      console.log("ConstructPrefixEditor - handleSave - Should show error that no example");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the example!",
      });
    } else if ((constructPre.examples.length == 0) || (constructPre.examples[0] ==""))
    {
      console.log("ConstructPrefixEditor - handleSave - Should show error that no example");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the example!",
      }); 
      setNotify({
        isOpen: true,
        message: "Example required.  Please enter and save again.",
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
  console.log("ConstructPrefixEditor - handleAddNew - Start")
  console.log("ConstructPrefixEditor - handleAddNew - formValues.modified = ", formValues.modified)
  if (formValues.modified)
  {
    setConfirmDialog({
      isOpen: true,
      title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
      subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
      onConfirm: () => {
        console.log("ConstructPrefixEditor - right before validate")
        if (validate()) {
          console.log("ConstructPrefixEditor - After validate right before save")
          addNewConstruct(); 
        }
      }
    }); 
  } else
  {
    console.log("ConstructPrefixEditor - in else when modified not true")
    addNewConstruct();
  }
}

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setconstructPre({...constructPre, [name] : value});
    console.log("ConstructPrefixEditor - handleInputChange - constructPre = ", constructPre);
    setFormValues({
      ...formValues,
      modified: true
    })
};

const handleExampleChange = (index, event) => {
  const values = constructPre.examples;
  values[index] =  event.target.value;
  setconstructPre({...constructPre, examples: values});
  setFormValues({
    ...formValues,
    modified: true
  })
};


  useEffect(() => {
    console.log(
      "ConstructPrefixEditor - Inside handleClick UseEffect constructPre = ",
      constructPre)
      setFormValues({...formValues, constructPrefix : constructPre, isError: false,
        errorMessage:""});
  }, [constructPre]);

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
            <Grid item xs={2}>
              <Controls.Input
                name="prefix"
                label="Prefix"
                multiline
                value={constructPre.prefix}
                onChange={event => handleInputChange(event)}
                error = {errors.prefix}
              />
            </Grid>
            <Grid item xs={10}>
            <Controls.Input
                name="meaning"
                label="Meaning"
                multiline
                value={constructPre.meaning}
                onChange={event => handleInputChange(event)}
                error = {errors.meaning}
              />
            </Grid>
            <Grid item xs={2}>
             <Controls.Select
                name="type"
                label="Type"
                value={constructPre.type}
                onChange={event => handleInputChange(event)}
                options={typeOptions}
                error = {errors.type}
              />
            </Grid>

            <Grid item xs={10}>
            <Controls.Input
                name="etymoloy"
                label="Etymology"
                multiline
                value={constructPre.etymoloy}
                onChange={event => handleInputChange(event)}
                error = {errors.etymoloy}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Typography>
                Example(s) - add one or more examples - list in order of preference
              </Typography>
            </div>
          </Grid>
          {constructPre.examples.map((example, index) => (
            <Fragment key={`${index}`}>
            <Grid container alignItems="center">
              <Grid item xs={8}>  
                <Controls.Input
                    name="example"
                    label="Example"
                    value={example}
                    multiline
                    onChange={event => handleExampleChange(index, event)}
                    error = {errors.examples}
                />
              </Grid>
              <Grid item xs={4}>  
                <Controls.Button
                    text="Add Example"
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
            text="Add Prefix"  
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
