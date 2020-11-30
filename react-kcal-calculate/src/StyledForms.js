import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
  root: {
    "width": "200px",
    '& label.Mui-focused': {
      color: 'pink',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        borderColor: '#f7578e',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f4abc4',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomTextField(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate>
       <CssTextField
        error={props.error}
        helperText={props.error? "It's int lol": undefined}
        label={props.label}
        onChange={props.onChange}
        value={props.value}
        className={classes.margin}
        variant="outlined"
        id="custom-css-outlined-input"
        InputProps={props.InputProps}
       />
    </form>
  );
}
