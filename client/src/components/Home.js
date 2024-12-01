import React, { useState } from "react";
import Navbar from "./Navbar";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import BannerImage from "../Assests/home-banner-image.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to open the login modal
  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  // Function to close the modals
  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  // Function to open the sign-up modal
  const handleSignUpModalOpen = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // If successful
      const { token } = response.data;
      localStorage.setItem("authToken", token); // Store token in localStorage
      toast.success("Logged in successfully!"); // Show success toaster
      setEmail("");
      setPassword("");
      handleModalClose();
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid login credentials."
      ); // Show error toaster
    }
  };

  //Function for handle register
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: name,
          email: email,
          password: password,
        }
      );

      // If successful
      toast.success(response.data.message); // Show success toaster
      setName("");
      setEmail("");
      setPassword("");
      handleModalClose(); // Close modal after success
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      ); // Show error toaster
    }
  };

  return (
    <>
      <div className="home-container">
        <Navbar handleLoginModalOpen={handleLoginModalOpen} />
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-gray-700">
                Track today and thrive for tommorrow
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Financial freedom begins with knowing where your money goes. An
                expense tracker helps you take control, turning every purchase
                into a conscious decision and every saving into a step toward a
                secure future. Track today to build a better tomorrow.
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src={BannerImage} alt="mockup" />
            </div>
          </div>
        </section>
        <Features />
        <Testimonials />
        {/*      Main modal */}
        {isLoginModalOpen && (
          <div
            id="authentication-modal"
            tabindex="-1"
            aria-hidden="true"
            className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/*      modal content*/}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/*      modal header*/}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/*      modal body*/}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" action="#" onSubmit={handleLogin}>
                    <div>
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700"
                    >
                      Login to your account
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?{" "}
                      <a
                        href="#"
                        onClick={handleSignUpModalOpen}
                        className="text-emerald-600 hover:underline dark:text-emerald-500"
                      >
                        Create account
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Sign-Up Modal */}
        {isSignUpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md">
              <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Create your account
                  </h3>
                  <button
                    onClick={handleModalClose}
                    className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <form className="space-y-4" onSubmit={handleRegister}>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                    <button
                      type="submit"
                      class="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700"
                    >
                      Create Account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
      
    </>
  );
};

export default Home;
