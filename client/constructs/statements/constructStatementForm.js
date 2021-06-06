import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Popup from "../../components/shared/Popup";
import Typography from "@material-ui/core/Typography";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../../controls/Controls";
import Icon from "@material-ui/core/Icon";
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Form } from '../../components/shared/useForm';
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import Notification from "../../components/shared/Notification";
import Divider from "@material-ui/core/Divider";
import ImageSelectionContainer from "./../images/imageSelectionContainer";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "./../../lookupOptions/CriteriaOptions"
import Filter from 'bad-words';

  const useStyles = makeStyles((theme) => ({
    error: {
      verticalAlign: "middle",
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
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

export default function ConstructStatementForm(props) {
        const { formValues,
                setFormValues,
                validate,
                errors,
                groupsUserOwns,
                addNewConstruct,
                SaveEntries,
                setOpenPopup,
                okToUpdate,} = props;

const [openImageSelectionPopup, setOpenImageSelectionPopup] = useState(false);
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

var badWordFilter = new Filter();
var newBadWords = ['shit', 'crap', 'poop'];
badWordFilter.addWords(...newBadWords);

console.log("ConstructStatementForm - Start " );
console.log("ConstructStatementForm - formValues = ",formValues );

const handleInputChange = e => {
    const name = e.target.name;
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setFormValues({
        ...formValues,
        [name]: value,
        modified: true,
    })
    validate({ [e.target.name]: value })

}  

const handleRequestImageSelection = () => {
  setOpenImageSelectionPopup(true);
} 

const handleSubmit = e => {
}

const handleSave = (e) => {
e.preventDefault()
console.log("ConstructStatementForm - handleSave - start");
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
console.log("ConstructStatementForm - handleAddNew - Start")
console.log("ConstructStatementForm - handleAddNew - formValues.modified = ", formValues.modified)
if (formValues.modified)
{
  setConfirmDialog({
    isOpen: true,
    title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
    subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before adding a new entry",
    onConfirm: () => {
      console.log("ConstructStatementForm - right before validate")
      if (validate()) {
        console.log("ConstructStatementForm - After validate right before save")
        addNewConstruct(); 
      }
    }
  }); 
} else
{
  console.log("ConstructStatementForm - in else when modified not true")
  addNewConstruct();
}
}

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
                  {formValues.isError && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {formValues.errorMessage}
          </Typography>
        )}
        <br />
        <Grid item xs={12}>
          <Controls.Input
              name="constructStatement"
              label="Statement"
              value={formValues.constructStatement}
              onChange={handleInputChange}
              error={errors.constructStatement}
          />
      </Grid>
      <Divider/>
      <Grid container >
      <Grid item xs={2}>
        <Controls.Button
            variant="contained"
            size="large"
            color = "secondary"
            onClick={handleSave}
            startIcon={<SaveIcon />}                                                
            endIcon={<EditIcon />} 
            className={classes.submit}
            text="Save" 
            disabled = {okToUpdate?false:true}                     
        />
      </Grid>
      <Grid item xs={3}>   
          <Controls.Button
              variant="contained"                       
              size="large"
              color = "secondary"
              onClick={handleAddNew}
              startIcon={<AddIcon />}                                               
              className={classes.submit}
              text="Add Statement"
              disabled = {okToUpdate?false:true}
          />
      </Grid>    
      <Grid item xs={3}>
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
      <Divider/>
      <Grid item xs={8}>
        <Grid container >
         <Grid item xs={6}>
            <Controls.Input
                name="topic"
                label="Topic"
                value={formValues.topic}
                onChange={handleInputChange}
                error={errors.topic}
            />
        </Grid>
        <Grid item xs={6}>
        <Controls.Checkbox
        name="markDeleted"
        label="Marked Deleted"                            
        value={formValues.markDeleted}
        onChange={handleInputChange}
    />
    </Grid>
    </Grid>
        <Grid item xs={12}>
        <Controls.Input
                    name="description"
                    label="Description"
                    multiline
                    rowsMax={4}
                    value={formValues.description}
                    onChange={handleInputChange}
                    error={errors.description}
                />
        </Grid>

      <Grid item xs={12}>
          <div>
              Access to be Applied to this statement
          </div>
          </Grid>
          <Grid container >
          <Grid item xs={6} >
          <Controls.Checkbox
              name="keepPrivate"
              label="Keep Private"
              value={formValues.keepPrivate}
              onChange={handleInputChange}
          />
          </Grid>
          <Grid item xs={6} >
          <Controls.Checkbox
              name="approvedPublicReadAccess"
              label="Approved For Public Read Access"
              value={formValues.approvedPublicReadAccess}
              disabled = "true"
              onChange={handleInputChange}
          />
                   </Grid>
        </Grid>
        <Grid container >
        <Grid item xs={6}>
        <Controls.Select
            name="group_id"
            label="Name of Group With Access"
            classes={classes}
            value={formValues.group_id}
            onChange={handleInputChange}
            options={groupsUserOwns}
            error={errors.group_id}
        />
                </Grid>
        <Grid item xs={6}>
        <Controls.Button
                text=" Select Image "
                variant="contained"
                color = "inherit"
                component="span"
                endIcon={<FileUpload />}
                onClick={handleRequestImageSelection}
            />
    </Grid>
    </Grid>
    </Grid>
    <Grid item xs={4}>
    <div>

    Tags applied to statement-Criteria to define audience

    </div>
    <Controls.Select
            name="myClass"
            label="Class"
            classes={classes}
            value={formValues.myClass}
            onChange={handleInputChange}
            options={myClassOptions}
            error={errors.myClass}
        />
        <Controls.Select
            name="category"
            label="Category"
            value={formValues.category}
            onChange={handleInputChange}
            options={categoryOptions}
            error={errors.category}
        />
        <Controls.Select
            name="subject"
            label="Subject"
            value={formValues.subject}
            onChange={handleInputChange}
            options={subjectOptions}
            error={errors.subject}
        />
        <Controls.Select
            name="difficultyLevel"
            label="Difficulty Level"
            value={formValues.difficultyLevel}
              onChange={handleInputChange}
            options={difficultyLevelOptions}
            error={errors.difficultyLevel}
        />
        <Controls.Select
            name="ageRange"
            label="Age Range"
            value={formValues.ageRange}
            onChange={handleInputChange}
            options={ageRangeOptions}
            error={errors.ageRange}
        />
    </Grid>   
    </Grid>    
    </Form>
    <Popup
          title="Image Selection"
          openPopup={openImageSelectionPopup}
          setOpenPopup={setOpenImageSelectionPopup}
      >
          <ImageSelectionContainer
              setOpenImageSelectionPopup={setOpenImageSelectionPopup}
              formValues={formValues}
              setFormValues={setFormValues}
          />
      </Popup>
    <Notification notify={notify} setNotify={setNotify} />
    <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
  </>
  )
}
