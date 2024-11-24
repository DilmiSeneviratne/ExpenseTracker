import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import './App.css';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      {/* Home Page */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/dashboard" element={<UserDashboard />} />{" "}
        {/* Dashboard page */}
      </Routes>
    </div>
  );
}

export default App;
