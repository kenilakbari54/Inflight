import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import uploadCloundinary from './uploadCloundinary';
import Footer from './Footer';
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    role: 'User',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadCloundinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
    // console.log(data);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://inflightcatering-system.onrender.com/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      setLoading(false);
      toast.success(message);
      navigate('/Login');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {' '}
      <div id="sb-dynamic-content" className="sb-transition-fade">
        {/* banner */}
        <section className="sb-banner sb-banner-color">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                {/* main title */}
                <div
                  className="sb-main-title-frame"
                  style={{ marginTop: '-200px' }}
                >
                  <div className="sb-main-title">
                    <span className="sb-suptitle sb-mb-30">Register</span>
                    <h1 className="sb-mb-30">
                      Get in <span>Touch with AeroEats</span>
                    </h1>

                    <ul className="sb-breadcrumbs">
                      <li>
                        <a href="home-1.html">Home</a>
                      </li>
                      <li>
                        <a href="menu-1.html">Register</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* main title end */}
              </div>
              <div className="col-lg-5">
                <div className="sb-contact-form-frame">
                  <div className="sb-form-content">
                    <div className="sb-main-content">
                      <h3 className="sb-mb-30">Register</h3>
                      <form onSubmit={submitHandler}>
                        <div className="sb-group-input">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            name="name"
                            required
                          />
                          <span className="sb-bar" />
                          <label>Name</label>
                        </div>

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
                        <div className="sb-group-input">
                          <input
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            name="city"
                            required
                          />
                          <span className="sb-bar" />
                          <label>City</label>
                        </div>
                        <div className="sb-group-input">
                          <input
                            type="file"
                            onChange={handleFileInputChange}
                            accept=".jpg, .png"
                            name="photo"
                            required
                          />
                          <span className="sb-bar" />
                          <label style={{ marginTop: '10px' }}>
                            Profile Photo
                          </label>
                        </div>
                        <p className="sb-text sb-text-xs sb-mb-30">
                          *We promise not to disclose your <br />
                          personal information to third parties.
                        </p>
                        {/* button */}
                        <div className="mt-7">
                          <button className="sb-btn">
                            <span className="sb-icon">
                              <img src="img/ui/icons/arrow.svg" alt="icon" />
                            </span>
                            <span>
                              {' '}
                              {loading ? (
                                <HashLoader size={25} color="#ffffff" />
                              ) : (
                                'Register'
                              )}
                            </span>
                          </button>
                        </div>
                        {/* button end */}
                      </form>
                    </div>
                    <Link to="/Login" style={{ color: 'blue' }}>
                      Already Customer ? Login Now
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
        <Footer />
        {/* footer end */}
      </div>
    </>
  );
};

export default Register;
