import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from "@material-ui/core/styles";


/*
.Dialog{
    padding-bottom: 0px !important;
    display: flex;
}

.Content {
    margin-top: 24px !important;
    font-size: 18px !important;
    margin-left: 8px !important;
    color: black !important;
}
*/

const useStyles = makeStyles((theme) => ({
    Dialog: {
        paddingBottom: "0",
        display: "flex",
    },
    Content: {
        marginTop: 4,
        fontSize: "18",
        marginLeft: 2,
        color: "Black",
    }
}));

const modaldialog = (props) => {
    const { text,
            open,            
            onClose, 
            } = props;

    const classes = useStyles();
    let icon;
    if(text.includes('You'))
        icon = 'sentiment_very_satisfied';
    else if(text.includes('Opponent'))
        icon = 'sentiment_very_dissatisfied';
    else
        icon = 'thumbs_up_down';

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogContent className={classes.Dialog}>
                <Icon
                    className="Icon"
                    style={{fontSize: 64}}>
                    {icon}
                </Icon>
                <DialogContentText className={classes.Content}>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="secondary"
                    autoFocus>
                        REPLAY
                    </Button>
            </DialogActions>
        </Dialog>
    )
};

modaldialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  text: PropTypes.string
};

export default withMobileDialog()(modaldialog);