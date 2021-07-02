import React from 'react';
import Input from './Input';
import useStyles from './styles';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';

const Username = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
            <Paper className={classes.paper} elevation={3}>
                <Typography component="h1" variant="h5">Create Username</Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Input name="username" label="Get Creative!" type="text" />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Create!</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Username
