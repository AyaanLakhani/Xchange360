import React, { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import "./Profile.css";

const API_BASE_URL = "http://localhost:5000";

const ProfilePage = () => {
  const { user, authenticated } = usePrivy();

  // ✂️ Strip :1 or any version suffix from user.id
  const userId = user?.id?.split(":").slice(0, 4).join(":");

  const [profileData, setProfileData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("/default-profile.png");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authenticated && userId) {
        try {
          console.log("Fetching profile for userId:", userId);
          const res = await fetch(`${API_BASE_URL}/api/users/${userId}`);
          if (!res.ok) throw new Error("Failed to fetch user data");
          const data = await res.json();
          setProfileData(data);
          setProfileImage(data.profileImage || "/default-profile.png");
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      }
    };

    fetchUserProfile();
  }, [authenticated, userId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          profileImage
        })
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updated = await response.json();
      setProfileData(updated);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!authenticated || !profileData) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-content">
        
        {/* Profile Image Card */}
        <div className="profile-image-card">
          <label htmlFor="image-upload" className="image-upload-label">
            <img src={profileImage} alt="Profile" className="profile-pic" />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          <p className="image-note">Click to change photo</p>
        </div>
  
        {/* User Info Card */}
        <div className="profile-info-card">
          <h2 className="info-title">👤 Profile</h2>
  
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
            />
          </div>
  
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
            />
          </div>
  
          <div className="form-group">
            <label>Email:</label>
            <input type="text" value={profileData.email || "N/A"} disabled />
          </div>
  
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" value={profileData.phoneNumber || "N/A"} disabled />
          </div>
  
          <div className="form-group">
            <label>Wallet:</label>
            <input type="text" value={profileData.wallet || "N/A"} disabled />
          </div>
  
          <button onClick={handleSave} className="save-button">Save Profile</button>
        </div>
      </div>
    </div>
  );
  
  
};

export default ProfilePage;
