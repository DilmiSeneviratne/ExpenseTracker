import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Income = () => {
  // State for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-4">
        {/* Total Income Section */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between h-auto sm:h-24 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg sm:rounded-lg">
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300">
                Total Income
              </p>
            </div>
            <div className="mt-2 sm:mt-0 text-center">
              <p className="text-lg sm:text-2xl font-bold text-gray-700 dark:text-gray-300">
                $4000
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4 text-2xl flex items-center justify-center space-x-4">
                  <a href="#" className="text-green-500 hover:text-green-700">
                    <BiSolidEditAlt />
                  </a>
                  <a href="#" className="text-red-500 hover:text-red-700">
                    <RiDeleteBin6Line />
                  </a>
                </td>
              </tr>
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
            <form className="p-4">
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
                  id="income-amount"
                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
                  placeholder="Enter income amount"
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
                  id="income-category"
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
                  id="date"
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
    </>
  );
};

export default Income;
