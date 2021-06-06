import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Controls from "./../../controls/Controls";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { useCriteria } from "../../contexts/CriteriaContext";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "../../lookupOptions/CriteriaOptions"
import Notification from "../../components/shared/Notification";


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    margin: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    outerColumn: {
      borderRight: "1px solid grey",
      borderBottom: "1px solid grey",
      borderLeft: "1px solid grey"
    },
    centerColumn: {
      borderBottom: "1px solid grey"
    }
  },
  submit: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    direction: "column",
    position: "center",
    variant: "outlined",
    size: "small",
  },
}));

const Container = (props) => (
  <Grid container justify="space-around" {...props} />
);
const Item = (props) => <Grid item xs={12} {...props} />;

export default function LearnerCriteria(props) {
  const {handleApplyCriteria,} = props;
  
  const classes = useStyles();
  const currentCriteria = useCriteria();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [values, setValues] = useState({
    myClass: currentCriteria.myClass ? currentCriteria.myClass : "", //"Comedy",
    category: currentCriteria.category ? currentCriteria.category : "", //"Basic Reading",
    subject: currentCriteria.subject ? currentCriteria.subject : "", //"Reading",
    difficultyLevel: currentCriteria.difficultyLevel
      ? currentCriteria.difficultyLevel
      : "", //"College",
    ageRange: currentCriteria.ageRange ? currentCriteria.ageRange : "", //"All Ages",
    topic: currentCriteria.topic ? currentCriteria.topic : "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const name = e.target.name;
    const value =  e.target.value;
    setValues({
        ...values,
        [name]: value
    })
  }

  return (
    <>
      <div className={classes.root}>
        <Container spacing={2} justify="center" className={classes.container}>
          <Item xs={12}>
            <div>Filter Criteria (Entry Tags)</div>
          </Item>

                <Item item xs={12} >
                <Controls.Select
                        name="myClass"
                        label="Class"
                        classes={classes}
                        value={values.myClass}
                        onChange={handleInputChange}
                        options={myClassOptions}
                        error={errors.myClass}
                    />
              </Item>
              <Item item xs={12} >
                    <Controls.Select
                        name="category"
                        label="Category"
                        value={values.category}
                        onChange={handleInputChange}
                        options={categoryOptions}
                        error={errors.category}
                    />
              </Item>
              <Item item xs={12} >
                    <Controls.Select
                        name="subject"
                        label="Subject"
                        value={values.subject}
                        onChange={handleInputChange}
                        options={subjectOptions}
                        error={errors.subject}
                    />
              </Item>
              <Item item xs={12} >
                    <Controls.Select
                        name="difficultyLevel"
                        label="Difficulty Level"
                        value={values.difficultyLevel}
                         onChange={handleInputChange}
                        options={difficultyLevelOptions}
                        error={errors.difficultyLevel}
                    />
              </Item>
              <Item item xs={12} >
                    <Controls.Select
                        name="ageRange"
                        label="Age Range"
                        value={values.ageRange}
                        onChange={handleInputChange}
                        options={ageRangeOptions}
                        error={errors.ageRange}
                    />
                </Item>
              <Item item xs={12}>
              <Controls.Input
                  name="topic"
                  label="Topic"
                  value={values.topic}
                  onChange={handleInputChange}
                  error={errors.topic}
              />
            </Item>
            <Item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => { 
                handleApplyCriteria(values); 
                 }}
              className={classes.submit}
            >
              Apply Criteria
            </Button>
 
        </Item>
          <Item xs={12}>
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {values.error}
              </Typography>
            )}
          </Item>

        </Container>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
