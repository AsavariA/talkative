import React from 'react';
import Input from './Input';
import useStyles from './styles';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';

const Username = ({userData, setUserData, handleNext}) => {
    const classes = useStyles();

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
                    <Typography component="h1" variant="h5">Set Username</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Input name="username" label="Get Creative" type="text" autoComplete='off' defaultValue={userData.username} handleChange={handleChange} />
                            <Typography variant="subtitle2">Get yourself a nice username</Typography>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Create username</Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Username
