import React from 'react'
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <>
<div class="p-4 ">
  <div class="grid grid-cols-3 gap-4 mb-4">
    <div class="flex items-center justify-center h-24 rounded-2xl bg-emerald-100 dark:bg-gray-800">
      <p class="text-2xl text-gray-700 dark:text-gray-900 pr-5">Total Income</p>
      <p class="text-2xl text-gray-700 dark:text-gray-900">$4000</p>
    </div>
    <div class="flex items-center justify-center h-24 rounded-2xl bg-emerald-100 dark:bg-gray-800">
      <p class="text-2xl  text-gray-700 dark:text-gray-900 pr-5">
        Total Expenses
      </p>
      <p class="text-2xl text-gray-700 dark:text-gray-900">$4000</p>
    </div>
    <div class="flex items-center justify-center h-24 rounded-2xl bg-emerald-100 dark:bg-gray-800">
      <p class="text-2xl  text-gray-700 dark:text-gray-900 pr-5">
        Total Profit
      </p>
      <p class="text-2xl text-gray-700 dark:text-gray-900">$4000</p>
    </div>
  </div>
  <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Teal to Lime
      </span>
    </button>
    <p class="text-2xl text-gray-400 dark:text-gray-500">Categories</p>
  </div>

  <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
    <p class="text-2xl text-gray-400 dark:text-gray-500">Summary Charts Bar</p>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
      <p class="text-2xl text-gray-400 dark:text-gray-500"></p>
    </div>
    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
      <p class="text-2xl text-gray-400 dark:text-gray-500"></p>
    </div>
    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
      <p class="text-2xl text-gray-400 dark:text-gray-500"></p>
    </div>
    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
      <p class="text-2xl text-gray-400 dark:text-gray-500"></p>
    </div>
  </div>
</div>;
</>
  );
};

export default Dashboard;

