import React from 'react'
import './App.css';
import Button from '@material-ui/core/Button';
import { FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import 'fontsource-roboto';
import { StyledRadio } from './StyledRadio'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gender: 'female',
      age: 0,
      height: 0,
      weight: 0,
      calculatedValue: 0
    }
  }

  handleHeightChange = (event) => {
    this.setState({ height: event.target.value })
  }

  handleWeightChange = (event) => {
    this.setState({ weight: event.target.value })
  }

  handleAgeChange = (event) => {
    this.setState({ age: event.target.value })
  }

  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value })
  }

  calculate = () => {
    const value = CalculateYourNorma(this.state.height, this.state.weight, this.state.age)
    this.setState({
      calculatedValue: 21345
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <div className="App-header">
            Stay cool
            <FormControl component="fieldset">
              <FormLabel className="radioText" component="gender">Are you</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={this.value} onChange={this.handleGenderChange}>
                <FormControlLabel color="blue" value="female" control={<StyledRadio />} label="Female" />
                <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <input type='text' onChange={this.handleAgeChange} value={this.state.age}></input>
            <input type='text' onChange={this.handleHeightChange} value={this.state.height}></input>
            <input type='text' onChange={this.handleWeightChange} value={this.state.weight}></input>
            <Button className="Button" onClick={this.calculate}>Calculate</Button>

            Calculated value: {this.state.calculatedValue}
          </div>
        </div>
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
  return (norma, dificitLow, dificitHigh, protLow, protHigh, fatLow, fatHigh, carbsLow, carbsHigh);
}

export default App;
