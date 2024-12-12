import React from "react";

const Profile = () => {
  return (
    <>
      <div class="p-4 ">
       <div className="min-h-screen bg-emerald-50 flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-emerald-700 text-center mb-6">
          User Profile
        </h2>

        {/* Username Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-emerald-800 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
          />
        </div>

        {/* Email Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-emerald-800 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
          />
        </div>

        {/* Password Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-emerald-800 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
          />
        </div>

        {/* Confirm Password Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-emerald-800 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
          />
        </div>

        {/* Save Changes Button */}
        <button
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-200"
        >
          Save Changes
        </button>
      </div>
    </div>
      </div>
      
    </>
  );
};

export default Profile;
