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

export default function ConstructQuoteEditor(props) {
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

const [constructQuo, setconstructQuo] = useState(
    {
      quote: formValues.constructQuote.quote,
      author: formValues.constructQuote.author?formValues.constructQuote.author:"",
      sourceOrSituation: formValues.constructQuote.sourceOrSituation?formValues.constructQuote.sourceOrSituation:"",
      year: formValues.constructQuote.year?formValues.constructQuote.year:0,
    }
  );

  const validate = (fieldValues = constructQuo) => {
  let temp = { ...errors }
  if ('quote' in fieldValues)
      temp.quote = fieldValues.quote ? "" : "This field is required."
  //if ('proof' in fieldValues)
  //    temp.proof = fieldValues.proof ? [""] : "This field is required."
  //if ('contraryStatements' in fieldValues)
  //    temp.contraryStatements = fieldValues.contraryStatements ? [""] : "This field is required."

  setErrors({
      ...temp
  })
  if (fieldValues == constructQuo)
      return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = e => {
  }

  const handleSave = e => {
    e.preventDefault()
    console.log("ConstructQuoteEditor - handleSave - start");
    console.log("ConstructQuoteEditor - handleSave - start - constructQuo.proof", constructQuo.proof);
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

  const handleAddNew = () => {
    console.log("ConstructQuoteForm - handleAddNew - Start")
    console.log("ConstructQuoteForm - handleAddNew - formValues.modified = ", formValues.modified)
    if (formValues.modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
        onConfirm: () => {
          console.log("ConstructQuoteForm - right before validate")
          if (validate()) {
            console.log("ConstructQuoteForm - After validate right before save")
            addNewConstruct(); 
          }
        }
      }); 
    } else
    {
      console.log("ConstructQuoteForm - in else when modified not true")
      addNewConstruct();
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setconstructQuo({...constructQuo, [name] : value});
    console.log("ConstrucQuoteEditor - handleInputChange - constructQuo = ", constructQuo);
    setFormValues({
      ...formValues,
      modified: true
    })
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log(
      "ConstructQuoteEditor - Inside handleClick UseEffect constructQuo = ",
      constructQuo)
    setFormValues({...formValues, constructQuote : constructQuo, isError: false,
       errorMessage:""});
    return function cleanup() {
      abortController.abort();
    };
  }, [constructQuo]);

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
            <Grid item xs={6}>
              <Controls.Input
                name="quote"
                label="Quote"
                multiline
                value={constructQuo.quote}
                onChange={event => handleInputChange(event)}
                error = {errors.quote}
              />
            </Grid>
            <Grid item xs={2}>
            <Controls.Input
                name="author"
                label="Author"
                multiline
                value={constructQuo.author}
                onChange={event => handleInputChange(event)}
                error = {errors.author}
              />
            </Grid>
            <Grid item xs={2}>
            <Controls.Input
                name="sourceOrSituation"
                label="Source Or Situation"
                multiline
                value={constructQuo.sourceOrSituation}
                onChange={event => handleInputChange(event)}
                error = {errors.sourceOrSituation}
              />
            </Grid>
            <Grid item xs={2}>
            <Controls.Input
                name="year"
                label="Year"
                multiline
                value={constructQuo.year}
                onChange={event => handleInputChange(event)}
                error = {errors.year}
              />
            </Grid>
          </Grid>

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
            text="Add Quote"  
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
