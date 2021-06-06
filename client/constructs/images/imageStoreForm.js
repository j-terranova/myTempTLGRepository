import React, { useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import Controls from "./../../controls/Controls";
import Icon from "@material-ui/core/Icon";
import { Form } from '../../components/shared/useForm';
import Notification from "../../components/shared/Notification";
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

export default function ImageStoreForm(props) {
  const { formValues,
          setFormValues,
          validate,
          errors,
          groupsUserOwns,} = props;

const classes = useStyles();
const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

console.log("ImageStoreForm - Start " );
console.log("ImageStoreForm - formValues = ",formValues );

const handleInputChange = e => {
  
    const name = e.target.name;
    let value = "";
    let fileNameInternal = formValues.fileNameInternal;
    let fileNameExternal = formValues.fileNameExternal;
    let imageType = formValues.imageType;
    let imageBase64 = formValues.imageBase64
    let imageBinary = formValues.imageBinary
    console.log("ImageStoreForm - handleInputChange - name = ",name );
    if (name != "image")
    {
      value = e.target.value;
    } else
    {
      value = e.target.files[0];
      fileNameInternal = e.target.files[0].name;
      fileNameExternal =  e.target.files[0].name;
      imageType = e.target.files[0].type;
      imageBase64 = "";
      imageBinary = "";
    }
    console.log("ImageStoreForm - handleInputChange - value = ",value );
    setFormValues({
        ...formValues,
        [name]: value,
        fileNameInternal: fileNameInternal,
        fileNameExternal: fileNameExternal,
        imageBase64: imageBase64,
        imageBinary: imageBinary,
        imageType: imageType,
        modified: true,
    })
    validate({ [e.target.name]: value })
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
              Access to be Applied to this imageStore
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
        <input accept="image/*" name="image" onChange={handleInputChange} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Upload Image
              <FileUpload/>
            </Button>
          </label> <span className={classes.filename}>{formValues.image ? formValues.image.name : ''}</span><br/>
    </Grid>
    </Grid>
    </Grid>
    <Grid item xs={4}>
    <div>

    Tags applied to imageStore-Criteria to define audience

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
    <Notification notify={notify} setNotify={setNotify} />
  </>
  )
}
