import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Controls from "./../../controls/Controls";
import Button from "@material-ui/core/Button";
import auth from "../../auth/auth-helper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { useCriteria, useCriteriaDispatch } from "../../contexts/CriteriaContext";
import { useAccess, } from "../../contexts/AccessContext";
import Popup from "../../components/shared/Popup";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "../../lookupOptions/CriteriaOptions"
import ApplyOptionsForm from "../../components/shared/ApplyOptionsForm"
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

export default function ConstructCriteria(props) {
  const {
    selected,
    setSelected,
    updateConstructLineItem,
    constructLineItems,
    checkCurrentCriteria,
    okToUpdate,
  } = props;
  const classes = useStyles();
  const currentCriteria = useCriteria();
  const currentAccess = useAccess();

  const [openPopup, setOpenPopup] = useState(false);
  const [applyOptions, setApplyOptions] = useState({
    isUpdateListing: true,
    isUpdateSelectedRecords: false,
    isUpdateAllListedRecords: false,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [values, setValues] = useState({
    myClass: currentCriteria.myClass ? currentCriteria.myClass : "", 
    category: currentCriteria.category ? currentCriteria.category : "", 
    subject: currentCriteria.subject ? currentCriteria.subject : "", 
    difficultyLevel: currentCriteria.difficultyLevel
      ? currentCriteria.difficultyLevel
      : 7, 
    ageRange: currentCriteria.ageRange ? currentCriteria.ageRange : 2, 
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

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    console.log(
      "constructCriteria - inside useEffect() to reset values to currentCriteria = ", currentCriteria
    );
    
    if (currentCriteria != undefined && currentCriteria != null)
    {
      setValues({
        myClass: currentCriteria.myClass,
        category: currentCriteria.category,
        subject: currentCriteria.subject,
        difficultyLevel: currentCriteria.difficultyLevel,
        ageRange: currentCriteria.ageRange,
        topic: currentCriteria.topic,
      });
    }
    return function cleanup() {
      abortController.abort();
    };
    
  }, [currentCriteria]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log(
      "constructCriteria - after return from popup useEffect applyOptions.isUpdateListing = ", applyOptions.isUpdateListing );
    console.log(
      "constructCriteria - after return from popup useEffect applyOptions.isUpdateSelectedRecords = ", applyOptions.isUpdateSelectedRecords );
    console.log(
      "constructCriteria - after return from popup useEffect applyOptions.isUpdateAllListedRecords = ", applyOptions.isUpdateAllListedRecords );
    console.log("constructCriteria - after return from popup useEffect Criteria values = ", values );
    if (values != undefined && values != null )
    {
      if (
        ((values.myClass != null &&
          values.category != null &&
          values.subject != null &&
          values.difficultyLevel != null &&
          values.ageRange != null ) 
        &&
        (
          values.myClass.length != 0 &&
          values.category.length != 0 &&
          values.subject.length != 0 &&
          values.difficultyLevel.length != 0 &&
          values.ageRange.length != 0 ))
        )
        {
          if (applyOptions.isUpdateAllListedRecords === true)
          {
            console.log("constructCriteria - applyOptions.isUpdateAllListedRecords === true" );
            updateCriteriaOfAllConstructLineItemsInList();
          } else if (applyOptions.isUpdateSelectedRecords === true)
          {
            console.log("constructCriteria -applyOptions.isUpdateSelectedRecords === true" );

            updateCriteriaOfSelectedConstructLineItems();
          } 
        } else
          {
            if (applyOptions.isUpdateAllListedRecords === true || applyOptions.isUpdateSelectedRecords === true) 
            {
              setNotify({
                isOpen: true,
                message: "No Updates made - All Criteria must be defined to update Records!",
                type: "error",
              });
            }
        }
      }
      checkCurrentCriteria(values);
      console.log(
        "constructCriteria - after return from popup useEffect applyOptions.isUpdateListing = ", applyOptions.isUpdateListing );

      return function cleanup() {
      abortController.abort();
    };
  }, [applyOptions]);

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("constructCriteria - search_id = ", search_id);
    for (var i = 0; i < constructLineItems.length; i++) {
      console.log(
        "constructCriteria - constructLineItems[i]._id = ",
        constructLineItems[i]._id
      );
      if (constructLineItems[i]._id == search_id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const updateCriteriaOfAllConstructLineItemsInList = () => {
    console.log(
      "updateCriteriaOfAllConstructLineItemsInList - Inside updateCriteriaOfAllConstructLineItemsInList + before loop to update records");
    console.log(
      "updateCriteriaOfSelectedConstructLineItems - constructLineItems = ", constructLineItems)
    const lastIndexToUpdate = constructLineItems.length -1;
    for (let i = 0; i < constructLineItems.length; i++) {
      updateConstructLineItem(i, false, lastIndexToUpdate, values, currentAccess);
    }
  };
  
  const updateCriteriaOfSelectedConstructLineItems = () =>
  {
    console.log(
      "updateCriteriaOfSelectedConstructLineItems - Inside updateCriteriaOfSelectedConstructLineItems + before loop to update records");
    console.log(
      "updateCriteriaOfSelectedConstructLineItems - selected = ", selected)
      const lastIndexToUpdate = selected.length-1;
      selected.forEach(id => 
        {
          console.log(id)
          let indexToUpdate = findMatchingIndex(id);
          if (indexToUpdate >=0)
          {
            updateConstructLineItem(indexToUpdate,false, lastIndexToUpdate, values, currentAccess);
          } 
        });
        setSelected([]);
  }

  const clickSubmit = () => {
    console.log(
      "constructCriteria - submit clicked before currentCriteria values = ",
      values
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
              onClick={clickSubmit}
              className={classes.submit}
              disabled = {okToUpdate?false:true}
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
      <Popup
        title="Check boxes to indicate how to Apply new criteria - Disable options as pre-selected"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ApplyOptionsForm
          applyOptions={applyOptions}
          setApplyOptions={setApplyOptions}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
