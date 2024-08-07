import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Table,
  Paper,
  Dialog,
  Button,
  Select,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  InputLabel,
  IconButton,
  FormControl,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

export default function MediaAccountsTable() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [mediaAccounts, setMediaAccounts] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    fetchMediaAccounts();
  }, []);

  const fetchMediaAccounts = async () => {
    try {
      // Extract agencyid from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const agencyId = urlParams.get('agencyid');

      if (!agencyId) {
        throw new Error('No agency ID found in the URL');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${process.env.API_URL}/user/listAllPasswordByAgency`, {
        params: {
          agencyid: agencyId,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('API response:', response.data); // Check the structure of the response
      console.log('Type of response.data:', Array.isArray(response.data));

      // Ensure that response.data is an array
      setMediaAccounts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching media accounts:', error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const filteredMediaAccounts = mediaAccounts.filter(account =>
    !selectedPlatform || account.platform === selectedPlatform
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ p: 2 }}>Media Accounts</Typography>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Platform</InputLabel>
          <Select
            value={selectedPlatform}
            onChange={handlePlatformChange}
            label="Platform"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Snapchat', 'Airbnb', 'Booking.com', 'Expedia'].map((platform, index) => (
              <MenuItem key={index} value={platform}>{platform}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Platform</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMediaAccounts.length > 0 ? (
              filteredMediaAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.platform}</TableCell>
                  <TableCell>{account.url}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>
                    {passwordVisible ? account.password : '********'}
                    <IconButton onClick={handlePasswordToggle}>
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{account.notes}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleImageClick(account.image)} style={{ padding: 0 }}>
                      <img
                        src={account.image}
                        alt={account.platform}
                        width="50"
                        height="50"
                        style={{ cursor: 'pointer' }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="textSecondary">No media available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
