import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

import '../css/home.css'

function Home({ onLogout }) {

  const { userID } = useParams();

  console.log("userID:", userID);
  console.log("onLogout:", onLogout);


    const navigate = useNavigate();

    const navLogOut = () => {
        navigate('/')
      };
    
      const navProjects = () => {
        navigate(`/${userID}/projects`)
      };

      const handleLogoutClick = () => {
          onLogout()
          navLogOut()
      }

  return (
    <div className="homePage">
      <div className='text'> 
          <h1>Welcome, {userID}!</h1>
          <p>
            Navigate to the projects page to log into an existing project or create a new project. You can access and set resources after logging into a project.
          </p>
          <p>
            Create the project first. Then log in.
          </p>
      </div>
      <div className='buttons'>
        <div>
            <Button variant= "contained" color='primary' onClick={navProjects}>Projects</Button>
        </div>

        <div>
            <Button variant= "contained" color='primary' onClick={handleLogoutClick}>Log Out</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;