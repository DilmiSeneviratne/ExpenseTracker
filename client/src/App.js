import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import UserDashboard from "./components/UserDashboard";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Expense from "./components/Expense";
import Profile from "./components/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      {/* Home Page */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/*" element={<UserDashboard />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} />{" "}
      {/* Add ToastContainer */}
    </div>
  );
}

export default App;
