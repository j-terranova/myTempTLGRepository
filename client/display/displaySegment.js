import React, { useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';

import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { Form } from './../components/shared/useForm';
import auth from "./../auth/auth-helper";
import Notification from "./../components/shared/Notification";

export default function Segment(props) {
    const {displayConstruct} = props;
    const classes = useStyles();

    const sequenceNo = displayConstruct.sequenceNo;
  const image_id = displayConstruct.image_id;
  const type = displayConstruct.type;
  const subType = displayConstruct.subType;
  const constructPrimaryColumn = displayConstruct.constructPrimaryColumn;
  const constructOptionsSource = displayConstruct.constructOptionsSource;
  const constructNumberOfOptions = displayConstruct.constructNumberOfOptions;
  const constructResponseFormat = displayConstruct.constructResponseFormat;
  const constructColor = displayConstruct.constructColor;
  const constructId = displayConstruct.constructId;


  const constructSegment = displayConstruct.constructDetail;

  console.log("DisplaySegment - constructSegment = ", constructSegment );
  const [definitionSelection, setDefinitionSelection] = useState("");

  useEffect(() => {
    console.log("DisplaySegment - in useEffect - constructSegment = ", constructSegment );
  }, [constructSegment]);


  const handleSelectionChange = e => {
    const value = e.target.value;
    setDefinitionSelection(value);
  }
 return (
  <>
    <Form >
      <h2>Reading Segment</h2>
      <h3>Add Description here</h3>
      <Editor apiKey='kaibo0cer0y7n2n9tmjmr22cr831mkbulk761qqsv2acvxj4'

        initialValue={constructSegment}
        init={{
          height: 500,
          menubar: false,
          //theme : "advanced",
          readonly : 1,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        
      />
     
    </Form>
    
  </>
  )
  //<input type="submit" value="Submit" />
}