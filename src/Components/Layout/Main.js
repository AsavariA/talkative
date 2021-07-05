import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Profile from './Profile'
import Search from './Search'
import ChatList from './ChatList'
import fire from '../../services/fire';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '100%',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(5px)'
    },
    halfpaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '100%',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(5px)'
    },
    separator: {
        height: '4rem'
    }
}));

const Main = ({ setUserState }) => {
    const classes = useStyles();
    const email = JSON.parse(localStorage.getItem("user")).email;
    const [allUsers, setAllUsers] = useState([]);
    const [friendUsers, setFriendUsers] = useState([]);

    fire.firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => { return { id: doc.id, data: doc.data() } })
            setAllUsers(documents)
        })

    fire.firestore()
        .collection('Users')
        .doc(email)
        .collection('Chats')
        .get()
        .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => { return { id: doc.id, data: doc.data() } })
            setFriendUsers(documents)
        })

    const nonFriends = friendUsers.length === 0 ? allUsers : allUsers.filter(item1 => friendUsers.some(item2 => item1.id !== item2.id))

    return (
        <div className="main">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}><ChatList friendUsers={friendUsers} /></Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>Convos</Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className="halfgrid">
                            <Paper className={classes.halfpaper}><Profile setUserState={setUserState} /></Paper>
                            <div className={classes.separator}></div>
                            <Paper className={classes.halfpaper}><Search nonFriends={nonFriends} /></Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Main