/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './checkout.css';
import { authContext } from './AuthContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [responseId, setResponseId] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    cart: { cartItems },
  } = state;
  const [loading, setLoading] = useState(false);
  const { user } = useContext(authContext);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const [formData, setFormData] = useState({
    vendorId: cartItems[0].vendorId,
    customerId: user._id,
    contactNumber: '',
    flightNumber: '',
    airline: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    departureTime: '',
    seatNumber: '',
    Quantity: cartItems[0].quantity,
    specialInstructions: '',
    TotalAmount: cartItems[0].price * cartItems[0].quantity,
    menuItems: cartItems,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'departureDate' || name === 'departureTime') {
      validateDepartureTime(formData.departureDate, formData.departureTime);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // let config = {
      //   method: 'POST',
      //   maxBodyLength: Infinity,
      //   url: 'https://inflightcatering-system.onrender.com/api/orders/',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: formData,
      // };

      // const { data } = await axios.request(config);

      // console.log('Order creation response:', data);
      const res = await fetch(
        `https://inflightcatering-system.onrender.com/api/orders/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }
      toast.success('Order Placed');

      // Ensure the order ID is not undefined
      if (res) {
        // Pass the order ID and TotalAmount to the Razorpay screen
        handleRazorpayScreen(message.order_id, formData.TotalAmount);
      } else {
        throw new Error('Order ID is undefined');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setLoading(false);
      navigate('/');
    }
  };

  const handleRazorpayScreen = async (orderId, razorpayOrderId, amount) => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      alert('Error loading Razorpay script');
      return;
    }
    const options = {
      key: 'rzp_test_El0CiMj4TAxwPS',
      amount: amount * 100,
      currency: 'INR',
      name: 'kenil akbari',
      description: 'nininiinini',
      order_id: razorpayOrderId,
      handler: async function (response) {
        setResponseId(response.razorpay_payment_id);
        try {
          // Update the order with the razorpay_payment_id
          await axios.patch(
            `https://inflightcatering-system.onrender.com/api/orders/${orderId}`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
            }
          );
          console.log(response.razorpay_payment_id);
          console.log(response);
          navigate('/order-success');
          toast.success('Payment Successfully');
          localStorage.removeItem('cartItems');
        } catch (error) {
          console.error('Error updating order with payment ID:', error);
          navigate('/');
        }
      },
      prefill: {
        name: 'kenil',
        email: 'kenil@gmail.com',
      },
      theme: {
        color: '#F4C430',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    if (!paymentObject.open()) {
      navigate('/');
    }
  };
  const validateDepartureTime = (date, time) => {
    if (!date || !time) {
      setError('');
      setIsDisabled(false);
      return;
    }

    const departureDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const hoursDifference = (departureDateTime - now) / 36e5;

    if (hoursDifference < 24) {
      setError(
        'You cannot place an order less than 24 hours before the flight.'
      );
      setIsDisabled(true);
    } else {
      setError('');
      setIsDisabled(false);
    }
  };
  useEffect(() => {
    validateDepartureTime(formData.departureDate, formData.departureTime);
  }, [formData.departureDate, formData.departureTime]);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="cart-summary">
        <div>
          <h3>
            <center>
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
              ₹{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            </center>{' '}
          </h3>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #e3e3e3',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <h2>Checkout</h2>
        <div className="section">
          <h3>Personal Information</h3>
          <label>
            <span>Contact Number:</span>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="section">
          <h3>Flight Information</h3>
          <label>
            <span>Flight Number:</span>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Airline:</span>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Departure Airport:</span>
            <input
              type="text"
              name="departureAirport"
              value={formData.departureAirport}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Arrival Airport:</span>
            <input
              type="text"
              name="arrivalAirport"
              value={formData.arrivalAirport}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Date of Departure:</span>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Time of Departure:</span>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Seat Number (optional):</span>
            <input
              type="text"
              name="seatNumber"
              value={formData.seatNumber}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="section">
          <h3>Order Details</h3>
          <label>
            <span>Special Instructions (optional):</span>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Processing...' : 'Proceed To Pay'}
        </button>
      </form>
    </>
  );
};

export default Checkout;
