import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import auth from "./../auth/auth-helper";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { updateRemoveFromGroupMembership, updateAddToGroupMembership } from "./../user/api-user"
import GroupAccessListing from "./groupAccessListing"
import { listByOwner, remove } from "./api-groupAccess.js";
import { updateUserGroupsOwned } from "./../user/api-user.js";
import Notification from "../components/shared/Notification";
import ConfirmDialog from "../components/shared/ConfirmDialog";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

export default function GroupAccessContainer() {
  const classes = useStyles();

  const jwt = auth.isAuthenticated();
  const user = jwt.user;
  const userId = jwt.user._id
  console.log( "groupAccessContainer  " );
  const [groupAccessListing, setGroupAccessListing] = useState([]);
  const [groupAccessListingPreFilter, setGroupAccessListingPreFilter,] = useState([]);
  const [groupUsersAdded,setGroupUsersAdded] = useState([]);
  const [groupUsersRemoved,setGroupUsersRemoved] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
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

  console.log("groupAccessContainer Start");
  console.log("groupAccessContainer - groupAccessListing = ", groupAccessListing);
  
  const setSelectedRecord = (id) =>
  {
    const groupaccessToUpdate = getSelectedGroupAccess(id)
    setRecordForEdit(groupaccessToUpdate);
  }

  const getSelectedGroupAccess = (idToUpdate) => {
    console.log("constructListing - getSelectedGroupAccess idToUpdate = ", idToUpdate)
    const indexSelected = findMatchingIndex(idToUpdate);
    console.log("constructListing - getSelectedGroupAccess indexSelected = ", indexSelected)
    if (indexSelected >= 0)
    {
      console.log("constructListing - getSelectedGroupAccess groupAccessListing[indexSelected] = ", groupAccessListing[indexSelected])
      return groupAccessListing[indexSelected];
    } else
    { 
      console.log("constructListing - getSelectedGroupAccess returning null ")
      return null;
    }
  }

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("GroupAccessListing - search_id = ", search_id);
    for (var i = 0; i < groupAccessListing.length; i++) {
      console.log(
        "GroupAccessListing - groupAccessListing[i]._id = ",
        groupAccessListing[i]._id
      );
      if (groupAccessListing[i]._id == search_id) {
        index = i;
        console.log(
          "GroupAccessListing - _id match found index = ",
          index
        );
        break;
      }
    }
    return index;
  };
 
  const addGroupsToUserMembership = (idOfGroupToBeAdded) => {
    console.log("GroupAccessForm - addGroupsToUserMembership groupUsersAdded = ", groupUsersAdded  );
    for (let i=0; i<groupUsersAdded.length; i++ )
    {
      console.log("GroupAccessForm - addGroupsToUserMembership idOfGroupToBeAdded = ", idOfGroupToBeAdded  );
      const idOfUserToAdd=groupUsersAdded[i];
      console.log("GroupAccessForm - addGroupsToUserMembership idOfUserToAdd = ", idOfUserToAdd  );

      updateAddToGroupMembership(
        {
          userId: userId,
        },
        {
          t: jwt.token,
        },
        idOfUserToAdd,
        idOfGroupToBeAdded,
      ).then((data) => {
        if (!data) {
          console.log(
            "GroupAccessForm -addGroupsToUserMembership-Group Access not updated");
        } else {
          if (data.error) {
            console.log(
              "GroupAccessForm - addGroupsToUserMembership-error returned = " + data.error
            );
          } else {       
            console.log("GroupAccessForm - addGroupsToUserMembership-updated data = " + data );
            console.log("GroupAccessForm End of Update Entries !!");  
            if (i=== groupUsersAdded.length-1)
            {
              setGroupUsersAdded([]);
            }
          }
        }
      }); // End of Create function
      
    }
  }

  const removeGroupsFromUserMembership = (idOfGroupToBeRemoved) => {                     
    console.log("GroupAccessForm - removeGroupsFromUserMembership groupUsersRemoved = ", groupUsersRemoved  );
    for (let i=0; i<groupUsersRemoved.length; i++ )
    {
      const idOfUserToRemove=groupUsersRemoved[i];
      console.log("GroupAccessForm - removeGroupsFromUserMembership idOfGroupToBeRemoved = ", idOfGroupToBeRemoved  );
      console.log("GroupAccessForm - removeGroupsFromUserMembership idOfUserToRemove = ", idOfUserToRemove  );
      updateRemoveFromGroupMembership(
        {
          userId: userId,
        },
        {
          t: jwt.token,
        },
        idOfUserToRemove,
        idOfGroupToBeRemoved,
      ).then((data) => {
        if (!data) {
          console.log(
            "GroupAccessForm -addGroupsToUserMembership-Group Access not updated");
        } else {
          if (data.error) {
            console.log(
              "GroupAccessForm - addGroupsToUserMembership-error returned = " + data.error
            );
          } else {       
            console.log("GroupAccessForm - addGroupsToUserMembership-updated data = " + data );
            console.log("GroupAccessForm End of Update Entries !!");  
            if (i=== groupUsersRemoved.length-1)
            {
              setGroupUsersRemoved([]);
            }
          }
        }
      }); // End of updateRemoveFromGroupMembership function     
    }
  }

  
  const findIdInArray = (arrayToCheck, idToSearch) => {
    let foundIndex = -1;
    for (let i=0; i< arrayToCheck.length; i++)
    {
      if ( arrayToCheck[i] === idToSearch)
      {
        foundIndex = i;
        break;
      }
    } 
    return foundIndex;
  }
   
  const trackUsersAddedAndRemoved = (addedOrRemoved, idChanged) => {
  const addIndex = findIdInArray(groupUsersAdded, idChanged);
  const removeIndex = findIdInArray(groupUsersRemoved, idChanged);

  console.log("GroupAccessForm -trackUsersAddedAndRemoved-before Add/remove-groupUsersAdded", groupUsersAdded);
  console.log("GroupAccessForm -trackUsersAddedAndRemoved-before Add/remove-groupUsersRemoved", groupUsersRemoved);
  console.log("GroupAccessForm -trackUsersAddedAndRemoved-addedOrRemoved", addedOrRemoved);
  console.log("GroupAccessForm -trackUsersAddedAndRemoved-idChanged", idChanged);
  let newAddUsersTogroup = groupUsersAdded;
  let newRemoveUsersFromGroup = groupUsersRemoved
  if (addedOrRemoved ==="Add")
    {
      if (addIndex < 0)
      {
        newAddUsersTogroup.push(idChanged);
      }
      if (removeIndex >= 0)
      {
        newRemoveUsersFromGroup.splice(removeIndex,1)
      }
    } else if (addedOrRemoved ==="Remove")
   {
    if (removeIndex < 0)
     {
       newRemoveUsersFromGroup.push(idChanged);
     }
     if (addIndex >= 0)
     {
       newAddUsersTogroup.splice(addIndex,1)
     }
   }
   setGroupUsersAdded(newAddUsersTogroup);
   setGroupUsersRemoved(newRemoveUsersFromGroup);
 }

   const deleteGroup = (idToDelete) => {
    const indexToDelete = findMatchingIndex(idToDelete);
    console.log("GroupAccessForm - indexToDelete = " + indexToDelete );
    if (indexToDelete >= 0)
    {
      if (groupAccessListing[indexToDelete].owner_id === userId )
      {
        console.log("GroupAccessForm - deleteGroup() - userList = ", groupAccessListing[indexToDelete].userList );
        let userListToRemove = []
        for (let i =0; i<groupAccessListing[indexToDelete].userList.length; i++)
        {
          trackUsersAddedAndRemoved("Remove", groupAccessListing[indexToDelete].userList[i].id)
          userListToRemove.push(groupAccessListing[indexToDelete].userList[i].id);
        }
        console.log("GroupAccessForm - deleteGroup() - userListToRemove = ", userListToRemove );
        //setGroupUsersRemoved(userListToRemove);
        console.log("GroupAccessForm - deleteGroup() - selected = " + selected );
        remove(
          { groupId:  idToDelete}, 
          {t: jwt.token}).then((data) => {
          if (data.error) {
            console.log(data.error)
            setNotify({
              isOpen: true,
              message: "Group not removed! Please try again.. Notify Administrator if problem persists.",
              type: "error",
            });
          } else {
            console.log("GroupAccessForm - deleteGroup() - idToDelete = " + idToDelete );
            if (indexToDelete >= 0)
            { console.log("GroupAccessForm - deleteGroup() - indexToDelete >=0 = " + indexToDelete );
              setGroupAccessListing ( [...groupAccessListing.slice(0, indexToDelete), // everything before current post
                                      ...groupAccessListing.slice(indexToDelete + 1)]) // everything after current post
              setGroupAccessListingPreFilter (  [...groupAccessListingPreFilter.slice(0, indexToDelete), // everything before current post
                                              ...groupAccessListingPreFilter.slice(indexToDelete + 1) ])// everything after current post
              console.log("GroupAccessForm - deleteGroup() - userList = " + groupAccessListing[indexToDelete].userList );

              console.log("GroupAccessForm - deleteGroup() - userListToRemove = ", userListToRemove );
              console.log("GroupAccessForm - deleteGroup() - groupUsersRemoved = ", groupUsersRemoved );
              removeGroupsFromUserMembership(idToDelete);   
                  
            } 
            setNotify({
              isOpen: true,
              message: "Group removed",
              type: "success",
            });         
          }
        })
      }
      else
      {
        setNotify({
          isOpen: true,
          message: "You are NOT allowed to delete the group",
          type: "Only owners can delete their groups",
        });
      }
    }
    else
    {
      setNotify({
        isOpen: true,
        message: "You are NOT allowed to delete the group",
        type: "Only owners can delete their groups",
      });
    }
  }
 
  useEffect(() => {
    console.log(
      "GroupAccessListing - Inside useEffect after change to groupUsersAdded = ",
      groupUsersAdded
    );
    console.log(
      "GroupAccessListing - Inside useEffect after change to groupUsersRemoved = ",
      groupUsersRemoved
    );
  }, [groupUsersAdded,groupUsersRemoved]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
 
    listByOwner(
      { userId: userId, },
      { owner_id: userId, },
      { t: jwt.token, }
    ).then((data) => {
      if (!data) {
        console.log(
          "GroupAccessImport - No Data so dispatch, Check Criteria"
        );
        setGroupAccessListing([]);
        setGroupAccessListingPreFilter([]);
      } else {
        if (data.error) {
          console.log(
            "groupAccessListing - error returned = " + data.error
          );
          setGroupAccessListing([]);
          setGroupAccessListingPreFilter([]);
        } else if (data.length > 0) {
          console.log(
            "groupAccessListing - Update listing by ListByOwner =  ",
            data
          );
          setGroupAccessListing(data);
          setGroupAccessListingPreFilter(data);
        } else {
          setGroupAccessListing([]);
          setGroupAccessListingPreFilter([]);
        }
      }
    });
    setPage(0);
    return function cleanup() {
      abortController.abort();
    };
  }, []);

useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  console.log(
    "GroupAccessListing - Inside UseEffect for change (add/remove groups) to  groupAccessListing= ", groupAccessListing );
    if (groupAccessListing != undefined && groupAccessListing != null)
    {
      let listOfGroups = []
      for (let i = 0; i< groupAccessListing.length; i++)
      {
        console.log(
          "GroupAccessListing - Inside loop = groupAccessListing._id", groupAccessListing._id );
        listOfGroups.push(groupAccessListing[i]._id)
      }
      console.log(
        "GroupAccessListing - Inside UseEffect for change (add/remove users) to  listOfGroups= ", listOfGroups );
      updateUserGroupsOwned(
        { userId: userId, },
        { t: jwt.token, },
        listOfGroups,
      ).then((data) => {
        if (!data) {
          console.log(
            "groupAccessListing - User Groups owned not update"
          );
        } else {
          if (data.error) {
            console.log(
              "groupAccessListing - error returned = " + data.error
            );
          } else if (data.length > 0) {
            console.log(
              "groupAccessListing - User Groups owned updated =  ",
              data
            );
          }
        }
      });
    }   
    return function cleanup() {
      abortController.abort();
    };
  }, [groupAccessListing]);

  return (
    <>
    <div className={classes.root} >

      <CssBaseline />

      <Grid container spacing={0} justify="center" className={classes.container} >         
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <GroupAccessListing
                selected = {selected}
                setSelected = {setSelected}
                groupAccessListing ={groupAccessListing} 
                setGroupAccessListing = {setGroupAccessListing}
                groupAccessListingPreFilter = { groupAccessListingPreFilter}
                setGroupAccessListingPreFilter = {setGroupAccessListingPreFilter}
                groupUsersAdded = {groupUsersAdded}
                setGroupUsersAdded = {setGroupUsersAdded}
                groupUsersRemoved = {groupUsersRemoved}
                setGroupUsersRemoved = {setGroupUsersRemoved}
                recordForEdit = {recordForEdit} 
                setRecordForEdit = {setRecordForEdit}
                deleteGroup = { deleteGroup }
                setSelectedRecord = { setSelectedRecord }
                addGroupsToUserMembership = {addGroupsToUserMembership}
                removeGroupsFromUserMembership = {removeGroupsFromUserMembership}
                trackUsersAddedAndRemoved = {trackUsersAddedAndRemoved}
                page ={page}
                setPage = {setPage}
                /> 
              </Paper>
            </Grid>
           </Grid>
    </div>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          </>
  );
}
