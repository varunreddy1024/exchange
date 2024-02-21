// PostItem.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const PostItem = ({ onLogout }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]); 
  const [userId, setUserId] = useState('65b78a5055036f2ba23a5023');
  const [sellingType, setSellingType] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log(storedUserId); 
      console.log(images);// Log the retrieved userId
    }
  }, [images]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleImageChange = (e) => {
    const fileArray = Array.from(e.target.files);
    const reader = new FileReader();

    console.log(fileArray);
  
    // Read each selected file and setImages with an array of file buffers
    reader.onloadend = () => {
      setImages((prevImages) => [...prevImages, reader.result]);
      console.log(images);
    };

    fileArray.forEach((file) => {
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace the API URL with your actual backend API endpoint
    const response = await fetch('http://localhost:3001/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, category, images, userId, sellingType }),
    });

    console.log(images);
    setName('');
    setDescription('');
    setCategory('');
    setImages([]);
    setSellingType('');

    if (response.ok) {
      console.log('Item posted successfully!');
      // Redirect to the home page or handle navigation as needed
    } else {
      console.error('Error posting item:', response.statusText);
    }
  };

  return (
    <div>
      <nav className='nav-main'>
        <ul className='nav-ul'>
          <li className='nav-li'>
            <Link to="/">Home</Link>
          </li>
          <li className='nav-li'>
            <Link to="/">Profile</Link>
          </li>
          <li className='nav-li'>
            <Link to="/post">Post Item</Link>
          </li>
          <li className='nav-li'>
            <Link to="/negotiation">Negotiations</Link>
          </li>
          <li className='nav-li'>
            <span className='float-right' onClick={handleLogout}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
      <div className='post-item'>
        <h1>Post an Item for Exchange</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="mobiles">Mobiles</MenuItem>
              <MenuItem value="watches">Watches</MenuItem>
              <MenuItem value="laptops">Laptops</MenuItem>
              <MenuItem value="shoes">Shoes</MenuItem>
              <MenuItem value="clothes">Clothes</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Selling Type</InputLabel>
            <Select
              value={sellingType}
              onChange={(e) => setSellingType(e.target.value)}
              label="Selling Type"
            >
              <MenuItem value="">Select Selling Type</MenuItem>
              <MenuItem value="exchange">Exchange</MenuItem>
              <MenuItem value="exchangeAndMoney">Exchange + Money</MenuItem>
              <MenuItem value="completeMoney">Complete Money</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Post Item
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostItem;
