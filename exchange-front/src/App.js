import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home';
import PostItem from './components/postitem';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import NegotiationsPage from './components/NegotiationsPage';
import NegotiationForm from './components/NegotiationForm'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    // Check if the user is logged in based on the token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token,userId } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        console.log(localStorage.getItem('userId'));
        setIsLoggedIn(true);
        console.log('User logged in successfully!');
      } else {
        console.error('Error logging in user:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in user:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleRegister = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log('User registered successfully!');
        // Redirect to login page or handle navigation as needed
      } else {
        console.error('Error registering user:', response.statusText);
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };


  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home onLogout={handleLogout} />} />
            <Route path="post" element={<PostItem onLogout={handleLogout}/>} />
            <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
            <Route path="/Negotiation" element={<NegotiationsPage onLogout={handleLogout}/>} />
            <Route path={`/item/:itemId`} element={<NegotiationForm />} />
          </>
        ) : (
          <>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;






