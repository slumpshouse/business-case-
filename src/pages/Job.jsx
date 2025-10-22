import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { fetchJobs, searchJobs } from '../services/jobService';
import '../css/Job.css';

function Job() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch jobs when component mounts
  useEffect(() => {
    loadJobs();
  }, []);

  // Load jobs with search terms
  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobData = await fetchJobs(searchTerm, locationFilter);
      setJobs(jobData);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
      console.error('Error loading jobs:', err);
    }
    setLoading(false);
  };

  // Debounce search to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      loadJobs();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, locationFilter]);

  return (
    <div className="job-page">
      <h1>Job Opportunities</h1>
      
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="location-input"
        />
      </div>

      <div className="jobs-container">
        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              description={job.description}
              requirements={job.requirements}
            />
          ))
        ) : (
          <div className="no-jobs">
            No jobs found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default Job;
