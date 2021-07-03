import React from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { Button, Paper, Typography, Container, Avatar } from '@material-ui/core';

const ProfilePhoto = ({userData, setUserData}) => {
    const classes = useStyles();

    const handleChange = ({base64}) => {
        setUserData({ ...userData, 'photo': base64 })
        console.log(userData);
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
            <Paper className={classes.paper} elevation={3}>
                <Typography component="h1" variant="h5">Set Avatar</Typography>
                <form className={classes.form}>
                    <Avatar alt="profile-photo" src={userData.photo} className={classes.large} />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        <div className="filebase">
                            <p>{userData.photo ? 'Change Photo' : 'Upload Photo'}</p>
                            <FileBase type="file" className="photo" multiple={false} onDone={handleChange}></FileBase>
                        </div>
                    </Button>
                    <Button fullWidth variant="outlined" color="primary" onClick={() => setUserData({ ...userData, 'photo': '' })}> Remove photo</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default ProfilePhoto
