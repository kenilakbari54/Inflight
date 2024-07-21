import React from 'react';
import { Link } from 'react-router-dom';

const ContactContent = () => {
  return (
    <>
      <div id="sb-dynamic-content" className="sb-transition-fade">
        {/* banner */}
        <section className="sb-banner sb-banner-color">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                {/* main title */}
                <div className="sb-main-title-frame">
                  <div className="sb-main-title">
                    <span className="sb-suptitle sb-mb-30">Login</span>
                    <h1 className="sb-mb-30">
                      Get in <span>Touch with Aimers</span>
                    </h1>

                    <ul className="sb-breadcrumbs">
                      <li>
                        <a href="home-1.html">Home</a>
                      </li>
                      <li>
                        <a href="menu-1.html">Login</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* main title end */}
              </div>
              <div className="col-lg-5">
                <div className="sb-contact-form-frame">
                  <div className="sb-illustration-9">
                    <img
                      src="img/illustrations/envelope-1.png"
                      alt="envelope"
                      className="sb-envelope-1"
                    />
                    <img
                      src="img/illustrations/envelope-2.png"
                      alt="envelope"
                      className="sb-envelope-2"
                    />
                    <div className="sb-cirkle-1" />
                    <div className="sb-cirkle-2" />
                    <div className="sb-cirkle-3" />
                  </div>
                  <div className="sb-form-content">
                    <div className="sb-main-content">
                      <h3 className="sb-mb-30">Login</h3>
                      <form id="form">
                        <div className="sb-group-input">
                          <input type="email" name="email" required />
                          <span className="sb-bar" />
                          <label>Email</label>
                        </div>
                        <div className="sb-group-input">
                          <input type="password" name="name" required />
                          <span className="sb-bar" />
                          <label>Password</label>
                        </div>

                        <p className="sb-text sb-text-xs sb-mb-30">
                          *We promise not to disclose your <br />
                          personal information to third parties.
                        </p>
                        {/* button */}
                        <button className="sb-btn sb-cf-submit sb-show-success">
                          <span className="sb-icon">
                            <img src="img/ui/icons/arrow.svg" alt="icon" />
                          </span>
                          <span>Login</span>
                        </button>
                        {/* button end */}
                      </form>
                    </div>
                    <Link to="/register" style={{ color: 'blue' }}>
                      New Customer ? Register Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner end */}
        {/* contact info */}
        <section className="sb-p-90-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="sb-features-item sb-mb-60">
                  <div className="sb-number">01</div>
                  <div className="sb-feature-text">
                    <h3 className="sb-mb-15">Welcome</h3>
                    <p className="sb-text">Montréal, 1510 Rue Sauvé</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="sb-features-item sb-mb-60">
                  <div className="sb-number">02</div>
                  <div className="sb-feature-text">
                    <h3 className="sb-mb-15">Call</h3>
                    <p className="sb-text">+02 (044) 756-X6-52</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="sb-features-item sb-mb-60">
                  <div className="sb-number">03</div>
                  <div className="sb-feature-text">
                    <h3 className="sb-mb-15">Write</h3>
                    <p className="sb-text">starbelly@mail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact info end */}
        {/* map */}
        <div className="sb-map-frame">
          <div id="map" className="sb-map" />
          <div className="sb-lock">
            <i className="fas fa-lock" />
          </div>
        </div>
        {/* map end */}
        {/* footer */}
        <footer>
          <div className="container">
            <div className="sb-footer-frame">
              <a href="home-1.html" className="sb-logo-frame">
                {/* logo img */}
                <img src="img/ui/logo.svg" alt="Starbelly" />
              </a>
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
              <div className="sb-copy">
                © late 2021 Starbelly. All Rights Reserved.
              </div>
            </div>
          </div>
        </footer>
        {/* footer end */}
      </div>
    </>
  );
};

export default ContactContent;
