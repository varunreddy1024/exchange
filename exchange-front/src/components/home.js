import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
} from '@mui/material';

import '../App.css'

const Home = ({ onLogout }) => {

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sellingTypesFilter, setSellingTypesFilter] = useState({
    exchange: true,
    exchangeAndMoney: true,
    completeMoney: true,
  });
  const [userId, setUserId] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);


  useEffect(() => {
    fetch('http://localhost:3001/api/items')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => console.error('Error getting items:', error));
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };



  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((prevCategory) => prevCategory !== category)
        : [...prevCategories, category]
    );
  };

  useEffect(() => {
    const filteredItems = items.filter(
      (item) =>
        sellingTypesFilter[item.sellingType] &&
        (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(filteredItems);
  }, [sellingTypesFilter, items, selectedCategories, searchTerm]);

  return (
    <div>
      <nav className='nav-main'>
        <ul className='nav-ul'>
          <li className='nav-li'>
            <Link to="/">Home</Link>
          </li>
          <li className='nav-li'>
            <Link to="/profile">Profile</Link>
          </li>
          <li className='nav-li'>
            <Link to="/post">Post Item</Link>
          </li>
          <li className='nav-li'>
            <Link to="/negotiation">Negotiations</Link>
          </li>
          <li className='nav-li'>
  <div style={{ display: 'inline', alignItems: 'center', marginRight: '10px' }}>
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: '500px',
        height: '30px',
        padding: '5px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
      }}
    />
  </div>
</li>
          <li className='nav-li'>
          <div className="filter-container">
          <div style={{ margin: '0px', width: '200px', display: 'inline-block', marginRight: '10px', position: 'relative', verticalAlign: 'middle' }}>
  <select
    id="category-select"
    onChange={(e) => handleCategoryChange(e.target.value)}
    className="filter-dropdown"
    style={{ width: '200px', height: '30px', padding: '5px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
  >
    {['mobiles', 'watches', 'laptops', 'shoes', 'clothes', 'others'].map((category) => (
      <option
        key={category}
        value={category}
        style={{ height: '30px', padding: '0', display: 'flex', alignItems: 'center', fontSize: '14px' }}
      >
        <input type="checkbox" checked={selectedCategories.includes(category)} style={{ marginRight: '8px' }} />
        {category}
      </option>
    ))}
  </select>
</div>




</div>
          </li>
          <li className='nav-li'>
          <span className='float-right' onClick={handleLogout}>
        Logout
      </span>
          </li>
        </ul>
      </nav>
      <ul className='display-flex'>
  {filteredItems.map((item) => (
    <li className='list-item-home' key={item._id}>
      <div style={{ width: '280px', height: '120px', overflow: 'hidden' }}>
        {item.images && item.images.length > 0 && (
          <Link to={`/item/${item._id}`}>
            <img
              src='https://via.placeholder.com/500x100'  // Replace with the actual URL or logic to get the image
              alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
        )}
      </div>
      <strong>{item.name}</strong>
      <p>{item.sellingType}</p>
    </li>
  ))}
</ul>
    </div>
  );
};

export default Home;





