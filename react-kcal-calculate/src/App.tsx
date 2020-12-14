import * as React from 'react';
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
const styles = (theme: any) => ({
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

export interface Props {
  classes: any;
}

type Gender = 'male' | 'female'
type Goal = 'maintaining' | 'deficit'

export interface AppState {
  gender: Gender,
  age: number | undefined,
  height: number | undefined,
  weight: number | undefined,
  goal: Goal,
  calculatedValue: number,
  heightIsValid: boolean,
  weightIsValid: boolean,
  ageIsValid: boolean,
  activeCoeff: number,
  stage: number,

  calculateDificitLow: number | undefined,
  calculateDificitHigh:  number | undefined,
  calculateProtLow:  number | undefined,
  calculateProtHigh:  number | undefined,
  calculateFatLow:  number | undefined,
  calculateFatHigh:  number | undefined,
  calculateCarbsLow:  number | undefined,
  calculatecarbsHigh:  number | undefined
}

class App extends React.Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gender: 'female',
      age: undefined,
      height: undefined,
      weight: undefined,
      goal: 'maintaining',
      calculatedValue: 0,
      heightIsValid: false,
      weightIsValid: false,
      ageIsValid: false,
      activeCoeff: 0,
      stage: 0,

      calculateDificitLow: undefined,
      calculateDificitHigh: undefined,
      calculateProtLow: undefined,
      calculateProtHigh: undefined,
      calculateFatLow: undefined,
      calculateFatHigh: undefined,
      calculateCarbsLow: undefined,
      calculatecarbsHigh: undefined
    }
  }

  handleHeightChange = (event: any) => {
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

  handleWeightChange = (event: any) => {
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

  handleAgeChange = (event: any) => {
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

  handleGenderChange = (event: any) => {
    this.setState({ gender: event.target.value })
  }

  handleSportChange = (event: any) => {
    this.setState({ activeCoeff: event.target.value })
  }

  handleGoalChange = (event: any) => {
    this.setState({ goal: event.target.value})
  }

  calculate = () => {
    const { norma, deficitLow, deficitHigh, protLow, protHigh, fatLow, fatHigh, carbsLow, carbsHigh } = 
      CalculatePFC(this.state.height ?? 0, this.state.weight ?? 0, this.state.gender, this.state.age ?? 0, this.state.activeCoeff ?? 0, this.state.goal ?? 0)
    
      this.setState({
      calculatedValue: norma == 0? deficitLow: norma,
      calculateDificitLow: deficitLow,
      calculateDificitHigh: deficitHigh,
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
                  <FormLabel className="radioText" >Are you</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={this.state.gender} onChange={this.handleGenderChange}>
                    <FormControlLabel value="female" control={<StyledRadio />} label="Female" />
                    <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
                  </RadioGroup>
                </FormControl>
              </div>}
              {this.state.stage == 1 && <div>
                <FormLabel className="radioText" component="data">Insert your data</FormLabel>
                <CustomizedTextField error={this.state.ageIsValid} label="Age" onChange={this.handleAgeChange} value={this.state.age} InputProps={undefined}/>
                <CustomizedTextField error={this.state.heightIsValid} label="Height" onChange={this.handleHeightChange} value={this.state.height} InputProps={{
                  startAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                }} />
                <CustomizedTextField error={this.state.weightIsValid} label="Weight" onChange={this.handleWeightChange} value={this.state.weight} InputProps={{
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                }} />
              </div>}
              {this.state.stage == 2 && <div>
                <FormControl component="fieldset">
                  <FormLabel className="radioText">What is your level in sports?</FormLabel>
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
                <FormControl component="fieldset">
                  <FormLabel className="radioText">Do you want to</FormLabel>
                  <RadioGroup aria-label="goal" name="goal" value={this.state.goal} onChange={this.handleGoalChange}>
                    <FormControlLabel value="maintaining" control={<StyledRadio />} label="Stay cool" />
                    <FormControlLabel value="deficit" control={<StyledRadio />} label="Lose Weight" />
                  </RadioGroup>
                </FormControl>
              </div>}
              {this.state.stage == 4 && <div>
              <Button className="Button" onClick={this.calculate}>Calculate</Button>
              <Paper style={{ backgroundColor: '#white', height: '15vh', width: '30vh', textAlign: 'center', color: 'black', fontFamily: 'Roboto'}}>
              <div>Your Norma: {Math.round(this.state.calculatedValue)} kcal
                <p>Prot: {Math.round(this.state.calculateProtLow ?? 0)} g </p>
                <p>Carbs: {Math.round(this.state.calculateCarbsLow ?? 0)} g</p>
                <p>Fat: {Math.round(this.state.calculateFatLow ?? 0)} g</p>
              </div>
            </Paper>
            </div>}
            </div>
            <div className={classes.pointers}>
                <Button className="Prev" onClick={this.prev} disabled={this.state.stage == 0}>Previous</Button>
                <Button className="Next" onClick={this.next} disabled={this.state.stage == 4}>Next</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const calculateMaintainNorma = (height: number, weight: number, gender: Gender, age: number, activeCoeff: number) => {
  if (gender == "female") {
    return (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activeCoeff;
  }

  if (gender == "male") {
    return (66 + (13.7 * weight) + (5 * height) - (6.8 * age)) * activeCoeff;
  }

  throw 'gender has wrong value'
}

const calculateDeficitNorma = (height: number, weight: number, gender: Gender, age: number, activeCoeff: number) => {
  const norma = calculateMaintainNorma(height, weight, gender, age, activeCoeff);
  return {low: (norma * 0.9), high: (norma * 0.8) };
}

const CalculatePFC = (height: number, weight: number, gender: Gender, age: number, activeCoeff: number, goal: Goal) => {
  let norma = 0;
  
  let fatLow = weight;
  let fatHigh = weight * 1.5;

  let carbsHigh = 0;
  let carbsLow = 0;
  let deficitHigh = 0;
  let deficitLow = 0;
  let protLow = 0;
  let protHigh = 0;

  if(goal == "maintaining"){
    norma = calculateMaintainNorma(height, weight, gender, age, activeCoeff)
    protLow = (norma * 0.25) / 4;
    protHigh = (norma * 0.3) / 4;
    carbsHigh = (norma - protLow * 4 - fatLow * 9) / 4;
    carbsLow = (norma - protHigh * 4 - fatHigh * 9) / 4;
  }
  if(goal == "deficit"){
    const {low , high} = calculateDeficitNorma(height, weight, gender, age, activeCoeff)

    deficitHigh = high;
    deficitLow = low;

    protLow = (low * 0.2) / 4;
    protHigh = (high * 0.3) / 4;

    carbsLow = (deficitLow - protHigh * 4 - fatHigh * 9) / 4;
    carbsHigh = (deficitHigh -protLow * 4 - fatLow * 9) / 4;
  }

  return { norma, deficitLow, deficitHigh, protLow, protHigh, fatLow, fatHigh, carbsLow, carbsHigh };
}

export default withStyles(styles)(App);

function isNumeric(value: string) :boolean{
  return /^-?\d+$/.test(value);
}