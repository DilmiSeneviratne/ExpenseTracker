import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Profile = ({ user = {} }) => {
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState(user?.profilePicture || "");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Ensure token contains valid data
        setUserId(decodedToken.id);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post(
        `http://localhost:5000/upload-profile-picture/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfilePic(response.data.user.profilePicture);
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload profile picture.");
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex justify-center items-center p-10 rounded-xl">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl p-8 flex">
        {/* Left Section: Profile Image */}
        <div className="w-1/3 flex flex-col items-center justify-center border-r border-emerald-200 pr-6">
          <div className="w-32 h-32 bg-emerald-100 rounded-full overflow-hidden mb-4">
            {/* Profile Image Placeholder */}
            {profilePic ? (
              <img
                src={`http://localhost:5000/${profilePic}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <p>No profile picture uploaded.</p>
            )}
          </div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Profile Picture</button>
        </div>

        {/* Right Section: Form */}
        <div className="w-2/3 pl-6">
          <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
            User Profile
          </h2>

          {/* Username Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 text-md font-medium text-emerald-800">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="flex-1 px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 text-md font-medium text-emerald-800">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center mb-4">
            <label className="w-1/3 text-md font-medium text-emerald-800">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="flex-1 px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="flex items-center mb-6">
            <label className="w-1/3 text-md font-medium text-emerald-800">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="flex-1 px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            />
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <button className="bg-emerald-600 text-white py-2 px-6 rounded-2xl font-medium hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
