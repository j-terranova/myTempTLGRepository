import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "../../controls/Controls";
import Icon from "@material-ui/core/Icon";
import { Redirect } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import { Form } from '../../components/shared/useForm';
import auth from "../../auth/auth-helper";

import ConfirmDialog from "../../components/shared/ConfirmDialog";
import Notification from "../../components/shared/Notification";
import { create, update } from "./api-gamerPreferences.js";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "../../lookupOptions/CriteriaOptions"
import { pageOptions } from "../../lookupOptions/PageOptions";
import { useUserData } from "../../contexts/UserDataContext";
import { useGamerPreferencesDispatch } from "../../contexts/GamerPreferencesContext";
import TicTacToeScoring from "../../utilities/scoring";

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

export default function GamerPreferencesForm(props) {
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
const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  title: "",
  subTitle: "",
});
const [redirectToSetup, setRedirectToSetup] = useState(false);
const jwt = auth.isAuthenticated();
const userId = jwt.user._id;
const userData = useUserData();
const [groupsUserOwns, setGroupsUserOwns] = useState ([]);
const gamerPreferencesDispatch = useGamerPreferencesDispatch();
const  levelOptions = TicTacToeScoring.gamerLevelOptions;

console.log("GamerPreferencesForm - Start " );
console.log("GamerPreferencesForm - formValues = ",formValues );

const [errors, setErrors] = useState({});
const [validateOnChange, setValidateOnChange] = useState(false);

const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
      setFormValues({
          ...formValues,
          [name]: value,
          modified: true,
      })
      if (validateOnChange)
          validate({ [e.target.name]: value })

 }

 useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  console.log (" gamerPreferencesForm - useEffect - to populate the groupsUserOwns = ",userData.groupsUserOwns)
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

const createNewGamerPreferences = () => {

  console.log(
    "GamerPreferencesForm - just before call to create preferences formValues = ",
    formValues
  );
  let newGamer =  {
      user_id: formValues.user_id,
      topic: formValues.topic ,
      myClass: formValues.myClass ,
      category:formValues.category ,
      subject: formValues.subject ,
      type: formValues.type ,
      subType: formValues.subType ,
      difficultyLevel: formValues.difficultyLevel ,
      ageRange: formValues.ageRange ,
      playerLevel: formValues.playerLevel ,
      preferredGamerLevel: formValues.preferredGamerLevel ,
      group_id: formValues.group_id ,
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
    newGamer
  ).then((data) => {
    if (!data) {
      console.log(
        "GamerPreferencesForm - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "Games not created! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "GamerPreferencesForm - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "Games not created! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        
        let newPreferences = formValues;
        newPreferences._id = data._id;
        gamerPreferencesDispatch({
          type: "SET_GAMERPREFERENCES",
          gamerPreferences: newPreferences,
        });
        setFormValues({...formValues,_id: data._id,modified: false,});
        checkCurrentCriteria(data);
        checkCurrentAccess(data);
        console.log("GamerPreferencesForm - after create - formValues = ", formValues );
        setNotify({
          isOpen: true,
          message: "Games Created",
          type: "success",
        });
      }
    }
  }); // End of Create function
};

const updateExistingGamerPreferences = () => {
  let updatedGamer =  {
    user_id: formValues.user_id,
    topic: formValues.topic ,
    myClass: formValues.myClass ,
    category:formValues.category ,
    subject: formValues.subject ,
    type: formValues.type ,
    subType: formValues.subType ,
    difficultyLevel: formValues.difficultyLevel ,
    ageRange: formValues.ageRange ,
    playerLevel: formValues.playerLevel ,
    preferredGamerLevel: formValues.preferredGamerLevel ,
    group_id: formValues.group_id ,
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
    updatedGamer
  ).then((data) => {
    if (!data) {
      console.log(
        "GamerPreferencesForm - No Data so dispatch, Check Criteria"
      );
      setNotify({
        isOpen: true,
        message: "Games not update! Please try again.. Notify Administrator if problem persists.",
        type: "error",
      });
    } else {
      if (data.error) {
        console.log(
          "GamerPreferencesForm - error returned = " + data.error
        );
        setNotify({
          isOpen: true,
          message: "Games not update! Please try again.. Notify Administrator if problem persists.",
          type: "error",
        });
      } else {
        setFormValues({...formValues, modified: false,});
        gamerPreferencesDispatch({
          type: "SET_GAMERPREFERENCES",
          gamerPreferences: formValues,
        });
        checkCurrentCriteria(formValues);
        checkCurrentAccess(formValues);
        setNotify({
          isOpen: true,
          message: "Games Updated",
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
    "GamerPreferencesForm - SaveEntries clicked before create/update formValues = ",
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
  console.log("GamerPreferencesForm - search for id =  ", formValues._id); 
  if (formValues._id.length > 0) {
    updateExistingGamerPreferences();
  } else {
    createNewGamerPreferences();
  }
  console.log("GamerPreferencesForm End of Save Entries !!");
};

const validate = (fieldValues = formValues) => {
    let temp = { ...errors }
    if ('topic' in fieldValues)
        temp.topic = fieldValues.topic ? "" : "This field is required."
    if ('gamerPreferences' in fieldValues)
        temp.gamerPreferences = fieldValues.gamerPreferences ? "" : "This field is required."
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
    if ('playerLevel' in fieldValues)
        temp.playerLevel = fieldValues.playerLevel ? "" : "This field is required."
    if ('preferredGamerLevel' in fieldValues)
        temp.preferredGamerLevel = fieldValues.preferredGamerLevel ? "" : "This field is required."

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

const handleSave = e => {
  e.preventDefault()

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

const handleExit = e => {
    e.preventDefault()

    if (formValues.modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before exiting",
        onConfirm: () => {
          if (validate()) {
            setTimeout(() => {
              setRedirectToSetup(true);
              console.log("gamerPreferencesForm - just before redirect to /setup");
          }, 500);   
          }
        }
      }); 
    } else
    {
      setRedirectToSetup(true);
    }
}

if (redirectToSetup) {
  return <Redirect to="/gamers" />;
}
return (
<>
    <Form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
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
        <Controls.Input
            name="topic"
            label="Topics of Interest"
            value={formValues.topic}
            onChange={handleInputChange}
            error={errors.topic}
        />

          <div>
          Game Playing Levels
          </div>
      <Controls.Select
            name="playerLevel"
            label="Player Level"
            classes={classes}
            value={formValues.playerLevel}
            onChange={handleInputChange}
            options={levelOptions}
            error={errors.playerLevel}
        />
      <Controls.Select
            name="preferredGamerLevel"
            label="Preferred Gamer Level"
            classes={classes}
            value={formValues.preferredGamerLevel}
            onChange={handleInputChange}
            options={levelOptions}
            error={errors.preferredGamerLevel}
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
    </Grid>     
    <Grid item xs={12}>

    </Grid>
    <Grid item xs={4}>
        <Controls.Button
            variant="contained"
            size="large"
            color = "secondary"
            onClick={handleSave}
            startIcon={<SaveIcon />}                                                
            className={classes.submit}
            text="  Save "                      
        />
      </Grid>
      <Grid item xs={4}>   
          <Controls.Button
              variant="contained"                       
              size="large"
              color = "secondary"
              onClick={handleExit}                                        
              endIcon={<ExitToAppIcon />}
              className={classes.submit}
              text="  Exit "
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
}
