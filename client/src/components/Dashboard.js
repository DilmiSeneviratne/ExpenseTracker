import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Required for the Doughnut chart
  LineElement,
  PointElement,
} from "chart.js";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { TbCoins } from "react-icons/tb";
import { MdOutlineSavings } from "react-icons/md";



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Required for creating doughnut/pie charts
  ChartDataLabels
);

const Dashboard = () => {
  const [userId, setUserId] = useState("");
  const [totalIncome, setTotalIncome] = useState(0); // State to store total income
  const [totalExpense, setTotalExpense] = useState(0); // State to store total income
  const [topExpenses, setTopExpenses] = useState([]);
  const [topExpenseValues, setTopExpenseValues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [dailyExpenses, setDailyExpenses] = useState({
    dates: [],
    amounts: [],
  }); // Daily expenses data
  const [username, setUsername] = useState("");

  // Get user ID from JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken.username);
        setUserId(decodedToken.id);
        setUsername(decodedToken.user.username)
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

        // Map categories and values from the response
        const expenseName = data.data.map((expense) => expense.expenseName);
        const values = data.data.map((expense) => expense.amount);

        setTopExpenses(expenseName); // Update categories
        setTopExpenseValues(values); // Update expense values
      } catch (error) {
        console.error("Error fetching top expenses:", error);
      }
    };

    if (userId) fetchTopExpenses();
  }, [userId]);

  // Calculate Savings
  useEffect(() => {
    setTotalSavings(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  // Donut Chart Data
  const calculatePercentages = () => {
    const total = totalIncome + totalExpense + totalSavings;
    return [
      ((totalIncome / total) * 100).toFixed(1), // Income %
      ((totalExpense / total) * 100).toFixed(1), // Expense %
      ((totalSavings / total) * 100).toFixed(1), // Savings %
    ];
  };

  const percentages = calculatePercentages();

  useEffect(() => {
    const fetchDailyExpenses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/expense/daily-expenses/${userId}`
        );
        const data = await response.json();

        // Sort the data by date
        const sortedData = {
          dates: data.dates
            .map((date) => new Date(date)) // Convert strings to Date objects
            .sort((a, b) => a - b) // Sort the dates in ascending order
            .map((date) => date.toISOString().split("T")[0]), // Convert back to string if necessary
          amounts: [],
        };

        // Map amounts to the sorted dates
        sortedData.amounts = sortedData.dates.map(
          (sortedDate) =>
            data.dates
              .map((date, index) => ({
                date: new Date(date),
                amount: data.amounts[index],
              }))
              .find(
                (item) => item.date.toISOString().split("T")[0] === sortedDate
              )?.amount
        );

        setDailyExpenses(sortedData); // Update state with sorted data
      } catch (error) {
        console.error("Error fetching daily expenses:", error);
      }
    };

    if (userId) fetchDailyExpenses();
  }, [userId]);

  // Bar Chart Data
  const barChartData = {
    labels: topExpenses || [],
    datasets: [
      {
        label: "Top 5 Expenses",
        data: topExpenseValues || [],
        backgroundColor: "rgb(52, 211, 153)", 
        borderColor: "rgb(52, 211, 153)", 
        borderWidth: 1,
        barPercentage: 0.6, // Reduce bar width (50% of the category width)
        categoryPercentage: 0.7, // Reduce category width (70% of total space)
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "TOP 5 EXPENSES - CURRENT MONTH",
        font: {
          family: "Roboto", // Custom font family
          size: 18,
          weight: "normal", // Removed bold effect
          colour: "black",
        },
      },
      datalabels: {
        display: false, // Explicitly disable datalabels for the bar chart
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
            colour: "black",
          },
        },
        
        grid: {
          display: false, // Removes vertical grid lines
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
            colour: "black",
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 10, // Rounded edges for bars
      },
    },
  };

  const doughnutChartData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Current Month",
        data: [totalIncome, totalExpense, totalSavings],
        backgroundColor: [
          "rgb(34, 197, 94  )",
          "rgb(16, 185, 129 )",
          "rgb(59, 58, 56)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "REPORT OVERVIEW",
        font: {
          family: "Roboto", // Custom font family
          size: 18,
          weight: "normal", // Removed bold effect
          colour: "black",
        },
      },
      datalabels: {
        color: "white",
        formatter: (value, context) => {
          const percentages = calculatePercentages();
          return percentages[context.dataIndex] + "%";
        },
        font: {
          weight: "normal",
          size: 12,
        },
      },
    },
  };

  const lineChartData = {
    labels: dailyExpenses.dates, // Dates on the x-axis
    datasets: [
      {
        label: "Daily Expenses",
        data: dailyExpenses.amounts,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)", // Added transparency for the fill effect
        fill: true,
        pointRadius: 6, // Increased dot size
        pointHoverRadius: 8, // Increased hover dot size
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "DAILY EXPENSES FOR CURRENT MONTH",
        font: {
          family: "Roboto", // Custom font family
          size: 18,
          weight: "normal", // Removed bold effect
          color: "black", // Fixed spelling of color
        },
      },
      datalabels: {
        display: false, // Explicitly disable datalabels for the line chart
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        radius: 6, // Increased default dot size
        hoverRadius: 8, // Increased hover dot size
      },
    },
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

        {/* Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Bar Graph Section */}
          <div
            className="w-full relative md:col-span-2 bg-white dark:bg-gray-800 border border-gray-300 rounded-2xl p-4"
            style={{ height: "300px" }} // Adjusted reduced height
          >
            <Bar options={barChartOptions} data={barChartData} />
          </div>

          {/* Donut Graph Section */}
          <div
            className="w-full relative md:col-span-1 bg-white dark:bg-gray-800 border border-gray-300 rounded-2xl p-4"
            style={{ height: "300px" }} // Adjusted reduced height
          >
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Line Graph Section */}
          <div
            className="w-full relative md:col-span-3 bg-white dark:bg-gray-800 border border-gray-300 rounded-2xl p-4"
            style={{ height: "300px" }}
          >
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
