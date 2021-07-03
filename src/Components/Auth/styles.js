import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '10px'
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
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: 'auto'
      },
  }));