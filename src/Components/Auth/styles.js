import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(13),
        // marginBottom: theme.spacing(13),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
      },
      main: {
        margin: 0
      },
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: 'auto'
      },
  }));