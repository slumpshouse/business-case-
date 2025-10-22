import React from 'react';
import '../css/JobCard.css';

function JobCard({ title, company, location, salary, description, requirements }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3 className="job-title">{title}</h3>
        <div className="company-name">{company}</div>
      </div>
      
      <div className="job-details">
        <div className="job-info">
          <span>📍 {location}</span>
          <span>💰 {salary}</span>
        </div>
        
        <p className="job-description">{description}</p>
        
        {requirements && (
          <div className="job-requirements">
            <h4>Requirements:</h4>
            {typeof requirements === 'string' ? (
              <p>{requirements}</p>
            ) : (
              <ul>
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <button className="apply-button">Apply Now</button>
    </div>
  );
}

export default JobCard;