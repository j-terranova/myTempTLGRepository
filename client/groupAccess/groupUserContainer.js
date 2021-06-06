import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import auth from "./../auth/auth-helper";
import Notification from "../components/shared/Notification";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import GroupUserListing from "./groupUserListing"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function GroupUserContainer(props) {
  const {
    formValues,
    setFormValues,
    groupOwner,
    saveEntries,
    setOpenGroupUserListingPopup,
    trackUsersAddedAndRemoved,
  } = props;

const classes = useStyles();

  console.log( "groupUserContainer  " );
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [selected, setSelected] = useState([]);
  const jwt = auth.isAuthenticated();
  const user = jwt.user;
  const userId = jwt.user._id
  const [page, setPage] = useState(0);

  const [
    groupUserListing,
    setGroupUserListing,
  ] = useState(formValues.userDisplayList);
  const [
    groupUserListingPreFilter,
    setGroupUserListingPreFilter,
  ] = useState(formValues.userDisplayList);
  const [aferFirstPass, SetAfterFirstPass] = useState(false)
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

  console.log( "groupUserContainer formValues.userList = ", formValues.userList );
  console.log( "groupUserContainer formValues.userDisplayList = ", formValues.userDisplayList );
  console.log( "groupUserContainer groupUserListing = ", groupUserListing );

  const setSelectedRecord = (id) =>
  {
    const groupAccessToUpdate = getSelectedGroupUser(id)
    setRecordForEdit(groupAccessToUpdate);
  }

  const getSelectedGroupUser = (idToUpdate) => {
    console.log("groupUserListing - getSelectedGroupUser idToUpdate = ", idToUpdate)
    const indexSelected = findMatchingIndex(groupUserListing, idToUpdate);
    console.log("groupUserListing - getSelectedGroupUser indexSelected = ", indexSelected)
    if (indexSelected >= 0)
    {
      console.log("groupUserListing - getSelectedGroupUser groupUserListing[indexSelected] = ", groupUserListing[indexSelected])
      return groupUserListing[indexSelected];
    } else
    { 
      console.log("groupUserListing - getSelectedGroupUser returning null ")
      return null;
    }
  }

  const findMatchingIndex = (listingToSearch, search_id) => {
    var index = -1;
    console.log("GroupUserListing - search_id = ", search_id);
    for (var i = 0; i < listingToSearch.length; i++) {
      console.log(
        "GroupUserListing - groupUserListing[i].id = ",
        listingToSearch[i].id
      );
      if (listingToSearch[i].id == search_id) {
        index = i;
        console.log(
          "GroupUserListing - id match found index = ",
          index
        );
        break;
      }
    }
    return index;
  };

  const removeSelectedUsers =  () => {
    console.log(
      "GroupUserListing - Inside addSelectedUsers selected = ",
      selected
    );
    console.log(
      "GroupUserListing - Inside addSelectedUsers selected.length = ",
      selected.length
    );
    if (groupOwner === userId )
    {
      if (selected.length > 0)
      {
        let newUserIdList = formValues.userList;
        let newUserDisplayList = formValues.userDisplayList;
        for (let i = 0; i < selected.length; i++)
        {
          console.log(
            "GroupUserListing - Inside addSelectedUsers UseEffect for newSelected selected = ",
            selected
          );
          const searchId = selected[i];
          console.log(
            "GroupUserListing - Inside addSelectedUsers UseEffect for searchId = ",
            searchId
          );
          const indexToDelete = findMatchingIndex(newUserDisplayList,searchId)
          if (indexToDelete >= 0)
            {
              console.log("GroupUserListing - deleteUser() - newUserDisplayList[indexToDelete].email = " + newUserDisplayList[indexToDelete].email );
              console.log("GroupUserListing - deleteUser() - user = " + user.email );
            if (newUserDisplayList[indexToDelete].email != user.email)
            { console.log("GroupUserListing - deleteUser() - indexToDelete >=0 = " + indexToDelete );
              newUserIdList.splice(indexToDelete,1);
              newUserDisplayList.splice(indexToDelete,1);
              trackUsersAddedAndRemoved("Remove", searchId)
            }
          }
        }
        setGroupUserListing (newUserDisplayList)
        setGroupUserListingPreFilter ( newUserDisplayList)
        setFormValues({...formValues, userList: newUserIdList, userDisplayList: newUserDisplayList})
      }
    }
   
  }

  useEffect(() => {
    console.log(
      "GroupAccessListing - Inside UseEffect for change (add/remove users) to  groupUserListing= ", groupUserListing );

      if (aferFirstPass)
      {
        let listOfUsers = []
        for (let i = 0; i< groupUserListing.length; i++)
        {
          listOfUsers.push(groupUserListing.id)
        }
      }
      
      SetAfterFirstPass(true)

  }, [groupUserListing]);

    return (
    <>
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <GroupUserListing
                  formValues={formValues}
                  setFormValues={setFormValues}
                  saveEntries = {saveEntries}
                  groupUserListing  = {groupUserListing}
                  setGroupUserListing = {setGroupUserListing}
                  groupUserListingPreFilter = {groupUserListingPreFilter}
                  setGroupUserListingPreFilter = {setGroupUserListingPreFilter}
                  setOpenGroupUserListingPopup={setOpenGroupUserListingPopup}
                  setSelectedRecord = {setSelectedRecord}
                  removeSelectedUsers = {removeSelectedUsers}
                  trackUsersAddedAndRemoved = {trackUsersAddedAndRemoved}
                  setRecordForEdit = {setRecordForEdit}
                  selected = {selected} 
                  setSelected = {setSelected} 
                  page = {page}
                  setPage = {setPage}
                /> 
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
    </>
  );
}

