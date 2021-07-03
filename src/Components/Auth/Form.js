import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Input from './Input';
import useStyles from './styles';

const Form = ({ toggleForm, userData, setUserData, handleNext }) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        handleNext();
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <Container component="main" maxWidth="xs" className={classes.main}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography component="h1" variant="h5">{toggleForm ? 'Sign Up' : 'Log In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Input name="email" label="Email Address" defaultValue={userData.email} handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" defaultValue={userData.password} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            {toggleForm ? <Input name="confirmPassword" label="Confirm Password" defaultValue={userData.confirmPassword} handleChange={handleChange} type="password" /> : null}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{toggleForm ? 'Sign Up' : 'Log In'}</Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Form
