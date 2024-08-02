import React, { useContext, useState } from 'react';
import { authContext } from './AuthContext';
import { useEffect } from 'react';
import './PartnersDash.css';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import uploadCloundinary from './uploadCloundinary';

const PartnersDash = () => {
  const { user, role, token } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [editMenu, setEditMenu] = useState(null); // New state for editing menu

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://inflightcatering-system.onrender.com/api/vendors/menus/vendor/${user._id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setMenus(result);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const [formData, setFormData] = useState({
    vendorId: user._id,
    name: '',
    description: '',
    price: '',
    category: '',
    photo: '',
  });

  const [formDataa, setFormDataa] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    photo: '',
  });

  const handleFileInputChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const data = await uploadCloundinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
    setLoading(false);
  };

  const handleFileInputChangee = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const data = await uploadCloundinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormDataa({ ...formDataa, photo: data.url });
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputChangee = (e) => {
    setFormDataa({ ...formDataa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://inflightcatering-system.onrender.com/api/vendors/menus`,
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
      fetchMenus(); // Refetch menus after adding a new one
      setLoading(false);
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleUpdate = async (menuId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://inflightcatering-system.onrender.com/api/vendors/menus/${menuId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataa),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      fetchMenus(); // Refetch menus after updating
      setLoading(false);
      toast.success(result.message);
      setEditMenu(null); // Reset edit state
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (menuId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://inflightcatering-system.onrender.com/api/vendors/menus/${menuId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      fetchMenus(); // Refetch menus after deleting
      setLoading(false);
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleEditMenuClick = (menu) => {
    setEditMenu(menu);
    setFormDataa({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      category: menu.category,
      photo: menu.photo,
    });
  };

  return (
    <>
      <center>
        <h2 style={{ marginTop: '150px' }}>Partner's Dashboard</h2>
      </center>
      <center>
        <br />
        <div style={{ width: '200px', borderColor: 'black' }}>
          <h3>Add Item</h3>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div className="sb-group-input" style={{ width: '200px' }}>
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
                type="text"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                required
              />
              <span className="sb-bar" />
              <label>Description</label>
            </div>
            <div className="sb-group-input">
              <input
                type="text"
                value={formData.price}
                onChange={handleInputChange}
                name="price"
                required
              />
              <span className="sb-bar" />
              <label>Price</label>
            </div>
            <div className="sb-group-input">
              <input
                type="text"
                value={formData.category}
                onChange={handleInputChange}
                name="category"
                required
              />
              <span className="sb-bar" />
              <label>Category</label>
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
              <label>Photo</label>
            </div>
            <button className="sb-btn">
              <span className="sb-icon">
                <img src="img/ui/icons/arrow.svg" alt="icon" />
              </span>
              <span>
                {loading ? (
                  <HashLoader size={25} color="#ffffff" />
                ) : (
                  'Add Item'
                )}
              </span>
            </button>
          </form>
        </div>
      </center>
      <div>
        <h3>Listed Items</h3>
        <div className="product-grid">
          {menus.length === 0 && !loading ? (
            <p>No menus available</p>
          ) : (
            menus.map((menu) => (
              <div key={menu._id} className="product-card">
                <img
                  src={menu.photo}
                  alt={menu.name}
                  className="product-image"
                />
                <h2 className="product-name">{menu.name}</h2>
                <p className="product-price">₹{menu.price}</p>
                <p className="product-description">{menu.description}</p>
                <button onClick={() => handleEditMenuClick(menu)}>Edit</button>
                <button onClick={() => handleDelete(menu._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
      {editMenu && (
        <center>
          <div style={{ width: '200px', borderColor: 'black' }}>
            <h3>Edit Item</h3>
            <br />
            <br />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editMenu._id);
              }}
            >
              <div className="sb-group-input" style={{ width: '200px' }}>
                <input
                  type="text"
                  value={formDataa.name}
                  onChange={handleInputChangee}
                  name="name"
                />
                <span className="sb-bar" />
                <label>Name</label>
              </div>
              <div className="sb-group-input">
                <input
                  type="text"
                  value={formDataa.description}
                  onChange={handleInputChangee}
                  name="description"
                />
                <span className="sb-bar" />
                <label>Description</label>
              </div>
              <div className="sb-group-input">
                <input
                  type="text"
                  value={formDataa.price}
                  onChange={handleInputChangee}
                  name="price"
                />
                <span className="sb-bar" />
                <label>Price</label>
              </div>
              <div className="sb-group-input">
                <input
                  type="text"
                  value={formDataa.category}
                  onChange={handleInputChangee}
                  name="category"
                />
                <span className="sb-bar" />
                <label>Category</label>
              </div>
              <div className="sb-group-input">
                <input
                  type="file"
                  onChange={handleFileInputChangee}
                  accept=".jpg, .png"
                  name="photo"
                />
                <span className="sb-bar" />
                <label>Photo</label>
              </div>
              <button className="sb-btn">
                <span className="sb-icon">
                  <img src="img/ui/icons/arrow.svg" alt="icon" />
                </span>
                <span>
                  {loading ? (
                    <HashLoader size={25} color="#ffffff" />
                  ) : (
                    'Update Item'
                  )}
                </span>
              </button>
            </form>
          </div>
        </center>
      )}
    </>
  );
};

export default PartnersDash;
