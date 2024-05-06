
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { TextField, Button } from '@mui/material';

function RegisterForm({handleLogin}) {
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleUserChange = (event) => {
    setUserID(event.target.value)
  }

  const handlePassChange = (event) => {
    setPassword(event.target.value)
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log("registration received:");
    console.log("Username:", username);
    console.log("userID:", userID);
    console.log("Password:", password);
    try {
      const res = await axios.post('/api/register', { // sending json formatted data
          username: username, 
          userID: userID,
          password: password,
      });
      if (!res.data.registration) {
        console.log("False registration");
        setError(res.data.error);
      } else {
      console.log(res.data);
      handleLogin();
      // navigate('/${userID}/', {state: {userID}});  // unsure about the logic here -martin
      navigate('/')
      }
   
    } catch (error) { // api sends error message 400, blocks that send this error code will catch return statements here
      // note: error is received before respone message
      setError('Could not register userID taken.')
      console.log(error);
    }
  };

  return (
    <div className="registerForm">
      <p>{infoMessage}</p>
      <form onSubmit={handleRegister}>
      <div className = 'username'>
          <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleUsernameChange}
          />
      </div>
      <div className = 'username'>
        <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserID"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleUserChange}
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
        {error && <div className="error">{error}</div>}
        <div className='submit'>
          <Button type="contained" variant= "contained" color='primary' fullWidth ={true} onClick={handleRegister}>Register</Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
