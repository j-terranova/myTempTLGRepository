import React from 'react'
import MuiButton from "@material-ui/core/Button";
import {makeStyles}  from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5),
        //marginLeft: theme.spacing(2),
        //marginRight: theme.spacing(2),
        //marginBottom: theme.spacing(6),
    },
    label: {
        textTransform: 'none'
    },
    palette: {
        primary: {
            light: '#7986cb',
            main: indigo, //'#3f51b5',
            dark: '#303f9f',
            contrastText: '#fffde7',
          },
        secondary: {
            light: "#64b5f6",
            main: lightBlue, //"#2196f3",
            dark: "#1976d2",
            contrastText: "#fff",
        },
        error: {
            light: "#e57373",
            main: red, //"#f44336",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        warning: {
            light: "#ffb74d",
            main: orange, //"#ff9800",
            dark:  "#f57c00",
            contrastText: "rgba(0, 0, 0, 0.87)",
        },
        info: { 
            light: "#64b5f6",
            main: cyan, //"#2196f3",
            dark: "#1976d2",
            contrastText: "#fff",
        },
        success: {
            light: "#81c784",
            main: blue, //"#4caf50",
            dark: "#388e3c",
        },
      },
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();
    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}
