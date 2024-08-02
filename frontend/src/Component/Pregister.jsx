import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import uploadCloundinary from './uploadCloundinary';
import Footer from './Footer';
const Pregister = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [previewURL, setPreviewURL] = useState('');
  const [previewURLs, setPreviewURLs] = useState('');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: '',
    name: '',
    email: '',
    password: '',
    acity: '',
    oaddress: '',
    ophoto: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];

    const data = await uploadCloundinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, ophoto: data.url });
    console.log(data);
    setLoading(false);
  };

  const submitHandler = async (event) => {
    console.log(formData);
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://inflightcatering-system.onrender.com/api/vendors/register`,
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
      navigate('/Plogin');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
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
                  style={{ marginTop: '-250px' }}
                >
                  <div className="sb-main-title">
                    <span className="sb-suptitle sb-mb-30">
                      Partner's Register
                    </span>
                    <h1 className="sb-mb-30">
                      Becomer A Partner with AeroEats
                    </h1>

                    <ul className="sb-breadcrumbs">
                      <li>
                        <a href="home-1.html">Home</a>
                      </li>
                      <li>
                        <a href="menu-1.html">Partner's Register</a>
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
                      <h3 className="sb-mb-30">Partner's Register</h3>
                      <form onSubmit={submitHandler}>
                        <div className="sb-group-input">
                          <input
                            type="text"
                            value={formData.fname}
                            onChange={handleInputChange}
                            name="fname"
                            required
                          />
                          <span className="sb-bar" />
                          <label>Franchise Name</label>
                        </div>
                        <div className="sb-group-input">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            name="name"
                            required
                          />
                          <span className="sb-bar" />
                          <label>Owner Name</label>
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
                          <label>Frnachise Email</label>
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
                            value={formData.acity}
                            onChange={handleInputChange}
                            name="acity"
                            required
                          />
                          <span className="sb-bar" />
                          <label>Airport City / Name</label>
                        </div>
                        <div className="sb-group-input">
                          <input
                            type="text"
                            value={formData.oaddress}
                            onChange={handleInputChange}
                            name="oaddress"
                            required
                          />
                          <span className="sb-bar" />
                          <label>Complete Outlet Address</label>
                        </div>
                        <div className="sb-group-input">
                          <input
                            type="file"
                            onChange={handleFileInputChange}
                            accept=".jpg, .png"
                            name="ophoto"
                            required
                          />
                          <span className="sb-bar" />
                          <label style={{ marginTop: '10px' }}>
                            Outlet Photo
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
                    <Link to="/Plogin" style={{ color: 'blue' }}>
                      Already Partner ? Login Now
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

export default Pregister;
