import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleLogIn = () => {
    setIsLoggedIn(true);
  }
  const handleLogOut = async () => {
    setIsLoggedIn(false);

    try {
      const response = await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to log out`);
      }

      // navigate('/');   // Redirect to home after logout
      // setProtectedData(null); // Clear protected data on logout

    } catch (error) {
      setError('Error logging out, please try again later');
    }
  }

  return (
   <>
   <Router >
      <Header isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
      <HomePage handleLogIn={handleLogIn} />
      </Router>
      </>
  )
}

export default App;