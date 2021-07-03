import React from 'react';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { Button, Paper, Typography, Container, Avatar } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ProfilePhoto = ({ userData, setUserData }) => {
    const classes = useStyles();

    const handleChange = ({ base64 }) => {
        var size = Math.ceil(base64.length * (3 / 4));
        var mimeType = base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]

        if(mimeType !== 'image/png' && mimeType !== 'image/jpeg'){
            toast.error('Please select a valid image!')
        }
        else if((size / 1024) > 400){
            toast.error('Image size too big, please select image within 500kb!')
        } else {
            setUserData({ ...userData, 'photo': base64 })
        }
    }

    return (
        <>
            <ToastContainer />
            <Container component="main" maxWidth="xs" className={classes.main}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography component="h1" variant="h5">Set Avatar</Typography>
                    <form className={classes.form}>
                        <Avatar alt="profile-photo" src={userData.photo} className={classes.large} />
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            <div className="filebase">
                                <p>{userData.photo ? 'Change Photo < 400kb' : 'Upload Photo < 400kb'}</p>
                                <FileBase type="file" className="photo" multiple={false} onDone={handleChange}></FileBase>
                            </div>
                        </Button>
                        <Button fullWidth variant="outlined" color="primary" onClick={() => setUserData({ ...userData, 'photo': '' })}> Remove photo</Button>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default ProfilePhoto
