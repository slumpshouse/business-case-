import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 for navigation
import "../css/Header.css";
import Logo from './Logo';

const Header = () => {
  const navigate = useNavigate(); // 👈 lets you navigate to other routes

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
        <button className="header-button" onClick={() => navigate("/home")}>
          Home
        </button>

        {/* Login button */}
        <button className="header-button" onClick={() => navigate("/login")}>
          Log out
        </button>

        {/* Settings button (you can later make it open a settings page) */}
        <button className="header-settings">Settings ⚙️</button>
      </div>
    </header>
  );
};

export default Header;
