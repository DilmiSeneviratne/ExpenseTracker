import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { TbCoins } from "react-icons/tb";
import { MdOutlineSavings } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [userId, setUserId] = useState("");
  const [totalIncome, setTotalIncome] = useState(0); // State to store total income
  const [totalExpense, setTotalExpense] = useState(0); // State to store total income
  const [topExpenses, setTopExpenses] = useState([]);
  const [topExpenseValues, setTopExpenseValues] = useState([]);
  const [labels, setLabels] = useState([]);

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

  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/income/total/current-month/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch total income");
        }
        const data = await response.json();
        setTotalIncome(data.totalIncome); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching total income:", error);
      }
    };

    fetchTotalIncome(); // Call the function on component mount
  }, [userId]);

  useEffect(() => {
    const fetchTotalExpense = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/expense/total/current-month/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch total expense");
        }
        const data = await response.json();
        setTotalExpense(data.totalExpense); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching total expense:", error);
      }
    };

    fetchTotalExpense(); // Call the function on component mount
  }, [userId]);

  // Fetch Top 5 Expenses
  useEffect(() => {
    const fetchTopExpenses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/expense/top/current-month/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch top expenses");
        }
        const data = await response.json();
        setTopExpenses(data.categories); // Update categories
        setTopExpenseValues(data.values); // Update expense values
      } catch (error) {
        console.error("Error fetching top expenses:", error);
      }
    };

    if (userId) fetchTopExpenses();
  }, [userId]);

  // Bar Chart Data
  const barChartData = {
    labels: topExpenses || [],
    datasets: [
      {
        label: "Top 5 Expenses",
        data: topExpenseValues || [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Top 5 Expenses - Current Month",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <>
      <div className="p-4">
        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Total Income */}
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 rounded-xl w-full h-32 md:h-36 lg:h-40">
            <div className="text-4xl text-emerald-500 mb-4">
              {/* You can use any icon from libraries like Font Awesome, Heroicons, etc. */}
              <HiOutlineCurrencyDollar />
            </div>
            <p className="text-sm sm:text-md text-gray-700 dark:text-gray-300 uppercase">
              Total Income
            </p>
            <p className="mt-2 text-md sm:text-lg font-bold text-gray-700 dark:text-gray-300">
              ${totalIncome}
            </p>
          </div>

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
              ${totalExpense}
            </p>
          </div>

          {/* Total Profit */}
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 rounded-xl w-full h-32 md:h-36 lg:h-40">
            <div className="text-4xl text-emerald-500 mb-4">
              {/* You can use any icon from libraries like Font Awesome, Heroicons, etc. */}
              <MdOutlineSavings />
            </div>
            <p className="text-sm sm:text-md text-gray-700 dark:text-gray-300 uppercase">
              Total savings
            </p>
            <p className="mt-2 text-md sm:text-lg font-bold text-gray-700 dark:text-gray-300">
              ${totalIncome - totalExpense}
            </p>
          </div>
        </div>

        {/* Graph Section */}
        <div className="flex flex-wrap gap-4 items-center justify-center mb-10">
          <div className="w-full md:w-[70%] max-w-[600px] bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl p-4">
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl text-gray-400 dark:text-gray-500 mb-4">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center justify-center bg-gray-50 h-28 dark:bg-gray-800 rounded">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Category 1
              </p>
            </div>
            <div className="flex items-center justify-center bg-gray-50 h-28 dark:bg-gray-800 rounded">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Category 2
              </p>
            </div>
            <div className="flex items-center justify-center bg-gray-50 h-28 dark:bg-gray-800 rounded">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Category 3
              </p>
            </div>
            <div className="flex items-center justify-center bg-gray-50 h-28 dark:bg-gray-800 rounded">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Category 4
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
