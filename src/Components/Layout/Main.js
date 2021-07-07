import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Profile from './Profile'
import Search from './Search'
import ChatList from './ChatList'
import Chat from './Chat'
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
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        photo: ''
    })
    const [activeChat, setActiveChat] = useState({
        email: '',
        username: '',
        chats: []
    });

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = date + ' ' + month + ' ' + hour + ':' + min;
        return time;
    }

    fire.firestore().collection('Users')
        .doc(email)
        .onSnapshot(doc => {
            setProfileData({
                email: email,
                username: doc.data().username,
                photo: doc.data().photo
            });
        })



    // .get()
    // .then(function (doc) {
    //     if (doc.exists) {
    //         setProfileData({
    //             email: email,
    //             username: doc.data().username,
    //             photo: doc.data().photo
    //         });
    //     }
    //     else {
    //         console.log("No such Document found");
    //     }
    // }).catch(function (error) {
    //     console.log("Error getting document: ", error)
    // });

    fire.firestore()
        .collection('Users')
        .onSnapshot(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => { return { id: doc.id, data: doc.data() } })
            setAllUsers(documents)
        })

    fire.firestore()
        .collection('Users')
        .doc(email)
        .collection('Chats')
        .onSnapshot(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => { return { id: doc.id, data: doc.data() } })
            setFriendUsers(documents)
        })

    const nonFriends = friendUsers.length === 0 ? allUsers : allUsers.filter(item1 => friendUsers.some(item2 => item1.id !== item2.id))

    return (
        <div className="main">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}><ChatList timeConverter={timeConverter} setActiveChat={setActiveChat} friendUsers={friendUsers} /></Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}><Chat timeConverter={timeConverter} activeChat={activeChat} /></Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className="halfgrid">
                            <Paper className={classes.halfpaper}><Profile profileData={profileData} setUserState={setUserState} /></Paper>
                            <div className={classes.separator}></div>
                            <Paper className={classes.halfpaper}><Search profileData={profileData} nonFriends={nonFriends} allUsers={allUsers} /></Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Main