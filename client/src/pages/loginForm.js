
/**
 * A React component that renders a form with an input field for the user to 
 * enter their name.
 * @component
 */

import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'; 
import '../css/loginForm.css'
import { TextField, Button } from '@mui/material';



function LoginForm({handleLogin}) {
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submission received:");
    console.log("userID:", userID);
    console.log("Password:", password);
    try {
      const res = await axios.post('/api/login', { // sending json formatted data
          userID: userID,
          password: password,
      });
      if (!res.data.login) { // if false
        setError(res.data.error);
      } else {
        console.log(res.data);
        handleLogin(res.data.username);
        console.log("Here");
        navigate(`/${res.data.username}/`, {state: {username: res.data.username}});
      }

    } catch (error) {
      console.log(error);
      setError('Incorrect Password');
    }
  }

  const handleCreateAccount = () => {
    // Backend logic to create account goes here
    console.log("Create account button clicked");
    navigate('/api/register')
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleUserIDChange = (event) => {
    setUserID(event.target.value)
  }

  const handlePassChange = (event) => {
    setPassword(event.target.value)
  }



  return (
    <div class ='loginForm'>
      <form id = "userInfo" onSubmit={handleSubmit}>
        <div className = 'userID'>
            <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userID"
                  label="UserID"
                  name="userID"
                  autoComplete="userID"
                  autoFocus
                  onChange={handleUserIDChange}
            />
        </div>
        <div className='password'>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePassChange}
            />
        </div>
        <div>
          {error && <div className="error">{error}</div>}
        </div>
        <div className='submit'>
          <Button variant= "contained" color='primary' fullWidth ={true} onClick={handleSubmit}>Submit</Button>
        </div>
        <div className='register'>
          <Button type= "contained" color='primary' fullWidth ={true} onClick={handleCreateAccount}>Need To Register?</Button>
        </div>
      </form>

    </div>
  );

}
export default LoginForm;

