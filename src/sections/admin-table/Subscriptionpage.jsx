import React, { useState, useEffect } from 'react';
import { Table, Paper, Button, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';
import axios from 'axios';
import AvailableSubscriptions from './SubscriptionForm'; // Import the new component

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);

  // useEffect(() => {
  //   const fetchSubscriptions = async () => {
  //     try {
  //       // Retrieve the token from local storage or any other secure storage
  //       const token = localStorage.getItem('authToken');
        
  //       if (!token) {
  //         throw new Error('No authentication token found');
  //       }
        
  //       // Make the API request with the token in the Authorization header
  //       const response = await axios.get(`${process.env.API_URL}/user/getAllPlans`, {
  //         headers: {
  //           Authorization: `Bearer ${token}` // Set the Authorization header with the token
  //         }
  //       });
        
  //       setSubscriptions(response.data.data); // Assuming response data is in a `data` property
  //     } catch (error) {
  //       console.error('Error fetching subscription data:', error);
  //     }
  //   };

  //   fetchSubscriptions();
  // }, []);

  const fetchSubscriptions = async () => {
    try{
      const response = await axios.get(`${process.env.API_URL}/user/getAllPlans`, {
        headers: {
          Authorization: `Bearer ${token}` // Set the Authorization header with the token
        }
      });

      setSubscriptions(response.data.data); // Adjust based on actual response structure
    } catch (error) {
      console.error('Error fetching available subscriptions:', error);
    }
  };
  useEffect(() => {
    fetchSubscriptions();
}, []);

  const handleAddSubscription = () => {
    setShowAvailable(true); // Show the available subscriptions list
  };

  const handleBack = () => {
    setShowAvailable(false); // Go back to the current subscriptions list
  };

  if (showAvailable) {
    return <AvailableSubscriptions onBack={handleBack} />;
  }

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={handleAddSubscription} style={{ margin: 16 }}>
        Add New Subscription
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subscription Name</TableCell>
            <TableCell>Purchased Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Subscription Time Period</TableCell>
            <TableCell>Plan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map((subscription, index) => (
            <TableRow key={index}>
              <TableCell>{subscription.name}</TableCell>
              <TableCell>{subscription.purchasedDate}</TableCell>
              <TableCell>{subscription.endDate}</TableCell>
              <TableCell>{subscription.timePeriod}</TableCell>
              <TableCell>{subscription.plan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriptionList;
