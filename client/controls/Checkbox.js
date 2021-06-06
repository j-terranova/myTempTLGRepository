import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';

export default function Checkbox(props) {

    const { name, label, value, onChange, disabled } = props;


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    const disableValue = disabled;
    return (
        disableValue === "true" ? (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    disabled
                    name={name}
                    color="primary"
                    checked={value}
                    margin="dense"
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>):
        (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>)
    )
}
