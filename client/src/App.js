import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <Home/>
      
      </div>
    /*<Router>
      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>*/
  );
}

export default App;
