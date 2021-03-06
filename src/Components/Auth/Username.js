import React from 'react';
import Input from './Input';
import useStyles from './styles';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import fire from '../../services/fire';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Username = ({userData, setUserData, handleNext}) => {
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        fire.firestore().collection("Users").doc('ALL_USERNAMES').get().then((doc) => {
            var usernameList = doc.data().usernames;
            var check = usernameList.find(element => element === userData.username)
            check ? toast.error('Sorry, username is taken!') : handleNext();
        });
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <ToastContainer />
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
