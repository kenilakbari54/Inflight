import React from 'react';

const Footer = () => {
  return (
    <>
      {' '}
      <footer>
        <div className="container">
          <div className="sb-footer-frame">
            <a href="home-1.html" className="sb-logo-frame">
              {/* logo img */}
              <h2>Aimers</h2>
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
              © late 2024 Aimers. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
