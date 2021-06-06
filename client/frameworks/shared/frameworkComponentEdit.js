import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../../components/shared/Notification";
import Controls from "../../controls/Controls";
import Grid from "@material-ui/core/Grid";
import { Form } from '../../components/shared/useForm';
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DisplayConstructOptions  from "../../lookupOptions/DisplayConstructOptions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "40px",
    width: "120px"
  },
}));

export default function FrameworkComponentEdit(props) {
  const{recordForEdit,
        updateFrameworkComponents,
        setSelected, 
        setOpenEditPopup, } = props;

        const classes = useStyles();
const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  
const displayConstructOptions = DisplayConstructOptions();

const constructPrimaryColumnOptions = displayConstructOptions.constructPrimaryColumnOptions;
const constructOptionsSourceOptions = displayConstructOptions.constructOptionsSourceOptions;
const constructNumberOfOptionsOptions = displayConstructOptions.constructNumberOfOptionsOptions;
const constructResponseFormatOptions = displayConstructOptions.constructResponseFormatOptions;
const constructColorOptions = displayConstructOptions.constructColorOptions;

const [frameworkComponentEdit, setFrameworkComponentEdit] = useState(
  {
    sequenceNo: recordForEdit.sequenceNo?recordForEdit.sequenceNo:0,
    constructDetail: recordForEdit.constructDetail?recordForEdit.constructDetail:"",
    type: recordForEdit.type?recordForEdit.type:"Component",
    subType: recordForEdit.subType?recordForEdit.subType:"",
    constructPrimaryColumn: recordForEdit.constructPrimaryColumn?recordForEdit.constructPrimaryColumn:"KeyWordOrQuestion",
    constructOptionsSource: recordForEdit.constructOptionsSource?recordForEdit.constructOptionsSource:"SecondaryColumns",
    constructNumberOfOptions: recordForEdit.constructNumberOfOptions?recordForEdit.constructNumberOfOptions: 4,
    constructResponseFormat: recordForEdit.constructResponseFormat?recordForEdit.constructResponseFormat:"QuestionMultiChoice",
    constructColor: recordForEdit.constructColor?recordForEdit.constructColor:"Default",
    constructId: recordForEdit.constructId?recordForEdit.constructId:"",

  }
);

const handleExit = e => {
  setSelected([]);
  setOpenEditPopup(false);
}

const handleSave = e => {
  setSelected([]);
  updateFrameworkComponents(frameworkComponentEdit);
  setOpenEditPopup(false);
}

const handleBaseInputChange = (event) => {
  const value = event.target.value;
  const name = event.target.name;
  setFrameworkComponentEdit({...frameworkComponentEdit, [name] : value});
  console.log("FrameworkComponentEdit - handleBaseInputChange - frameworkComponentEdit = ", frameworkComponentEdit);
  setNotify({
    isOpen: true,
    message: "Components updated",
    type: "success",
  });
};

  return (
    <>      
      <Form onSubmit={handleExit}>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Controls.Select
                name="constructPrimaryColumn"
                label="Primary Column"
                multiline
                value={frameworkComponentEdit.constructPrimaryColumn}
                onChange={event => handleBaseInputChange(event)}
                options={constructPrimaryColumnOptions}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={3}>
             <Controls.Select
                name="constructOptionsSource"
                label="Options Source"
                value={frameworkComponentEdit.constructOptionsSource}
                onChange={event => handleBaseInputChange(event)}
                options={constructOptionsSourceOptions}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Controls.Select
                name="constructNumberOfOptions"
                label="number of Options"
                multiline
                value={frameworkComponentEdit.constructNumberOfOptions}
                onChange={event => handleBaseInputChange(event)}
                options={constructNumberOfOptionsOptions}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={3}>
             <Controls.Select
                name="constructResponseFormat"
                label="Response Format"
                value={frameworkComponentEdit.constructResponseFormat}
                onChange={event => handleBaseInputChange(event)}
                options={constructResponseFormatOptions}
              />
            </Grid>
            <Grid item xs={3}>
             <Controls.Select
                name="constructColor"
                label="Color"
                value={frameworkComponentEdit.constructColor}
                onChange={event => handleBaseInputChange(event)}
                options={constructColorOptions}
              />
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={4}>   
                <Controls.Button
                    text=" Save'n Exit "
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color = "inherit"
                    //margin="dense"
                    endIcon={<ExitToAppIcon />}
                    onClick={handleSave}
                />
            </Grid>    
            <Grid item xs={4}>   
                <Controls.Button
                    text=" Exit "
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color = "inherit"
                    //margin="dense"
                    endIcon={<ExitToAppIcon />}
                    onClick={handleExit}
                />
            </Grid>   
            <Grid item xs={4}>   
            </Grid>   
          </Grid>
        <br/>
        <pre>
          {JSON.stringify(frameworkComponentEdit, null, 2)}
        </pre>
      </Form>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
