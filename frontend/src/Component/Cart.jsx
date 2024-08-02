import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import './cart.css';
import Footer from './Footer';
import { toast } from 'react-toastify';
const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(
      `https://inflightcatering-system.onrender.com/api/vendors/menus/${item._id}`
    );

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    toast.error('Item removed');
  };

  const checkoutHandler = () => {
    navigate('/checkout');
  };
  return (
    <>
      {' '}
      <br />
      <br />
      <br />
      <br />
      <br />
      <div md={8}>
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-content align-items-center">
              <div className="cart-item-image">
                <img
                  style={{ height: '100px' }}
                  src={item.photo}
                  alt={item.name}
                  className="img-fluid rounded img-thumbnail"
                />{' '}
                <Link to={`/menu/${item._id}`}>{item.name}</Link>
              </div>
              <div className="cart-item-quantity">
                <button
                  className="quantity-button"
                  onClick={() => updateCartHandler(item, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  <i className="fas fa-minus-circle"></i>
                </button>{' '}
                <span>{item.quantity}</span>{' '}
                <button
                  className="quantity-button"
                  onClick={() => updateCartHandler(item, item.quantity + 1)}
                  disabled={item.quantity === item.countInStock}
                >
                  <i className="fas fa-plus-circle"></i>
                </button>
              </div>
              <div className="cart-item-price">₹{item.price}</div>
              <div className="cart-item-remove">
                <button
                  onClick={() => removeItemHandler(item)}
                  className="remove-button"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        <center>
          <div className="cart-summary" style={{ width: '25%' }}>
            <div>
              <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                : ₹{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </h3>
            </div>
            <div className="checkout-button-container">
              <button
                type="button"
                className="checkout-button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </center>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Cart;
