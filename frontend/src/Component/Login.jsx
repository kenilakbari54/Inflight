import React, { useContext, useState } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import ContactContent from './ContactContent';
import { toast } from 'react-toastify';
import { authContext } from './AuthContext';
import HashLoader from 'react-spinners/HashLoader';
import Footer from './Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { dispatch } = useContext(authContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://inflightcatering-system.onrender.com/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });
      console.log(result);
      setLoading(false);
      toast.success(result.message);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

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
                    <span className="sb-suptitle sb-mb-30">User Login</span>
                    <h1 className="sb-mb-30">Get in Touch with AeroEats</h1>

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
                  <div className="sb-illustration-9"></div>
                  <div className="sb-form-content">
                    <div className="sb-main-content">
                      <h3 className="sb-mb-30">Login</h3>
                      <form onSubmit={submitHandler}>
                        <div className="sb-group-input">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            name="email"
                            required
                          />
                          <span className="sb-bar" />
                          <label>Email</label>
                        </div>
                        <div className="sb-group-input">
                          <input
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            name="password"
                            required
                          />
                          <span className="sb-bar" />
                          <label>Password</label>
                        </div>

                        <p className="sb-text sb-text-xs sb-mb-30">
                          *We promise not to disclose your <br />
                          personal information to third parties.
                        </p>
                        {/* button */}
                        <button className="sb-btn">
                          <span className="sb-icon">
                            <img src="img/ui/icons/arrow.svg" alt="icon" />
                          </span>
                          <span>
                            {' '}
                            {loading ? (
                              <HashLoader size={25} color="#ffffff" />
                            ) : (
                              'Login'
                            )}
                          </span>
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
                    <p className="sb-text">1510 India</p>
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
                    <p className="sb-text">Aeroeats@mail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact info end */}
        {/* map */}

        {/* map end */}
        {/* footer */}
        <Footer />
        {/* footer end */}
      </div>
    </>
  );
};

export default Login;
