import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from './AuthContext';
import Footer from './Footer';
import image5 from '../pic/del.png';
import image1 from '../pic/burger.png';
const FranchiseContent = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [vendors, setVendors] = useState([]);
  const { user, role, token } = useContext(authContext);
  console.log(user._id);
  // Fetch cities from backend
  useEffect(() => {
    fetchCities();
  }, []);

  // Fetch vendors based on selected city
  useEffect(() => {
    if (selectedCity) {
      fetchVendorsByCity(selectedCity);
    }
    console.log('Selected City:', selectedCity);
  }, [selectedCity]);

  const fetchVendorsByCity = async (cityName) => {
    try {
      const response = await fetch(
        `https://inflightcatering-system.onrender.com/api/vendors/city/${cityName}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch vendors for city ${cityName}`);
      }

      const data = await response.json();
      console.log(data);
      setVendors(data || []);
    } catch (error) {
      console.error(`Error fetching vendors for city ${cityName}:`, error);
      setVendors([]); // Set vendors to empty array on error
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        'https://inflightcatering-system.onrender.com/api/vendors/city'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      const data = await response.json();
      console.log('Fetched Cities:', data);
      setCities(data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <>
      <div id="sb-dynamic-content" className="sb-transition-fade">
        {/* banner */}
        <section className="sb-banner sb-banner-sm sb-banner-color">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* main title */}
                <div className="sb-main-title-frame">
                  <div className="sb-main-title text-center">
                    <span className="sb-suptitle sb-mb-30">Menu</span>
                    <h1 className="sb-mb-30">
                      Only <span>appetite</span> <br />
                      Can be lacking in <span>cooking</span>
                    </h1>
                    <ul className="sb-breadcrumbs">
                      <li>
                        <a href="home-1.html">Home</a>
                      </li>
                      <li>
                        <a href="menu-1.html">Menu</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* main title end */}
              </div>
            </div>
          </div>
        </section>
        {/* banner end */}
        {/* menu section 1 */}

        <div className="text-center sb-mb-10">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            style={{
              color: 'black',
              borderRadius: '50px',
              height: '50px',
              fontSize: '20px',
              width: '200px',
            }}
          >
            <option value="" style={{ width: '200px' }}>
              Select an Airport
            </option>
            {cities.length > 0 ? (
              cities.map((city) => (
                <option
                  key={city.id}
                  value={city.name}
                  style={{ color: 'black', width: '100px' }} // Adjust color as needed
                >
                  {city}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No cities available
              </option>
            )}
          </select>
        </div>

        <section className="sb-menu-section sb-p-90-60">
          <div className="sb-bg-1">
            <div />
          </div>
          <div className="container">
            <div className="text-center sb-mb-60">
              <h2 className="sb-mb-30">Top Franchise</h2>
              <p className="sb-text">
                {/* Consectetur numquam poro nemo veniam
                <br />
                eligendi rem adipisci quo modi. */}
              </p>
            </div>
            <div className="row">
              {vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <div className="col-lg-4" key={vendor._id}>
                    <Link to={`/franchise/${vendor._id}`}>
                      <a
                        data-fancybox="menu"
                        data-no-swup
                        href={vendor.ophoto}
                        className="sb-menu-item sb-mb-30"
                      >
                        <div className="sb-cover-frame">
                          <img src={vendor.ophoto} alt="product" />
                        </div>
                        <div className="sb-card-tp">
                          <h3 className="sb-card-title">{vendor.fname}</h3>
                          <div className="sb-price" style={{ width: '100px' }}>
                            {vendor.acity}
                          </div>
                        </div>
                        <div className="sb-description">
                          <p className="sb-text sb-mb-15">
                            {vendor.description}
                          </p>
                          <ul className="sb-stars">
                            {Array.from({ length: vendor.rating }).map(
                              (_, index) => (
                                <li key={index}>
                                  <i className="fas fa-star" />
                                </li>
                              )
                            )}
                            <li>
                              <span>({vendor.reviews} ratings)</span>
                            </li>
                          </ul>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p>No vendors available for this city.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* call to action */}
        <section className="sb-call-to-action">
          <div className="sb-bg-3" />
          <div className="container">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="sb-cta-text">
                  <h1 className="sb-mb-15">
                    <sup>-</sup>
                    <span className="sb-title-lg">50</span>
                    <sup>%</sup> Discount <br />
                    for all* burgers!
                  </h1>

                  {/* button */}
                  <a href="product.html" className="sb-btn">
                    <span className="sb-icon">
                      <img src="img/ui/icons/cart.svg" alt="icon" />
                    </span>
                    <span>Get it now!</span>
                  </a>
                  {/* button end */}
                  {/* button */}
                  <a href="menu-2.html" className="sb-btn sb-btn-2 sb-btn-gray">
                    <span className="sb-icon">
                      <img src="img/ui/icons/menu.svg" alt="icon" />
                    </span>
                    <span>Menu</span>
                  </a>
                  {/* button end */}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="sb-illustration-6">
                  <img
                    src={image1}
                    alt="burger"
                    style={{ height: '400px', width: '500px' }}
                    className="sb-burger"
                  />
                  <div className="sb-cirkle-1" />
                  <div className="sb-cirkle-2" />
                  <div className="sb-cirkle-3" />
                  <div className="sb-cirkle-4" />
                  <div className="sb-cirkle-5" />
                  <img
                    src="img/illustrations/2.svg"
                    alt="phones"
                    className="sb-pik-2"
                  />
                  <img
                    src="img/illustrations/3.svg"
                    alt="phones"
                    className="sb-pik-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* call to action end */}
        {/* menu section 3 */}

        {/* menu section 4 end */}
        {/* call to action */}
        <section className="sb-call-to-action">
          <div className="sb-bg-3" />
          <div className="container">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="sb-cta-text">
                  <h2 className="sb-h1 sb-mb-15">Free delivery service.</h2>

                  {/* button */}
                  <Link to="/cart" className="sb-btn">
                    <span className="sb-icon">
                      <img src="img/ui/icons/cart.svg" alt="icon" />
                    </span>
                    <span>Order delivery</span>
                  </Link>
                  {/* button end */}
                  {/* button */}
                  <Link to="/franchise" className="sb-btn sb-btn-2 sb-btn-gray">
                    <span className="sb-icon">
                      <img src="img/ui/icons/menu.svg" alt="icon" />
                    </span>
                    <span>Menu</span>
                  </Link>
                  {/* button end */}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="sb-illustration-8">
                  <img
                    src={image5}
                    alt="reserved"
                    style={{ height: '450px' }}
                    className="sb-reserved"
                  />
                  <div className="sb-cirkle-1" />
                  <div className="sb-cirkle-2" />
                  <div className="sb-cirkle-3" />
                  <div className="sb-cirkle-4" />
                  <div className="sb-cirkle-5" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* call to action end */}
        {/* footer */}
        <Footer />
        {/* menu section 1 end */}
      </div>
    </>
  );
};

export default FranchiseContent;
