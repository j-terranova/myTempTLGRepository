import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../../controls/Controls";
import Icon from "@material-ui/core/Icon";
import { Redirect } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import { Form } from '../../components/shared/useForm';
import auth from "./../../auth/auth-helper";

import Notification from "../../components/shared/Notification";
import { create, update } from "./api-constructPreferences.js";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "./../../lookupOptions/CriteriaOptions"
import { pageOptions } from "./../../lookupOptions/PageOptions";
import { useUserData } from "./../../contexts/UserDataContext";
import { useConstructPreferencesDispatch } from "./../../contexts/ConstructPreferencesContext";

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "40px",
      width: "120px"
    },
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

export default function ConstructPreferencesForm(props) {
  const { formValues,
          setFormValues,
          checkCurrentCriteria,
          checkCurrentAccess,
          formTitle,} = props;

const classes = useStyles();
const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
const [redirectToSetup, setRedirectToSetup] = useState(false);
const jwt = auth.isAuthenticated();
const userId = jwt.user._id;
const userData = useUserData();
const [groupsUserOwns, setGroupsUserOwns] = useState ([]);
const constructPreferencesDispatch = useConstructPreferencesDispatch();

console.log("ConstructPreferencesForm - Start " );
console.log("ConstructPreferencesForm - formValues = ",formValues );

const [errors, setErrors] = useState({});
const [validateOnChange, setValidateOnChange] = useState(false);

const handleInputChange = e => {
    const name = e.target.name;
    const value = name === "image" ? e.target.files[0] : e.target.value;
      setFormValues({
          ...formValues,
          [name]: value
      })
      if (validateOnChange)
          validate({ [e.target.name]: value })

 }

 useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  console.log (" constructAssociationContainer - useEffect - to populate the groupsUserOwns = ",userData.groupsUserOwns)
let groupOptions = []  
  if (userData.groupsUserOwns.length > 0)
  { 
    let groupsOwned = userData.groupsUserOwns;  
    groupOptions = groupsOwned.map(data => 
      {
          return { id : data._id, title : data.groupName }
      })
  } else 
  {
    groupOptions = 
      [{id:"", title: ""}];
  }
  setGroupsUserOwns(groupOptions);

  return function cleanup() {
    abortController.abort();
  };
}, []);

const createNewConstructPreferences = () => {

  console.log(
    "ConstructPreferencesForm - just before call to create preferences formValues = ",
    formValues
  );
  let newConstruct =  {
      user_id: formValues.user_id,
      topic: formValues.topic ,
      myClass: formValues.myClass ,
      category:formValues.category ,
      subject: formValues.subject ,
      type: formValues.type ,
      subType: formValues.subType ,
      difficultyLevel: formValues.difficultyLevel ,
      ageRange: formValues.ageRange ,
      group_id: formValues.group_id ,
      keepPrivate: formValues.keepPrivate ,
      rowsPerPage: formValues.rowsPerPage,
      themeBrightness: formValues.themeBrightness,
      primaryButtonColor: formValues.primaryButtonColor,
      primaryBackgroundColor: formValues.primaryBackgroundColor,    
      createDate:  Date.now(),
      updatedBy: formValues.updatedBy,
      updateDate:  Date.now(),
  }  
  create(
    {
      userId: userId,
    },
    {
      t: jwt.token,
    },
    newConstruct
  ).then((data) => {
    if (!data) {
      console.log(
        "ConstructPreferencesForm - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "Preferences not created! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "ConstructPreferencesForm - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "Preferences not created! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        
        let newPreferences = formValues;
        newPreferences._id = data._id;
        constructPreferencesDispatch({
          type: "SET_CONSTRUCTPREFERENCES",
          constructPreferences: newPreferences,
        });
        setFormValues({...formValues,_id: data._id});
        checkCurrentCriteria(data);
        checkCurrentAccess(data);
        console.log("ConstructPreferencesForm - after create - formValues = ", formValues );
        setNotify({
          isOpen: true,
          message: "Preferences Created",
          type: "success",
        });
      }
    }
  }); // End of Create function
};

const updateExistingConstructPreferences = () => {
  let updatedConstruct =  {
    user_id: formValues.user_id,
    topic: formValues.topic ,
    myClass: formValues.myClass ,
    category:formValues.category ,
    subject: formValues.subject ,
    type: formValues.type ,
    subType: formValues.subType ,
    difficultyLevel: formValues.difficultyLevel ,
    ageRange: formValues.ageRange ,
    group_id: formValues.group_id ,
    keepPrivate: formValues.keepPrivate ,
    rowsPerPage: formValues.rowsPerPage,
    themeBrightness: formValues.themeBrightness,
    primaryButtonColor: formValues.primaryButtonColor,
    primaryBackgroundColor: formValues.primaryBackgroundColor,    
    createDate:  formValues.createDate,
    updatedBy: formValues.updatedBy,
    updateDate:  Date.now(),
    _id: formValues._id,
}
update(
    {
      userId: userId,
    },
    {
      t: jwt.token,
    },
    updatedConstruct
  ).then((data) => {
    if (!data) {
      console.log(
        "ConstructPreferencesForm - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "Preferences not update! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "ConstructPreferencesForm - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "Preferences not update! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        constructPreferencesDispatch({
          type: "SET_CONSTRUCTPREFERENCES",
          constructPreferences: formValues,
        });
        checkCurrentCriteria(formValues);
        checkCurrentAccess(formValues);
        setNotify({
          isOpen: true,
          message: "Preferences Updated",
          type: "success",
        });
      }
    }
  }); // End of Update function
};

