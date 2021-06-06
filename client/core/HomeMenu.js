import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";

import GamersImage from "./../assets/images/freeImages/gamersImage.jpg";
import TeachersImage from "./../assets/images/freeImages/teachersImage.jpg";
import LearnersImage from "./../assets/images/freeImages/learnersImage.jpg";
import SetupImage from "./../assets/images/freeImages/setupImage.jpg";

const tlgOptions = [
  {
  img: SetupImage,
  title: 'Setup',
  featured: true,
  linkTo: "/setup",
  },
  {
  img: TeachersImage,
  title: 'Teachers',
  featured: true,
  linkTo: "/teachers",
  },
  {
  img: LearnersImage,
  title: 'Learners',
  linkTo: "/learners",
  },
  {
  img: GamersImage,
  title: 'Gamers',
  linkTo: "/gamers"
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
    width: 1000,
    height: 700,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={350}  spacing={10} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          {/*<ListSubheader component="div"></ListSubheader>*/}
        </GridListTile>
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