// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/" element={<><Header /><HomePage /></>} /> 
        <Route path="/profile" element={<><Header /><ProfilePage /></>} /> 
      </Routes>
    </Router>
  );
};

export default App;
