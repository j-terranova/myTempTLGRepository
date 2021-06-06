import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Controls from "./../../controls/Controls";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "../../lookupOptions/CriteriaOptions"
import Notification from "../../components/shared/Notification";


const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    defaultValue: "Small",
    variant: "outlined",
    size: "small",
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
  gridWrapper: {
    border: "1px solid grey",
    display: "grid",
    backgroundColor: "grey",
    gridRowGap: 1,
    gridColumnGap: 1,
    gridTemplateAreas: `
    "title title title"
    "a1 a2 a3"
    "b1 b2 b3"
    "c1 c2 c3"
    `,
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    "& > *": {
      backgroundColor: "white"
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
  input: {
    display: "none",
    padding: "10px 14px",
  },
  filename: {
    marginLeft: "2px",
  },
}));

const Container = (props) => (
  <Grid container justify="space-around" {...props} />
);
const Item = (props) => <Grid item xs={12} {...props} />;

export default function ImageSelectionCriteria(props) {
  const {
    criteriaValues,
    setCriteriaValues,
  } = props;
  const classes = useStyles();

  const [openPopup, setOpenPopup] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const name = e.target.name;
    const value =  e.target.value;
    setCriteriaValues({
        ...criteriaValues,
        [name]: value
    })
  }

  const clickSubmit = () => {
    console.log(
      "imageSelectionCriteria - submit clicked before criteriaValues = ",
      criteriaValues
    );
    setOpenPopup(true);
   };


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
                        value={criteriaValues.myClass}
                        onChange={handleInputChange}
                        options={myClassOptions}
                        error={errors.myClass}
                    />
              </Item>
              <Item item xs={12} >
                    <Controls.Select
                        name="category"
                        label="Category"
                        value={criteriaValues.category}
                        onChange={handleInputChange}
                        options={categoryOptions}
                        error={errors.category}
                    />
              </Item>
              <Item item xs={12} >
                    <Controls.Select
                        name="subject"
                        label="Subject"
                        value={criteriaValues.subject}
                        onChange={handleInputChange}
                        options={subjectOptions}
                        error={errors.subject}
                    />
              </Item>
              <Item item xs={12} >
                    <Controls.Select
                        name="difficultyLevel"
                        label="Difficulty Level"
                        value={criteriaValues.difficultyLevel}
                         onChange={handleInputChange}
                        options={difficultyLevelOptions}
                        error={errors.difficultyLevel}
                    />
              </Item>
              <Item item xs={12} >
                    <Controls.Select
                        name="ageRange"
                        label="Age Range"
                        value={criteriaValues.ageRange}
                        onChange={handleInputChange}
                        options={ageRangeOptions}
                        error={errors.ageRange}
                    />
                </Item>
              <Item item xs={12}>
              <Controls.Input
                  name="topic"
                  label="Topic"
                  value={criteriaValues.topic}
                  onChange={handleInputChange}
                  error={errors.topic}
              />
            </Item>
            <Item xs={12}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={clickSubmit}
              className={classes.submit}
            >
              Apply Criteria
            </Button>
 
        </Item>
          <Item xs={12}>
            {criteriaValues.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {errors}
              </Typography>
            )}
          </Item>

        </Container>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
