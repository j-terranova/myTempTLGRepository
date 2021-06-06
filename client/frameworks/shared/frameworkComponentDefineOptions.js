import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Controls from "../../controls/Controls";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import Notification from "../../components/shared/Notification";
import DisplayConstructOptions  from "../../lookupOptions/DisplayConstructOptions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "40px",
    width: "120px"
  },
}));


const Container = (props) => (
  <Grid container justify="space-around" {...props} />
);
const Item = (props) => <Grid item xs={12} {...props} />;


export default function FrameworkComponentDefineOptions(props) {
  const{  frameworkComponentOptions,
          setFrameworkComponentOptions,
          setSelected,
          okToUpdate, } = props;

const classes = useStyles();
const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const displayConstructOptions = DisplayConstructOptions();
  
  const constructPrimaryColumnOptions =  displayConstructOptions.constructPrimaryColumnOptions;
  const constructOptionsSourceOptions = displayConstructOptions.constructOptionsSourceOptions;
  const constructNumberOfOptionsOptions = displayConstructOptions.constructNumberOfOptionsOptions;
  const constructResponseFormatOptions = displayConstructOptions.constructResponseFormatOptions;
  const constructColorOptions = displayConstructOptions.constructColorOptions;

const handleSaveOptions = e => {
    setSelected([]);
    setNotify({
      isOpen: true,
      message: "Options defined",
      type: "success",
    });
}

/*
  sequenceNo: 0,
  constructDetail: "",
  type: "Component",
  subType: "",
  constructResponseFormat:  "",
  constructPrimaryColumn:  "",
  constructOptionsSource: "",
  constructNumberOfOptions:  4,
  constructResponseFormat:  "",
  constructColor:  "",
  constructId:  "",
  */

  const handleBaseInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFrameworkComponentOptions({...frameworkComponentOptions, [name] : value});
    console.log("FrameworkComponentOptions - handleBaseInputChange - frameworkComponentOptions = ", frameworkComponentOptions);
  };
  return (
    <>      
      <div className={classes.root}>
        <Container spacing={2} justify="center" className={classes.container}>
          <Item xs={12}>
            <div>Component Layout Options</div>
          </Item>
          <Item item xs={12} >
              <Controls.Select
                name="constructPrimaryColumn"
                label="Primary Column"
                value={frameworkComponentOptions.constructPrimaryColumn}
                onChange={event => handleBaseInputChange(event)}
                options={constructPrimaryColumnOptions}
              />
          </Item>
          <Item item xs={12} >
              <Controls.Select
                name="constructResponseFormat"
                label="Response Method"
                value={frameworkComponentOptions.constructResponseFormat}
                onChange={event => handleBaseInputChange(event)}
                options={constructResponseFormatOptions}
              />
          </Item>
          <Item item xs={12} >
              <Controls.Select
                name="constructOptionsSource"
                label="options Source"
                value={frameworkComponentOptions.  constructOptionsSource}
                onChange={event => handleBaseInputChange(event)}
                options={constructOptionsSourceOptions}
              />
          </Item>
          <Item item xs={12} >
             <Controls.Select
                name="constructNumberOfOptions"
                label="Number Of Options"
                value={frameworkComponentOptions.constructNumberOfOptions}
                onChange={event => handleBaseInputChange(event)}
                options={constructNumberOfOptionsOptions}
              />
          </Item>
          <Item item xs={12} >
             <Controls.Select
                name="constructColor"
                label="Color"
                value={frameworkComponentOptions.constructColor}
                onChange={event => handleBaseInputChange(event)}
                options={constructColorOptions}
              />
          </Item>
          <Item item xs={12} >
                <Controls.Button
                    text="Apply"
                    startIcon={<CancelIcon />}
                    variant="contained"
                    color = "default"
                    endIcon={<ExitToAppIcon />}
                    onClick={handleSaveOptions}
                    disabled = {okToUpdate?false:true}
                />
          </Item>
          <br/>
        <pre>
          {JSON.stringify(frameworkComponentOptions.includeConstructs, null, 2)}
        </pre>
        </Container>
    </div>
    <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};
