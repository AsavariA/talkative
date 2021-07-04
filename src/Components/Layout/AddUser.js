import React from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'rgba(247,212,226,0.5)',
        padding: theme.spacing(0.5),
    },
}))

const AddUser = ({ doc }) => {
    const classes = useStyles();

    return (
        <>
            {
                doc.username === ''
                    ? null
                    : <div style={{ margin: '1rem 0' }}>
                        <Paper className={classes.paper}>
                            <div style={{ display: 'flex', alignItems:'center', 'justifyContent': 'space-between' }}>
                                {doc.username}
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