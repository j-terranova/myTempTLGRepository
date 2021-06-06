import React, { useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Popup from "../../components/shared/Popup";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../../controls/Controls";
import Icon from "@material-ui/core/Icon";
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import { Form } from '../../components/shared/useForm';
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import Notification from "../../components/shared/Notification";
import ImageSelectionContainer from "./../../constructs/images/imageSelectionContainer";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "./../../lookupOptions/CriteriaOptions"

import DisplayFrameworkOptions  from "../../lookupOptions/DisplayFrameworkOptions";
   
  const useStyles = makeStyles((theme) => ({
    error: {
      verticalAlign: "middle",
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
    },
    input: {
      display: "none",
      padding: "10px 14px",
    },
    filename: {
      marginLeft: "10px",
    },
  }));

export default function FrameworkLessonForm(props) {
  const { formValues,
          setFormValues,
          cloneCurrentFrameworkLesson,
          validate,
          errors,
          groupsUserOwns, } = props;

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

const [openComponentListingPopup, setOpenComponentListingPopup] = useState(false);
const cloneable = true;
const displayFrameworkOptions = DisplayFrameworkOptions();
const frameworkLayoutFormatOptions = displayFrameworkOptions.frameworkLayoutFormatOptions;
const frameworkResponseFormatOptions = displayFrameworkOptions.frameworkResponseFormatOptions;
const frameworkPresentationMethodOptions = displayFrameworkOptions.frameworkPresentationMethodOptions;
const frameworkSolutionMethodOptions = displayFrameworkOptions.frameworkSolutionMethodOptions;
const frameworkIncludeSpeechOptions = displayFrameworkOptions.frameworkIncludeSpeechOptions;
const frameworkIncludeTimerOptions = displayFrameworkOptions.frameworkIncludeTimerOptions;
const frameworkIncludeScoringOptions = displayFrameworkOptions.frameworkIncludeScoringOptions;
const frameworkColorOptions = displayFrameworkOptions.frameworkColorOptions;

console.log("FrameworkLessonForm - displayFrameworkOptions = ",displayFrameworkOptions );
console.log("FrameworkLessonForm - displayFrameworkOptions.frameworkLayoutOptions = ",displayFrameworkOptions.frameworkLayoutOptions );

console.log("FrameworkLessonForm - Start " );
console.log("FrameworkLessonForm - formValues = ",formValues );
console.log("FrameworkLessonForm - errors = ",errors );

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

const handleRequestClone = () => {
    if (validate()) {
      setConfirmDialog({
        isOpen: true,
        title: " Would you like to create a copy of the current lesson?",
        subTitle: "If confirmed, this option will create a new and separate copy of the current lesson.",
        onConfirm: () => {
          cloneCurrentFrameworkLesson();
        },
      });
   }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSelected([]);
    if (validate()) {
        console.log("Hurray!  Passed Validation!!!")
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
            <Grid item xs={9}>
            <Grid container>
            <Grid item xs={4}>
                <Controls.Input
                    name="topic"
                    label="Topic"
                    value={formValues.topic}
                    onChange={handleInputChange}
                    error={errors.topic}
                />
              </Grid>
              <Grid item xs={2}>
                  <Controls.Select
                      name="frameworkColor"
                      label="Color"
                      value={formValues.frameworkColor}
                      onChange={handleInputChange}
                      options={frameworkColorOptions}
                      error={errors.frameworkColor}
                  />
            </Grid>
            <Grid item xs={3}>
            <Controls.Button
                text=" Select Image "
                variant="contained"
                color = "inherit"
                component="span"
                endIcon={<FileUpload />}
                onClick={handleRequestImageSelection}
            />
                  </Grid>
                  <Grid item xs={3}>
                        <Controls.Button
                            text="Clone"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color = "primary"
                            size = "large"
                            endIcon={<AddIcon />}
                            onClick={handleRequestClone}
                        />
                    </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={6}>
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
           <Grid item xs={2}>
                  <Controls.Checkbox
                      name="frameworkIncludeSpeech"
                      label="Include Speech"                            
                      value={formValues.frameworkIncludeSpeech}
                      onChange={handleInputChange}
                      error={errors.frameworkIncludeSpeech}
                  />
                  </Grid>
                  <Grid item xs={2}>  
                  <Controls.Checkbox
                      name="frameworkIncludeTimer"
                      label="Include Timer"                            
                      value={formValues.frameworkIncludeTimer}
                      onChange={handleInputChange}
                      error={errors.frameworkIncludeTimer}
                  />
                  </Grid>
                  <Grid item xs={2}>
                  <Controls.Checkbox
                      name="frameworkIncludeScoring"
                      label="Include Score"                            
                      value={formValues.frameworkIncludeScoring}
                      onChange={handleInputChange}
                      error={errors.frameworkIncludeScoring}
                  />
                  </Grid>
                  </Grid>
                 
           <Grid container alignItems="center">
                <Grid item xs={3}>
                      <Controls.Select
                          name="frameworkLayoutFormat"
                          label="Layout Format"
                          value={formValues.frameworkLayoutFormat}
                          onChange={handleInputChange}
                          options={frameworkLayoutFormatOptions}
                          error={errors.frameworkLayoutFormat}
                      />
                  </Grid>
                  <Grid item xs={3}>
                      <Controls.Select
                          name="frameworkResponseFormat"
                          label="Response Format"
                          value={formValues.frameworkResponseFormat}
                          onChange={handleInputChange}
                          options={frameworkResponseFormatOptions}
                          error={errors.frameworkResponseFormat}
                      />
                  </Grid>
                  <Grid item xs={3}>
                      <Controls.Select
                          name="frameworkPresentationMethod"
                          label="Presentation Method"
                          value={formValues.frameworkPresentationMethod}
                          onChange={handleInputChange}
                          options={frameworkPresentationMethodOptions}
                          error={errors.frameworkPresentationMethod}
                      />
                  </Grid>

                  <Grid item xs={3}>
                      <Controls.Select
                          name="frameworkSolutionMethod"
                          label="Solution Method"
                          value={formValues.frameworkSolutionMethod}
                          onChange={handleInputChange}
                          options={frameworkSolutionMethodOptions}
                          error={errors.frameworkSolutionMethod}
                      />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div>

                        Access to be Applied to this lesson

                    </div>
                    </Grid>
                    <Grid container>
                    <Grid item xs={4} >
                    <Controls.Checkbox
                        name="keepPrivate"
                        label="Keep Private"
                        value={formValues.keepPrivate}
                        onChange={handleInputChange}
                    />
                              </Grid>
                     <Grid item xs={4} >
                    <Controls.Checkbox
                        name="approvedPublicReadAccess"
                        label="Approved For Public Read Access"
                        value={formValues.approvedPublicReadAccess}
                        disabled = "true"
                        onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
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
                </Grid>

                </Grid>
                <Grid item xs={3}>
                <div>

                Tags applied to lesson-Criteria to define audience

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