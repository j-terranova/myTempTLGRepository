import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function Input(props) {

    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            margin="dense"
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
