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
              error.response?.data?.message || "Something went wrong, please try again."
            );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center bg-white dark:bg-gray-900 pl-5 pr-5 pt-1 pb-1">
  {/* Left Side - Image */}
  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
    <img
      src={TestimonialImage} // Replace with your image URL
      alt="Testimonial Illustration"
      className="w-full max-w-md h-auto lg:h-[30rem] object-cover rounded-lg"
    />
  </div>

  {/* Right Side - Form */}
  <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
    <div className="p-6 bg-emerald-50 shadow-2xl rounded-2xl dark:bg-gray-800 max-w-md w-full">
      <div className="flex items-center justify-center">
        <h2 className="text-xl font-semibold text-emerald-700 dark:text-white mb-4">
          Submit a Testimonial
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-emerald-700 dark:text-emerald-300 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-emerald-700 dark:text-emerald-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-emerald-700 dark:text-emerald-300 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-200"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</div>
  );
};

export default TestimonialForm;
