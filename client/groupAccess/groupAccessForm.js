import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "./../controls/Controls";
import Icon from "@material-ui/core/Icon";
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import { Form } from '../components/shared/useForm';
import auth from "./../auth/auth-helper";

import Notification from "../components/shared/Notification";
import { create, update } from "./api-groupAccess.js";
import GroupUserContainer from "./groupUserContainer";
import Popup from "../components/shared/Popup";
import ConfirmDialog from "../components/shared/ConfirmDialog";

  const useStyles = makeStyles((theme) => ({
    error: {
      verticalAlign: "middle",
    },
  }));

export default function GroupAccessForm(props) {
const classes = useStyles();
const { recordForEdit } = props;
const { setOpenPopup } = props;
const { groupAccessListing } = props;
const { setGroupAccessListing } = props;
const { groupAccessListingPreFilter } = props;
const { setGroupAccessListingPreFilter } = props;
const { setRecordForEdit } = props;
const { groupUsersAdded  } = props;
const { setGroupUsersAdded  } = props;
const { groupUsersRemoved  } = props;
const { setGroupUsersRemoved } = props;
const { addGroupsToUserMembership } = props;
const { removeGroupsFromUserMembership } = props;
const { trackUsersAddedAndRemoved } = props;

const [openGroupUserListingPopup, setOpenGroupUserListingPopup] = useState(false);
const [notify, setNotify] = useState({
  isOpen: false,
  message: "",
  type: "",
});
const [confirmDialog, setConfirmDialog] = useState({
  isOpen: false,
  groupName: "",
  groupDescription: "",
});

const jwt = auth.isAuthenticated();
console.log("GroupAccessForm - auth = ",auth );
console.log("GroupAccessForm - jwt = ",jwt );
const user = jwt.user;
console.log("GroupAccessForm - user = ",user );
const userId = jwt.user._id;
const groupOwner = (recordForEdit != null && recordForEdit.owner_id)  ? recordForEdit.owner_id: userId;
console.log("GroupAccessForm - recordForEdit = ",recordForEdit );

const initialUser = {id:    user._id,
                  email:  user.email,
                  name:   user.name,
                  lastName: ""};
const initialUserId = {userId}

console.log("GroupAccessForm - initialUser = ",initialUser );
console.log("GroupAccessForm - initialUser = ",initialUserId );

const [formValues, setFormValues] = useState(  {
                    owner_id: "",
                    groupName: "",
                    groupDescription:  "",
                    groupFunction: "",
                    role: "Contributor",
                    userList: [initialUserId],
                    userDisplayList: [initialUser],
                    markDeleted: false,
                    createDate:  Date.now(),
                    updatedBy:  userId,
                    updateDate:  Date.now(),
                    __v:  "0",
                    _id: "",
                    isError: false,
                    errorMessage: "",
                  });

console.log("GroupAccessForm - after update from recordForEdit, formValues = ",formValues );

const [errors, setErrors] = useState({});
const [validateOnChange, setValidateOnChange] = useState(true);

//SuperUser, Admin/Owner, Contributor, User/Student, Guest/Public
const roleOptions = [
  { id: "SuperUser" , title: "Super User"},
  { id: "Admin" , title: "Admin"},
  { id: "Owner" , title: "Owner"},
  { id: "Contributor" , title: "Contributor"},
  { id: "Student" , title: "Student"},
  { id: "StandardUser" , title: "Standard User"},
  { id: "Guest" , title: "Guest"},
]

useEffect(() => {
  console.log("GroupAccessForm - Inside useEffect to set formValues = ", formValues );
  let listOfUserIdsOnly = [];
  let listOfUserIdsPlusDisplay = [];
  if (recordForEdit != null)
  {
    console.log("GroupAccessForm - Inside useEffect recordForEdit NOT NULL = ", recordForEdit );
    if (recordForEdit.userList.length > 0)
    {
      console.log("GroupAccessForm - Inside useEffect recordForEdit Length > 0 = ", recordForEdit.userList.length );
      for (let i = 0; i < recordForEdit.userList.length; i++)
      {
        let id = recordForEdit.userList[i]._id;
        const em = recordForEdit.userList[i].email;
        const nm = recordForEdit.userList[i].name;
        const lnm = recordForEdit.userList[i].lastName;

        listOfUserIdsOnly.push(id)
        let newUser = {id:  id,
                    email:  em,
                     name:   nm,
                  lastName: lnm}

        listOfUserIdsPlusDisplay.push(newUser)
        console.log("GroupAccessForm - Inside For Loop ");
        console.log("GroupAccessForm - Inside useEffect to set listOfUserIdsOnly = ", listOfUserIdsOnly );
        console.log("GroupAccessForm - Inside useEffect to set listOfUserIdsPlusDisplay = ",listOfUserIdsPlusDisplay );
      }
    }
    else{
      console.log("GroupAccessForm - Inside useEffect recordForEdit Length < 0  ie, [] = ");
      let id =user._id
      listOfUserIdsOnly.push(id)
      let newUser = {id:    user._id,
                    email:  user.email,
                    name:   user.name,
                    lastName: ""}

      listOfUserIdsPlusDisplay.push(newUser )
    }
  }else{
    console.log("GroupAccessForm - Inside useEffect recordForEdit IS NULL " );
    let id =user._id
    listOfUserIdsOnly.push(id)
    let newUser = {id:    user._id,
                email:  user.email,
                name:   user.name,
                lastName: ""}

    listOfUserIdsPlusDisplay.push(newUser )
  }

  console.log("GroupAccessForm - Inside useEffect to set initialUserId = ",initialUserId );
  console.log("GroupAccessForm - Inside useEffect to set listOfUserIdsOnly = ", listOfUserIdsOnly );
  console.log("GroupAccessForm - Inside useEffect to set listOfUserIdsPlusDisplay = ",listOfUserIdsPlusDisplay );

 
  setFormValues({
    owner_id: (recordForEdit != null && recordForEdit.owner_id)  ? recordForEdit.owner_id: userId,
    groupName: (recordForEdit != null && recordForEdit.groupName)  ? recordForEdit.groupName: "",
    groupDescription:  (recordForEdit != null && recordForEdit.groupDescription)  ? recordForEdit.groupDescription : "",
    groupFunction: (recordForEdit != null && recordForEdit.groupFunction)  ? recordForEdit.groupFunction : "",
    role: (recordForEdit != null && recordForEdit.role)  ? recordForEdit.role :"Contributor",
    userList: (listOfUserIdsOnly != null && listOfUserIdsOnly.length > 0)  ? 
                      listOfUserIdsOnly : [ initialUserId],
    userDisplayList: (listOfUserIdsPlusDisplay != null && listOfUserIdsPlusDisplay.length > 0)  ? 
                      listOfUserIdsPlusDisplay : [ initialUser ],                                     
    markDeleted: (recordForEdit != null && recordForEdit.markDeleted)  ? recordForEdit.markDeleted : false,
    createDate: (recordForEdit != null && recordForEdit.createDate)  ? recordForEdit.createDate : Date.now(),
    updatedBy: (recordForEdit != null && recordForEdit.updatedBy)  ? recordForEdit.updatedBy : userId,
    updateDate: (recordForEdit != null && recordForEdit.updateDate)  ? recordForEdit.updateDate : Date.now(),
    __v: (recordForEdit != null && recordForEdit.__v)  ? recordForEdit.__v : "0",
    _id: (recordForEdit != null && recordForEdit._id)  ? recordForEdit._id : "",
    modified: false,
    isError: false,
    errorMessage: "",
  });
}, []);

const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({
        ...formValues,
        [name]: value
    })
    if (validateOnChange)
        validate({ [e.target.name]: value })
}

  const createNewGroupAccess = (groupAccessData) => {
    console.log("GroupAccessForm - createNewGroupAccess = ");
    console.log(
      "GroupAccessForm - just before call to create  groupAccessData = ",
      groupAccessData
    );
    create(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      groupAccessData
    ).then((data) => {
      if (!data) {
        console.log(
          "GroupAccessForm - Group Access not added");
          setNotify({
            isOpen: true,
            message: "Group not created! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
      } else {
        if (data.error) {
          console.log(
            "GroupAccessForm - error returned = " + data.error
          );
          setNotify({
            isOpen: true,
            message: "Group not created! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else
        {
          console.log(
            "GroupAccessForm - data good data = " + data
          );
          console.log(
            "GroupAccessForm - data good data._id = " + data._id
          );
          addGroupsToUserMembership(data._id);
          removeGroupsFromUserMembership(data._id);
          setGroupAccessListing([...groupAccessListing,
            {
              owner_id: groupAccessData.owner_id,
              groupName: groupAccessData.groupName,
              groupDescription: groupAccessData.groupDescription,
              groupFunction: groupAccessData.groupFunction,
              role: groupAccessData.role,
              userList: formValues.userDisplayList,
              markDeleted: groupAccessData.markDeleted,
              createDate: groupAccessData.createDate,
              updatedBy: groupAccessData.updatedBy,
              updateDate: groupAccessData.updateDate,
              __v: data.__v,
              _id: data._id,
            }
          ])
          setGroupAccessListingPreFilter([...groupAccessListingPreFilter,
            {
              owner_id: groupAccessData.owner_id,
              groupName: groupAccessData.groupName,
              groupDescription: groupAccessData.groupDescription,
              groupFunction: groupAccessData.groupFunction,
              role: groupAccessData.role,
              userList: formValues.userDisplayList,
              markDeleted: groupAccessData.markDeleted,
              createDate: groupAccessData.createDate,
              updatedBy: groupAccessData.updatedBy,
              updateDate: groupAccessData.updateDate,
              __v: data.__v,
              _id: data._id,
            }
          ])
          setFormValues ({...formValues,
                            __v: data.__v,
                            _id: data._id,
                            modified: false })

          setRecordForEdit(
            {                                     
                owner_id: groupAccessData.owner_id,
                groupName: groupAccessData.groupName,
                groupDescription: groupAccessData.groupDescription,
                groupFunction: groupAccessData.groupFunction,
                role: groupAccessData.role,
                userList: formValues.userDisplayList,
                markDeleted: groupAccessData.markDeleted,
                createDate: groupAccessData.createDate,
                updatedBy: groupAccessData.updatedBy,
                updateDate: groupAccessData.updateDate,
                __v: data.__v,
                _id: data._id,
            },
          )                 
          console.log("GroupAccessForm End of Save Entries !!");
          setNotify({
            isOpen: true,
            message: "Group Created",
            type: "success",
          });
        }
      }
    }); // End of Create function
  };

  const updateExistingGroupAccess = (groupAccessData) => {   
    console.log("GroupAccessForm - updateExistingGroupAccess = ");
    console.log(
      "GroupAccessForm - just before call to update groupAccessData = ",
      groupAccessData
    );
    update(
      {
        userId: userId,
      },
      {
        t: jwt.token,
      },
      groupAccessData
    ).then((data) => {
      if (!data) {
        console.log(
          "GroupAccessForm -Group Access not updated");
          setNotify({
            isOpen: true,
            message: "Group not update! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
      } else {
        if (data.error) {
          console.log(
            "GroupAccessForm - error returned = " + data.error
          );
          setNotify({
            isOpen: true,
            message: "Group not update! Please try again.. Notify Administrator if problem persists.",
            type: "error",
          });
        } else {       
          addGroupsToUserMembership(groupAccessData._id);
          removeGroupsFromUserMembership(groupAccessData._id);
          const indexToUpdate = findMatchingIndex(groupAccessData._id);
          console.log("GroupAccessForm - indexToUpdate = " + indexToUpdate );
          if (indexToUpdate >= 0)
          { setGroupAccessListing ([...groupAccessListing.slice(0, indexToUpdate), // everything before current post
                                    {
                                      owner_id: groupAccessData.owner_id,
                                      groupName: groupAccessData.groupName,
                                      groupDescription: groupAccessData.groupDescription,
                                      groupFunction: groupAccessData.groupFunction,
                                      role: groupAccessData.role,
                                      userList: formValues.userDisplayList,
                                      markDeleted: groupAccessData.markDeleted,
                                      createDate: groupAccessData.createDate,
                                      updatedBy: groupAccessData.updatedBy,
                                      updateDate: groupAccessData.updateDate,
                                      __v: groupAccessData.__v,
                                      _id: groupAccessData._id,
                                    },
                                    ...groupAccessListing.slice(indexToUpdate + 1), // everything after current post
                                  ])

            setGroupAccessListingPreFilter ([...groupAccessListingPreFilter.slice(0, indexToUpdate), // everything before current post
                                    {                                     
                                      owner_id: groupAccessData.owner_id,
                                      groupName: groupAccessData.groupName,
                                      groupDescription: groupAccessData.groupDescription,
                                      groupFunction: groupAccessData.groupFunction,
                                      role: groupAccessData.role,
                                      userList: formValues.userDisplayList,
                                      markDeleted: groupAccessData.markDeleted,
                                      createDate: groupAccessData.createDate,
                                      updatedBy: groupAccessData.updatedBy,
                                      updateDate: groupAccessData.updateDate,
                                      __v: groupAccessData.__v,
                                      _id: groupAccessData._id,
                                    },
                                    ...groupAccessListingPreFilter.slice(indexToUpdate + 1), // everything after current post
                                  ])
            setRecordForEdit(
              {                                     
                  owner_id: groupAccessData.owner_id,
                  groupName: groupAccessData.groupName,
                  groupDescription: groupAccessData.groupDescription,
                  groupFunction: groupAccessData.groupFunction,
                  role: groupAccessData.role,
                  userList: formValues.userDisplayList,
                  markDeleted: groupAccessData.markDeleted,
                  createDate: groupAccessData.createDate,
                  updatedBy: groupAccessData.updatedBy,
                  updateDate: groupAccessData.updateDate,
                  __v: groupAccessData.__v,
                  _id: groupAccessData._id,
              },
            )
            }
            setFormValues ({...formValues, modified: false })
            console.log("GroupAccessForm End of Update Entries !!");  
          setNotify({
            isOpen: true,
            message: "Statement Updated",
            type: "success",
          });
        }
      }
    }); // End of Create function
  };

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("GroupAccessForm - search_id = ", search_id);
    for (var i = 0; i < groupAccessListing.length; i++) {
      console.log(
        "GroupAccessForm - GroupAccessListing[i]._id = ",
        groupAccessListing[i]._id
      );
      if (groupAccessListing[i]._id == search_id) {
        index = i;
        console.log(
          "GroupAccessForm - _id match found index = ",
          index
        );
        break;
      }
    }
    return index;
  };

  useEffect(() => {
    console.log(
      "GroupAccessListing - Inside useEffect after change to groupAccessListing = ",
      groupAccessListing
    );
    console.log(
      "GroupAccessListing - Inside useEffect after change to groupAccessListingPreFilter = ",
      groupAccessListingPreFilter
    );
    console.log(
      "GroupAccessListing - Inside useEffect after change to recordForEdit = ",
      recordForEdit
    );
  }, [groupAccessListing, groupAccessListingPreFilter, recordForEdit]);

  const saveEntries = () => {
    console.log("GroupAccessForm - saveEntries clicked before update see formValues = ", formValues  );
    const newDate = Date.now()
    console.log("GroupAccessForm - search for formValues._id =  ", formValues._id);
    let groupAccessData = {
      owner_id: formValues.owner_id,
      groupName: formValues.groupName,
      groupDescription: formValues.groupDescription,
      groupFunction: formValues.groupFunction,
      role: formValues.role,
      userList: formValues.userList,
      markDeleted: formValues.markDeleted,
      createDate: formValues.createDate,
      updatedBy: formValues.updatedBy,
      updateDate: formValues.updateDate,
    }
    if ((formValues._id === undefined) || (formValues._id === null)  ||  (formValues._id === "" ))
     {
        groupAccessData.createDate = newDate;
        groupAccessData.updateDate = newDate;

       setFormValues({...formValues,createDate: newDate,
                                    updateDate: newDate, 
                                    modified: true})
       createNewGroupAccess(groupAccessData);
       // Do not need to modify the user groups if it is being created for the first time
       // But the update lists need to be emptied so only changes are recorded going forward
    } else {
      //Update
      groupAccessData.updateDate = newDate;
      groupAccessData.__v = formValues.__v;
      groupAccessData._id = formValues._id;
      setFormValues({...formValues, updateDate: newDate, modified: true})
      console.log("GroupAccessForm - saveEntries clicked -  before call to updateExistingGroupAccess groupAccessData = ", groupAccessData  );
      updateExistingGroupAccess(groupAccessData); 
    }
  };
  
  const validate = (fieldValues = formValues) => {
      let temp = { ...errors }
      if ('groupName' in fieldValues)
          temp.groupName = fieldValues.groupName ? "" : "This field is required."
      if ('groupDescription' in fieldValues)
          temp.groupDescription = fieldValues.groupDescription ? "" : "This field is required."
      if ('groupFunction' in fieldValues)
          temp.groupFunction = fieldValues.groupFunction ? "" : "This field is required."
      if ('role' in fieldValues)
          temp.role = fieldValues.role ? "" : "This field is required."
      if ('userList' in fieldValues)
          temp.userList = fieldValues.userList ? "" : "This field is required."

      setErrors({
          ...temp
      })
      console.log("Inside Validate temp =", temp)
      console.log("Inside Validate errors =", errors)
      if (fieldValues == formValues)
          return Object.values(temp).every(x => x == "")
  }

  const isNameUnique = () =>{
    let nameUnique = true;
    console.log("groupAccessForm - isNameUnique ")
    for (let i=0; i< groupAccessListing.length; i++)
    {
      console.log("groupAccessForm - isNameUnique - formValues.groupName =", formValues.groupName);
      console.log("groupAccessForm - isNameUnique - groupAccessListing[i].groupName =", groupAccessListing[i].groupName);
      if (formValues.groupName === groupAccessListing[i].groupName)
      {
        nameUnique = false;
        console.log("groupAccessForm - isNameUnique  match found!!!  nameUnique = ", nameUnique)
        break;
      }
    }
    return nameUnique;
  }

  const handleSubmit = e => {
      e.preventDefault()
      let okToSave = true;
      console.log("groupAccessForm - handleSubmit ")
      if (!isNameUnique())
      {
        setFormValues ({  ...formValues, 
                          isError: true,
                          errorMessage: "Group NOT Saved!  Group Name must be unique for each user!!!" })
        okToSave = false;
      }
      console.log("groupAccessForm - handleSubmit okToSave = ", okToSave)
      if (okToSave && validate()) {
        saveEntries(true); 
        console.log("Hurray!  Submitted and Passed Validation!!!")
      }
  }

  const handleSave = e => {
    console.log("Inside Handle Save!")
    console.log("Inside Handle Save validate() = ", validate())
      e.preventDefault()
      let okToSave = true;
      console.log("groupAccessForm - handleSave ")
      if (!isNameUnique())
      {
        setFormValues ({  ...formValues, 
        isError: true,
        errorMessage: "Group NOT Saved!  Group Name must be unique for each user!!!" })
        okToSave = false
      }
      console.log("groupAccessForm - handleSave okToSave = ", okToSave)  
      if (okToSave && validate()) {
        console.log("Inside Handle Save -  inside validate() = true")
        saveEntries();
        console.log("Hurray!  Saved and Passed Validation!!!")
      }
  }
    return (
    <>
        <Form onSubmit={handleSubmit}>
            <Grid container alignItems="center">
            <Grid item xs={4}>
              <div>

              Name must be unique within your list

              </div>
                <Controls.Input
                    name="groupName"
                    label="Group Name"
                    value={formValues.groupName}
                    //margin="dense"
                    onChange={handleInputChange}
                    error={errors.groupName}
                />
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
                    <Controls.Input
                        name="groupDescription"
                        label="Description"
                        value={formValues.groupDescription}
                        onChange={handleInputChange}
                        error={errors.groupDescription}
                    />
                    <Controls.Input
                        name="groupFunction"
                        label="Function"
                        value={formValues.groupFunction}
                        onChange={handleInputChange}
                        error={errors.groupFunction}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>

                        Define Role of all users in this group Suggest Contributor be used

                    </div>
                    <Controls.Select
                        name="role"
                        label="Role"
                        classes={classes}
                        value={formValues.role}
                        onChange={handleInputChange}
                        options={roleOptions}
                        error={errors.role}
                    />
                </Grid>
                <Grid item xs={6}>

                 Press button to bring up a screen to add and update the user list

                     <Controls.Button
                        text="User List"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color = "primary"
                        endIcon={<AddIcon />}
                        onClick={() => { 
                          setOpenGroupUserListingPopup(true); 
                           }}
                    />  
                </Grid>
                    <Grid item xs={3}>
                        <Controls.Button
                            text="Save"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color = "primary"
                            endIcon={<AddIcon />}
                            onClick={handleSave}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controls.Button
                            text=" Exit"
                            startIcon={<CancelIcon />}
                            variant="contained"
                            color = "default"
                            //margin="dense"
                            endIcon={<ExitToAppIcon />}
                            onClick={() => { 
                              setOpenPopup(false); 
                               }}
                        />
                    </Grid>    
                </Grid>
        </Form>
        <Popup
          title="List of Users in the Group"
          openPopup={openGroupUserListingPopup}
          setOpenPopup={setOpenGroupUserListingPopup}
      >
          <GroupUserContainer
              formValues={formValues}
              setFormValues={setFormValues}
              groupOwner={groupOwner}
              saveEntries={saveEntries}
              setOpenGroupUserListingPopup={setOpenGroupUserListingPopup}
              trackUsersAddedAndRemoved = {trackUsersAddedAndRemoved}
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
