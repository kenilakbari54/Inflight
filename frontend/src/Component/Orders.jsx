import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './OrderPage.css'; // Make sure to create this CSS file for styling
import { authContext } from './AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://inflightcatering-system.onrender.com/api/orders/customer/${user._id}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <div className="order-page">
        <h1 style={{ fontSize: '40px' }}>Your Orders</h1>
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
                <p style={{ display: 'flex' }}>
                  Status :
                  {order.OrderStatus === 'Pending' ? (
                    <p style={{ backgroundColor: 'orange', width: '100px' }}>
                      Pending
                    </p>
                  ) : (
                    <p
                      style={{
                        backgroundColor: 'green',
                        width: '100px',
                        color: 'white',
                      }}
                    >
                      Delivered
                    </p>
                  )}
                </p>
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
                  <strong>Items</strong>
                </p>
                <ul>
                  {order.menuItems.map((item, index) => (
                    <li key={index}>
                      <img
                        src={item.photo}
                        height="40x"
                        width="60px"
                        alt=""
                        srcset=""
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

export default Orders;
