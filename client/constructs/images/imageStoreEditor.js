import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../../controls/Controls";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Form } from '../../components/shared/useForm';
import Icon from "@material-ui/core/Icon";
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
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

export default function ImageStoreEditor(props) {
  const{  formValues, 
          setFormValues,
          addNewImageStore,
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

  const handleSubmit = e => {
  }

  const validate = () => {
    return true
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    console.log (" imageStoreContainer - useEffect - formValues.imageStr = ",formValues.imageStr)


    return function cleanup() {
      abortController.abort();
    };
  }, [formValues.imageStr]);

  const handleSave = (e) => {
    e.preventDefault()
    console.log("ImageStoreEditor - handleSave - start");
    if (formValues.image == undefined || formValues.image == null)
    {
      console.log("ImageStoreEditor - handleSave - Should show error that no image");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the image!",
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
  console.log("ImageStoreEditor - handleAddNew - Start")
  console.log("ImageStoreEditor - handleAddNew - formValues.modified = ", formValues.modified)
  if (formValues.modified)
  {
    setConfirmDialog({
      isOpen: true,
      title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
      subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
      onConfirm: () => {
        console.log("ImageStoreEditor - right before validate")
        if (validate()) {
          console.log("ImageStoreEditor - After validate right before save")
          addNewImageStore(); 
        }
      }
    }); 
  } else
  {
    console.log("ImageStoreEditor - in else when modified not true")
    addNewImageStore();
  }
}

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormValues({ ...formValues, 
                    [name] : value,
                    modified: true
    })
};

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

        {formValues.isError && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {formValues.errorMessage}
          </Typography>
        )}
        {formValues.imageStr && <img src={formValues.imageStr}/>}
        {/*<img src={formValues.fileNameExternal}/>*/}
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
            text="Add ImageStore"  
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
