import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, StepContent, Button, Paper, Typography} from '@material-ui/core';
import Form from './Form'
import Username from './Username'
import ProfilePhoto from './ProfilePhoto'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    margin: 'auto'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    width: 'fit-content',
    margin: 'auto',
    padding: theme.spacing(3),
  },
}));

const getSteps = () => {
  return ['Sign Up', 'Create Username', 'Upload Profile Photo'];
}

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <Form />;
    case 1:
      return <Username />;
    case 2:
      return <ProfilePhoto />;
    default:
      return 'Unknown step';
  }
}

const Signup = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default Signup