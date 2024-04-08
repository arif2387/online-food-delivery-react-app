import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const VerticalStepper = ({ activeStep }) => {
  const steps = ['Login', 'Add Delivery Address', 'Payment'];

  return (
    <Stepper alternativeLabel activeStep={activeStep} orientation="vertical">
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default VerticalStepper;
