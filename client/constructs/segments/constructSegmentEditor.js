import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../../controls/Controls";
import Grid from "@material-ui/core/Grid";
import { Form } from '../../components/shared/useForm';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import Notification from "../../components/shared/Notification";

import { Editor } from '@tinymce/tinymce-react';

// Key = kaibo0cer0y7n2n9tmjmr22cr831mkbulk761qqsv2acvxj4

//<script src="C:/Users/jterr/Documents/NodeProjects/TeachLearnGame/tinymce/js/tinymce/tinymce.min.js"></script>

// Import TinyMCE
//import tinymce from 'tinymce/tinymce';

// Default icons are required for TinyMCE 5.3 or above
//import 'tinymce/icons/default';

// A theme is also required
//import 'tinymce/themes/silver';

// Any plugins you want to use has to be imported
//import 'tinymce/plugins/paste';
//import 'tinymce/plugins/link';
/*
// Initialize the app
tinymce.init({
  selector: '#tiny',
  plugins: ['paste', 'link']
});
*/
  const useStyles = makeStyles((theme) => ({
    error: {
      verticalAlign: "middle",
    },
    title: {
      marginTop: theme.spacing(1),
      color: theme.palette.openTitle,
    },
    submit: {
      margin: "auto",
      marginBottom: theme.spacing(2),
    },
  }));

export default function ConstructSegmentEditor(props) {
  const{  formValues, 
          setFormValues,
          validate,
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

console.log("ConstructSegmentEditor - after update from recordForEdit, formValues = ",formValues );

const [initialConstructSegment, setInitialConstructSegment] = useState ( formValues.constructSegment) 

  const handleSave =  e=> {
    e.preventDefault()
    console.log("ConstructSegmentForm - handleSave - start");
    console.log("ConstructSegmentForm - handleSave - start - formValues.constructSegment", formValues.constructSegment);
    if (formValues.constructSegment == undefined || formValues.constructSegment  == null)
    {
      console.log("ConstructSegmentForm - handleSave - Should show error that no Reading Segment");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the Reading Segment!",
      });
    } else if ((formValues.constructSegment .length == 0) || (formValues.constructSegment  ==""))
    {
      console.log("ConstructSegmentForm - handleSave - Should show error that no Reading Segment");
      setFormValues({
        ...formValues,
        isError: true,
        errorMessage:
        "Error alert!!! You must have an entry for the Reading Segment!",
      }); 
      setNotify({
        isOpen: true,
        message: "Segment required.  Please enter and save again.",
        type: "error",
      });
    } else 
    {
     if (formValues.modified)
        {
          if (validate()) {
            SaveEntries()
            setInitialConstructSegment(formValues.constructSegment);
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


  const handleAddNew = e => {
    e.preventDefault()
    console.log("ConstructSegmentForm - handleAddNew - Start")
    console.log("ConstructSegmentForm - handleAddNew - formValues.modified = ", formValues.modified)
    if (formValues.modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
        onConfirm: () => {
          console.log("ConstructSegmentForm - right before addNewConstruct()")
            addNewConstruct(); 
        }
      }); 
    } else
    {
      console.log("ConstructSegmentForm - in else when modified not true")
      addNewConstruct();
    }
}

  const handleExit =  e=> {
    e.preventDefault()
    console.log('handleSave selected');
    if (formValues.modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes since last 'Save' have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before exiting",
        onConfirm: () => {
          setOpenPopup(false);
          setFormValues({ ...formValues, 
            constructSegment: initialConstructSegment,
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

  const handleEditorChange = (content, editor) => {
    console.log("ConstructSegmentForm - handleEditorChange - content = ", content)
    setFormValues({
      ...formValues,
      constructSegment: content,
      modified: true
    })
  }

  const handleSaveExit =  e=> {
    e.preventDefault()
    setInitialConstructSegment(formValues.constructSegment);
    SaveEntries();
    setOpenPopup(false);
}
// Key = kaibo0cer0y7n2n9tmjmr22cr831mkbulk761qqsv2acvxj4

  return (
  <>
    <Form onSubmit={handleSaveExit}>
      <h2>Reading Segment</h2>
      <h3>Ener Reading Segment you would like to share</h3>
      <Editor apiKey='kaibo0cer0y7n2n9tmjmr22cr831mkbulk761qqsv2acvxj4'

        initialValue={formValues.constructSegment}
        init={{
          height: 250,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            fontsizeselect| fontselect| forecolor | copy| cut| \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
        
      />
      <Grid container alignItems="center" spacing={3}>
    <Grid item xs={3} >
    &nbsp;&nbsp;&nbsp;&nbsp;
        <Controls.Button
            variant="contained"                       
            size="large"
            color = "secondary"
            onClick={handleSave}
            startIcon={<SaveIcon />}                                               
            className={classes.submit}
            text="Save "
            disabled = {okToUpdate?false:true}   
        />
            </Grid>
    <Grid item xs={3}>
        <Controls.Button
            variant="contained"
            size="large"
            color = "secondary"
            onClick={handleAddNew}                                           
            endIcon={<AddIcon />} 
            className={classes.submit}
            text="Add New"  
            disabled = {okToUpdate?false:true}                    
        />
    </Grid>
    <Grid item xs={3}>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Controls.Button
            variant="contained"
            size="large"
            color = "default"
            onClick={handleExit}                                          
            endIcon={<ExitToAppIcon />}
            className={classes.submit}
            text="Exit"
        />
        </Grid>
      </Grid>
    </Form>
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

  </>
  )
  //<input type="submit" value="Submit" />
}
