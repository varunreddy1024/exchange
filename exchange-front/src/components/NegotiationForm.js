import React, { useEffect, useState } from 'react';
import BuyerItemsDropdown from './BuyerItemsDropdown';
import { Link, useParams} from 'react-router-dom';

import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

import '../App.css'

const NegotiationForm = () => {


  const [negotiationFormData, setNegotiationFormData] = useState({
    buyerItemId: '',
    sellerItemId: '',
    proposal: '',
    sellingType: '',
    buyerId: '',
    sellerId: '',
    money: '',
  });
  const [userId, setUserId] = useState('');
  const [itemDetails, setItemDetails] = useState(null);


  const { itemId } = useParams();

  console.log(itemId);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // Fetch item details when component mounts
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/items/details/${itemId}`);
        const item = await response.json();
        setItemDetails(item);
      } catch (error) {
        console.error('Error fetching item details:', error.message);
      }
    };

    fetchItemDetails();
  }, [itemId]);


  

  const [buyerItems, setBuyerItems] = useState([]);

  useEffect(() => {
    if (negotiationFormData.sellingType === 'exchangeAndMoney' || negotiationFormData.sellingType === 'exchange') {
      fetch(`http://localhost:3001/api/items/${userId}`)
        .then((response) => response.json())
        .then((data) => setBuyerItems(data))
        .catch((error) => console.error('Error getting buyer items:', error));
    }
  }, [negotiationFormData.sellingType, userId]);

  const handleNegotiationFormChange = (e) => {
    const { name, value } = e.target;
    setNegotiationFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNegotiate = () => {
    // Use the already fetched item details
    if (itemDetails) {
      const { _id: sellerItemId, sellingType, userId: sellerId } = itemDetails;

      setNegotiationFormData({
        ...negotiationFormData,
        sellerItemId,
        sellingType,
        buyerId: userId,
        sellerId,
        buyerItemId: '',
        money: '',
      });
    }
  };

  const submitNegotiation = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/negotiations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(negotiationFormData),
      });

      if (response.ok) {
        console.log('Negotiation submitted successfully!');
      } else {
        console.error('Error submitting negotiation:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting negotiation:', error.message);
    }
  };


  return (


    <div><h2>Item Details</h2>
    {itemDetails && (
      <>
        <p>Name: {itemDetails.name}</p>
            <p>Description: {itemDetails.description}</p>
            <p>Category: {itemDetails.category}</p>
            <p>Seller: {itemDetails.userId.username}</p>
            <p>Selling Type: {itemDetails.sellingType}</p>
        
      </>
    )}

<button onClick={() => handleNegotiate()}>Negotiate</button>
      {negotiationFormData.sellerItemId && (
        <div>
          <h2>Negotiation Form</h2>

          {negotiationFormData.sellingType === 'exchange' && (
            <>
              <p>Select item for exchange:</p>
              <BuyerItemsDropdown
                buyerItems={buyerItems}
                onSelect={(selectedItem) => {
                  setNegotiationFormData((prevData) => ({
                    ...prevData,
                    buyerItemId: selectedItem._id,
                  }));
                }}
              />
            </>
          )}

          {negotiationFormData.sellingType === 'exchangeAndMoney' && (
            <>
              <p>Select item for exchange:</p>
              <BuyerItemsDropdown
                buyerItems={buyerItems}
                onSelect={(selectedItem) => {
                  setNegotiationFormData((prevData) => ({
                    ...prevData,
                    buyerItemId: selectedItem._id,
                  }));
                }}
              />
              <p>Enter money:</p>
              <TextField
                type="text"
                name="money"
                value={negotiationFormData.money}
                onChange={handleNegotiationFormChange}
              />
            </>
          )}

          {negotiationFormData.sellingType === 'completeMoney' && (
            <>
              <p>Enter money:</p>
              <TextField
                type="text"
                name="money"
                value={negotiationFormData.money}
                onChange={handleNegotiationFormChange}
              />
            </>
          )}

          <p>Proposal:</p>
          <TextField
            type="text"
            name="proposal"
            value={negotiationFormData.proposal}
            onChange={handleNegotiationFormChange}
          />

          <Button variant="contained" color="primary" onClick={submitNegotiation}>
            Submit Negotiation
          </Button>
        </div>
      )}
    </div>
  );
};
export default NegotiationForm;
