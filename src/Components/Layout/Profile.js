import React, { useState } from 'react'
import { Avatar, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import fire from '../../services/fire';
import { makeStyles } from '@material-ui/core/styles';
import FileBase from 'react-file-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: '0 auto',
        border: '2px darkblue'
    },
    button: {
        margin: '0 0.5rem',
        borderWidth: '2px'
    }
}))

const Profile = ({setUserState}) => {
    const classes = useStyles();
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        photo: ''
    })
    const [editPhoto, setEditPhoto] = useState('')
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setEditPhoto(profileData.photo);
    };

    const handleClose = () => {
        setOpen(false);
        setEditPhoto(profileData.photo);
    };

    if (localStorage.getItem('user') !== null) {
        const email = JSON.parse(localStorage.getItem("user")).email;
        fire.firestore().collection('Users')
            .doc(email)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    setProfileData({
                        email: email,
                        username: doc.data().username,
                        photo: doc.data().photo
                    });
                }
                else {
                    console.log("No such Document found");
                }
            }).catch(function (error) {
                console.log("Error getting document: ", error)
            });
    }

    const handleSubmit = () => {
        fire.firestore()
            .collection('Users')
            .doc(profileData.email)
            .set({
                username: profileData.username,
                email: profileData.email,
                photo: editPhoto,
            })
        setOpen(false)
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserState();
        window.history.pushState(null,window.location.href.match(/^.*\//),"/");
    }

    const handleChange = ({ base64 }) => {
        var size = Math.ceil(base64.length * (3 / 4));
        var mimeType = base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]

        if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
            toast.error('Please select a valid image!')
        }
        else if ((size / 1024) > 100) {
            toast.error('Image size too big, please select image within 100kb!')
        } else {
            setEditPhoto(base64)
        }
        console.log(editPhoto)
    }

    return (
        <>
            <ToastContainer />
            <div className="profile-div">
                MY PROFILE
                <Avatar alt="profile-photo" src={profileData.photo} className={classes.large} />
                <div>
                    <Typography variant="h6">{profileData.username}</Typography>
                    <p style={{fontSize: '14px', color: 'grey'}}>{profileData.email}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <Button className={classes.button} fullWidth variant="outlined" color="primary" onClick={handleClickOpen}>Edit profile</Button>
                    <Button className={classes.button} fullWidth variant="outlined" color="secondary" onClick={handleLogout} >Logout</Button>
                </div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='xs'>
                    <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                    <DialogContent>
                        <div className="dialog-content">
                            <Avatar alt="profile-photo" src={editPhoto} className={classes.large} />
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                <div className="filebase">
                                    <p>{editPhoto ? 'Change Photo < 100kb' : 'Upload Photo < 100kb'}</p>
                                    <FileBase type="file" className="photo" multiple={false} onDone={handleChange}></FileBase>
                                </div>
                            </Button>
                            <Button fullWidth variant="outlined" color="primary" onClick={() => setEditPhoto('')}> Remove photo</Button>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit} color="primary">
                            Save
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default Profile
