// BuyerItemsDropdown.js
import React from 'react';

const BuyerItemsDropdown = ({ buyerItems, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(buyerItems.find(item => item._id === e.target.value))}>
      <option value="">Select Item</option>
      {buyerItems.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default BuyerItemsDropdown;
