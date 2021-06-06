import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import Controls from "../../controls/Controls";
import Icon from "@material-ui/core/Icon";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Form } from '../../components/shared/useForm';
import auth from "./../../auth/auth-helper";
import {myClassOptions,subjectOptions,ageRangeOptions,difficultyLevelOptions,categoryOptions} from "./../../lookupOptions/CriteriaOptions"
import Notification from "../../components/shared/Notification";
import { loadGutenbergQuoteData } from "./api-constructQuote.js";


  const useStyles = makeStyles((theme) => ({
    root: {
      height: "40px",
      width: "120px"
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
    },
  }));

export default function ConstructQuoteImport(props) {
const {openImportPopup} = props;
const {setOpenImportPopup} = props;
const { constructPreferences } = props;
const { groupsUserOwns } = props;

const classes = useStyles();
const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

const jwt = auth.isAuthenticated();
const userId = jwt.user._id;

console.log("ConstructQuoteImport" );

const [sourceFile, setSourceFile] = useState();
const [importValues, setImportValues] = useState({
  topic:  "",
  description:   "",
  myClass:  "Academic",
  category:  "Word Recognition",
  subject:  "Language Arts",
  type:  "Component",
  subType:  "Quote",
  difficultyLevel:  17,
  ageRange:  4,
  image_id:  "",
  imageFileName:  "",
  owner_id: userId,
  group_id:  constructPreferences.group_id ? constructPreferences.group_id : "",
  keepPrivate:  false,
  approvedForPublicUse: true,
  constructQuote: {
    quote: "",	
    source: "",
    type: "",
    prood: [],
    contraryStatement: [],
  },
  markDeleted:  false,
  createDate:  Date.now(),
  updatedBy:  userId,
  updateDate: Date.now(),
  _v:  "0",
  _id:  uuidv4(),
  modified: false,
  isError: false,
  errorMessage: "",
  });
  
console.log("ConstructQuoteImport - after setImportValues = ",importValues );

const [errors, setErrors] = useState({});

const handleInputChange = e => {
    const name = e.target.name;
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setImportValues({
        ...importValues,
        [name]: value
    })
    validate({ [e.target.name]: value })
}

const handleImportFileChange = e => {
  setSourceFile(e.target.value);
}

  const validate = (fieldValues = importValues) => {
      let temp = { ...errors }
      if ('myClass' in fieldValues)
          temp.myClass = fieldValues.myClass ? "" : "This field is required."
      if ('category' in fieldValues)
          temp.category = fieldValues.category ? "" : "This field is required."
      if ('subject' in fieldValues)
          temp.subject = fieldValues.subject ? "" : "This field is required."
      if ('difficultyLevel' in fieldValues)
          temp.difficultyLevel = fieldValues.difficultyLevel ? "" : "This field is required."
      if ('ageRange' in fieldValues)
          temp.ageRange = fieldValues.ageRange ? "" : "This field is required."

      setErrors({
          ...temp
      })

      if (fieldValues == importValues)
          return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = e => {
      e.preventDefault()
      if (validate()) {
          console.log("Hurray!  Passed Validation!!!")
      }
  }

  const handleImportQuotes = e => {
      e.preventDefault()
      if (validate()) {
        loadFile(); 
      }
  }
  const handleCancelExit = e => {
    setOpenImportPopup(false);
  }

  const loadFile = () => {
    loadGutenbergQuoteData(
          { userId: jwt.user._id, 
            skeletonQuote: importValues,
          },
          {
            t: jwt.token,
          }
    ).then((data) => {
      if (!data) {
        console.log(
          "ConstructQuoteImport - No Data so dispatch, Check Criteria"
        );
      } else {
        if (data.error) {
          console.log(
            "ConstructQuoteImport - load error returned = " + data.error
          );
        } else {
          console.log("ConstructQuoteImport - load data =  " + data);

          }
          setNotify({
            isOpen: true,
            message: "File Load of Quotes Completed",
            type: "success",
          });
        }
      }
    )}; // End of Create function

    return (
    <>
        <Form onSubmit={handleSubmit}>
            <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.title}>
                Each new quote record will include entries as you have assigned them on this form.
                You can enter or leave blank entries for topic, tittle and/or description.
                Imput file must be comma delimited.  
                Input file must contain the quote.  The file may also contain; topic, title and description.
                Order of entries on input file matter!
                If topic is left blank on the form it must be the first entry in the file.
                If title is left blank on form it must be the second column unless topic is from form in which case it will be first.
                Description would be the next column on the file.
                Quote must always be included.  It can be the only file entry if other data is on the form.
              </Typography>
            </Grid>

            <Grid item xs={6}>
                   <Controls.Button
                    text="Import Quotes from Quote File"
                    variant="contained"
                    color = "primary"
                    endIcon={<ImportExportIcon/>}
                    onClick={handleImportQuotes}
                />
            </Grid> 
            <Grid item xs={6}>
                <Controls.Button
                    text=" Exit"
                    variant="contained"
                    color = "default"
                    endIcon={<ExitToAppIcon />}
                    onClick={handleCancelExit}
                />
            </Grid> 
            {importValues.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {importValues.error}
              </Typography>
            )}
            <br />
            <Grid item xs={6}>
                <Controls.Input
                    name="topic"
                    label="Topic"
                    value={importValues.topic}
                    onChange={handleInputChange}
                    error={errors.topic}
                />
            </Grid>
            <Grid item xs={6}>
                    <Controls.Input
                        name="description"
                        label="Description"
                        value={importValues.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div>

                        Access to be applied to imported quotes

                    </div>
                    <Controls.Checkbox
                        name="keepPrivate"
                        label="Keep Private"
                        value={importValues.keepPrivate}
                        onChange={handleInputChange}
                    />
                      <Controls.Select
                        name="group_id"
                        label="Name of Group With Access"
                        classes={classes}
                        value={importValues.group_id}
                        onChange={handleInputChange}
                        options={groupsUserOwns}
                    />
                      <Controls.Checkbox
                        name="approvedForPublicUse"
                        label = "Approved for Public Use"
                        value={importValues.approvedForPublicUse}
                        onChange={handleInputChange}                        
                      />
                </Grid>
                <br />
                <Grid item xs={6}>
                <div>

                Criteria/Tags to be applied to imported quotes

                </div>
                <Controls.Select
                        name="myClass"
                        label="Class"
                        classes={classes}
                        value={importValues.myClass}
                        onChange={handleInputChange}
                        options={myClassOptions}
                        error={errors.myClass}
                    />
                    <Controls.Select
                        name="category"
                        label="Category"
                        value={importValues.category}
                        onChange={handleInputChange}
                        options={categoryOptions}
                        error={errors.category}
                    />
                    <Controls.Select
                        name="subject"
                        label="Subject"
                        value={importValues.subject}
                        onChange={handleInputChange}
                        options={subjectOptions}
                        error={errors.subject}
                    />
                    <Controls.Select
                        name="difficultyLevel"
                        label="Difficulty Level"
                        value={importValues.difficultyLevel}
                         onChange={handleInputChange}
                        options={difficultyLevelOptions}
                        error={errors.difficultyLevel}
                    />
                    <Controls.Select
                        name="ageRange"
                        label="Age Range"
                        value={importValues.ageRange}
                        onChange={handleInputChange}
                        options={ageRangeOptions}
                        error={errors.ageRange}
                    />
                </Grid>
                </Grid>
        </Form>
        <Notification notify={notify} setNotify={setNotify} />
    </>
    )
}
