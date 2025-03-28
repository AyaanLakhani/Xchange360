import React, { useState, useEffect } from "react";
import "./Profile.css";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`${API_BASE_URL}/api/users/YOUR_USER_ID`);
      const data = await response.json();
      setUser(data);
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);  // Store base64 image in state
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <label htmlFor="image-upload" className="image-upload-label">
            <img
              src={profileImage || "/default-profile.png"} 
              alt="Profile"
              className="profile-pic"
            />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className="profile-info">
          <h2>{user.email}</h2>
          <p><strong>Wallet:</strong> {user.wallet}</p>
          <p><strong>Phone:</strong> {user.phoneNumber || "N/A"}</p>
          <p><strong>Linked Accounts:</strong> {user.linkedAccounts?.platform || "None"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
