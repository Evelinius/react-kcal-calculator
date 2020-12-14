import * as React from 'react';

export type Gender = 'male' | 'female'
export type Goal = 'maintaining' | 'deficit'

export const calculateMaintainNorma = (height: number, weight: number, gender: Gender, age: number, activeCoeff: number) => {
    if (gender == "female") {
      return (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) * activeCoeff;
    }
  
    if (gender == "male") {
      return (66 + (13.7 * weight) + (5 * height) - (6.8 * age)) * activeCoeff;
    }
  
    throw 'gender has wrong value'
  }
  
  export const calculateDeficitNorma = (height: number, weight: number, gender: Gender, age: number, activeCoeff: number) => {
    const norma = calculateMaintainNorma(height, weight, gender, age, activeCoeff);
    return { low: (norma * 0.9), high: (norma * 0.8) };
  }
  
  export const CalculatePFC = (height: number, weight: number, gender: Gender, age: number, activeCoeff: number, goal: Goal) => {
    let norma = 0;
  
    let fatLow = weight;
    let fatHigh = weight * 1.5;
  
    let carbsHigh = 0;
    let carbsLow = 0;
    let deficitHigh = 0;
    let deficitLow = 0;
    let protLow = 0;
    let protHigh = 0;
  
    if (goal == "maintaining") {
      norma = calculateMaintainNorma(height, weight, gender, age, activeCoeff)
      protLow = (norma * 0.25) / 4;
      protHigh = (norma * 0.3) / 4;
      carbsHigh = (norma - protLow * 4 - fatLow * 9) / 4;
      carbsLow = (norma - protHigh * 4 - fatHigh * 9) / 4;
    }
    if (goal == "deficit") {
      const { low, high } = calculateDeficitNorma(height, weight, gender, age, activeCoeff)
  
      deficitHigh = high;
      deficitLow = low;
  
      protLow = (low * 0.2) / 4;
      protHigh = (high * 0.3) / 4;
  
      carbsLow = (deficitLow - protHigh * 4 - fatHigh * 9) / 4;
      carbsHigh = (deficitHigh - protLow * 4 - fatLow * 9) / 4;
    }
  
    return { norma, deficitLow, deficitHigh, protLow, protHigh, fatLow, fatHigh, carbsLow, carbsHigh };
  }