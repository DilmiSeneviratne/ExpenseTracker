import React, { useState, useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { jwtDecode } from "jwt-decode";

const Income = () => {
  // State for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [incomes, setIncomes] = useState([]); // State to store fetched incomes
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [monthName, setMonthName] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    description: "",
  });

  // Get user ID from JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Replace "token" with your token's key name in localStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Assuming the user ID is stored in the "id" field
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  // Fetch incomes from the backend
  useEffect(() => {
    if (userId) {
      const fetchIncomes = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/income/all/${userId}`
          );
          setIncomes(response.data); // Update incomes state with fetched data

          // Automatically calculate income for the current month
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
          const currentYear = currentDate.getFullYear();

          // Set month name
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          setMonthName(monthNames[currentDate.getMonth()]);

          setCurrentMonthIncome(
            calculateMonthlyIncome(currentMonth, currentYear, response.data)
          );
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Failed to fetch incomes."
          );
          console.error(err);
        }
      };

      fetchIncomes();
    }
  }, [userId]);

  const calculateMonthlyIncome = (month, year, incomeData) => {
    return incomeData
      .filter((income) => {
        const incomeDate = new Date(income.date);
        return (
          incomeDate.getMonth() + 1 === month && // Months are 0-indexed
          incomeDate.getFullYear() === year
        );
      })
      .reduce((total, income) => total + income.amount, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/income/add",
        {
          userId, // Pass the extracted user ID here
          ...formData,
        }
      );
      toast.success("Income Added Successfully"); // Show success toaster
      setIsModalOpen(false);
      setFormData({ date: "", amount: "", category: "", description: "" });
      console.log("success");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong, please try again."
      ); // Show error toaster
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-4">
        {/* Total Income Section */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center justify-center w-[200px] h-[200px] min-w-[60px] min-h-[60px] sm:min-w-[40px] sm:min-h-[40px] aspect-square p-4 rounded-2xl bg-emerald-200 dark:bg-gray-800 shadow-lg sm:rounded-lg">
            <div className="text-center sm:text-left">
              <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">
                Total Income
              </p>
            </div>
            <div className="mt-2 sm:mt-0 text-center">
              <p className="text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-300">
                {monthName}: ${currentMonthIncome}
              </p>
            </div>
          </div>
        </div>

        {/* Add Income Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on click
            className="inline-flex items-center justify-center h-12 gap-2 px-6 text-base font-medium tracking-wide text-white transition duration-300 rounded shadow-lg focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-md focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span>Add Income</span>
          </button>
        </div>

        {/* Table Section */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income) => (
                <tr
                  key={income._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    {new Date(income.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{income.amount}</td>
                  <td className="px-6 py-4">{income.category}</td>
                  <td className="px-6 py-4">{income.description}</td>
                  <td className="px-6 py-4 text-2xl flex items-center justify-center space-x-4">
                    <a href="#" className="text-green-500 hover:text-green-700">
                      <BiSolidEditAlt />
                    </a>
                    <a href="#" className="text-red-500 hover:text-red-700">
                      <RiDeleteBin6Line />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg dark:bg-gray-700 w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Income
              </h3>
              <button
                onClick={() => setIsModalOpen(false)} // Close modal on click
                className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg p-2 dark:hover:text-white dark:hover:bg-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                  placeholder="Select date"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="income-amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Income Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="income-category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                >
                  <option value="">Select Category</option>
                  <option value="salary">Salary</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                  placeholder="Enter description"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
              >
                Add Income
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} />{" "}
      {/* Add ToastContainer */}
    </>
  );
};

export default Income;
