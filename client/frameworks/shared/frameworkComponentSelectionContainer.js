import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import auth from "../../auth/auth-helper";
import Controls from "../../controls/Controls";
import FrameworkComponentCriteria from "./frameworkComponentCriteria";
import FrameworkComponentSelectionListing from "./frameworkComponentSelectionListing";
import DisplayConstructOptions  from "./../../lookupOptions/DisplayConstructOptions";
import { listByCriteria } from "./api-frameworkComponent";
import { useCriteria } from "../../contexts/CriteriaContext";
import { useAccess } from "../../contexts/AccessContext";

const drawerWidth = 240;

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

export default function FrameworkComponentSelectionContainer(props) {
  const { setOpenPopup,
          frameworkComponents,
          setFrameworkComponents,
          frameworkComponentOptions,
          formValues,
          setFormValues, } = props;
  
  const [frameworkComponentSelectionListing, setFrameworkComponentSelectionListing] = useState([])
  const [
    frameworkComponentSelectionListingPreFilter,
    setFrameworkComponentSelectionListingPreFilter,
  ] = useState();
  const [constructDetail, setConstructDetail] = useState("")
  const classes = useStyles();
  const currentCriteria = useCriteria();
  const currentAccess = useAccess();

  const [values, setValues] = useState({
    myClass: currentCriteria.myClass ? currentCriteria.myClass : "Academic", //"Comedy",
    category: currentCriteria.category ? currentCriteria.category : "Mixed", //"Basic Reading",
    subject: currentCriteria.subject ? currentCriteria.subject : "Other", //"Reading",
    difficultyLevel: currentCriteria.difficultyLevel
      ? currentCriteria.difficultyLevel
      : 27, //"General",
    ageRange: currentCriteria.ageRange ? currentCriteria.ageRange : 6, //"All Ages",
    topic: currentCriteria.topic ? currentCriteria.topic : "",
  });

  const [accessInclusionOptions, setAccessInclusionOptions] = useState(
    [
      {id: "includeOwner", title: "Include Owner"},
      {id: "includePublic", title: "Include Public"},
      {id: "includeFriends", title: "Include Friends"},
      {id: "includeGroups", title: "Include Groups"},
    ]
  );
  const [accessIncludeSelection, setAccessIncludeSelection] = useState("includeOwner");
  const [selectedComponent, setSelectedComponent] = useState("");
  const displayConstructOptions = DisplayConstructOptions();
  const componentOptions = displayConstructOptions.componentOptions;

  const handleComponentChange = e => {
    const value = e.target.value;
    setSelectedComponent(value);
  }

  const handleIncludeSelectionChange = e => {
    const value = e.target.value;
    setAccessIncludeSelection(value);
  }

  const addComponents = (candidateComponents) => {
    console.log("frameworkComponentContainer - candidate Components = ", candidateComponents)
    setFrameworkComponentSelectionListing(candidateComponents)
    setFrameworkComponentSelectionListingPreFilter(candidateComponents)
    //console.log("frameworkComponentContainer - addComponent,before update -newComponent ", newComponent)
    //console.log("frameworkComponentContainer - addComponent,before update -frameworkComponentSelectionListing ", frameworkComponentSelectionListing)
    //setFrameworkComponentSelectionListing(frameworkComponentSelectionListing => [...frameworkComponentSelectionListing, newComponent])
    //setFrameworkComponentSelectionListingPreFilter(frameworkComponentSelectionListing => [...frameworkComponentSelectionListing, newComponent])
    //console.log("frameworkComponentContainer - addComponent,after update -frameworkComponentSelectionListing ", frameworkComponentSelectionListing)
  }

  const setCandidateComponents = (selectedComponent,data) =>{
    setFrameworkComponentSelectionListing([]);
    setFrameworkComponentSelectionListingPreFilter([]);
    let candidateComponents = [];
    let value = "";
    data.map((constructRecord) => {
    switch(selectedComponent) {
      case "Association": 
        value =  constructRecord.constructAssociation.wordToAssociate;
        setConstructDetail(value);
        //console.log("frameworkComponentContainer - setCandidateComponents,Switch -Associations ", selectedComponent)
        console.log("frameworkComponentContainer - setCandidateComponents,Switch -constructDetail ", value)
        break;
      case "Chapter":  
        setConstructDetail("");
        break;
      case "Chart":  
      setConstructDetail("");
        break;
      case "Definition": 
        value =  constructRecord.constructDefinition.wordToDefine;
        setConstructDetail(value);
        //console.log("frameworkComponentContainer - setCandidateComponents,Switch -Definitions ", selectedComponent)
        console.log("frameworkComponentContainer - setCandidateComponents,Switch -constructDetail ", value)
        break;
      case "Diagram":  
        setConstructDetail("");
        break;
      case "Equation":  
        setConstructDetail("");
        break;
      case "Fact":  
      setConstructDetail("");
        break;
      case "Fill-in":  
      setConstructDetail("");
        break;
      case "Flash-Card":  
      setConstructDetail("");
        break;
      case "Formula":  
      setConstructDetail("");
        break;
      case "Matching":  
      setConstructDetail("");
        break;
      case "Opposite":  
      setConstructDetail("");
        break;
      case "Question":  
        value = constructRecord.constructQuestion.questionPosed;
        setConstructDetail(value);
        //console.log("frameworkComponentContainer - setCandidateComponents,Switch -Questions ", selectedComponent)
        //console.log("frameworkComponentContainer - setCandidateComponents,Switch -constructRecord.constructQuestion.questionPosed ", constructRecord.constructQuestion.questionPosed)
        console.log("frameworkComponentContainer - setCandidateComponents,Switch -constructDetail ", value)
        break;
      case "Quote":  
        setConstructDetail("");
        break;
      case "Segment":  
       value = constructRecord.constructSegment.substring(3, 40);
        setConstructDetail(value);
        //console.log("frameworkComponentContainer - setCandidateComponents,Switch -Segments ", selectedComponent)
        console.log("frameworkComponentContainer - setCandidateComponents,Switch -constructDetail ", value)
        break;
      case "Similar":  
        setConstructDetail("");
        break;
      case "Statement":  
        value = constructRecord.constructStatement.substring(0, 40);
        setConstructDetail(value);
        //console.log("frameworkComponentContainer - setCandidateComponents,Switch -Statements ", selectedComponent)
        console.log("frameworkComponentContainer - setCandidateComponents,Switch -constructDetail ", value)
        break;
      case "Table":  
        setConstructDetail("");
        break;
      default:
        value = "";
        setConstructDetail("");
        console.log("frameworkComponentContainer - setCandidateComponents,Switch -default ", selectedComponent)
        console.log("frameworkComponentContainer - setCandidateComponents,Switch -constructDetail ", constructDetail)
        break;
    }
    
    //Add selected to the CandidateList
    //topic description owner_id group_id constructAssociation markDeleted _id");
    const newComponent =
     {
        topic: constructRecord.topic ,
        description: constructRecord.description ,
        constructDetail: value ,
        myClass: constructRecord.myClass ,
        category: constructRecord.category ,
        subject: constructRecord.subject ,
        type:  constructRecord.type ,
        subType: constructRecord.subType ,
        difficultyLevel:  constructRecord.difficultyLevel ,
        ageRange: constructRecord.ageRange ,
        owner_id: constructRecord.owner_id ,
        _id: constructRecord._id
      }
      candidateComponents.push(newComponent);
  });

  addComponents(candidateComponents);

  }

  const handleExit = () => {
    setOpenPopup(false);
  }

  const handleApplyCriteria = e => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const myClassVar = values.myClass;
    const categoryVar = values.category;
    const subjectVar = values.subject;
    const difficultyLevelVar = values.difficultyLevel;
    const ageRangeVar = values.ageRange;
    const topicVar = values.topic;
    if (accessIncludeSelection == "includeOwner")
    {
      listByCriteria(
        selectedComponent,
        { userId: userId, },
        {
          owner_id: userId,
          myClass: myClassVar,
          category: categoryVar,
          subject: subjectVar,
          difficultyLevel: difficultyLevelVar,
          ageRange: ageRangeVar,
          topic: topicVar,
        },
        {
          t: jwt.token,
        },
        signal
      ).then((data) => {
          if (!data) {
            console.log(
              "FrameworkComponent Container - No Data so dispatch, Check Criteria - !data", data
            );
            console.log(
              "frameworkComponentContainer - no error but no data so set to one blank record - dadta = ", data
            );
            //setCandidateComponents(selectedComponent,[]);
            setFrameworkComponentSelectionListing([]);
            setFrameworkComponentSelectionListingPreFilter([]);
          } else {
            if (data.error) {
              console.log(
                "frameworkComponentContainer - error returned -data.error = " + data.error
              );
              console.log(
                "frameworkComponentContainer - no error but no data so set to one blank record - dadta = ", data
              );
              //setCandidateComponents(selectedComponent,[]);
              setFrameworkComponentSelectionListing([]);
              setFrameworkComponentSelectionListingPreFilter([]);
            } else if (data.length > 0) {
              //setCandidateComponents(selectedComponent,data); 
              setFrameworkComponentSelectionListing(data);
              setFrameworkComponentSelectionListingPreFilter(data);      
            } else {
              console.log(
                "frameworkComponentContainer - no error but no data so set to one blank record - dadta = ", data
              );
              //setCandidateComponents(selectedComponent,[]);
              setFrameworkComponentSelectionListing([]);
              setFrameworkComponentSelectionListingPreFilter([]);
            }
          }
        })
      
    } else if (accessIncludeSelection == "includePublic")
    {
      listByCriteria(
        selectedComponent,
        { userId: userId, },
        {
          approvedForPublicUse: true,
          myClass: myClassVar,
          category: categoryVar,
          subject: subjectVar,
          difficultyLevel: difficultyLevelVar,
          ageRange: ageRangeVar,
          topic: topicVar,
        },
        {
          t: jwt.token,
        },
        signal
      ).then((data) => {
        if (!data) {
          console.log(
            "FrameworkComponent Container - No Data so dispatch, Check Criteria"
          );
          //setCandidateComponents(selectedComponent,[]);
          setFrameworkComponentSelectionListing([]);
          setFrameworkComponentSelectionListingPreFilter([]);
        } else {
          if (data.error) {
            console.log(
              "frameworkComponentContainer - error returned = " + data.error
            );
            //setCandidateComponents(selectedComponent,[]);
            setFrameworkComponentSelectionListing([]);
            setFrameworkComponentSelectionListingPreFilter([]);
          } else if (data.length > 0) {
            //setCandidateComponents(selectedComponent,data);
            setFrameworkComponentSelectionListing(data);
            setFrameworkComponentSelectionListingPreFilter(data);
          } else {
            console.log(
              "frameworkComponentContainer - no error but no data so set to one blank record - dadta = ", data
            );
            //setCandidateComponents(selectedComponent,[]);
            setFrameworkComponentSelectionListing([]);
            setFrameworkComponentSelectionListingPreFilter([]);
          }
        }
      })
    } else if (accessIncludeSelection == "includeFriends")
    {
      listByCriteria(
        selectedComponent,
        { userId: userId, },
        {
          approvedForPublicUse: true,  // change to use group_id
          myClass: myClassVar,
          category: categoryVar,
          subject: subjectVar,
          difficultyLevel: difficultyLevelVar,
          ageRange: ageRangeVar,
          topic: topicVar,
        },
        {
          t: jwt.token,
        },
        signal
      ).then((data) => {
        if (!data) {
          console.log(
            "FrameworkComponent Container - No Data so dispatch, Check Criteria"
          );
          //setCandidateComponents(selectedComponent,[]);
          setFrameworkComponentSelectionListing([]);
          setFrameworkComponentSelectionListingPreFilter([]);
        } else {
          if (data.error) {
            console.log(
              "frameworkComponentContainer - error returned = " + data.error
            );
            //setCandidateComponents(selectedComponent,[]);
            setFrameworkComponentSelectionListing([]);
            setFrameworkComponentSelectionListingPreFilter([]);
          } else if (data.length > 0) {
            //setCandidateComponents(selectedComponent,data);
            setFrameworkComponentSelectionListing(data);
            setFrameworkComponentSelectionListingPreFilter(data);
          } else {
            console.log(
              "frameworkComponentContainer - no error but no data so set to one blank record - dadta = ", data
            );
            //setCandidateComponents(selectedComponent,[]);
            setFrameworkComponentSelectionListing([]);
            setFrameworkComponentSelectionListingPreFilter([]);
          }
        }
      })
    } else if (accessIncludeSelection == "includeGroups")
    {
      listByCriteria(
        selectedComponent,
        { userId: userId, },
        {
          owner: userId,
          myClass: myClassVar,
          category: categoryVar,
          subject: subjectVar,
          difficultyLevel: difficultyLevelVar,
          ageRange: ageRangeVar,
          topic: topicVar,
        },
        {
          t: jwt.token,
        },
        signal
      ).then((data) => {
        if (!data) {
          console.log(
            "FrameworkComponent Container - No Data so dispatch, Check Criteria"
          );
          //setCandidateComponents(selectedComponent,[]);
          setFrameworkComponentSelectionListing([]);
          setFrameworkComponentSelectionListingPreFilter([]);
        } else {
          if (data.error) {
            console.log(
              "frameworkComponentContainer - error returned = " + data.error
            );
            //setCandidateComponents(selectedComponent,[]);
            setFrameworkComponentSelectionListing([]);
            setFrameworkComponentSelectionListingPreFilter([]);
          } else if (data.length > 0) {
            //setCandidateComponents(selectedComponent,data);
            setFrameworkComponentSelectionListing(data);
            setFrameworkComponentSelectionListingPreFilter(data);
            //console.log(
            //  "frameworkComponentContainer - Update listing by ListByCriteria = constructDetail ", constructDetail)
          } else {
            console.log(
              "frameworkComponentContainer - no error but no data so set to one blank record - dadta = ", data
            );
            //setCandidateComponents(selectedComponent,[]);
            setFrameworkComponentSelectionListing([]);
            setFrameworkComponentSelectionListingPreFilter([]);
          }
        }
      })
    }   
   }

 // console.log(
 //   "frameworkComponentContainer - right after start of values = ",
 //   values
 // );
 // console.log(
 //   "frameworkComponentContainer - right after start of currentAccess = ",
 //   currentAccess
 // );

  const jwt = auth.isAuthenticated();
  const userId = jwt.user._id;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        Inclusion Options based on Onwership, previously defined friends, groups and publicly available Components
        name, label, value, onChange, items 
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
                <Controls.RadioGroup
                    name="includeOptions"
                    label="Include Options"                            
                    value={accessIncludeSelection}
                    onChange={handleIncludeSelectionChange}
                    items={accessInclusionOptions}
                />
            </Grid>
            <Grid item xs={3}>
              <Controls.Button
                text="Apply Criteria"
                variant="contained"
                color = "primary"
                onClick={handleApplyCriteria}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
          <Grid item xs={3}>
              <Controls.Button
                text="Return to Component Listing"
                variant="contained"
                color = "primary"
                onClick={handleExit}
              />
            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={3}>
                <Controls.Select
                  name="componentOptions"
                  label="Component Type"
                  classes={classes}
                  value={selectedComponent}
                  onChange={handleComponentChange}
                  options={componentOptions}
                    />
            </Grid>

          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <FrameworkComponentSelectionListing 
                frameworkComponentSelectionListing={frameworkComponentSelectionListing}
                setFrameworkComponentSelectionListing={setFrameworkComponentSelectionListing}
                frameworkComponentSelectionListingPreFilter={frameworkComponentSelectionListingPreFilter}
                frameworkComponents = {frameworkComponents}
                setFrameworkComponents = {setFrameworkComponents}
                selectedComponent={selectedComponent}
                frameworkComponentOptions ={frameworkComponentOptions}
                formValues={formValues}
                setFormValues={setFormValues}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              {" "}
              <Paper className={classes.paper}>
                {" "}
                <FrameworkComponentCriteria 
                  values={values}
                  setValues = {setValues}
                  />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
