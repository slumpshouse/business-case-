import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 for navigation
import { useAuth } from '../App'; // Import the auth context
import "../css/Header.css";
import Logo from './Logo';

const Header = () => {
  const navigate = useNavigate(); // 👈 lets you navigate to other routes
  const { isLoggedIn, logout } = useAuth(); // Get auth state and logout function

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout(); // Log out the user
      navigate("/"); // Redirect to home page
    } else {
      navigate("/login"); // Navigate to login page
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Logo />
      </div>

      <div className="header-right">
        {/* Job Opportunities button */}
        <button className="header-button" onClick={() => navigate("/jobs")}>
          Job Opportunities
        </button>

        {/* Home button */}
        <button className="header-button" onClick={() => navigate("/")}>
          Home
        </button>

        {/* Login/Logout button */}
        <button className="header-button" onClick={handleAuthClick}>
          {isLoggedIn ? 'Log Out' : 'Sign In'}
        </button>
      </div>
    </header>
  );
};

export default Header;
