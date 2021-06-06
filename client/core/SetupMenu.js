import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";

import ComponentsImage from "./../assets/images/freeImages/constructsImage.jpg";
import EducationImage from "./../assets/images/freeImages/educationImage.jpg";
import GameDevelopmentImage from "./../assets/images/freeImages/gameDevelopmentImage.jpg";
import FrameworkImage from "./../assets/images/freeImages/frameworksImage.jpg";
import GroupsImage from "./../assets/images/freeImages/groupsImage.jpg";
import AffiliationsImage from "./../assets/images/freeImages/affiliationsImage.jpg";
import PrintoutsImage from "./../assets/images/freeImages/printoutsImage.jpg";
import ImagesImage from "./../assets/images/freeImages/imagesImage.jpg";
import auth from "./../auth/auth-helper";
import { readById as readUserData } from "./../user/api-user.js";

import { useUserData, useUserDataDispatch } from "./../contexts/UserDataContext";


const tlgOptions = [
  {
  img: ComponentsImage,
  title: 'Component Definitions',
  featured: true,
  linkTo: "/constructs",
  },
  {
  img: EducationImage,
  title: 'Education & Training Setup',
  featured: true,
  linkTo: "/education",
  },
  {
  img: GameDevelopmentImage,
  title: 'Game Development & Setup',
  featured: true,
  linkTo: "/gameDevelopment",
  },
  {
  img: GroupsImage,
  title: 'Groups & Classes',
  linkTo: "/groups",
  },
  {
  img: AffiliationsImage,
  title: 'Affiliations',
  linkTo: "/affiliations"
  },
  {
  img: ImagesImage,
  title: 'Images',
  linkTo: "/images",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 625,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


export default function SetupMenu() {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const user = jwt.user;
  const userId = jwt.user._id;
  const userData = useUserData();
  const userDataDispatch = useUserDataDispatch();

  const GetUserData = () => {
    console.log("setupMenu - GetUserData -  Start  ");
    const abortController = new AbortController();
    const signal = abortController.signal;
    readUserData(
      {
        userId: userId,
      },
      {
        _id: userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (!data) {
        console.log(
          "setupMenu - GetUserData - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "setupMenu - GetUserData - No Data so error is returned data =: ",
            data
          );
          console.log(
            "setupMenu - GetUserData - No Data so error is returned data.error =: ",
            data.error
          );
        } else {
          console.log(
            "setupMenu - GetUserData - Right after data is returned userData =: ",
            data
          );
          userDataDispatch({
            type: "SET_USERDATA",
            userData: data,
          });
        }
      }
    });
  }
  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    GetUserData();
    
    return function cleanup() {
    abortController.abort();
    };
  }, []);
  
    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      console.log ("setupMenu - useEffect - userData = ", userData);
      
      return function cleanup() {
      abortController.abort();
      };
    }, [userData]);
  
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={3} spacing={5} className={classes.gridList}>
        {/*<GridListTile key="Subheader"  style={{ height: 'auto' }}>
          {/*<ListSubheader component="div"></ListSubheader>
        </GridListTile>*/}
        {tlgOptions.map((tlgOption) => (
          
            <GridListTile key={tlgOption.img}>
              <Link to={tlgOption.linkTo}>             
                <img src={tlgOption.img} alt={tlgOption.title} /> 
              <GridListTileBar
                title={tlgOption.title}
                to={tlgOption.linkTo}
                actionIcon={
                  <IconButton aria-label={`info about ${tlgOption.title}`} className={classes.icon} >            
                      <InfoIcon />
                  </IconButton>
                }
              />  
            </Link>
            </GridListTile>
          
        ))}
      </GridList>
    </div>
  );
}