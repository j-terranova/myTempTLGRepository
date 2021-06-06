import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Controls from "../../controls/Controls";
import { Form } from './useForm';

export default function ApplyOptionsForm(props) {
  const { applyOptions, setApplyOptions } = props;
  const { openPopup, setOpenPopup } = props;
  const [values, setValues] = useState({
    isUpdateListing: false,
    isUpdateSelectedRecords: false,
    isUpdateAllListedRecords: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplyOptions ({
      isUpdateListing: true,
      isUpdateSelectedRecords: values.isUpdateSelectedRecords,
      isUpdateAllListedRecords: values.isUpdateAllListedRecords,
    })
    setOpenPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDoNothing = () => {
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Checkbox
            name="isUpdateListing"
            label="Update Listing - Performed by default if changes applied"
            value={true}
            onChange={handleDoNothing}
            disabled = "true"
          />
          <Controls.Checkbox
            name="isUpdateSelectedRecords"
            label="Update Selected Record(s)"
            value={values.isUpdateSelectedRecords}
            onChange={handleInputChange}
            disabled = "false"
          />
          <Controls.Checkbox
            name="isUpdateAllListedRecords"
            label="Update All Listed Records"
            value={values.isUpdateAllListedRecords}
            onChange={handleInputChange}
            disabled = "false"
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
