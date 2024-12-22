import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
  });
  const [userId, setUserId] = useState("");
  const [editing, setEditing] = useState(false); // For image upload
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  

  // Fetch user ID from token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  // Fetch user details
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/uploads/user/${userId}`)
        .then((response) => {
          const user = response.data.user;
          setUserDetails({
            username: user.username,
            email: user.email,
          });
          setProfilePic(user.profilePicture || "");
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message || "Failed to fetch user details."
          );
          console.error("Error fetching user details:", error.message);
        });
    }
  }, [userId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post(
        `http://localhost:5000/uploads/upload-profile-picture/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfilePic(response.data.user.profilePicture);
      toast.success("Profile picture uploaded successfully");
      window.location.reload();
      setEditing(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to upload profile picture."
      );
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/uploads/change-password/${userId}`,
        { currentPassword, newPassword }
      );
      toast.success(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    }
  };

  const handleUpdateProfile = async () => {
    if (!userDetails.username || !userDetails.email) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/uploads/update-profile/${userId}`,
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      toast.success(response.data.message);

      // If the backend sends a new token, store it in localStorage
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      // Update user details in localStorage
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("email", response.data.user.email);

      // Optionally update user details in state if needed
      setUserDetails({
        username: response.data.user.username,
        email: response.data.user.email,
      });

      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };
  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-10 rounded-2xl">
      <div className="bg-emerald-50 shadow-2xl rounded-2xl w-full max-w-4xl p-6 lg:p-8 flex flex-col lg:flex-row">
        {/* Left Section: Profile Image */}

        <div className="lg:w-1/3 flex flex-col items-center justify-center border-b lg:border-r border-emerald-200 lg:pr-6 mb-6 lg:mb-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-emerald-700 mb-8 text-center lg:text-left">
            User Profile
          </h2>
          <div className="w-48 h-48 bg-emerald-100 rounded-full overflow-hidden mb-4 flex items-center justify-center">
            {profilePic ? (
              <img
                src={`http://localhost:5000/uploads/${profilePic}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500 text-center">
                No Image Available
              </div>
            )}
          </div>
          {editing ? (
            <>
              <input type="file" onChange={handleFileChange} />
              <button
                onClick={handleUpload}
                className="mt-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700"
              >
                Upload
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-emerald-600 text-white py-2 px-4 rounded-2xl hover:bg-emerald-700"
            >
              {profilePic ? "Edit Image" : "Upload a Profile Picture"}
            </button>
          )}
        </div>

        {/* Right Section: Form */}
        <div className="lg:w-2/3 lg:pl-6">
          {/* Username Field */}
          <div className="flex items-center mb-4">
            <label className="w-full lg:w-1/3 text-md font-medium text-emerald-800">
              Username
            </label>
            <input
              type="text"
              value={userDetails.username}
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              placeholder="Enter your username"
              className="flex-1 px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center mb-4">
            <label className="w-full lg:w-1/3 text-md font-medium text-emerald-800">
              Email
            </label>
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleUpdateProfile}
              className="bg-emerald-600 text-white py-2 px-6 rounded-2xl font-medium hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-200"
            >
              Update Profile
            </button>
          </div>

          {/* Password Change Section */}
          <h3 className="text-xl lg:text-2xl font-bold text-emerald-700 mt-10 border-t border-emerald-200 pt-6 pb-6">
            Change Password
          </h3>

          <div className="flex items-center mb-4">
            <label className="w-full lg:w-1/3 text-md font-medium text-emerald-800">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="flex-1 px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-full lg:w-1/3 text-md font-medium text-emerald-800">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="flex-1 px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleChangePassword}
              className="bg-emerald-600 text-white py-2 px-6 rounded-2xl font-medium hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
