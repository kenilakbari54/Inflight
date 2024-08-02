import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/orders');
  };

  return (
    <div className="order-success-container">
      <div className="animation-wrapper">
        <div className="arrow-circle">
          <div className="arrow"></div>
        </div>
      </div>
      <h2>Order Successfully Placed!</h2>
      <button className="view-orders-button" onClick={handleNavigate}>
        View Order
      </button>
    </div>
  );
};

export default OrderSuccess;
