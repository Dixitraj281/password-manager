import React, { useState, useEffect } from 'react';
import { Table, Paper, Button, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';
import axios from 'axios';

const AvailableSubscriptions = ({ onBack }) => {
  const [availableSubscriptions, setAvailableSubscriptions] = useState([]);

    const fetchAvailableSubscriptions = async () => {
      try{
        const response = await axios.get(`${process.env.API_URL}/user/getAllPlans`, {
          headers: {
            Authorization: `Bearer ${token}` // Set the Authorization header with the token
          }
        });

        setAvailableSubscriptions(response.data.data); // Adjust based on actual response structure
      } catch (error) {
        console.error('Error fetching available subscriptions:', error);
      }
    };
    useEffect(() => {
    fetchAvailableSubscriptions();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="secondary" onClick={onBack} style={{ margin: 16 }}>
        Back to My Subscriptions
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subscription Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {availableSubscriptions.map((subscription, index) => (
            <TableRow key={index}>
              <TableCell>{subscription.name}</TableCell>
              <TableCell>{subscription.description}</TableCell>
              <TableCell>{subscription.price}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Subscribe
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AvailableSubscriptions;
