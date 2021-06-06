import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { useAccess } from "../../contexts/AccessContext";
import Controls from "./../../controls/Controls";
import { useCriteria } from "../../contexts/CriteriaContext";
import Popup from "../../components/shared/Popup";
import ApplyOptionsForm from "../../components/shared/ApplyOptionsForm"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  },
  filename: {
    marginLeft: "2px",
  },
}));

const Container = (props) => (
  <Grid container justify="space-around" {...props} />
);

const Item = (props) => <Grid item xs={12} {...props} />;

export default function FrameworkAccess(props) {
  const {
    selected,
    setSelected,
    updateFrameworkLineItem,
    frameworkLineItems,
    groupsUserOwns,
    setGroupsUserOwns,
    okToUpdate,
  } = props;
  const classes = useStyles();
  const currentAccess = useAccess();
  const currentCriteria = useCriteria();

  const [openPopup, setOpenPopup] = useState(false);
  const [applyOptions, setApplyOptions] = useState({
    isUpdateListing: false,
    isUpdateSelectedRecords: false,
    isUpdateAllListedRecords: false,
  });

  const [values, setValues] = useState({
    keepPrivate: (currentAccess.keepPrivate != undefined && currentAccess.keepPrivate != null) ? currentAccess.keepPrivate : true,
    approvedForPublicUse: (currentAccess.approvedForPublicUse != undefined && currentAccess.approvedForPublicUse != null) ? currentAccess.approvedForPublicUse : false,
    group_id: currentAccess.group_id ? currentAccess.group_id : "",
  });

  console.log("frameworkAccess - right after values set ");

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
      "FrameworkAccess - inside useEffect()after currentAccess Set  "
    );

    if (currentAccess != undefined && currentAccess != null)
    {
      setValues({
        keepPrivate: (currentAccess.keepPrivate != undefined && currentAccess.keepPrivate != null) ? currentAccess.keepPrivate : true,
        approvedForPublicUse: (currentAccess.approvedForPublicUse != undefined && currentAccess.approvedForPublicUse != null) ? currentAccess.approvedForPublicUse : false,
        group_id: currentAccess.group_id ? currentAccess.group_id : "",
      });
    }     
      return function cleanup() {
      abortController.abort();
    };
  }, [currentAccess]);


  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log(
      "frameworkAccess - after return from popup useEffect applyOptions.isUpdateListing = ", applyOptions.isUpdateListing );
    console.log(
      "frameworkAccess - after return from popup useEffect applyOptions.isUpdateSelectedRecords = ", applyOptions.isUpdateSelectedRecords );
    console.log(
      "frameworkAccess - after return from popup useEffect applyOptions.isUpdateAllListedRecords = ", applyOptions.isUpdateAllListedRecords );

    if (applyOptions.isUpdateAllListedRecords === true)
    {
      console.log("frameworkAccess - applyOptions.isUpdateAllListedRecords === true" );
      updateAccessOfAllFrameworkLineItemsInList();
    } else if (applyOptions.isUpdateSelectedRecords === true)
    {
      console.log("frameworkAccess -applyOptions.isUpdateSelectedRecords === true" );
       updateAccessOfSelectedFrameworkLineItems();
    }
 
      return function cleanup() {
      abortController.abort();
    };
  }, [applyOptions]);

  const findMatchingIndex = (search_id) => {
    var index = -1;
    console.log("frameworkAccess - search_id = ", search_id);
    for (var i = 0; i < frameworkLineItems.length; i++) {
      console.log(
        "frameworkAccess - frameworkLineItems[i]._id = ",
        frameworkLineItems[i]._id
      );
      if (frameworkLineItems[i]._id == search_id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const updateAccessOfAllFrameworkLineItemsInList = () => {
      console.log(
        "updateAccessOfCurrentStatement - Inside updateAccessOfAllFrameworkLineItemsInList + before loop to update records");
      const lastIndexToUpdate = frameworkLineItems.length -1;
      for (let i = 0; i < frameworkLineItems.length; i++) {
        updateFrameworkLineItem(i, false, lastIndexToUpdate, currentCriteria, values);
      }
    };
  
    const updateAccessOfSelectedFrameworkLineItems = () =>
    {
      console.log(
        "updateAccessOfSelectedFrameworkLineItems - Inside updateAccessOfSelectedFrameworkLineItems + before loop to update records");
  
        const lastIndexToUpdate = selected.length-1;
        selected.forEach(id => 
          {
            console.log(id)
            let indexToUpdate = findMatchingIndex(id);
            if (indexToUpdate >=0)
            {
              updateFrameworkLineItem(indexToUpdate, false, lastIndexToUpdate, currentCriteria, values);
            }            
          });
          setSelected([]);
    }

    const clickSubmit = () => {
      console.log(
        "frameworkAccess - submit clicked values before values = ",
        values
      );
       setOpenPopup(true);
     };

  return (
    <>
      <div className={classes.root}>
        <Container spacing={1} justify="center" className={classes.container}>
          <Item xs={12}>
            <div>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Access Options</div>
          </Item>

          <Item xs={3}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={clickSubmit}  
              className={classes.submit} 
              disabled = {okToUpdate?false:true}           
            >
              Apply Access
            </Button>
          </Item>
       
          <Item xs={3}>

          <Controls.Checkbox
                        name="keepPrivate"
                        label="Keep Private"
                        value={values.keepPrivate}
                        onChange={handleInputChange}
                    />
          </Item>
          <Item xs={3}>
          <Controls.Select
                        name="group_id"
                        label="Name of Group With Access"
                        classes={classes}
                        value={values.group_id}
                        onChange={handleInputChange}
                        options={groupsUserOwns}
                    />
          </Item>
          <Item xs={3}>
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  checked={values.approvedPublicReadAccess}
                  name="approvedPublicReadAccess"
                  color="primary"
                />
              }
              label="Approved for Public Access"
            />
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
        title="Check boxes to indicate how to Apply new access - Disable options as pre-selected"
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
    </>
  );
}
