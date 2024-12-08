import React, { useState, useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { TbCoins } from "react-icons/tb";

const Expense = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [monthName, setMonthName] = useState("");
  const [formData, setFormData] = useState({
    expenseName: "",
    date: "",
    amount: "",
    category: "",
    description: "",
  });
const [username, setUsername] = useState("");
  // Get user ID from JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
        setUsername(decodedToken.username);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  // Fetch expenses from the backend
  useEffect(() => {
    if (userId) {
      const fetchExpenses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/expense/all/${userId}`
          );
          setExpenses(response.data);

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

          setCurrentMonthExpense(
            calculateMonthlyExpense(currentMonth, currentYear, response.data)
          );
        } catch (err) {
          toast.error(
            err.response?.data?.message || "Failed to fetch expenses."
          );
          console.error(err);
        }
      };

      fetchExpenses();
    }
  }, [userId]);

  const calculateMonthlyExpense = (month, year, expenseData) => {
    return expenseData
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() + 1 === month &&
          expenseDate.getFullYear() === year
        );
      })
      .reduce((total, expense) => total + Number(expense.amount), 0); // Convert to number
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedExpense) {
        // Update existing expense
        await axios.put(
          `http://localhost:5000/api/expense/update/${selectedExpense._id}`,
          {
            userId,
            ...formData,
          }
        );
        toast.success("Expense Updated Successfully");

        // Update the expense in the local state
        const updatedExpenses = expenses.map((expense) =>
          expense._id === selectedExpense._id
            ? { ...expense, ...formData }
            : expense
        );
        setExpenses(updatedExpenses);

        // Recalculate total expense after updating
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        setCurrentMonthExpense(
          calculateMonthlyExpense(currentMonth, currentYear, updatedExpenses)
        );
      } else {
        // Add new expense
        const response = await axios.post(
          "http://localhost:5000/api/expense/add",
          {
            userId,
            ...formData,
          }
        );
        toast.success("Expense Added Successfully");

        // Add the new expense to the state
        const newExpenses = [...expenses, response.data];
        setExpenses(newExpenses);

        // Recalculate the current month's total expense
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        setCurrentMonthExpense(
          calculateMonthlyExpense(currentMonth, currentYear, newExpenses)
        );
      }

      setIsModalOpen(false);
      setFormData({ expenseName: "",date: "", amount: "", category: "", description: "" });
      setSelectedExpense(null); // Clear selected expense after action
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong, please try again."
      );
      console.log(err);
    }
  };

  // Handle edit click
  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setFormData({
      expenseName: expense.expenseName,
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
    });
    setIsModalOpen(true);
  };

  // Handle delete expense
  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/expense/delete/${expenseId}`
      );
      toast.success("Expense deleted successfully");

      // Update local expenses state
      const updatedExpenses = expenses.filter(
        (expense) => expense._id !== expenseId
      );
      setExpenses(updatedExpenses);

      // Recalculate total income
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      setCurrentMonthExpense(
        calculateMonthlyExpense(currentMonth, currentYear, updatedExpenses)
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete expense.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-4">
        {/* Header Section for Welcome Message */}
        <div className="p-4 bg-white text-black dark:bg-gray-800 border-b border-gray-300 mb-6">
          <h1 className="text-md sm:text-lg md:text-xl font-semibold uppercase">
            Welcome, {username}
          </h1>
        </div>
        {/* Total Expense Section */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Total Expense */}
          <div className="flex flex-col items-center justify-center bg-emerald-500 dark:bg-gray-800 rounded-xl w-full h-32 md:h-36 lg:h-40">
            <div className="text-4xl text-white mb-4">
              {/* You can use any icon from libraries like Font Awesome, Heroicons, etc. */}
              <TbCoins />
            </div>
            <p className="text-sm sm:text-md text-white dark:text-gray-300 uppercase">
              Total Expense
            </p>
            <p className="mt-2 text-md sm:text-lg font-bold text-white dark:text-gray-300">
              ${currentMonthExpense}
            </p>
          </div>
        </div>

        {/* Add Expense Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center h-12 gap-2 px-6 text-base font-medium tracking-wide text-white transition duration-300 rounded shadow-lg focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-md focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span>Add Expense</span>
          </button>
        </div>

        {/* Table Section */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Expense Name
                </th>
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
              {expenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{expense.expenseName}</td>
                  <td className="px-6 py-4">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{expense.amount}</td>
                  <td className="px-6 py-4">{expense.category}</td>
                  <td className="px-6 py-4">{expense.description}</td>
                  <td className="px-6 py-4 text-2xl flex items-center justify-center space-x-4">
                    <a
                      href="#"
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleEdit(expense)}
                    >
                      <BiSolidEditAlt />
                    </a>
                    <a
                      href="#"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(expense._id)}
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

      {/* Modal for adding or editing expense */}
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
                  {selectedExpense ? "Edit" : "Add"} Expense
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
                htmlFor="expenseName"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Expense Name
              </label>
              <input
                type="text"
                id="expenseName"
                value={formData.expenseName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4"
              />

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
                <option value="salary">Home</option>
                <option value="freelance">Pets</option>
                <option value="freelance">Food</option>
                <option value="freelance">Clothes</option>
                <option value="freelance">Health</option>
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

export default Expense;
