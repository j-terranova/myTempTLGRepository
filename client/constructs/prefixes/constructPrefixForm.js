import React, { useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Popup from "../../components/shared/Popup";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../../controls/Controls";
import Icon from "@material-ui/core/Icon";
import { Form } from '../../components/shared/useForm';
import Notification from "../../components/shared/Notification";
import ImageSelectionContainer from "./../images/imageSelectionContainer";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "./../../lookupOptions/CriteriaOptions"

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

export default function ConstructPrefixForm(props) {
  const { formValues,
          setFormValues,
          validate,
          errors,
          groupsUserOwns,} = props;

const [openImageSelectionPopup, setOpenImageSelectionPopup] = useState(false);
const classes = useStyles();
const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

console.log("ConstructPrefixForm - Start " );
console.log("ConstructPrefixForm - formValues = ",formValues );

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

return (
<>
    <Form onSubmit={handleSubmit}>
    <Grid container alignItems="center" >
    {formValues.isError && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {formValues.errorMessage}
          </Typography>
        )}
        <br />
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
            disabled
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
      <Grid item xs={12} >
          <div>
              Access to be Applied to this prefix
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
              label="Approved-Public"
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
            label="Group Access"
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

    Tags applied to prefix-Criteria to define audience

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
  </>
  )
}