const SaveEntries = () => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log(
    "ConstructPreferencesForm - SaveEntries clicked before create/update formValues = ",
    formValues
  );
  if (
    formValues.myClass == null ||
    formValues.category == null ||
    formValues.subject == null ||
    formValues.difficultyLevel == null ||
    formValues.ageRange == null ||
    formValues.myClass.length == 0 ||
    formValues.category.length == 0 ||
    formValues.subject.length == 0 ||
    formValues.difficultyLevel.length == 0 ||
    formValues.ageRange.length == 0
  ) {
    setFormValues({
      ...formValues,
      isError: true,
      errorMessage:
        "Error alert!!! You must have an entry for all criteria entries before saving!",
    });
    return;
  } 
  console.log("ConstructPreferencesForm - search for id =  ", formValues._id); 
  if (formValues._id.length > 0) {
    updateExistingConstructPreferences();
  } else {
    createNewConstructPreferences();
  }
  console.log("ConstructPreferencesForm End of Save Entries !!");
};

const validate = (fieldValues = formValues) => {
    let temp = { ...errors }
    if ('topic' in fieldValues)
        temp.topic = fieldValues.topic ? "" : "This field is required."
    if ('constructPreferences' in fieldValues)
        temp.constructPreferences = fieldValues.constructPreferences ? "" : "This field is required."
    if ('myClass' in fieldValues)
        temp.myClass = fieldValues.myClass ? "" : "This field is required."
    if ('category' in fieldValues)
        temp.category = fieldValues.category ? "" : "This field is required."
    if ('subject' in fieldValues)
        temp.subject = fieldValues.subject ? "" : "This field is required."
    if ('difficultyLevel' in fieldValues)
        temp.difficultyLevel = fieldValues.difficultyLevel ? "" : "This field is required."
    if ('ageRange' in fieldValues)
        temp.ageRange = fieldValues.ageRange ? "" : "This field is required."
    setErrors({
        ...temp
    })
    if (fieldValues == formValues)
        return Object.values(temp).every(x => x == "")
}

const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      SaveEntries(); 
      console.log("Hurray!  Passed Validation!!!")
    }
}

const handleSaveEdit = e => {
    e.preventDefault()
    if (validate()) {
        SaveEntries();
        setTimeout(() => {
        console.log("constructPreferencesForm - just before redirect to /setup");
      }, 500);
    }
}
const handleSaveExit = e => {
    e.preventDefault()

    if (validate()) {
        SaveEntries();
        setTimeout(() => {
          setRedirectToSetup(true);
          console.log("constructPreferencesForm - just before redirect to /setup");
      }, 500);
        
    }
}
const handleCancelExit = e => {
  e.preventDefault()
  setRedirectToSetup(true);
}

if (redirectToSetup) {
  return <Redirect to="/setup" />;
}
return (
<>
    <Form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
        <Grid item xs={3}>
            <Controls.Input
                name="topic"
                label="Topic"
                value={formValues.topic}
                onChange={handleInputChange}
                error={errors.topic}
            />
        </Grid>
        <Grid item xs={9}>

        </Grid>
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

      </Grid>
      <Grid item xs={4}>
          <div>
              Access to be Applied to this preferences
          </div>
          <Controls.Checkbox
              name="keepPrivate"
              label="Keep Private"
              value={formValues.keepPrivate}
              onChange={handleInputChange}
          />
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

    <Grid item xs={4}>
          <div>
              Presentation Preferences
          </div>
          <Controls.Select
            name="rowsPerPage"
            label="Rows per page"
            classes={classes}
            value={formValues.rowsPerPage}
            onChange={handleInputChange}
            options={pageOptions}
            error={errors.rowsPerPage}
        />
          <Controls.Input
              name="themeBrightness"
              label="Screen brightness"
              value={formValues.themeBrightness}
              onChange={handleInputChange}
              error={errors.themeBrightness}
          />
                    <Controls.Input
              name="primaryButtonColor"
              label="primary button color"
              value={formValues.primaryButtonColor}
              onChange={handleInputChange}
              error={errors.primaryButtonColor}
          />
                    <Controls.Input
              name="primaryBackgroundColor"
              label="Background Color"
              value={formValues.primaryBackgroundColor}
              onChange={handleInputChange}
              error={errors.primaryBackgroundColor}
          />

    </Grid>

    <Grid item xs={4}>
    <div>

    Tags applied to preferences-Criteria to define audience

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

    <Grid item xs={4}>
        <Controls.Button
            variant="contained"
            size="large"
            color = "secondary"
            onClick={handleSaveEdit}
            startIcon={<SaveIcon />}                                                
            endIcon={<EditIcon />} 
            className={classes.submit}
            text="  Save'n Edit "                      
        />
      </Grid>
      <Grid item xs={4}>   
          <Controls.Button
              variant="contained"                       
              size="large"
              color = "secondary"
              onClick={handleSaveExit}
              startIcon={<SaveIcon />}                                               
              endIcon={<ExitToAppIcon />}
              className={classes.submit}
              text="  Save'n Exit "
          />
      </Grid>    
      <Grid item xs={4}>
          <Controls.Button
              variant="contained"
              size="large"
              color = "default"
              onClick={handleCancelExit}
              startIcon={<CancelIcon />}                                               
              endIcon={<ExitToAppIcon />}
              className={classes.submit}
              text=" Cancel'n Exit"
          />
      </Grid>    
      </Grid>
    </Form>
    <Notification notify={notify} setNotify={setNotify} />
  </>
  )
}
