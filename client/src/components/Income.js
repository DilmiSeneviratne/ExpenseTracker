import React, { useState, useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const Income = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
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
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
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
          setIncomes(response.data);

          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          const currentYear = currentDate.getFullYear();

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
          incomeDate.getMonth() + 1 === month &&
          incomeDate.getFullYear() === year
        );
      })
      .reduce((total, income) => total + Number(income.amount), 0); // Convert to number
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedIncome) {
        // Update existing income
        await axios.put(
          `http://localhost:5000/api/income/update/${selectedIncome._id}`,
          {
            userId,
            ...formData,
          }
        );
        toast.success("Income Updated Successfully");

        // Update the income in the local state
        const updatedIncomes = incomes.map((income) =>
          income._id === selectedIncome._id
            ? { ...income, ...formData }
            : income
        );
        setIncomes(updatedIncomes);

        // Recalculate total income after updating
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        setCurrentMonthIncome(
          calculateMonthlyIncome(currentMonth, currentYear, updatedIncomes)
        );
      } else {
        // Add new income
        const response = await axios.post(
          "http://localhost:5000/api/income/add",
          {
            userId,
            ...formData,
          }
        );
        toast.success("Income Added Successfully");

        // Add the new income to the state
        const newIncomes = [...incomes, response.data];
        setIncomes(newIncomes);

        // Recalculate the current month's total income
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        setCurrentMonthIncome(
          calculateMonthlyIncome(currentMonth, currentYear, newIncomes)
        );
      }

      setIsModalOpen(false);
      setFormData({ date: "", amount: "", category: "", description: "" });
      setSelectedIncome(null); // Clear selected income after action
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong, please try again."
      );
      console.log(err);
    }
  };

  // Handle edit click
  const handleEdit = (income) => {
    setSelectedIncome(income);
    setFormData({
      date: income.date,
      amount: income.amount,
      category: income.category,
      description: income.description,
    });
    setIsModalOpen(true);
  };

  // Handle delete income
  const handleDelete = async (incomeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/income/delete/${incomeId}`);
      toast.success("Income deleted successfully");

      // Update local incomes state
      const updatedIncomes = incomes.filter(
        (income) => income._id !== incomeId
      );
      setIncomes(updatedIncomes);

      // Recalculate total income
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      setCurrentMonthIncome(
        calculateMonthlyIncome(currentMonth, currentYear, updatedIncomes)
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete income.");
      console.error(err);
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
            onClick={() => setIsModalOpen(true)}
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
                    <a
                      href="#"
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleEdit(income)}
                    >
                      <BiSolidEditAlt />
                    </a>
                    <a
                      href="#"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(income._id)}
                    >
                      <RiDeleteBin6Line />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding or editing income */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[80vw] sm:w-[60vw] md:w-[40vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedIncome ? "Edit" : "Add"} Income
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  X
                </button>
              </div>

              <label
                htmlFor="date"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4"
              />

              <label
                htmlFor="amount"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4"
              />

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

              <label
                htmlFor="description"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4"
              />

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-300 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-emerald-500 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Income;
