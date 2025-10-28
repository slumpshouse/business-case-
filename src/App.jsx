import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from "./components/Header";
import Resume from './pages/Resume';

import Job from './pages/Job';
import JobsLanding from './pages/JobsLanding';
import Login from './pages/Login';
import Analysis from './pages/Analysis';
import Apply from './pages/Apply';



function App() {
  return (
    <Router>
      <div>
        <Header /> {/*  header appears on every page */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/jobs" element={<Job />} />
          <Route path="/jobs-landing" element={<JobsLanding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
