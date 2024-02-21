import React, { useState, useEffect, useReducer} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@mui/material';

const NegotiationsPage = ({ onLogout }) => {
  const [sentNegotiations, setSentNegotiations] = useState([]);
  const [sellerDetails, setSellerDetails] = useState({});
  const [buyerDetails, setBuyerDetails] = useState({});
  const [receivedNegotiations, setReceivedNegotiations] = useState([]);
  const [userId, setUserId] = useState('');
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  useEffect(() => {
    // Fetch negotiations sent by the user
    fetch(`http://localhost:3001/api/negotiations/sent/${userId}`)
      .then((response) => response.json())
      .then((data) => setSentNegotiations(data))
      .catch((error) => console.error('Error getting sent negotiations:', error));

    // Fetch negotiations received by the user
    fetch(`http://localhost:3001/api/negotiations/received/${userId}`)
      .then((response) => response.json())
      .then((data) => setReceivedNegotiations(data))
      .catch((error) => console.error('Error getting received negotiations:', error));
  }, [userId]);

  useEffect(() => {
    // Fetch details for the seller
    const fetchSellerDetails = async (sellerId, negotiationId) => {
      try {
        const response = await fetch(`http://localhost:3001/api/items/details/${sellerId}`);
        const sellerDetails = await response.json();
        setSellerDetails((prevDetails) => ({ ...prevDetails, [negotiationId]: sellerDetails }));
      } catch (error) {
        console.error('Error getting seller details:', error.message);
      }
    };

    // Fetch details for the buyer
    const fetchBuyerDetails = async (buyerId, negotiationId) => {
      try {
        const response = await fetch(`http://localhost:3001/api/items/details/${buyerId}`);
        const buyerDetails = await response.json();
        setBuyerDetails((prevDetails) => ({ ...prevDetails, [negotiationId]: buyerDetails }));
      } catch (error) {
        console.error('Error getting buyer details:', error.message);
      }
    };

    // Iterate through sent negotiations and fetch details
    sentNegotiations.forEach((negotiation) => {
      fetchSellerDetails(negotiation.sellerItemId, negotiation._id);
      fetchBuyerDetails(negotiation.buyerItemId, negotiation._id);
    });

    // Iterate through received negotiations and fetch details
    receivedNegotiations.forEach((negotiation) => {
      fetchSellerDetails(negotiation.sellerItemId, negotiation._id);
      fetchBuyerDetails(negotiation.buyerItemId, negotiation._id);
    });
  }, [sentNegotiations, receivedNegotiations]);



  const handleDeleteNegotiation = async (negotiationId) => {
    try {
      // Perform the deletion action (adjust the endpoint and method accordingly)
      const response = await fetch(`http://localhost:3001/api/negotiations/${negotiationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSentNegotiations((prevNegotiations) =>
        prevNegotiations.filter((negotiation) => negotiation._id !== negotiationId)
      );
        console.log('Negotiation deleted successfully!');

        forceUpdate(); 
      } else {
        console.error('Error deleting negotiation:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting negotiation:', error.message);
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
      <Container maxWidth="md" style={{ paddingTop: '20px', textAlign: 'center' }}>

<div style={{ marginTop: '20px' }}>
  <Typography variant="h3">Sent Negotiations</Typography>
  <List>
    {sentNegotiations.map((negotiation) => (
      <ListItem key={negotiation._id} alignItems="flex-start" style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
        <ListItemText
          primary={`Proposal: ${negotiation.proposal}`}
          secondary={`Selling Type: ${negotiation.sellingType}`}
        />
        <ListItemText
          primary={`Seller: ${sellerDetails[negotiation._id]?.userId?.username || 'Loading...'}`}
        />
         {negotiation.sellingType === 'exchange' && (
          <ListItemText
            primary={`Buyer's Exchange Item: ${buyerDetails[negotiation._id]?.name || 'Loading...'}`}
          />
        )}
        {negotiation.sellingType === 'exchangeAndMoney' && (
          <>
            <ListItemText
              primary={`Buyer's Exchange Item: ${buyerDetails[negotiation._id]?.name || 'Loading...'}`}
            />
            <ListItemText
              primary={`Money: ${negotiation.money || 'Loading...'}`}
            />
          </>
        )}
        <Button variant="contained" color="secondary" onClick={() => handleDeleteNegotiation(negotiation._id)}>
          Delete
        </Button>
      </ListItem>
    ))}
  </List>
</div>

<div style={{ marginTop: '20px' }}>
  <Typography variant="h3">Received Negotiations</Typography>
  <List>
    {receivedNegotiations.map((negotiation) => (
      <ListItem key={negotiation._id} alignItems="flex-start" style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
        <ListItemText
          primary={`Proposal: ${negotiation.proposal}`}
          secondary={`Selling Type: ${negotiation.sellingType}`}
        />
        <ListItemText
          primary={`Buyer: ${buyerDetails[negotiation._id]?.userId?.username || 'Loading...'}`}
        />
         {negotiation.sellingType === 'exchange' && (
          <ListItemText
            primary={`Buyer's Exchange Item: ${buyerDetails[negotiation._id]?.name || 'Loading...'}`}
          />
        )}
        {negotiation.sellingType === 'exchangeAndMoney' && (
          <>
            <ListItemText
              primary={`Buyer's Exchange Item: ${buyerDetails[negotiation._id]?.name || 'Loading...'}`}
            />
            <ListItemText
              primary={`Money: ${negotiation.money || 'Loading...'}`}
            />
          </>
        )}
        <Button variant="contained" color="secondary" onClick={() => handleDeleteNegotiation(negotiation._id)}>
          Deny
        </Button>
      </ListItem>
    ))}
  </List>
</div>
</Container>
</div>
);
};

export default NegotiationsPage;



