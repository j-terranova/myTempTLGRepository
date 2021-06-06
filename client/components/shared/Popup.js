import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography';
import Controls from "../../controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from "../../components/shared/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export default function PopupImport(props) {
 const {    title, 
            children, 
            openPopup, 
            setOpenPopup, 
            formValues,
            setFormValues, } = props;

let modified = (formValues && formValues.modified) ? formValues.modified : false; 

//console.log ("popup - start - modified = ", modified)     
const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

//useEffect(() => {
//    if (formValues != undefined && formValues != null)
//    {
//        modified = formValues.modified;
//    }    
//  }, [formValues]);

console.log ("popup - start - modified = ", modified)  

const handleExit = ()=> {
    if (modified)
    {
      setConfirmDialog({
        isOpen: true,
        title: " Changes have not been saved! Do you want to continue WITHOUT saving?",
        subTitle: "Select Yes to continue WITHOUT saving.   Select No to SAVE before exiting",
        onConfirm: () => {
          setOpenPopup(false);
          handleClose();
          if (formValues != undefined && formValues != null)
          {
            setFormValues({ ...formValues, 
              modified: false,
              isError: false, 
              errorMessage:""});
          }
        },
      });
    } else
    {
      setOpenPopup(false);
    }
  }
 
  const handleClose = ()=> {
    setConfirmDialog({
        isOpen: false,
        title: "",
        subTitle: "",
      });
  }

 const classes = useStyles();

    return (
        <>
        <form className={classes.root} autoComplete="off" >
            <Dialog open={openPopup} onClose={handleClose} fullWidth={true} maxWidth="xl" classes={{ paper: classes.dialogWrapper }}>
                <DialogTitle className={classes.dialogTitle}>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <Controls.ActionButton
                            color="secondary"
                            onClick={()=>handleExit()}>

                            <CloseIcon />
                        </Controls.ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </Dialog>
        </form>
        <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      </>
    )
}
