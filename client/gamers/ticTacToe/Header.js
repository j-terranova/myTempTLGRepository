import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

//.Header {
//    color: white !important;
//    margin-top: 36px !important;
//    margin-bottom: 24px !important;
//}

const useStyles = makeStyles((theme) => ({
    Header: {
        color: "White",
        marginTop: "9",
        marginBottom:  "6",
    }
}));

const header = () => {
    const classes = useStyles();
    return(
    <Typography variant="h3" className={classes.Header} align="center">
        Tic Tac Toe
    </Typography>
    );
}

export default header;
