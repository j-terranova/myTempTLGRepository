import React from "react";
import { useState } from "react";
import Controls from "./../controls/Controls";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";
import { makeStyles } from "@material-ui/core/styles";
import {listUsersByCriteria} from "./../user/api-user";

import Notification from "../components/shared/Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  error: {
    verticalAlign: "middle",
  },
  submit: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    direction: "column",
    position: "center",
    variant: "outlined",
    size: "small",
  },
}));

const Container = (props) => (
  <Grid container justify="space-around" {...props} />
);
const Item = (props) => <Grid item xs={12} {...props} />;

export default function FindUserCriteria(props) {
  const {
    setFindUserListing,
    setFindUserListingPreFilter,
  } = props;

  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [criteria, setCriteria] = useState({
    email: "", 
    name:  "", 
    lastName:  "", 
    });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setCriteria({...criteria, [name]: newValue });
    console.log(
      "findUserCriteria - handleInputChange " + name + " = " + newValue
    );
  };

  const clickSubmit = () => {
    console.log(
      "findUserCriteria - submit clicked before currentCriteria criteria = ",
      criteria
    );
    if (criteria.email != undefined && criteria.name != undefined && criteria.lastName != undefined)
    {
      if  (criteria.email.length > 0 || criteria.name.length > 0 || criteria.lastName.length > 0)
      {
        console.log("findUserCriteria -clickSubmit- inside if statement search Criteria = ", criteria);
        listUsersByCriteria(
          {
            userId: userId,
          },
          { email: criteria.email,
            name: criteria.name,
            lastName: criteria.lastName,
          },
          {
            t: jwt.token,
          },
        ).then((data) => {
          if (!data) {
            console.log(
              "findUserCriteria - clickSubmit - No Data , Check Criteria"
            );
            setFindUserListing([]);
            setFindUserListingPreFilter([]);
          } else {
            if (data.error) {
              console.log(
                "findUserCriteria - clickSubmit - error returned = " + data.error
              );
              setFindUserListing([]);
              setFindUserListingPreFilter([]);
            } else {
                console.log(
                  "findUserCriteria - clickSubmit - data = " + data
                );
                setFindUserListing(data);
                setFindUserListingPreFilter(data);
            }
          }
        });
      }
    }   
   };

  return (
    <>
      <div className={classes.root}>
        <Container spacing={1}>
          <Item xs={12}>
            <div>Filter Criteria (For list of Users)</div>
          </Item>
          <Item>
              <Controls.Input
                name="email"
                label="email"
                value={criteria.email}
                onChange={handleInputChange}
            />
          </Item>
          <Item>
              <Controls.Input
                name="lastName"
                label="Last Name"
                value={criteria.lastName}
                onChange={handleInputChange}
            />
          </Item>
          <Item>
            <Controls.Input
              name="name"
              label="Name"
              value={criteria.name}
              onChange={handleInputChange}
          />
          </Item>
          <Item xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={clickSubmit}
              className={classes.submit}
            >
              Apply Criteria
            </Button>
          </Item>
        </Container>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
