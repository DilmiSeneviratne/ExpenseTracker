import React from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Expense = () => {
  return (
    <>
      <div className="p-4 ">
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
        <div className="flex justify-end mb-4">
          <button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-base font-medium tracking-wide text-white transition duration-300 rounded shadow-lg focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-md focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
            <span>Add Expense</span>
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4 text-2xl flex items-center justify-center space-x-4">
                  <a href="#" className="text-green-500 hover:text-green-700">
                    <BiSolidEditAlt />
                  </a>
                  <a href="#" className="text-red-500 hover:text-red-700">
                    <RiDeleteBin6Line />
                  </a>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
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
    </>
  );
};

export default Expense;
