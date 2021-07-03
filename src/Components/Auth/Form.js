import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Input from './Input';
import useStyles from './styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Form = ({ toggleForm, userData, setUserData, handleNext }) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            toast.error('Passwords dont match!')
        } else if (userData.password.length < 6) {
            toast.error('Password too short, make sure it has atleast 6 characters!')
        } else {
            handleNext();
        }
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <ToastContainer />
            <Container component="main" maxWidth="xs" className={classes.main}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography component="h1" variant="h5">{toggleForm ? 'Sign Up' : 'Log In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Input name="email" label="Email Address" defaultValue={userData.email} handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" defaultValue={userData.password} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            <Input name="confirmPassword" label="Confirm Password" defaultValue={userData.confirmPassword} handleChange={handleChange} type="password" />
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{toggleForm ? 'Sign Up' : 'Log In'}</Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Form
