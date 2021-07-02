import Signup from './Components/Auth/Signup'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const font = "'Poppins', sans-serif";
const theme = createMuiTheme({
    typography: {
        fontFamily: font,
    }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <>
        <Signup />
      </>
    </MuiThemeProvider>
  );
}

export default App;
