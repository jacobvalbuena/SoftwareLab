// import '../css/app.css'; // importing this seems to cause issues with rendering components.

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';

import LoginForm from './pages/loginForm';
import Home from './pages/home';
import RegisterForm from './pages/register';
import Projects from './pages/projects'
import ResourcesPage from './pages/resources';
import './css/app.css'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Resources from './pages/resources';


const theme = createTheme({
  palette: {
    primary: {
      main: '#bf5700', //
    },
    secondary: {
      main: '#FF8200', //
    },
  },
});


function App() {
  const [userID, setUserID] = useState(''); // also used in LoginForm.js POSSIBLE ISSUE
  const [loginState, setLoginState] = useState(false);


  const handleLogin = (newUserID) => {
    console.log("User id passed in ", newUserID);
    setUserID(newUserID);
    setLoginState(true);
    console.log("User id now", userID);
  };

  const handleLogout = () => {
    // Logic to log out the user
    setLoginState(false);
    setUserID('');

  };

  const HomeRoute = ({ element, ...rest }) => {
    const { userID: routeParamsUserID } = useParams(); // Renamed to routeParamsUserID
    console.log("Route params userID:", routeParamsUserID);
    console.log("App.js userID:", userID);
    return routeParamsUserID === userID ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  };
  

  return (
    <ThemeProvider theme={theme}> 
      <Router>
      <div>
        <div className='App'>
        <header className="App-header">
          <h1 className="App-title">
            ECE Hardware Checkout Center
          </h1>
        </header>
        </div>
        <div className='container'>
        <Routes>
            <Route path="/" element={<LoginForm handleLogin={handleLogin} className="LoginButton"/>} />
            <Route path="/:userID/" element={<HomeRoute element={<Home onLogout={handleLogout} />} />} />
            <Route path="/:userID/projects" element={<HomeRoute element={<Projects />} />} />
            <Route path="/:userID/resources/:projectID?" element={<HomeRoute element={<ResourcesPage/>} />} />
            <Route path="/api/register" element={<RegisterForm handleLogin={handleLogin}/>} /> {/* Define register route */}
            <Route path="/resources" element={<ResourcesPage/>} /> {/* Define register route */}
        </Routes>
        </div>
      </div>
      </Router>
    </ThemeProvider>
    
  );
  
}

export default App;
