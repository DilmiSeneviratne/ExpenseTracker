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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section: Profile Image */}
          <div className="lg:w-1/3 bg-gradient-to-b from-emerald-500 to-teal-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-8">Profile Settings</h2>
            <div className="relative group">
              <div className="w-48 h-48 mx-auto bg-white rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                {profilePic ? (
                  <img
                    src={`http://localhost:5000/uploads/${profilePic}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-600 text-lg">
                    No Image Available
                  </div>
                )}
              </div>

              {editing ? (
                <div className="mt-6 space-y-4">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-white file:text-emerald-600
                    hover:file:bg-emerald-50"
                  />
                  <button
                    onClick={handleUpload}
                    className="w-full bg-white text-emerald-600 py-2 px-4 rounded-full font-medium hover:bg-emerald-50 transition-colors duration-300"
                  >
                    Upload
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-full font-medium transition-colors duration-300"
                >
                  {profilePic ? "Change Photo" : "Upload Photo"}
                </button>
              )}
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="lg:w-2/3 p-8">
            <div className="space-y-6">
              {/* Profile Details Section */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={userDetails.username}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          username: e.target.value,
                        })
                      }
                      placeholder="Username"
                      className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                      placeholder="Email"
                      className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={handleUpdateProfile}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-300"
                  >
                    Update Profile
                  </button>
                </div>
              </div>

              {/* Password Section */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current Password"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleChangePassword}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-300"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
