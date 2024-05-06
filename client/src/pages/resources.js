import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, TextField, Button } from '@mui/material';
import '../css/resources.css';

function ResourcesPage() {
  const { userID, projectID } = useParams();
  const [totalHW1, setTotalHW1] = useState(200);
  const [availHW1, setAvailHW1] = useState(0);
  const [ownedHW1, setOwnedHW1] = useState(0);
  const [totalHW2, setTotalHW2] = useState(200);
  const [availHW2, setAvailHW2] = useState(0);
  const [ownedHW2, setOwnedHW2] = useState(0);
  const [updateHW1Qty, setUpdateHW1Qty] = useState('');
  const [updateHW2Qty, setUpdateHW2Qty] = useState('');


  const handleCheckIn = async (hardwareSet, quantity) => {
    quantity = 0 
    if (hardwareSet === 'Hardware Set 1')
    {
      quantity = Math.min(updateHW1Qty, ownedHW1);
    }
    else
    {
      quantity = Math.min(updateHW2Qty, ownedHW2);
    }
    try {
      const response = await axios.post('/api/checkIn', {
        HardwareSetName: hardwareSet,
        id: projectID,
        amount: quantity,
      });
      if (response.data.registration) {
        // if (hardwareSet === 'Hardware Set 1') {
        //   setOwnedHW1(ownedHW1-quantity);
        // } else if (hardwareSet === 'Hardware Set 2') {
        //   setOwnedHW2(ownedHW2-quantity);
        // }
      } else {
        console.error('Error checking in:', response.data.error);
      }
    } catch (error) {
      console.error('Error checking in:', error);
    }

    try {
      const response = await axios.get('/api/getHardwareSets');
      if (response.data.registration) {
        setAvailHW1(response.data.hwset1);
        setAvailHW2(response.data.hwset2);
      } else {
        console.error('Error fetching Hardware sets:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching Hardware sets:', error);
    }

    try {
      const response = await axios.post('/api/getProjectsSets', {id: projectID});
      if (response.data.registration) {
        setOwnedHW1(response.data.hwset1);
        setOwnedHW2(response.data.hwset2);
      } else {
        console.error('Error fetching Project sets:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching Project sets:', error);
    }

    setUpdateHW1Qty(0)
    setUpdateHW2Qty(0)


  };

  const handleCheckOut = async (hardwareSet, quantity) => {
    quantity = 0 
    if (hardwareSet === 'Hardware Set 1')
    {
      quantity = Math.min(updateHW1Qty, availHW1);
    }
    else
    {
      quantity = Math.min(updateHW2Qty, availHW2);
    }

    try {
      const response = await axios.post('/api/checkOut', {
        HardwareSetName: hardwareSet,
        id: projectID,
        amount: quantity,
      });
      if (response.data.registration) {
        // if (hardwareSet === 'Hardware Set 1') {
        //   setOwnedHW1(ownedHW1+quantity);
        // } else if (hardwareSet === 'Hardware Set 2') {
        //   setOwnedHW2(ownedHW2+quantity);
        // }
      } else {
        console.error('Error checking out:', response.data.error);
      }
    } catch (error) {
      console.error('Error checking out:', error);
    }

    try {
      const response = await axios.get('/api/getHardwareSets');
      if (response.data.registration) {
        setAvailHW1(response.data.hwset1);
        setAvailHW2(response.data.hwset2);
      } else {
        console.error('Error fetching Hardware sets:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching Hardware sets:', error);
    }

    try {
      const response = await axios.post('/api/getProjectsSets', {id: projectID});
      if (response.data.registration) {
        setOwnedHW1(response.data.hwset1);
        setOwnedHW2(response.data.hwset2);
      } else {
        console.error('Error fetching Project sets:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching Project sets:', error);
    }

    setUpdateHW1Qty(0)
    setUpdateHW2Qty(0)
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getHardwareSets');
        if (response.data.registration) {
          setAvailHW1(response.data.hwset1);
          setAvailHW2(response.data.hwset2);
        } else {
          console.error('Error fetching Hardware sets:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching Hardware sets:', error);
      }

      try {
        const response = await axios.post('/api/getProjectsSets', {id: projectID});
        if (response.data.registration) {
          setOwnedHW1(response.data.hwset1);
          setOwnedHW2(response.data.hwset2);
        } else {
          console.error('Error fetching Project sets:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching Project sets:', error);
      }


    };
    fetchData();
  }, []);


  

  const navigate = useNavigate();

  const navHome = () => {
      navigate(`/${userID}/`)
    };

    const navProjects = () => {
      navigate(`/${userID}/projects`)
    };  

  return (
    <div class='resourcesPage'>
        <div class='selectionBoxRes'>
          <div>

          
          <div>
            <h1>Welcome, {userID}!</h1>
          </div>
          <div>
                <p>You are logged into project with ID: {projectID}. <br></br>Note: Owned indicates how many sets this project owns. Owned + Available does not neccesarily equal total.</p>
          </div>
          <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={2}>
                <Typography variant="h6">Hardware Set</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">Total Units</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">Available Units</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">Owned Units</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6">Quantity</Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography variant="h6">Update</Typography>
              </Grid>
            </Grid>


            <Grid container item xs={12} spacing={2}>
              <Grid item xs={2}>
                <Typography>Hardware Set 1</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{totalHW1}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{availHW1}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{ownedHW1}</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  value={updateHW1Qty}
                  onChange={(e) => setUpdateHW1Qty(e.target.value)}
                  label="Update Quantity"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
              <div class = 'updateBtns'>
                <Button variant="contained" onClick={() => handleCheckIn('Hardware Set 1')}>Check In</Button>
                
                </div>
                <div class='updateBtns'>
                <Button variant="contained" onClick={() => handleCheckOut('Hardware Set 1')}>Check Out</Button>
                </div>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={2}>
              <Grid item xs={2}>
                <Typography>Hardware Set 2</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{totalHW2}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{availHW2}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{ownedHW2}</Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  value={updateHW2Qty}
                  onChange={(e) => setUpdateHW2Qty(e.target.value)}
                  label="Update Quantity"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <div class = 'updateBtns'>
                <Button variant="contained" onClick={() => handleCheckIn('Hardware Set 2')}>Check In</Button>
                
                </div>
                <div class='updateBtns'>
                <Button variant="contained" onClick={() => handleCheckOut('Hardware Set 2')}>Check Out</Button>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <div>
          <div class='homeButton'>
            <Button variant= "contained" color='primary' onClick={navProjects}>Projects</Button>
          </div>
          <div class='homeButton'>
            <Button variant= "contained" color='primary' onClick={navHome}>Home</Button>
          </div>

          </div>
          
          </div>    
          </div>
    </div>
  );
}

export default ResourcesPage;
