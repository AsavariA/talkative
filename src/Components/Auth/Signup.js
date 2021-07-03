import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@material-ui/core';
import Form from './Form'
import Username from './Username'
import ProfilePhoto from './ProfilePhoto'
import fire from '../../services/fire'
import firebase from 'firebase/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    margin: 'auto',
    position: 'relative'
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
    background: 'transparent'
  },
}));

const Signup = ({loggedIn}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [toggleForm, setToggleForm] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    photo: ''
  });

  const getSteps = () => {
    return toggleForm ? ['Sign Up', 'Create Username', 'Upload Profile Photo'] : ['Log In'];
  }
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

  const handleFinish = () => {
    console.log(userData);
    fire.auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(response => {
        if (response) {
          console.log(response)
          toast.success('User Registered Successfully');
          const { user } = response;
          const data = {
            userId: user.uid,
            email: user.email
          }
          localStorage.setItem('user', JSON.stringify(data));
          const storage = localStorage.getItem('user');
          const loggedInUser = storage !== null ? JSON.parse(storage) : null;
          loggedIn(loggedInUser);
          fire.firestore()
            .collection('Users')
            .doc(userData.email)
            .set({
              username: userData.username,
              photo: userData.photo,
            })
          fire.firestore()
            .collection('Users')
            .doc('ALL_USERNAMES')
            .update({
              "usernames": firebase.firestore.FieldValue.arrayUnion(userData.username),
            })
        }
      }).catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error(error.message);
            break;
          case 'auth/invalid-email':
            toast.error(error.message);
            break;
          case 'auth/weak-password':
            toast.error(error.message);
            break;
          default:
            break;
        }
      }
      );
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Form loggedIn={loggedIn} toggleForm={toggleForm} userData={userData} setUserData={setUserData} handleNext={handleNext} />;
      case 1:
        return <Username userData={userData} setUserData={setUserData} handleNext={handleNext} />;
      case 2:
        return <ProfilePhoto userData={userData} setUserData={setUserData} handleNext={handleNext} />;
      default:
        return 'Unknown step';
    }
  }

  const handleToggle = () => {
    setToggleForm(!toggleForm);
    setActiveStep(0);
    setUserData({
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      photo: ''
    })
  }

  return (
    <div className={classes.root}>
      <ToastContainer />
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  {toggleForm ?
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button> : null}
                  {toggleForm && activeStep === steps.length - 1 ?
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFinish}
                      className={classes.button}
                    >Finish</Button> : null
                  }
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
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleToggle}>{!toggleForm ? 'Create an account' : 'Already have an account'}</Button>
      </div>
    </div>
  );
}

export default Signup