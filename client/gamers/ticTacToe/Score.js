import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import MyAux from './myAux';

/*
.Divider{
    border-top: 2px solid white !important;
    borderTop
}

.Scores{
    text-align: text-align;
}
*/

const useStyles = makeStyles((theme) => ({
    Scores: {
        textAlign: "text-align",
    },
    Divider: {
        borderTop: 2,
        borderColor: "White"
    }
}));

const scorecard = (props) => {
    const {open, onClose, clearScore} = props;
    const classes = useStyles();
    const action = [
        <IconButton
            key="delete"
            aria-label="delete"
            color="inherit"
            onClick={clearScore}
            >
            <DeleteIcon style={{color:'#E91E63'}}/>
        </IconButton>,
        <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
            >
            <CloseIcon style={{color:'#E91E63'}}/>
        </IconButton>
    ];

    const draws = localStorage.getItem('DRAWS');
    const wons = localStorage.getItem('WONS');
    const loss = localStorage.getItem('LOSS');

    const score = (
        <MyAux>
            <Divider className={classes.Divider}/>
            <Grid container spacing={8}>
                <Grid item xs={4} >
                    <Typography variant="body2" color="secondary">
                        YourWins
                    </Typography>
                </Grid>
                <Grid item xs={4} >
                    <Typography variant="body2" color="secondary">
                        Draws
                    </Typography>
                </Grid>
                <Grid item xs={4} >
                    <Typography variant="body2" color="secondary">
                        OppWins
                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.Divider}/>
            <Grid container style={{marginTop:'5px'}}>
                <Grid item xs={4}>
                    <Typography variant="caption" color="secondary" className={classes.Scores}>
                        {wons===null?0:wons}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="caption" color="secondary" className={classes.Scores}>
                        {draws===null?0:draws}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="caption" color="secondary" className={classes.Scores}>
                        {loss===null?0:loss}
                    </Typography>
                </Grid>
            </Grid>

        </MyAux>
    );

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={score}
            action={action}
        />
    );
};

scorecard.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    clearScore: PropTypes.func
};


export default scorecard;