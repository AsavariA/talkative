import React, { useState } from 'react';
import Input from './Input';
import useStyles from './styles';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';

const Username = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('')

    return (
        <div>
            <Container component="main" maxWidth="xs" className={classes.main}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography component="h1" variant="h5">Set Username</Typography>
                    <form className={classes.form}>
                        <Grid container spacing={2}>
                            <Input name="username" label="Get Creative" type="text" autoComplete='off' handleChange={(e) => setUsername(e.target.value)} />
                            <Typography variant="subtitle2">{username === '' ? 'Get yourself a nice username' : `${username}! yes, that sounds cool!`}</Typography>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Create username</Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Username
