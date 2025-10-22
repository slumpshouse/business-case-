// Import React library
import React from 'react';

// Import CSS file for styling
import '../css/ProgressTracking.css'; 

// Define the ProgressTracking component
const ProgressTracking = () => {
  // List of progress items (each has a label, value, and color)
  const progressData = [
    { label: 'Profile Completion', progress: 0, color: '#10b981' },
    { label: 'Skills Assessment', progress: 0, color: '#3b82f6' },
    { label: 'Course Progress', progress: 0, color: '#f59e0b' },
    { label: 'Project Portfolio', progress: 0, color: '#ef4444' }
  ];

  // Calculate the overall progress as the average of all items
  const overallProgress = Math.round(
    progressData.reduce((sum, item) => sum + item.progress, 0) / progressData.length
  );

  // What the component will display
  return (
    <div className="progress-container">
      {/* Header with title and overall progress */}
      <div className="progress-header">
        <h2>Your Progress</h2>
        <div className="overall">
          <span>Overall:</span>
          <span>{overallProgress}%</span>
        </div>
      </div>

      {/* Grid of individual progress cards */}
      <div className="progress-grid">
        {progressData.map((item, index) => (
          <div key={index} className="progress-card">
            {/* Card header: label + progress percentage */}
            <div className="progress-card-header">
              <span className="progress-label">{item.label}</span>
              <span className="progress-value" style={{ color: item.color }}>
                {item.progress}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${item.progress}%`,   // bar length based on progress
                  backgroundColor: item.color   // bar color based on field
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer message with encouragement */}
      <div className="progress-footer">
        <p>
          📊 Keep going! Complete your profile to unlock personalized recommendations and track
          your journey more effectively.
        </p>
      </div>
    </div>
  );
};

// Export component so it can be used in other files
export default ProgressTracking;
