import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from './AuthContext';
import './Header.css';
import { Store } from '../Store';
import { toast } from 'react-toastify';
const Header = () => {
  const { user, role, token } = useContext(authContext);
  const [stateAuth, setStateAuth] = useState();
  const navigate = useNavigate();
  const responce = (res) => {
    setStateAuth(res);
  };
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  console.log(role);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  function Logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/Login');
    toast.success('Successfully Logout');
  }
  return (
    <>
      <div className="sb-top-bar-frame">
        <div className="sb-top-bar-bg" />
        <div className="container">
          <div className="sb-top-bar">
            <Link to="/" style={{ fontSize: '30px' }}>
              AeroEats
            </Link>
            {/* menu */}
            <div className="sb-right-side">
              <nav id="sb-dynamic-menu" className="sb-menu-transition">
                <ul className="sb-navigation">
                  <li
                    className={
                      window.location.pathname === '/'
                        ? 'sb-active sb-has-children'
                        : 'sb-has-children'
                    }
                  >
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className={
                      window.location.pathname === '/about'
                        ? 'sb-active sb-has-children'
                        : 'sb-has-children'
                    }
                  >
                    <Link to="/about">About</Link>
                  </li>
                  {role === 'partner' ? (
                    <>
                      {' '}
                      <li
                        className={
                          window.location.pathname === '/dash'
                            ? 'sb-active sb-has-children'
                            : 'sb-has-children'
                        }
                      >
                        <Link to="/dash">DashBoard</Link>
                      </li>
                      <li
                        className={
                          window.location.pathname === '/vendororder'
                            ? 'sb-active sb-has-children'
                            : 'sb-has-children'
                        }
                      >
                        <Link to="/vendororder">Order</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className={
                          window.location.pathname === '/franchise'
                            ? 'sb-active sb-has-children'
                            : 'sb-has-children'
                        }
                      >
                        <Link to="/franchise">Shop</Link>
                      </li>
                      <li
                        className={
                          window.location.pathname === '/shop'
                            ? 'sb-active sb-has-children'
                            : 'sb-has-children'
                        }
                      >
                        {/* <Link to="/shop">Shop</Link> */}
                      </li>
                    </>
                  )}
                  {user ? (
                    <li className="navbar-item" style={{ color: 'black' }}>
                      <div className="dropdown" style={{ color: 'black' }}>
                        <button
                          className="dropdown-toggle"
                          onClick={toggleDropdown}
                          style={{
                            color: 'blue',
                            border: 'none',
                            background: 'white',
                          }}
                        >
                          Welcome Back!, {user.name}
                        </button>
                        {dropdownOpen && (
                          <ul
                            className="dropdown-menu"
                            style={{ color: 'black' }}
                          >
                            <button className="dropdown-item">
                              <Link to="/profile">Profile</Link>
                            </button>
                            <button className="dropdown-item">
                              <Link to="/orders">Order</Link>
                            </button>

                            <button className="dropdown-item" onClick={Logout}>
                              <Link>Log Out</Link>
                            </button>
                          </ul>
                        )}
                      </div>
                    </li>
                  ) : (
                    <>
                      <li className="sb-has-children">
                        <Link to="/Login">Login/Register</Link>
                      </li>
                      <button
                        className="sb-has-children"
                        style={{
                          color: 'white',
                          background: 'blue',
                          borderRadius: '50px',
                          height: '50px',
                        }}
                      >
                        <Link to="/Plogin">Become A Partner!</Link>
                      </button>
                    </>
                  )}
                </ul>
              </nav>
              {role === 'partner' ? (
                <></>
              ) : (
                <Link to="/cart">
                  <div className="sb-buttons-frame">
                    {/* button */}
                    <div className="sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0 sb-btn-cart">
                      <span className="sb-icon">
                        <img src="img/ui/icons/cart.svg" alt="icon" />
                      </span>
                      <i className="sb-cart-number">
                        {cart.cartItems.length > 0 && (
                          <>{cart.cartItems.reduce((a, c) => a + 1, 0)}</>
                        )}
                      </i>
                    </div>

                    {/* button end */}
                    {/* menu btn */}
                    <div className="sb-menu-btn">
                      <span />
                    </div>
                    {/* info btn */}
                    <div className="sb-info-btn">
                      <span />
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* info bar */}
        <div className="sb-info-bar">
          <div className="sb-infobar-content">
            <div className="sb-ib-title-frame sb-mb-30">
              <h4>Contact</h4>
              <i className="fas fa-arrow-down" />
            </div>
            <ul className="sb-list sb-mb-30">
              <li>
                <b>Address:</b>
                <span>Montréal, 1510 Rue Sauvé</span>
              </li>
              <li>
                <b>Working hours:</b>
                <span>09:00 - 23:00</span>
              </li>
              <li>
                <b>Phone:</b>
                <span>+02 (044) 756-X6-52</span>
              </li>
              <li>
                <b>Email:</b>
                <span>starbelly@mail.com</span>
              </li>
            </ul>
            <div className="sb-ib-title-frame sb-mb-30">
              <h4>Instagram</h4>
              <i className="fas fa-arrow-down" />
            </div>
            <ul className="sb-instagram sb-mb-30">
              <li>
                <a href="#.">
                  <img src="img/instagram/1.jpg" alt="instagram" />
                </a>
              </li>
              <li>
                <a href="#.">
                  <img src="img/instagram/2.jpg" alt="instagram" />
                </a>
              </li>
              <li>
                <a href="#.">
                  <img src="img/instagram/3.jpg" alt="instagram" />
                </a>
              </li>
              <li>
                <a href="#.">
                  <img src="img/instagram/4.jpg" alt="instagram" />
                </a>
              </li>
              <li>
                <a href="#.">
                  <img src="img/instagram/5.jpg" alt="instagram" />
                </a>
              </li>
              <li>
                <a href="#.">
                  <img src="img/instagram/6.jpg" alt="instagram" />
                </a>
              </li>
            </ul>
            <hr />
            <div className="sb-ib-title-frame sb-mb-30">
              <h4>Latest publications</h4>
              <i className="fas fa-arrow-down" />
            </div>
            <a
              href="publication-1.html"
              className="sb-blog-card sb-blog-card-sm sb-mb-30"
            >
              <div className="sb-cover-frame">
                <img src="img/blog/1.jpg" alt="cover" />
              </div>
              <div className="sb-blog-card-descr">
                <h5 className="sb-mb-5">Simple Homemade Tomato Soup</h5>
                <p className="sb-text sb-text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Libero optio, sed expedita.
                </p>
              </div>
            </a>
            <a
              href="publication-1.html"
              className="sb-blog-card sb-blog-card-sm sb-mb-30"
            >
              <div className="sb-cover-frame">
                <img src="img/blog/2.jpg" alt="cover" />
              </div>
              <div className="sb-blog-card-descr">
                <h5 className="sb-mb-5">
                  Thai Coconut Soup with Tofu and Rice
                </h5>
                <p className="sb-text sb-text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Libero optio, sed expedita.
                </p>
              </div>
            </a>
            <a
              href="publication-1.html"
              className="sb-blog-card sb-blog-card-sm sb-mb-30"
            >
              <div className="sb-cover-frame">
                <img src="img/blog/3.jpg" alt="cover" />
              </div>
              <div className="sb-blog-card-descr">
                <h5 className="sb-mb-5">
                  21 Things You Should Absolutely Be Buying at ALDI
                </h5>
                <p className="sb-text sb-text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Libero optio, sed expedita.
                </p>
              </div>
            </a>
          </div>
          <div className="sb-info-bar-footer">
            <ul className="sb-social">
              <li>
                <a href="#.">
                  <i className="far fa-circle" />
                </a>
              </li>
              <li>
                <a href="#.">
                  <i className="far fa-circle" />
                </a>
              </li>
              <li>
                <a href="#.">
                  <i className="far fa-circle" />
                </a>
              </li>
              <li>
                <a href="#.">
                  <i className="far fa-circle" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* info bar end */}
        {/* minicart */}
        <div className="sb-minicart">
          <div className="sb-minicart-content">
            <div className="sb-ib-title-frame sb-mb-30">
              <h4>Your order.</h4>
              <i className="fas fa-arrow-down" />
            </div>
            <a
              href="product.html"
              className="sb-menu-item sb-menu-item-sm sb-mb-15"
            >
              <div className="sb-cover-frame">
                <img src="img/menu/4.jpg" alt="product" />
              </div>
              <div className="sb-card-tp">
                <h4 className="sb-card-title">Saumon Gravlax</h4>
                <div className="sb-price">
                  <sub>$</sub> 9
                </div>
              </div>
            </a>
            <a
              href="product.html"
              className="sb-menu-item sb-menu-item-sm sb-mb-15"
            >
              <div className="sb-cover-frame">
                <img src="img/menu/1.jpg" alt="product" />
              </div>
              <div className="sb-card-tp">
                <h4 className="sb-card-title">Chevrefrit au miel</h4>
                <div className="sb-price">
                  <sub>$</sub> 14
                </div>
              </div>
            </a>
            <a
              href="product.html"
              className="sb-menu-item sb-menu-item-sm sb-mb-15"
            >
              <div className="sb-cover-frame">
                <img src="img/menu/2.jpg" alt="product" />
              </div>
              <div className="sb-card-tp">
                <h4 className="sb-card-title">Croustillant de poisson</h4>
                <div className="sb-price">
                  <sub>$</sub> 4
                </div>
              </div>
            </a>
            <a
              href="product.html"
              className="sb-menu-item sb-menu-item-sm sb-mb-15"
            >
              <div className="sb-cover-frame">
                <img src="img/menu/3.jpg" alt="product" />
              </div>
              <div className="sb-card-tp">
                <h4 className="sb-card-title">Stracciatella</h4>
                <div className="sb-price">
                  <sub>$</sub> 11
                </div>
              </div>
            </a>
            <a
              href="product.html"
              className="sb-menu-item sb-menu-item-sm sb-mb-15"
            >
              <div className="sb-cover-frame">
                <img src="img/menu/5.jpg" alt="product" />
              </div>
              <div className="sb-card-tp">
                <h4 className="sb-card-title">Carpaccio de daurade</h4>
                <div className="sb-price">
                  <sub>$</sub> 19
                </div>
              </div>
            </a>
          </div>
          <div className="sb-minicart-footer">
            {/* button */}
            <a href="cart.html" className="sb-btn sb-btn-gray sb-btn-text">
              <span>View order</span>
            </a>
            {/* button end */}
            {/* button */}
            <a href="checkout.html" className="sb-btn sb-btn-text">
              <span>Checkout</span>
            </a>
            {/* button end */}
          </div>
        </div>
        {/* minicart end */}
      </div>
    </>
  );
};

export default Header;
