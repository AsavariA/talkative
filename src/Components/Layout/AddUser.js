import React from 'react';
import { Paper, IconButton, Avatar, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';
import fire from '../../services/fire';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'rgba(247,212,226)',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(1),
    },
}))

const AddUser = ({ doc, allUsers, nonFriends, profileData }) => {
    const classes = useStyles();
    const email = JSON.parse(localStorage.getItem("user")).email;

    const addUser = () => {
        fire.firestore()
            .collection('Users')
            .doc(email)
            .collection('Chats')
            .doc(doc.email)
            .set({
                chats: [{ msg: 'Hey! I added you as a friend!', sender: email, time: new Date() }],
                username: doc.username
            })

        fire.firestore()
            .collection('Users')
            .doc(doc.email)
            .collection('Chats')
            .doc(email)
            .set({
                chats: [{ msg: 'Hey! I added you as a friend!', sender: email, time: new Date() }],
                username: profileData.username
            })
    }

    return (
        <>
            {
                doc.username === '' || doc.email === email
                    ? null
                    : <div style={{ margin: '1rem 0' }}>
                        <Paper className={classes.paper}>
                            <div style={{ display: 'flex', alignItems: 'center', 'justifyContent': 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar alt="profile-photo" src={doc.photo} />
                                    <p style={{ margin: '0 1rem' }}>{doc.username}</p>
                                </div>
                                {
                                    nonFriends === allUsers || nonFriends.length !== allUsers.length
                                        ? <IconButton onClick={addUser}>
                                            <Tooltip title="Add Friend">
                                                <PersonAddIcon />
                                            </Tooltip>
                                        </IconButton>
                                        : <IconButton>
                                            <Tooltip title="Already a friend!">
                                                <CheckIcon />
                                            </Tooltip>
                                        </IconButton>
                                }
                            </div>
                        </Paper>
                    </div>
            }
        </>

    )
}

export default AddUser