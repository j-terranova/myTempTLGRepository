import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',  //500
    height: 450,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

 export default function ImageDisplayGridList(props) {
  const {setOpenImageDisplayGridPopup} = props;
  const {imageDetailListing} = props;
  const {handleRequestSelectImage} = props;

  const classes = useStyles();
  console.log ("ImageDisplayGridList - Start");
    console.log ("ImageDisplayGridList - imageDetailListing = ", imageDetailListing);

  const addSelectedImage = (id) => {
    handleRequestSelectImage(id);
    setOpenImageDisplayGridPopup(false);
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} cols={4} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {imageDetailListing.map((imageDetail) => (
          <GridListTile key={imageDetail.id}>
         <Link 
          component="button"
          onClick={() => {
            addSelectedImage(imageDetail.id);
            //console.info("I'm a button link off an image.");
          }}>

            <img src={imageDetail.imageStr} alt={imageDetail.topic} />
            <GridListTileBar
              title={imageDetail.topic}
              subtitle={<span>by: {imageDetail.description}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${imageDetail.topic}`} className={classes.icon}>
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


/*

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    //overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function ImageDisplayGridList(props) {
  const {setOpenImageDisplayGridPopup} = props;
  const {imageDetailListing} = props;

  const classes = useStyles();
  console.log ("ImageDisplayGridList - Start");
    console.log ("ImageDisplayGridList - imageDetailListing = ", imageDetailListing);
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={300}  spacing={5} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {imageDetailListing.map((imageDetail) => (
          <GridListTile key={imageDetail.id}>
            <img src={imageDetail.imageStr} alt={imageDetail.description} />
            <GridListTileBar
              title={imageDetail.description}
              actionIcon={
                <IconButton aria-label={`info about ${imageDetail.description}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
*/