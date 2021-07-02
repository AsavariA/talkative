import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { Button, Paper, Typography, Container, Avatar } from '@material-ui/core';

const ProfilePhoto = () => {
    const classes = useStyles();
    const [profile, setProfile] = useState(null)

    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
            <Paper className={classes.paper} elevation={3}>
                <Typography component="h1" variant="h5">Set Avatar</Typography>
                <form className={classes.form}>
                    <Avatar alt="profile-photo" src={profile} className={classes.large} />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        <div className="filebase">
                            <p>{profile ? 'Change Photo' : 'Upload Photo'}</p>
                            <FileBase type="file" className="photo" multiple={false} onDone={({ base64 }) => setProfile(base64)}></FileBase>
                        </div>
                    </Button>
                    <Button fullWidth variant="outlined" color="primary" onClick={() => setProfile(null)}> Remove photo</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default ProfilePhoto
