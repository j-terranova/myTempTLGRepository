import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import auth from "./../auth/auth-helper";

import Notification from "../components/shared/Notification";
import ConfirmDialog from "../components/shared/ConfirmDialog";

import FindUserListing from "./findUserListing"
import FindUserCriteria from "./findUserCriteria"
import {getOneByCriteria} from "./../user/api-user";

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

export default function FindUserContainer(props) {
  const { formValues,
          setFormValues,
          groupUserListing,
          setGroupUserListing,
          groupUserListingPreFilter ,
          setGroupUserListingPreFilter,
          setOpenUserSelectPopup,
          trackUsersAddedAndRemoved,
        } = props;

  const classes = useStyles();

  console.log( "findUserContainer  " );
  const [findUserListing, setFindUserListing] = useState([]); 
  const [findUserListingPreFilter, setFindUserListingPreFilter] = useState([]);
  const [selected, setSelected] = useState([]);
  
  const jwt = auth.isAuthenticated();
  const user = jwt.user;
  const userId = jwt.user._id
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

  const findMatchingIndex = (search_id) => {
    var index = -1;
    for (var i = 0; i < groupUserListing.length; i++) {
      console.log("FindUserListing - findMatchingIndex - search_id = ", search_id);
      console.log("FindUserListing - findMatchingIndex - groupUserListing[i].id = ", groupUserListing[i].id);
      if (groupUserListing[i].id === search_id) {
        index = i;
        console.log(
          "FindUserListing - id match found index = ",
          index
        );
        break;
      }
    }
    return index;
  };

const addSelectedUsers =  () => {
    console.log(
      "FindUserListing - Inside addSelectedUsers selected = ",
      selected
    );
    console.log(
      "FindUserListing - Inside addSelectedUsers selected.length = ",
      selected.length
    );

    let newUserDisplayList = groupUserListing ? groupUserListing : [{  id:     user._id,
                                                                    email:    user.email,
                                                                    name:     user.name,
                                                                    lastName: ""}];
    let id = user._id
    let newUserIdList = formValues.userList ? formValues.userList : [id];

    if (selected.length > 0)
    {
      for (let i = 0; i< selected.length; i++)
      {
        console.log(
          "FindUserListing - Inside addSelectedUsers UseEffect for newSelected selected = ",
          selected
        );
        const searchId = selected[i];
        console.log(
          "FindUserListing - Inside addSelectedUsers UseEffect for searchId = ",
          searchId
        );
        const index = findMatchingIndex(searchId)
        if (index === -1)
        {        
          getOneByCriteria(
            {
              userId: userId,
            },
            { _id: searchId,
            },
            {
              t: jwt.token,
            },
          ).then((data) => {
            if (!data) {
              console.log(
                "findUserlisting - addSelectedUsers - No Data , Check Criteria"
              );
            } else {
              if (data.error) {
                console.log(
                  "findUserlisting - useEffect - error returned = " + data.error
                );
              } else {
                  console.log(
                    "findUserlisting - useEffect - adding to groupUserListing - data[0]._id = " + data[0]._id
                  );
                  console.log(
                    "findUserlisting - useEffect - adding to groupUserListing - data[0].email = " + data[0].email
                  );
                  console.log(
                    "findUserlisting - useEffect - adding to groupUserListing - data[0].name = " + data[0].name
                  );
                  console.log(
                    "findUserlisting - useEffect - adding to groupUserListing - data[0].lastname = " + data[0].lastname
                  );
                  //let userData =data[0];
                    const newUser = {  id:     data[0]._id,
                                      email:    data[0].email,
                                      name:     data[0].name,
                                      lastName: data[0].lastName}
                    newUserDisplayList.push(newUser)
                    const id = data[0]._id
                    newUserIdList.push(id)

                    setGroupUserListing(newUserDisplayList)                 
                    setGroupUserListingPreFilter(newUserDisplayList) 
                    trackUsersAddedAndRemoved("Add", searchId)
                    setFormValues({...formValues, userList: newUserIdList})
                    console.log(
                      "findUserlisting - newUser = " + newUser
                    );
                    console.log(
                      "findUserlisting - newUserDisplayList = " + newUserDisplayList
                    );
                    console.log(
                      "findUserlisting - newUserIdList = " + newUserIdList
                    );

              }
            }
          });
        }
      }
    }
   
  }

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <FindUserListing
                  selected = {selected}
                  setSelected = {setSelected}
                  formValues = {formValues}
                  setFormValues = {setFormValues}
                  groupUserListing = {groupUserListing}
                  setGroupUserListing = {setGroupUserListing}
                  groupUserListingPreFilter = {groupUserListingPreFilter}
                  setGroupUserListingPreFilter = {setGroupUserListingPreFilter}
                  findUserListing ={findUserListing} 
                  setFindUserListing = {setFindUserListing}
                  findUserListingPreFilter = {findUserListingPreFilter} 
                  setFindUserListingPreFilter = {setFindUserListingPreFilter}
                  addSelectedUsers={addSelectedUsers}
                  setOpenUserSelectPopup = {setOpenUserSelectPopup}
                  addSelectedUsers = {addSelectedUsers}
                  page = {page} 
                  setPage = {setPage}
                /> 
              </Paper>
            </Grid>
            <Grid item xs={3}>
              {" "}
              <Paper className={classes.paper}>
                {" "}
                <FindUserCriteria 
                  setFindUserListing = {setFindUserListing}
                  setFindUserListingPreFilter = {setFindUserListingPreFilter}
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
