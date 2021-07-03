import React, { useState, useEffect } from 'react'
import Signup from './Components/Auth/Signup'
import Main from './Components/Layout/Main'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const font = "'Poppins', sans-serif";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  }
});

function App() {
  const [user, setUser] = useState('');

  const userState=()=>{
    const data=localStorage.getItem('user');
    const us=data!==null ? JSON.parse(data):null;
    setUser(us);
  }

  useEffect(() => {
    userState();
  },[]);

  return (
    <MuiThemeProvider theme={theme}>
      <>
      {
        user 
        ? <div><Main /></div> 
        : <div className="auth-div">
          <Signup loggedIn={(user) => setUser(user)}/>
        </div> 
      }
      </>
    </MuiThemeProvider>
  );
}

export default App;
