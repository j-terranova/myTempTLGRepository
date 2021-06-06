import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FrameworkComponentDefineOptions from "./frameworkComponentDefineOptions";
import FrameworkComponentListing from "./frameworkComponentListing";
import {useRouteMatch} from "react-router-dom";

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

export default function FrameworkComponentContainer(props) {
  const { formValues,
          setFormValues,
          setOpenPopup,
          validate,
          addNewFramework,
          prepareFormValues,
          SaveEntries,
          okToUpdate,} = props;

  const classes = useStyles();
  let { path, url } = useRouteMatch();
  console.log ("FrameworkSetupRouter - path = ", path);
  console.log ("FrameworkSetupRouter - url = ", url);
  console.log ("FrameworkSetupRouter - useRouteMatch() = ", useRouteMatch());

  const [frameworkComponents, setFrameworkComponents] = useState([]);
  const [frameworkComponentOptions, setFrameworkComponentOptions] = useState({
    type: "Component",
    subType: "",
    constructPrimaryColumn:  formValues.constructPrimaryColumn ? formValues.constructPrimaryColumn :"KeyWordOrQuestion",
    constructOptionsSource: formValues.constructOptionsSource ? formValues.constructOptionsSource : "SecondaryColumns",
    constructNumberOfOptions: formValues.constructNumberOfOptions ? formValues.constructNumberOfOptions : 4,
    constructResponseFormat:  formValues.constructResponseFormat ? formValues.constructResponseFormat : "QuestionMultiChoice",
    constructColor:  formValues.constructColor ? formValues.constructColor : "Default",
  })

  const [
    frameworkComponentsPreFilter,
    setFrameworkComponentsPreFilter,
  ] = useState();

  const [selected, setSelected] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log(
      "FrameworkComponentListing - Inside useEffect to start - formValues = ",
      formValues
    );
    if (formValues.includeConstructs != undefined && formValues.includeConstructs != null )
    {
      if (formValues.includeConstructs[0] != undefined && formValues.includeConstructs[0] != null  && formValues.includeConstructs.length >0 )
      {
        setFrameworkComponentOptions({
          type: "Component",
          subType: formValues.includeConstructs[0].subType ? formValues.includeConstructs[0].subType  : "",
          constructPrimaryColumn: formValues.includeConstructs[0].constructPrimaryColumn ? formValues.includeConstructs[0].constructPrimaryColumn : "KeyWordOrQuestion",
          constructOptionsSource:  formValues.includeConstructs[0].constructOptionsSource ? formValues.includeConstructs[0].constructOptionsSource : "SecondaryColumns", 
          constructNumberOfOptions:  formValues.includeConstructs[0].constructNumberOfOptions ? formValues.includeConstructs[0].constructNumberOfOptions : "4", 
          constructResponseFormat:  formValues.includeConstructs[0].constructResponseFormat ? formValues.includeConstructs[0].constructResponseFormat : "QuestionMultiChoice", 
          constructColor:  formValues.includeConstructs[0].constructColor ? formValues.includeConstructs[0].constructColor : "Default", 
        })

        setFrameworkComponents(formValues.includeConstructs);
        setFrameworkComponentsPreFilter(formValues.includeConstructs);
      } else
      {
        setFrameworkComponentOptions({
          type: "Component",
          subType: "",
          constructPrimaryColumn:  "KeyWordOrQuestion",
          constructOptionsSource: "SecondaryColumns",
          constructNumberOfOptions:  4,
          constructResponseFormat:  "QuestionMultiChoice",
          constructColor:  "Default",
        })
        setFrameworkComponents([]);
        setFrameworkComponentsPreFilter([]);

      }
    } else
    {
      setFrameworkComponentOptions({
        type: "Component",
        subType: "",
        constructPrimaryColumn:  "KeyWordOrQuestion",
        constructOptionsSource: "SecondaryColumns",
        constructNumberOfOptions:  4,
        constructResponseFormat:  "QuestionMultiChoice",
        constructColor:  "Default",
      })
      setFrameworkComponents([]);
      setFrameworkComponentsPreFilter([]);
    }
    console.log(
      "FrameworkComponentListing - Inside useEffect to start - formValues.includeConstructs = ",
      formValues.includeConstructs
    );
    setFormValues({
      ...formValues,
      modified: false,
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const getSelectedComponent = (idToUpdate) => {
    console.log("frameworkListing - getSelectedComponent idToUpdate = ", idToUpdate)
    const indexSelected = findMatchingComponentIndex(idToUpdate);
    console.log("frameworkListing - getSelectedComponent indexSelected = ", indexSelected)
    if (indexSelected >= 0)
    {
      console.log("frameworkListing - getSelectedComponent frameworkComponents[indexSelected] = ", frameworkComponents[indexSelected])
      return frameworkComponents[indexSelected];
    } else
    { 
      console.log("frameworkListing - getSelectedComponent returning null ")
      return null;
    }
  }

  const findMatchingComponentIndex = (search_id) => {
    var index = -1;
    console.log("FrameworkComponentListing - search_id = ", search_id);
    for (var i = 0; i < frameworkComponents.length; i++) {
      console.log(
        "FrameworkComponentListing - frameworkComponents[i].constructId = ",
        frameworkComponents[i].constructId
      );
      if (frameworkComponents[i].constructId == search_id) {
        index = i;
        console.log(
          "FrameworkComponentListing - _id match found index = ",
          index
        );
        break;
      }
    }
    return index;
  };

  const updateFrameworkComponents = (updatedComponent) => {
    const IndexOfComponent = findMatchingComponentIndex(updatedComponent.constructId)
    setFrameworkComponents([...frameworkComponents.slice(0, IndexOfComponent),
    {
      ...frameworkComponents[IndexOfComponent],
      sequenceNo:updatedComponent.sequenceNo,	
      constructDetail: updatedComponent.constructDetail,
      type: updatedComponent.type,
      subType: updatedComponent.subType,
      constructPrimaryColumn: updatedComponent.constructPrimaryColumn,
      constructOptionsSource: updatedComponent.constructOptionsSource,
      constructNumberOfOptions: updatedComponent.constructNumberOfOptions,
      constructResponseFormat: updatedComponent.constructResponseFormat,
      constructColor: updatedComponent.constructColor,
      constructId: updatedComponent.constructId,
    },
    ...frameworkComponents.slice(IndexOfComponent + 1), // everything after current post
  ]);
  setFrameworkComponentsPreFilter([...frameworkComponents.slice(0, IndexOfComponent),
    {
      ...frameworkComponents[IndexOfComponent],
      sequenceNo:updatedComponent.sequenceNo,	
      constructDetail: updatedComponent.constructDetail,
      type: updatedComponent.type,
      subType: updatedComponent.subType,
      constructPrimaryColumn: updatedComponent.constructPrimaryColumn,
      constructOptionsSource: updatedComponent.constructOptionsSource,
      constructNumberOfOptions: updatedComponent.constructNumberOfOptions,
      constructResponseFormat: updatedComponent.constructResponseFormat,
      constructColor: updatedComponent.constructColor,
      constructId: updatedComponent.constructId,

    },
    ...frameworkComponents.slice(IndexOfComponent + 1), // everything after current post
  ]);

    setFormValues({ ...formValues,
      modified: true, 
    });
  }

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
         <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <FrameworkComponentListing 
                    setOpenPopup={setOpenPopup}
                    formValues =  {formValues}
                    setFormValues = {setFormValues}
                    addNewFramework = {addNewFramework}
                    prepareFormValues = {prepareFormValues}
                    SaveEntries = {SaveEntries}
                    validate = {validate}
                    frameworkComponents = {frameworkComponents}
                    setFrameworkComponents = {setFrameworkComponents}
                    frameworkComponentOptions = {frameworkComponentOptions}
                    setFrameworkComponentOptions = {setFrameworkComponentOptions}
                    frameworkComponentsPreFilter = {frameworkComponentsPreFilter}
                    setFrameworkComponentsPreFilter = {setFrameworkComponentsPreFilter}
                    updateFrameworkComponents={updateFrameworkComponents}
                    findMatchingComponentIndex={findMatchingComponentIndex}
                    getSelectedComponent = {getSelectedComponent}
                    selected = {selected}
                    setSelected = {setSelected}
                    okToUpdate = {okToUpdate}
              />
            </Paper>
            </Grid>
            <Grid item xs={2}>
                <FrameworkComponentDefineOptions 
                  frameworkComponentOptions ={frameworkComponentOptions}
                  setFrameworkComponentOptions = {setFrameworkComponentOptions}
                  setSelected = {setSelected}
                  okToUpdate={okToUpdate}
                  />

            </Grid>
          </Grid>
        </Container>
    </div>
      </>
  );
}
