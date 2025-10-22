import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/JobsLanding.css';

function JobsLanding() {
  const navigate = useNavigate();

  return (
    <div className="jobs-landing">
      <h1>Explore Jobs</h1>
      <p>Click the button below to go to Job Opportunities.</p>
      <button onClick={() => navigate('/jobs')} className="go-jobs">Go to Job Opportunities</button>
    </div>
  );
}

export default JobsLanding;
