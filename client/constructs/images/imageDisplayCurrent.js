import React from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function ImageDisplayCurrent(props) {
  const{  formValues } = props;

const classes = useStyles();

//  useEffect(() => {
//    const abortController = new AbortController();
//    const signal = abortController.signal;
//
//    console.log (" imageStoreContainer - useEffect - formValues.imageStr = ",formValues.imageStr)

//    return function cleanup() {
//      abortController.abort();
//    };
//  }, [formValues.imageStr]);

  if (formValues.imageStr.length > 0) 
    { return (
      <>      
        <div className={classes.root}>
        <GridList cellHeight='auto' cols={1} className={classes.gridList}>
          <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
            <ListSubheader component="div"></ListSubheader>
          </GridListTile>
            <GridListTile >
              <img src={formValues.imageStr} alt={formValues.topic} />
              <GridListTileBar
                title={formValues.description}
                subtitle={<span>by: {formValues.description}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${formValues.description}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          
        </GridList>
      </div> 

      </>
    );
  } else {
    return(
      <>
      </>

    )


  }

}
