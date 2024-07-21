import React, { useCallback, useContext, useEffect, useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { authContext } from './AuthContext';
import image2 from '../pic/burger.png';
import image1 from '../pic/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101-removebg-preview.png';
import image3 from '../pic/punjabi-thali-removebg-preview.png';
import image4 from '../pic/about.jpg';
import image5 from '../pic/del.png';
import './slider.css';
import axios from 'axios';
import Footer from './Footer';
const Home = () => {
  const { user, role } = useContext(authContext);
  const [menus, setMenus] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerSlide = 4;

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/vendors/menus/all'
        );
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(menus.length / itemsPerSlide) - 1
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(menus.length / itemsPerSlide) - 1
        ? 0
        : prevIndex + 1
    );
  };

  return (
    <>
      <div>
        <div id="sb-dynamic-content" className="sb-transition-fade">
          {/* banner */}
          <section className="sb-banner">
            <div className="sb-bg-1">
              <div />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  {/* main title */}
                  <div className="sb-main-title-frame">
                    <div className="sb-main-title">
                      <span className="sb-suptitle sb-mb-30">
                        <h3>
                          {' '}
                          Hello,
                          <h2 style={{ color: 'blue' }}>
                            {user ? `${user.name}` : 'User'}
                          </h2>
                        </h3>
                      </span>
                      <h1 className="sb-mb-30">
                        We do not <span>cook</span>, we create your <br />
                        emotions!
                      </h1>

                      {/* button */}
                      <Link to="franchise" className="sb-btn">
                        <span className="sb-icon">
                          <img src="img/ui/icons/menu.svg" alt="icon" />
                        </span>
                        <span>Our menu</span>
                      </Link>
                      {/* button end */}
                      {/* button */}
                      <Link to="about" className="sb-btn sb-btn-2 sb-btn-gray">
                        <span className="sb-icon">
                          <img src="img/ui/icons/arrow.svg" alt="icon" />
                        </span>
                        <span>About us</span>
                      </Link>
                      {/* button end */}
                    </div>
                  </div>
                  {/* main title end */}
                </div>
                <div className="col-lg-6">
                  <div className="sb-ilustration-fix">
                    <div className="sb-illustration-1-2">
                      <img src={image1} alt="food" className="sb-food-1" />
                      <img src={image2} alt="food" className="sb-food-2" />
                      <img src={image3} alt="food" className="sb-food-3" />
                      <div className="sb-illu-dialog-1">
                        <span>😋</span> Om-nom-nom...
                      </div>
                      <div className="sb-illu-dialog-2">
                        <span>🥰</span> Sooooo delicious!
                      </div>
                      <div className="sb-cirkle-1" />
                      <div className="sb-cirkle-2" />
                      <div className="sb-cirkle-3" />
                      <div className="sb-cirkle-4" />
                      <div className="sb-cirkle-5" />
                      <img
                        src="img/illustrations/3.svg"
                        alt="phones"
                        className="sb-pik-1"
                      />
                      <img
                        src="img/illustrations/1.svg"
                        alt="phones"
                        className="sb-pik-2"
                      />
                      <img
                        src="img/illustrations/2.svg"
                        alt="phones"
                        className="sb-pik-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* banner end */}
          {/* About text */}
          <section className="sb-about-text sb-p-90-0">
            <div className="sb-bg-1" style={{ marginTop: 90 }}>
              <div />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="sb-illustration-2 sb-mb-90">
                    <div className="sb-interior-frame">
                      <img
                        src={image4}
                        alt="interior"
                        className="sb-interior"
                        style={{ objectPosition: 'center', height: '500px' }}
                      />
                    </div>
                    <div className="sb-square" />
                    <div className="sb-cirkle-1" />
                    <div className="sb-cirkle-2" />
                    <div className="sb-cirkle-3" />
                    <div className="sb-cirkle-4" />
                    <div className="sb-experience">
                      <div className="sb-exp-content">
                        <p className="sb-h1 sb-mb-10">1</p>
                        <p className="sb-h3">Years Experiense</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 align-self-center sb-mb-60">
                  <h2 className="sb-mb-60">
                    We are doing more than <br />
                    you expect
                  </h2>
                  <p className="sb-text sb-mb-30">
                    Welcome to <b>Aimers</b>, where exceptional service and
                    unparalleled quality come together to elevate your inflight
                    dining experience. As the leading provider of inflight
                    catering services, we pride ourselves on delivering the
                    finest culinary delights to travelers around the world. Our
                    commitment to excellence begins with our meticulously
                    crafted menus, featuring a diverse range of gourmet meals
                    that cater to every taste and dietary preference. Our team
                    of experienced chefs uses only the freshest and highest
                    quality ingredients, ensuring that each dish is a
                    masterpiece of flavor and presentation.
                  </p>
                  <p className="sb-text sb-mb-60">
                    At <b>Aimers</b>, we understand the importance of
                    punctuality and reliability in the aviation industry. Our
                    state-of-the-art kitchens and logistics systems are designed
                    to meet the unique demands of inflight catering, ensuring
                    that every meal is delivered on time and in perfect
                    condition. Customer satisfaction is at the heart of
                    everything we do. Our dedicated support team is always ready
                    to assist with any special requests or last-minute changes,
                    making sure that your needs are met with the utmost
                    professionalism and care.
                  </p>
                  Aimers
                </div>
              </div>
            </div>
          </section>
          {/* About text end */}
          {/* features */}
          <section className="sb-features sb-p-0-30">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="sb-features-item sb-mb-60">
                    <div className="sb-number">01</div>
                    <div className="sb-feature-text">
                      <h3 className="sb-mb-15">
                        We are located in the city center
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sb-features-item sb-mb-60">
                    <div className="sb-number">02</div>
                    <div className="sb-feature-text">
                      <h3 className="sb-mb-15">
                        Fresh ingredients from organic farms
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sb-features-item sb-mb-60">
                    <div className="sb-number">03</div>
                    <div className="sb-feature-text">
                      <h3 className="sb-mb-15">
                        Own fast delivery. 30 min Maximum
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sb-features-item sb-mb-60">
                    <div className="sb-number">04</div>
                    <div className="sb-feature-text">
                      <h3 className="sb-mb-15">
                        Professional, experienced chefs
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sb-features-item sb-mb-60">
                    <div className="sb-number">05</div>
                    <div className="sb-feature-text">
                      <h3 className="sb-mb-15">
                        The highest standards of service
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* features end */}
          {/* short menu */}
          <section className="sb-short-menu sb-p-0-90">
            <div className="sb-bg-2">
              <div />
            </div>
            <div className="container">
              <div className="sb-group-title sb-mb-30">
                <div className="sb-left sb-mb-30">
                  <h2 className="sb-mb-30">
                    Most <span>popular</span> dishes
                  </h2>
                </div>
                <div className="sb-right sb-mb-30">
                  {/* slider navigation */}
                  <div className="sb-slider-nav">
                    <div
                      className="sb-prev-btn sb-short-menu-prev"
                      onClick={handlePrev}
                    >
                      <i className="fas fa-arrow-left" />
                    </div>
                    <div
                      className="sb-next-btn sb-short-menu-next"
                      onClick={handleNext}
                    >
                      <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                  {/* slider navigation end */}
                  {/* button */}
                  <Link to="/franchise" className="sb-btn">
                    <span className="sb-icon">
                      <img src="img/ui/icons/menu.svg" alt="icon" />
                    </span>
                    <span>Full menu</span>
                  </Link>
                  {/* button end */}
                </div>
              </div>
              <div className="slider-container">
                <div className="slider">
                  {menus.length > 0 && (
                    <div
                      className="slider-content"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {menus.map((menu) => (
                        <div key={menu._id} className="menu-item">
                          <img src={menu.photo} alt={menu.name} />
                          <h3>{menu.name}</h3>
                          <p>{menu.description}</p>
                          <p>₹{menu.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* short menu end */}
          {/* revievs */}
          <section className="sb-reviews sb-p-0-90">
            <div className="container">
              <div className="sb-group-title sb-mb-30">
                <div className="sb-left sb-mb-30">
                  <h2 className="sb-mb-30">
                    Reviews <span>about</span> us
                  </h2>
                  <p className="sb-text">
                    Consectetur numquam poro nemo veniam
                    <br />
                    eligendi rem adipisci quo modi.
                  </p>
                </div>
                <div className="sb-right sb-mb-30">
                  {/* slider navigation */}
                  <div className="sb-slider-nav">
                    <div className="sb-prev-btn sb-reviews-prev">
                      <i className="fas fa-arrow-left" />
                    </div>
                    <div className="sb-next-btn sb-reviews-next">
                      <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                  {/* slider navigation end */}
                  {/* button */}
                  <a href="reviews.html" className="sb-btn">
                    <span className="sb-icon">
                      <img src="img/ui/icons/dialog.svg" alt="icon" />
                    </span>
                    <span>All revievs</span>
                  </a>
                  {/* button end */}
                </div>
              </div>
              <div className="swiper-container sb-reviews-slider">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="sb-review-card">
                      <div className="sb-review-header sb-mb-15">
                        <h4 className="sb-mb-15">Very tasty</h4>
                        <ul className="sb-stars">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                      <p className="sb-text sb-mb-15">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quis fugiat totam nobis quas unde excepturi
                        inventore possimus laudantium provident, rem eligendi
                        velit. Aut molestias, ipsa itaque laborum, natus
                        tempora, ut soluta animi ducimus dignissimos deserunt
                        doloribus in reprehenderit rem accusamus! Quibusdam
                        labore, aliquam dolor harum!
                      </p>
                      <div className="sb-author-frame">
                        <div className="sb-avatar-frame">
                          <img src="img/faces/1.jpg" alt="Guest" />
                        </div>
                        <h4>Emma Newman</h4>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="sb-review-card">
                      <div className="sb-review-header sb-mb-15">
                        <h4 className="sb-mb-15">
                          I have lunch here every day
                        </h4>
                        <ul className="sb-stars">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                      <p className="sb-text sb-mb-15">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quis fugiat totam nobis quas unde excepturi
                        inventore possimus laudantium provident, rem eligendi
                        velit. Aut molestias, ipsa itaque laborum, natus
                        tempora, ut soluta animi ducimus dignissimos deserunt
                        doloribus in reprehenderit rem accusamus! Quibusdam
                        labore, aliquam dolor harum!
                      </p>
                      <div className="sb-author-frame">
                        <div className="sb-avatar-frame">
                          <img src="img/faces/2.jpg" alt="Guest" />
                        </div>
                        <h4>Paul Trueman</h4>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="sb-review-card">
                      <div className="sb-review-header sb-mb-15">
                        <h4 className="sb-mb-15">Great service</h4>
                        <ul className="sb-stars">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li className="sb-empty">
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                      <p className="sb-text sb-mb-15">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quis fugiat totam nobis quas unde excepturi
                        inventore possimus laudantium provident, rem eligendi
                        velit. Aut molestias, ipsa itaque laborum, natus
                        tempora, ut soluta animi ducimus dignissimos deserunt
                        doloribus in reprehenderit rem accusamus! Quibusdam
                        labore, aliquam dolor harum!
                      </p>
                      <div className="sb-author-frame">
                        <div className="sb-avatar-frame">
                          <img src="img/faces/3.jpg" alt="Guest" />
                        </div>
                        <h4>Viktoria Freeman</h4>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="sb-review-card">
                      <div className="sb-review-header sb-mb-15">
                        <h4 className="sb-mb-15">Starbelly is amazing!</h4>
                        <ul className="sb-stars">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                      <p className="sb-text sb-mb-15">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quis fugiat totam nobis quas unde excepturi
                        inventore possimus laudantium provident, rem eligendi
                        velit. Aut molestias, ipsa itaque laborum, natus
                        tempora, ut soluta animi ducimus dignissimos deserunt
                        doloribus in reprehenderit rem accusamus! Quibusdam
                        labore, aliquam dolor harum!
                      </p>
                      <div className="sb-author-frame">
                        <div className="sb-avatar-frame">
                          <img src="img/faces/4.jpg" alt="Guest" />
                        </div>
                        <h4>Audrey Oldman</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* revievs end */}
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
                    <Link
                      to="/franchise"
                      className="sb-btn sb-btn-2 sb-btn-gray"
                    >
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
          {/* footer end */}
        </div>
        {/* dynamic content end */}
        {/* discount popup */}
      </div>
    </>
  );
};

export default Home;
