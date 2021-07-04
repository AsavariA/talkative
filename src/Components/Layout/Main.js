import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Profile from './Profile'

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

const Main = ({setUserState}) => {
    const classes = useStyles();

    return (
        <div className="main">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}>Homies</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>Convos</Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className="halfgrid">
                            <Paper className={classes.halfpaper}><Profile setUserState={setUserState} /></Paper>
                            <div className={classes.separator}></div>
                            <Paper className={classes.halfpaper}>Search</Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Main