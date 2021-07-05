import React from 'react';
import { Paper, IconButton, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'rgba(247,212,226)',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(1),
    },
}))

const AddUser = ({ doc }) => {
    const classes = useStyles();
    const email = JSON.parse(localStorage.getItem("user")).email;

    return (
        <>
            {
                doc.username === '' || doc.email === email
                    ? null
                    : <div style={{ margin: '1rem 0' }}>
                        <Paper className={classes.paper}>
                            <div style={{ display: 'flex', alignItems: 'center', 'justifyContent': 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <Avatar alt="profile-photo" src={doc.photo} />
                                    <p style={{ margin: '0 0.5rem'}}>{doc.username}</p>
                                </div>
                                <IconButton>
                                    <PersonAddIcon />
                                </IconButton>
                            </div>
                        </Paper>
                    </div>
            }
        </>

    )
}

export default AddUser