import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Home from './pages/Home';
import Header from "./components/Header";
import Resume from './pages/Resume';
import Job from './pages/Job';
import JobsLanding from './pages/JobsLanding';
import Login from './pages/Login';
import Analysis from './pages/Analysis';
import Apply from './pages/Apply';

// Create Authentication Context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const authValue = {
    isLoggedIn,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <div>
          <Header /> {/*  header appears on every page */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/jobs" element={<Job />} />
            <Route path="/jobs-landing" element={<JobsLanding />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
