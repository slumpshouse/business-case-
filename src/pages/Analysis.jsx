import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Analysis.css';

function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || '';
  const resumeText = location.state?.resumeText || '';

  const isStructured = result && typeof result === 'object';
  const matchScore = Math.max(0, Math.min(100, Number(result.match_score) || 0));

  // Function to determine priority based on position in the gap skills array
  const getPriority = (index, total) => {
    if (total <= 2) return 'high priority';
    const percentage = index / (total - 1);
    if (percentage < 0.33) return 'high priority';
    if (percentage < 0.67) return 'medium priority';
    return 'low priority';
  };

  // Function to get priority class for styling
  const getPriorityClass = (priority) => {
    if (priority === 'high priority') return 'priority-high';
    if (priority === 'medium priority') return 'priority-medium';
    return 'priority-low';
  };

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Resume Analysis</h1>

      {result ? (
        isStructured ? (
          <div className="analysis-content">
            {/* Overall Match Score Section */}
            <div className="match-score-section">
              <h3>Overall match score</h3>
              <div className="circular-progress">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray={`${(matchScore / 100) * 377} 377`}
                    strokeDashoffset="0"
                    transform="rotate(-90 70 70)"
                    strokeLinecap="round"
                  />
                  <text
                    x="70"
                    y="75"
                    textAnchor="middle"
                    fontSize="32"
                    fontWeight="bold"
                    fill="#1f2937"
                  >
                    {matchScore}
                  </text>
                </svg>
              </div>
              <p className="score-subtitle">You have {matchScore}% of the required skills</p>
            </div>

            {/* Skills you have */}
            <div className="skills-section">
              <h3>Skills you have</h3>
              <div className="skills-grid">
                {(result.strengths_skills || []).map((skill, i) => (
                  <div key={i} className="skill-box">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills you need to develop */}
            <div className="skills-section">
              <h3>Skills you need to develop</h3>
              <div className="skills-development">
                {(result.gap_skills || []).map((skill, i) => {
                  const totalSkills = result.gap_skills.length;
                  const priority = getPriority(i, totalSkills);
                  const priorityClass = getPriorityClass(priority);
                  
                  return (
                    <div key={i} className="skill-card">
                      <div className="skill-header">
                        <div className="skill-icon">📚</div>
                        <div className={`skill-priority ${priorityClass}`}>{priority}</div>
                      </div>
                      <h4>{skill}</h4>
                      <p>{result.why_it_matters || 'Essential for career growth and job requirements.'}</p>
                      <div className="skill-actions">
                        <button className="action-btn">Online Course</button>
                        <button className="action-btn">Practice Projects</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended learning path */}
            <div className="learning-path-section">
              <h3>Recommended learning path</h3>
              <div className="learning-path">
                {(result.recommended_learning_path || []).map((step, i) => (
                  <div key={i} className="learning-step">
                    <div className="step-connector">
                      <div className="step-dot"></div>
                      {i < result.recommended_learning_path.length - 1 && <div className="step-line"></div>}
                    </div>
                    <div className="step-content">
                      <h4>{step.topic}</h4>
                      <p>{step.reason}</p>
                      {Array.isArray(step.suggested_resources) && step.suggested_resources.length > 0 && (
                        <div className="step-resources">
                          {step.suggested_resources.map((resource, j) => (
                            <a key={j} href={resource} target="_blank" rel="noreferrer" className="resource-link">
                              {resource}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="fallback-result">
            <strong>AI Feedback:</strong>
            <div>{String(result)}</div>
          </div>
        )
      ) : (
        <div className="no-result">No analysis result found.</div>
      )}

      <button className="analyze-again-btn" onClick={() => navigate('/resume', { state: { resumeText } })}>
        Update Resume
      </button>
    </div>
  );
}

export default Analysis;
