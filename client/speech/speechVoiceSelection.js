import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Controls from "./../controls/Controls";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "./../components/shared/Notification";


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

export default function SpeechVoiceSelections(props) {
  const { speechReference} = props;
  const { utteranceObject} = props;
  const { voiceObjects} = props;
  const {  primaryVoiceObject} = props;
  const {  setPrimaryVoiceObject} = props;
  const {  secondaryVoiceObject} = props;
  const {  setSecondaryVoiceObject} = props;


  const [voiceOptions, setVoiceOptions] = useState([]);
  const [primaryVoice, setPrimaryVoice] = useState("");
  const [secondaryVoice, setSeondaryVoice] = useState("");

  console.log("SpeechVoiceSelections -  voiceObjects = ", voiceObjects);
  console.log("SpeechVoiceSelections -  primaryVoiceObject = ", primaryVoiceObject);
  console.log("SpeechVoiceSelections -  secondaryVoiceObject = ", secondaryVoiceObject);

  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    setTimeout(() => {
        let newVoiceOptions = voiceObjects.map(data => 
            {
                return { id : data.name, title : data.name }
            })
    setVoiceOptions(newVoiceOptions);
    setPrimaryVoice(voiceObjects[0].name);
    setSeondaryVoice(voiceObjects[1].name);
    console.log("SpeechVoiceSelections -  voiceObjects[0].name = ", voiceObjects[0].name);
    console.log("SpeechVoiceSelections -  voiceObjects[1].name = ", voiceObjects[1].name);
    }, 200);
  }, [voiceObjects]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value =  e.target.value;
    console.log("SpeechVoiceSelections - handleInputChange - name = ", name);
    console.log("SpeechVoiceSelections - handleInputChange - value = ", value);
    console.log("SpeechVoiceSelections - useEffect - voiceObjects = ", voiceObjects);
    if (name == "primaryVoice")
    {
        for(let i = 0; i < voiceObjects.length ; i++) {
            if(voiceObjects[i].name == value) {
              setPrimaryVoiceObject(voiceObjects[i]);
              setPrimaryVoice(voiceObjects[i].name);
              break;
            }
        }
    } else if (name == "secondaryVoice")
    {
      for(let i = 0; i < voiceObjects.length ; i++) {
        if(voiceObjects[i].name == value) {
          setSecondaryVoiceObject(voiceObjects[i]);
          setSeondaryVoice(voiceObjects[i].name);
          break;
        }
    }
    }

    }
  return (
    <>
      <div className={classes.root}>
        <Container spacing={2} alignItems="flex-start" className={classes.container}>
          <Item xs={8}>
            <div>Voice Selection</div>
          </Item>
                <Item item xs={8} >
                <h2>First Voice</h2>
                  <Controls.Select
                          name="primaryVoice"
                          label="Primary Voice"
                          classes={classes}
                          value={primaryVoice}
                          onChange={handleInputChange}
                          options={voiceOptions}
                      />
              </Item>
              <Item item xs={8} >
              <h2>Second Voice</h2>
                <Controls.Select
                      name="secondaryVoice"
                      label="Secondary Voice"
                      classes={classes}
                      value={secondaryVoice}
                      onChange={handleInputChange}
                      options={voiceOptions}
                  />
              </Item>
              <Item item xs={8} >
                <p>       </p>
              </Item>
        </Container>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

