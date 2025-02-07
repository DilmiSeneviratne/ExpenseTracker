import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialImage from "../Assests/testimonial.png";

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/testimonials/add",
        formData
      );
      toast.success("Review Added Successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(
              error.response?.data?.message
            );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Left Side - Image with Overlay */}
          <div className="w-full lg:w-1/2 h-full relative group">
            <div className="relative h-[300px] lg:h-[600px] overflow-hidden">
              <div className="absolute inset-0 bg-emerald-600/20 group-hover:bg-emerald-600/10 transition-all duration-300"></div>
              <img
                src={TestimonialImage}
                alt="Testimonial Illustration"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h1 className="text-2xl font-bold text-emerald-800">
                Share Your Story
              </h1>
              <p className="text-emerald-600 mt-2">We value your feedback</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Submit a Testimonial
                </h2>
                <p className="text-gray-600">Your experience matters to us</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Share your experience with us..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-xl font-medium 
                         hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                         transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit Testimonial
                </button>
              </form>

              {/* Optional: Add a decorative element at the bottom */}
              <div className="mt-8 text-center text-sm text-gray-500">
                Thank you for taking the time to share your experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;
