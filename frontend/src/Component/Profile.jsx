import React, { useContext, useEffect, useState } from 'react';
import { authContext } from './AuthContext';
import axios from 'axios';
import './profile.css';
const Profile = () => {
  const { user } = useContext(authContext);
  console.log(user);
  const [userr, setUserr] = useState(null);
  const userId = user._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://inflightcatering-system.onrender.com/api/auth/user/${userId}`
        );
        setUserr(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userr) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container" style={{ marginTop: '160px' }}>
      <div className="profile-header">
        <img src={user.photo} alt={user.name} className="profile-photo" />
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-role">{user.role}</p>
      </div>
      <div className="profile-details">
        <h2>Contact Information</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.phone && (
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        )}
        <p>
          <strong>City:</strong> {user.city}
        </p>
      </div>
    </div>
  );
};
export default Profile;
