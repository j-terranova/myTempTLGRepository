import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  console.log( "teacherContainer  " );

  return (
    <div className={classes.root}>
      <CssBaseline />
        <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Paper className={classes.paper}>

              </Paper>
            </Grid>
            <Grid item xs={3}>
              {" "}
              <Paper className={classes.paper}>
                {" "}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
