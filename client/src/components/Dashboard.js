import React from 'react'
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <>
      <div className="p-4 ">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg">
            <p className="text-2xl text-gray-700 dark:text-gray-900 pr-5">
              Total Income
            </p>
            <p className="text-2xl text-gray-700 dark:text-gray-900">$4000</p>
          </div>
          <div className="flex items-center justify-center h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg">
            <p className="text-2xl  text-gray-700 dark:text-gray-900 pr-5">
              Total Expenses
            </p>
            <p className="text-2xl text-gray-700 dark:text-gray-900">$4000</p>
          </div>
          <div className="flex items-center justify-center h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg">
            <p className="text-2xl  text-gray-700 dark:text-gray-900 pr-5">
              Total Profit
            </p>
            <p className="text-2xl text-gray-700 dark:text-gray-900">$4000</p>
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
      ;
    </>
  );
};

export default Dashboard;

