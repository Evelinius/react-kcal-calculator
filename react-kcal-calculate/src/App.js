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
import { menu } from './mealtymenu';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 40,
  },
  container: {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    marginTop: 10,
    height: 350,

  },
  header: {
    height: 80,
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center"
  },
  radio: {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center"
  },
  pointers: {
    "display": "flex",
    "justify-content": "space-around"
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
      activeCoeff: 0,
      stage: 0
    }
  }

  handleHeightChange = (event) => {
    if (isNumeric(event.target.value)) {
      this.setState({
        heightIsValid: false
      })
    }
    else {
      this.setState({
        heightIsValid: true
      })
    }
    this.setState({ height: event.target.value })
  }

  handleWeightChange = (event) => {
    if (isNumeric(event.target.value)) {
      this.setState({
        weightIsValid: false
      })
    }
    else {
      this.setState({
        weightIsValid: true
      })
    }
    this.setState({ weight: event.target.value })
  }

  handleAgeChange = (event) => {
    if (isNumeric(event.target.value)) {
      this.setState({
        ageIsValid: false
      })
    }
    else {
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
    this.setState({ activeCoeff: event.target.value })
  }

  calculate = () => {
    const { norma, dificitLow, dificitHigh, protLow, protHigh, fatLow, fatHigh, carbsLow, carbsHigh } = CalculateYourNorma(this.state.height, this.state.weight, this.state.age, this.state.gender, this.state.activeCoeff, true, false)
    this.setState({
      calculatedValue: norma,
      calculateDificitLow: dificitLow,
      calculateDificitHigh: dificitHigh,
      calculateProtLow: protLow,
      calculateProtHigh: protHigh,
      calculateFatLow: fatLow,
      calculateFatHigh: fatHigh,
      calculateCarbsLow: carbsLow,
      calculatecarbsHigh: carbsHigh
    })
  }

  next = () => {
    this.setState({ stage: this.state.stage + 1 })
  }

  prev = () => {
    this.setState({ stage: this.state.stage - 1 })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.header} item xs={12}>
          Stay cool
          </Grid>
        <Grid container>
          <Grid item xs={6}>
            <div className={classes.container} >
              {this.state.stage == 0 && <div>
                <FormControl component="fieldset">
                  <FormLabel className="radioText" component="gender">Are you</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={this.state.gender} onChange={this.handleGenderChange}>
                    <FormControlLabel value="female" control={<StyledRadio />} label="Female" />
                    <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
                  </RadioGroup>
                </FormControl>
              </div>}
              {this.state.stage == 1 && <div Validate autoComplete="off">
                <FormLabel className="radioText" component="data">Insert your data</FormLabel>
                <CustomizedTextField error={this.state.ageIsValid} label="Age" onChange={this.handleAgeChange} value={this.state.age} />
                <CustomizedTextField error={this.state.heightIsValid} label="Height" onChange={this.handleHeightChange} value={this.state.height} InputProps={{
                  startAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                }} />
                <CustomizedTextField error={this.state.weightIsValid} label="Weight" onChange={this.handleWeightChange} value={this.state.weight} InputProps={{
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                }} />
              </div>}
              {this.state.stage == 2 && <div>
                <FormControl component="fieldset">
                  <FormLabel className="radioText" component="activeCoeff">What is your level in sports?</FormLabel>
                  <RadioGroup aria-label="sport" name="sportlevel" value={this.state.activeCoeff} onChange={this.handleSportChange}>
                    <FormControlLabel value="1.2" control={<StyledRadio />} label="I don't play sports at all" />
                    <FormControlLabel value="1.38" control={<StyledRadio />} label="I do sports 3 times a week" />
                    <FormControlLabel value="1.46" control={<StyledRadio />} label="I do sports 5 times a week" />
                    <FormControlLabel value="1.55" control={<StyledRadio />} label="I do intense workouts 5 times a week" />
                    <FormControlLabel value="1.64" control={<StyledRadio />} label="I do workouts every day" />
                    <FormControlLabel value="1.73" control={<StyledRadio />} label="I do intense workouts every day or 2 times a day" />
                    <FormControlLabel value="1.9" control={<StyledRadio />} label="I do workouts every day and I have a hard work" />
                  </RadioGroup>
                </FormControl>
              </div>}
              {this.state.stage == 3 && <div>
              <Button className="Button" onClick={this.calculate}>Calculate</Button>
              <Paper style={{ backgroundColor: '#white', height: '15vh', width: '30vh', textAlign: 'center', color: 'black', fontFamily: 'Roboto'}}>
              <div>Your Norma: {this.state.calculatedValue} kcal
                <p>Prot: {this.state.calculateProtLow} g </p>
                <p>Carbs: {this.state.calculateCarbsLow} g</p>
                <p>Fat: {this.state.calculateFatLow} g</p>
              </div>
            </Paper>
            </div>}
            </div>
            <div className={classes.pointers}>
                <Button className="Prev" onClick={this.prev} disabled={this.state.stage == 0}>Previous</Button>
                <Button className="Next" onClick={this.next} disabled={this.state.stage == 3}>Next</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
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
  return { norma, dificitLow, dificitHigh, protLow, protHigh, fatLow, fatHigh, carbsLow, carbsHigh };
}

export default withStyles(styles)(App);

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}
