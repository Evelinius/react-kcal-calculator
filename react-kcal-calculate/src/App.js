import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import 'fontsource-roboto';
import { StyledRadio } from './StyledRadio';
import CustomizedTextField from './StyledForms';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    "width": "calc(100%)"
  },
  header: {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center"
  },
  button: {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center"
  },
  radio: {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center"
  },
  result: {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gender: 'female',
      age: undefined,
      height: undefined,
      weight: undefined,
      calculatedValue: 0,
      heightIsValid: false,
      weightIsValid: false,
      ageIsValid: false,
      activeCoeff: 0
    }
  }

  handleHeightChange = (event) => {
    if(isNumeric(event.target.value)){
      this.setState({
        heightIsValid: false
      })
    }
    else{
    this.setState({
      heightIsValid: true
    })
  }
  this.setState({ height: event.target.value })
}

  handleWeightChange = (event) => {
    if(isNumeric(event.target.value)){
      this.setState({
        weightIsValid: false
      })
    }
    else{
    this.setState({
      weightIsValid: true
    })
  }
  this.setState({ weight: event.target.value })
}

  handleAgeChange = (event) => {
    if(isNumeric(event.target.value)){
      this.setState({
        ageIsValid: false
      })
    }
    else{
    this.setState({
      ageIsValid: true
    })
  }
  this.setState({ age: event.target.value })
}

  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value })
  }

  handleSportChange = (event) => {
    this.setState({activeCoeff: event.target.value})
  }

  calculate = () => {
    const value = CalculateYourNorma(this.state.height, this.state.weight, this.state.age, this.state.gender, this.state.activeCoeff, true, false)
    this.setState({
      calculatedValue: value
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <iframe src="https://www.mealty.ru/" width="1000" height="1000" align="left">
            Ваш браузер не поддерживает встроенные фреймы!
        </iframe>
        <Grid className={classes.container} container spacing={10}>
          <Grid className={classes.header} item xs={12}>
            Stay cool
          </Grid>
          <Grid className={classes.radio} item xs={4}>
            <FormControl component="fieldset">
              <FormLabel className="radioText" component="gender">Are you</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={this.value} onChange={this.handleGenderChange}>
                  <FormControlLabel value="female" control={<StyledRadio />} label="Female" />
                  <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
                </RadioGroup>
              </FormControl>
          </Grid>
          <Grid className={classes.data} Validate autoComplete="off" item xs={4}>
            <CustomizedTextField error={this.state.ageIsValid} label="Age" onChange={this.handleAgeChange} value={this.state.age}/>
            <CustomizedTextField error={this.state.heightIsValid} label="Height" onChange={this.handleHeightChange} value={this.state.height} InputProps={{
              startAdornment: <InputAdornment position="start">Cm</InputAdornment>,
            }}/>
            <CustomizedTextField error={this.state.weightIsValid} label="Weight" onChange={this.handleWeightChange} value={this.state.weight} InputProps={{
              startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
            }}
            />
          </Grid>
          <Grid className={classes.button} item xs={4}> 
          <Button className="Button" onClick={this.calculate}>Calculate</Button> 
          </Grid>
          <Grid className={classes.radio} item xs={6}>
            <FormControl component="fieldset">
              <FormLabel className="radioText" component="sport">What is your level in sports?</FormLabel>
                <RadioGroup aria-label="sport" name="sportlevel" value={this.value} onChange={this.handleSportChange}>
                  <FormControlLabel value="1.2" control={<StyledRadio />} label="I don't play sports at all" />
                  <FormControlLabel value="1.38" control={<StyledRadio />} label="I do sports 3 times a week" />
                  <FormControlLabel value="1.46" control={<StyledRadio />} label="I do sports 5 times a week" />
                  <FormControlLabel value="1.55" control={<StyledRadio />} label="I do intense workouts 5 times a week" />
                  <FormControlLabel value="1.64" control={<StyledRadio />} label="I do workouts every day" />
                  <FormControlLabel value="1.73" control={<StyledRadio />} label="I do intense workouts every day or 2 times a day" />
                  <FormControlLabel value="1.73" control={<StyledRadio />} label="I do workouts every day and I have a hard work" />
                </RadioGroup>
              </FormControl>
          </Grid>
          <Grid  item xs={6}>
          <Paper style={{ backgroundColor: '#cfe8fc', height: '50vh', textAlign: 'center' }}>
            <div>Calculated value: {this.state.calculatedValue}</div>
          </Paper>
          </Grid>
        </Grid>
      </div>
    )}
}

const CalculateYourNorma = (height, weight, age, gender, activeCoeff, maintaining, deficit) => {
  let norma = 0

  if (gender == "female") {
    norma = (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activeCoeff;
  }

  if (gender == "male") {
    norma = (66 + (13.7 * weight) + (5 * height) - (6.8 * age)) * activeCoeff;
  }
  let dificitLow = norma - norma * 0.1;
  let dificitHigh = norma - norma * 0.2;

  let protLow = (norma - norma * 0.8) / 4;
  let protHigh = (norma - norma * 0.7) / 4;

  let fatLow = weight;
  let fatHigh = weight * 1.5;

  let carbsHigh = 0;
  let carbsLow = 0;
  if (maintaining == true) {
    carbsHigh = norma - protLow - fatLow;
    carbsLow = norma - protHigh - fatHigh;
  }

  if (deficit == true) {
    carbsLow = dificitLow - protHigh - fatHigh;
    carbsHigh = dificitHigh - protLow - fatLow;
  }
  return (norma, dificitLow, dificitHigh, protLow, protHigh, fatLow, fatHigh, carbsLow, carbsHigh);
}

export default withStyles(styles)(App);

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}