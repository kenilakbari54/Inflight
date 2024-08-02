import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './VendorDetails.css';
import { Store } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
const VendorDetails = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchVendorDetails(vendorId);
    fetchVendorMenus(vendorId);
  }, [vendorId]);

  const fetchVendorDetails = async (id) => {
    try {
      const response = await fetch(
        `https://inflightcatering-system.onrender.com/api/vendors/${id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch vendor details for ID ${id}`);
      }
      const data = await response.json();
      setVendor(data);
    } catch (error) {
      console.error(`Error fetching vendor details for ID ${id}:`, error);
    }
  };

  const fetchVendorMenus = async (id) => {
    try {
      const response = await fetch(
        `https://inflightcatering-system.onrender.com/api/vendors/menus/vendor/${id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch vendor menus for ID ${id}`);
      }
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error(`Error fetching vendor menus for ID ${id}:`, error);
    }
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (menu) => {
    const existItem = cartItems.find((x) => x._id === menu._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(
      `https://inflightcatering-system.onrender.com/api/vendors/menus/${menu._id}`
    );
    if (data.countInStock < quantity) {
      window.alert('sorry . product is out of stock');
      return;
    }

    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...menu, quantity } });
    toast.success('Added To Cart');
  };

  return (
    <div className="vendor-details">
      {vendor ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p style={{ display: 'flex' }}>
            Franchise Name - <h2>{vendor.fname}</h2>
          </p>
          <img
            src={vendor.ophoto}
            style={{ height: '200px', width: '300px' }}
            alt={vendor.fname}
          />
          <p>Owner Name - {vendor.name}</p>
          <p>Franchise Address - {vendor.oaddress}</p>
          <p>Contact Email - {vendor.email}</p>
          <p>City - {vendor.acity}</p>
          {/* Add more vendor details as needed */}
          <section className="sb-menu-section sb-p-90-60">
            <div className="container">
              <div className="text-center sb-mb-60">
                <h2 className="sb-mb-30">Menu</h2>
                <p className="sb-text">
                  {/* Consectetur numquam poro nemo veniam
                  <br />
                  eligendi rem adipisci quo modi. */}
                </p>
              </div>
              <div className="row">
                {menus.length > 0 ? (
                  menus.map((menu) => (
                    <div className="col-lg-4" key={menu._id}>
                      <Link to={`/menu/${menu._id}`}>
                        <a
                          data-fancybox="menu"
                          data-no-swup
                          href={menu.photo}
                          className="sb-menu-item sb-mb-30"
                        >
                          <div className="sb-cover-frame">
                            <img src={menu.photo} alt="menu item" />
                          </div>
                          <div className="sb-card-tp">
                            <h3 className="sb-card-title">{menu.name}</h3>
                            <div
                              className="sb-price"
                              style={{ width: '100px' }}
                            >
                              {menu.price}
                            </div>
                          </div>
                          <div className="sb-description">
                            <p className="sb-text sb-mb-15">
                              {menu.description}
                            </p>
                          </div>
                        </a>
                      </Link>
                      <button
                        className="sb-add-to-cart"
                        style={{ width: '150px', marginBottom: '50px' }}
                        onClick={() => addToCartHandler(menu)}
                      >
                        Add to Cart
                      </button>
                      <br />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p>No menu items available for this vendor.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Loading vendor details...</p>
      )}
    </div>
  );
};

export default VendorDetails;
