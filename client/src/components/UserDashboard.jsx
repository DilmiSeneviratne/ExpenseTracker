import React, { useState ,useEffect} from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const UserDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
  });
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  // Function to handle login
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      // If successful

      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      toast.success("Logged out successfully!"); // Show success toaster
      // Redirect to the home page
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout Unsuccessful."); // Show error toaster
    }
  };

  // Get user ID from JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }

    // Set username directly from localStorage to avoid delay
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
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

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 text-white bg-emerald-300 rounded-lg sm:hidden"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-emerald-500 dark:bg-emerald-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-emerald-500 dark:bg-emerald-800">
          {/* Header Section for Welcome Message */}
          <div className="flex flex-wrap justify-between items-center p-4 bg-emerald-500 text-black dark:bg-gray-800 mb-6">
            <div className="flex items-center gap-x-4 w-full sm:w-auto">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-semibold text-white capitalize truncate dark:text-white">
                  {username}
                </h1>
                <p className="text-sm text-white truncate dark:text-gray-400">
                  {userDetails.email}
                </p>
              </div>
              <img
                className="object-cover w-16 h-16 rounded-full"
                src={
                  profilePic
                    ? `http://localhost:5000/uploads/${profilePic}`
                    : "http://localhost:5000/uploads/default-avatar.png"
                }
                alt="User profile"
              />
            </div>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg text-white mt-8 ${
                    isActive ? "bg-emerald-600" : ""
                  }`
                }
              >
                <svg
                  className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="income"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg text-white ${
                    isActive ? "bg-emerald-600" : ""
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Income</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="expense"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg text-white ${
                    isActive ? "bg-emerald-600" : ""
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                  <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                  <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                  <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Expense</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg text-white ${
                    isActive ? "bg-emerald-600" : ""
                  }`
                }
              >
                <svg
                  className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="testimonialform"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg text-white  ${
                    isActive ? "bg-emerald-600" : ""
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>

                <span className="ms-3">Add a Review</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />{" "}
      {/* Add ToastContainer */}
    </>
  );
};

export default UserDashboard;
