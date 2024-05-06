import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import '../css/projects.css';

function Projects() {

  const { userID } = useParams();

  console.log("userID:", userID);


  const [projectID, setProjectID] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [creationMessage, setCreationMessage] = useState('');
    const navigate = useNavigate();

    const navHome = () => {
        navigate(`/${userID}/`)
      };
    
      const navResourcesPage = () => {
        navigate(`/${userID}/projects/${projectID}`);
      };  

    const handleCreateProj = async () => {
        try {
            if (projectID === '' || projectName === '' || projectDescription === '') {
                setCreationMessage('Please fill out all fields');
                return;
            }
            const res = await axios.post('/api/addProject', { // sending json formatted data
                name: projectName,
                id: projectID,
                description: projectDescription
            });
            if (!res.data.registration) {
              console.log("Project error");
              setCreationMessage(res.data.error);
              return;
            }
            console.log(res.data);
         
          } catch (error) { // api sends error message 400, blocks that send this error code will catch return statements here
            // note: error is received before respone message
            setCreationMessage(`Could not create project with ID: ${projectID}`)
            console.log(error);
            return
        }
        setCreationMessage(`Created project with ID: ${projectID}`);
        setProjectID('')
        setProjectName('')
        setProjectDescription('')
    }
    
    const handleProjLogin = async () => {
        
        try {
            const res = await axios.post('/api/joinProject', { // sending json formatted data
                id: projectID,
            });
            if (!res.data.registration) {
              console.log("Project error");
              setCreationMessage('Project not found (R)!');
              return;
            }
            console.log(res.data);
         
          } catch (error) { // api sends error message 400, blocks that send this error code will catch return statements here
            // note: error is received before respone message
            setCreationMessage('Project not found!');
            console.log(error);
            return
        }        
        navigate(`/${userID}/resources/${projectID}`);
    }

  return (
    <div class='projectsPage'>
        <h1>Welcome, {userID}!</h1>
        <div class='selectionBox'>
           <div class='column'>
            <h3>
                Existing Project
                <div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant='filled'
                        label="Project ID"
                        name="projectId"
                        autoFocus
                        onChange={(e) => setProjectID(e.target.value)}
                        />
                </div>
                <div>
                    <Button variant= "contained" color='primary' fullWidth ={true} onClick={handleProjLogin}>Submit</Button>
                </div>
            </h3>
            </div>
            <div class='verticalLine' />
            <div class='column'>
            <h3>
                Create New Project
                <div class='fields'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant='filled'
                        label="Project Name"
                        name="projectName"
                        value={projectName}
                        autoFocus
                        onChange={(e) => setProjectName(e.target.value)}
                        />
                </div>
                <div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant='filled'
                        label="Project ID"
                        name="projectId"
                        autoFocus
                        value={projectID}
                        onChange={(e) => setProjectID(e.target.value)}
                        />
                </div>
                <div>
                    <TextField
                        margin="normal"
                        multiline
                        fullWidth
                        variant='filled'
                        label="Description"
                        name="projectDescription"
                        autoFocus
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        />
                </div>

                <div>
                    <Button variant= "contained" color='primary' fullWidth ={true} onClick={handleCreateProj}>Create</Button>
                    {creationMessage && <Typography variant="body2" color="red">{creationMessage}</Typography>}
                </div>
            </h3>
            </div>
        </div>
        <div>
        </div>
        <div class='homeButton'>
            <Button variant= "contained" color='primary' fullWidth ={true} onClick={navHome}>Home</Button>
        </div>
    </div>
  );
}

export default Projects;