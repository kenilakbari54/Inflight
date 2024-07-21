import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './VendorOrder.css'; // Make sure to create this CSS file for styling
import { authContext } from './AuthContext';

const VendorOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/vendor/${user._id}`
        );
        const ordersWithTime = response.data.map((order) => ({
          ...order,
          remainingTime: calculateRemainingTime(
            order.departureDate,
            order.departureTime
          ),
        }));
        setOrders(ordersWithTime);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user._id]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/orders/orders/${orderId}/status`,
        {
          status: newStatus,
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, OrderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const calculateRemainingTime = (date, time) => {
    if (!date || !time) return 'Invalid time';
    const departureDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const timeDifference = departureDateTime - now;

    if (timeDifference <= 0) {
      return 'Time has passed';
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          remainingTime: calculateRemainingTime(
            order.departureDate,
            order.departureTime
          ),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="vendor-order-page">
        <h1 style={{ fontSize: '40px' }}>Vendor Orders</h1>
        <div className="order-cards-container">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
                <div style={{ display: 'flex' }}>
                  Flight Number:
                  <h3>{order.flightNumber}</h3>
                </div>
                <p style={{ marginLeft: '-145px' }}>
                  Airline : {order.airline}
                </p>
                <div style={{ display: 'flex' }}>
                  <h3 style={{ marginTop: '20px' }}>Status</h3>
                  <select
                    value={order.OrderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    style={{
                      marginLeft: '10px',
                      padding: '5px',
                      backgroundColor:
                        order.OrderStatus === 'Pending' ? 'orange' : 'green',
                      color: 'white',
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                {/* <p style={{ marginLeft: '10px' }}>
                  Remaining Time: {order.remainingTime}
                </p> */}
              </div>
              <div className="order-card-body">
                <p>
                  <strong>Departure Airport:</strong> {order.departureAirport}
                </p>
                <p>
                  <strong>Arrival Airport:</strong> {order.arrivalAirport}
                </p>
                <p>
                  <strong>Departure Date:</strong>{' '}
                  {new Date(order.departureDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Departure Time:</strong> {order.departureTime}
                </p>
                <p>
                  <strong>Seat Number:</strong> {order.seatNumber}
                </p>
                <p>
                  <strong>Special Instructions:</strong>{' '}
                  {order.specialInstructions}
                </p>
              </div>
              <div className="order-card-footer">
                <p>
                  <strong>Items:</strong>
                </p>
                <ul>
                  {order.menuItems.map((item, index) => (
                    <li key={index}>
                      <img
                        src={item.photo}
                        height="40x"
                        width="60px"
                        alt=""
                        srcSet=""
                      />
                      {item.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorOrder;
