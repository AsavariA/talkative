import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Input from './Input';
import useStyles from './styles';

const Form = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = () => {}

    const handleChange = () => {}

    return (
        <div>
            <Container component="main" maxWidth="xs" className={classes.main}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography component="h1" variant="h5">Sign up</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign Up</Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Form
