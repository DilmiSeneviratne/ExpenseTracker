import React from 'react'
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <>
      <div className="p-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Total Income */}
          <div className="flex flex-col items-center justify-center w-[200px] h-[200px] min-w-[60px] min-h-[60px] sm:min-w-[40px] sm:min-h-[40px] aspect-square p-4 m-auto rounded-xl bg-emerald-100 dark:bg-gray-800 shadow-lg">
            <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">
              Total Income
            </p>
            <p className="mt-2 text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-300">
              $4000
            </p>
          </div>
          {/* Total Expense */}
          <div className="flex flex-col items-center justify-center w-[200px] h-[200px] min-w-[60px] min-h-[60px] sm:min-w-[40px] sm:min-h-[40px] aspect-square p-4 m-auto rounded-xl bg-emerald-200 dark:bg-gray-800 shadow-lg">
            <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">
              Total Expense
            </p>
            <p className="mt-2 text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-300">
              $4000
            </p>
          </div>
          {/* Total Profit */}
          <div className="flex flex-col items-center justify-center w-[200px] h-[200px] min-w-[60px] min-h-[60px] sm:min-w-[40px] sm:min-h-[40px] aspect-square p-4 m-auto rounded-xl bg-emerald-300 dark:bg-gray-800 shadow-lg">
            <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">
              Total Profit
            </p>
            <p className="mt-2 text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-300">
              $4000
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            Categories
          </p>
        </div>

        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            Summary Charts Bar
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

